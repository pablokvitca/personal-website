type ConsentState = 'granted' | 'denied';

/**
 * Registers a listener for the `consent-updated` custom event dispatched by
 * CookieConsent.astro and forwards the new consent state to GA Consent Mode v2.
 *
 * Must be called after the GA gtag shim is set up (i.e. after GoogleAnalytics.astro
 * renders its is:inline script).
 */
export function listenForConsentUpdates(): void {
  window.addEventListener('consent-updated', (e) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    const state: ConsentState = value === 'accepted' ? 'granted' : 'denied';
    window.gtag?.('consent', 'update', {
      analytics_storage: state,
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
    });
  });
}
