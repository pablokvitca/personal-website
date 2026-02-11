const CONSENT_KEY = 'analytics-consent';

export type ConsentValue = 'accepted' | 'declined';

export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === 'accepted' || value === 'declined') return value;
  return null;
}

export function setConsent(value: ConsentValue): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent('consent-updated', { detail: { value } }));
}

export function hasConsented(): boolean {
  return getConsent() === 'accepted';
}

export function hasDeclined(): boolean {
  return getConsent() === 'declined';
}

export function clearConsent(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_KEY);
}
