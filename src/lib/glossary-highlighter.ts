import { setupTooltips } from '@/lib/starwind/tooltip-handler';
import type { GlossaryTermData } from '@/lib/glossary';

interface TermKeyword {
  text: string;
  slug: string;
  title: string;
  shortDescription: string;
}

/**
 * Build a sorted list of all keywords to match (longer terms first to avoid partial replacements).
 */
function buildKeywords(terms: GlossaryTermData[]): TermKeyword[] {
  const keywords: TermKeyword[] = [];
  for (const term of terms) {
    const allNames = [term.title, ...term.alternativeNames];
    for (const name of allNames) {
      keywords.push({
        text: name,
        slug: term.slug,
        title: term.title,
        shortDescription: term.shortDescription,
      });
    }
  }
  // Sort longest first to prevent partial replacement of shorter synonyms
  return keywords.sort((a, b) => b.text.length - a.text.length);
}

/**
 * Build a combined regex that matches any keyword, case-insensitively at word boundaries.
 */
function buildPattern(keywords: TermKeyword[]): RegExp {
  const escaped = keywords.map((k) => k.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
}

/**
 * Find the keyword entry matching a given matched string.
 */
function findKeyword(keywords: TermKeyword[], matched: string): TermKeyword | undefined {
  const lower = matched.toLowerCase();
  return keywords.find((k) => k.text.toLowerCase() === lower);
}

/**
 * Create a tooltip span wrapping matched glossary term text.
 */
function createTooltipElement(matchedText: string, keyword: TermKeyword): HTMLSpanElement {
  const wrapper = document.createElement('span');
  wrapper.className = 'starwind-tooltip relative inline-block not-sw-prose';
  wrapper.setAttribute('data-slot', 'tooltip');
  wrapper.setAttribute('data-state', 'closed');
  wrapper.setAttribute('data-open-delay', '200');
  wrapper.setAttribute('data-close-delay', '200');
  wrapper.setAttribute('data-content-hoverable', '');

  const trigger = document.createElement('span');
  trigger.className =
    'glossary-term cursor-help underline decoration-dotted decoration-2 decoration-primary/60';
  trigger.textContent = matchedText;

  const content = document.createElement('span');
  content.className =
    'starwind-tooltip-content fixed z-50 hidden w-64 max-w-xs px-3 py-2 bg-foreground text-background rounded-md text-sm not-sw-prose';
  content.setAttribute('data-slot', 'tooltip-content');
  content.setAttribute('data-state', 'closed');
  content.setAttribute('data-side', 'top');
  content.setAttribute('data-align', 'center');
  content.setAttribute('data-side-offset', '8');
  content.setAttribute('data-avoid-collisions', '');
  content.setAttribute('role', 'tooltip');
  content.style.animationDuration = '150ms';

  const strong = document.createElement('strong');
  strong.className = 'block font-semibold mb-1';
  strong.textContent = keyword.title;

  const p = document.createElement('p');
  p.className = 'text-xs opacity-80 leading-snug';
  p.textContent = keyword.shortDescription;

  const link = document.createElement('a');
  link.href = `/glossary/${keyword.slug}`;
  link.className = 'mt-2 block text-xs underline opacity-60';
  link.textContent = 'View full entry →';

  content.appendChild(strong);
  content.appendChild(p);
  content.appendChild(link);

  wrapper.appendChild(trigger);
  wrapper.appendChild(content);

  return wrapper;
}

/**
 * Tags to skip when walking the DOM for text nodes.
 */
const SKIP_TAGS = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'CODE', 'PRE', 'A', 'SCRIPT', 'STYLE']);

/**
 * Check whether a node is inside a skipped element or an existing glossary tooltip.
 */
function isInsideSkippedElement(node: Node): boolean {
  let current: Node | null = node.parentElement;
  while (current && current !== document.body) {
    const el = current as Element;
    if (SKIP_TAGS.has(el.tagName)) return true;
    if (el.classList.contains('starwind-tooltip')) return true;
    if (el.classList.contains('glossary-term')) return true;
    current = current.parentElement;
  }
  return false;
}

/**
 * Collect all text nodes inside a prose container that are eligible for highlighting.
 */
function collectTextNodes(container: Element): Text[] {
  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (isInsideSkippedElement(node)) return NodeFilter.FILTER_REJECT;
      const text = node.textContent ?? '';
      if (text.trim().length === 0) return NodeFilter.FILTER_SKIP;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let node: Node | null;
  while ((node = walker.nextNode())) {
    textNodes.push(node as Text);
  }
  return textNodes;
}

/**
 * Replace term matches in a text node with tooltip elements.
 * Returns true if any replacements were made.
 */
function processTextNode(textNode: Text, keywords: TermKeyword[], pattern: RegExp): boolean {
  const text = textNode.textContent ?? '';
  pattern.lastIndex = 0;

  if (!pattern.test(text)) return false;
  pattern.lastIndex = 0;

  const parent = textNode.parentNode;
  if (!parent) return false;

  const fragment = document.createDocumentFragment();
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = matchStart + match[0].length;

    // Add text before the match
    if (matchStart > lastIndex) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex, matchStart)));
    }

    // Find the corresponding keyword
    const keyword = findKeyword(keywords, match[0]);
    if (keyword) {
      fragment.appendChild(createTooltipElement(match[0], keyword));
    } else {
      // Fallback: keep the text as-is
      fragment.appendChild(document.createTextNode(match[0]));
    }

    lastIndex = matchEnd;
  }

  // Add remaining text after last match
  if (lastIndex < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  parent.replaceChild(fragment, textNode);
  return true;
}

/**
 * Main entry point: read glossary data from the page and highlight matching terms
 * inside `.sw-prose` elements, then register tooltip handlers.
 */
export function highlightGlossaryTerms(): void {
  const dataEl = document.getElementById('glossary-data');
  if (!dataEl) return;

  let terms: GlossaryTermData[];
  try {
    terms = JSON.parse(dataEl.textContent ?? '[]') as GlossaryTermData[];
  } catch {
    return;
  }

  if (terms.length === 0) return;

  const keywords = buildKeywords(terms);
  if (keywords.length === 0) return;

  const pattern = buildPattern(keywords);

  const proseContainers = document.querySelectorAll<Element>('.sw-prose');
  proseContainers.forEach((container) => {
    // Collect text nodes before any mutations
    const textNodes = collectTextNodes(container);
    textNodes.forEach((node) => {
      processTextNode(node, keywords, pattern);
    });
  });

  // Register tooltip handlers for all newly created tooltip elements
  setupTooltips();
}
