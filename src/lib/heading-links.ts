export function setupHeadingLinks(): void {
  const buttons = document.querySelectorAll('.heading-link-button');

  buttons.forEach((button) => {
    // Remove existing listener if any
    const newButton = button.cloneNode(true) as HTMLElement;
    button.replaceWith(newButton);

    newButton.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const headingId = newButton.getAttribute('data-heading-id');
      if (!headingId) return;

      const url = `${window.location.origin}${window.location.pathname}#${headingId}`;

      try {
        await navigator.clipboard.writeText(url);

        window.__starwind__?.toast?.add({
          title: 'Link copied to clipboard',
          variant: 'success',
          duration: 3000,
        });
      } catch (error) {
        console.error('Failed to copy link:', error);
        window.__starwind__?.toast?.add({
          title: 'Failed to copy link',
          variant: 'error',
          duration: 3000,
        });
      }
    });
  });
}
