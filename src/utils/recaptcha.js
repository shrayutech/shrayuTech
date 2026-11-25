/**
 * Google reCAPTCHA v3, loaded only by the contact form.
 * Without a site key, development sends a placeholder that the backend accepts only when it also
 * has no secret in development. Production refuses to send, rather than submit without a check.
 */
import { validateRecaptchaSiteKey } from '../config/recaptcha.config.mjs';

// Must stay a literal process.env.NEXT_PUBLIC_* read: Next inlines it at build time, so the key has
// to be set before `next build` (a Vercel redeploy), not only at runtime.
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const CONFIG_ERROR = validateRecaptchaSiteKey(SITE_KEY);
const DEVELOPMENT_TOKEN = 'development-no-recaptcha';

/** Thrown when the site key is missing or malformed: a deployment problem, not a visitor problem. */
export class RecaptchaConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RecaptchaConfigError';
  }
}

let scriptPromise = null;

export function loadRecaptcha() {
  if (CONFIG_ERROR) return Promise.resolve();
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
  if (CONFIG_ERROR) {
    // Unchanged: the placeholder is only for local development with no key, and the backend
    // accepts it only when it is also in development with no secret
    if (!SITE_KEY && process.env.NODE_ENV === 'development') return DEVELOPMENT_TOKEN;
    throw new RecaptchaConfigError(CONFIG_ERROR);
  }
  await loadRecaptcha();
  return window.grecaptcha.execute(SITE_KEY, { action });
}

/** Google's badge is added to the page once and would otherwise stay after leaving the contact page. */
export function setRecaptchaBadgeVisible(visible) {
  const badge = document.querySelector('.grecaptcha-badge');
  if (badge) badge.style.visibility = visible ? 'visible' : 'hidden';
}
