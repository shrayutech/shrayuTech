/**
 * Google reCAPTCHA v3, loaded only by the contact form.
 * Without a site key, development sends a placeholder that the backend accepts only when it also
 * has no secret in development. Production refuses to send, rather than submit without a check.
 */
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const DEVELOPMENT_TOKEN = 'development-no-recaptcha';

let scriptPromise = null;

export function loadRecaptcha() {
  if (!SITE_KEY) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(SITE_KEY)}`;
      script.async = true;
      script.onload = () => window.grecaptcha.ready(resolve);
      script.onerror = () => {
        scriptPromise = null; // allow a retry on the next submit
        reject(new Error('reCAPTCHA failed to load'));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

export async function getRecaptchaToken(action) {
  if (!SITE_KEY) {
    if (process.env.NODE_ENV === 'development') return DEVELOPMENT_TOKEN;
    throw new Error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set');
  }
  await loadRecaptcha();
  return window.grecaptcha.execute(SITE_KEY, { action });
}

/** Google's badge is added to the page once and would otherwise stay after leaving the contact page. */
export function setRecaptchaBadgeVisible(visible) {
  const badge = document.querySelector('.grecaptcha-badge');
  if (badge) badge.style.visibility = visible ? 'visible' : 'hidden';
}
