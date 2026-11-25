/**
 * reCAPTCHA v3 site key check, shared by next.config.mjs (build time) and src/utils/recaptcha.js
 * (browser). The site key is public; the secret key belongs only to the backend
 * (RECAPTCHA_SECRET_KEY on Render) and must never get a NEXT_PUBLIC_ name.
 *
 * .mjs so Node loads it as ES module from next.config.mjs whatever its version.
 */

/** Returns null when the value looks like a site key, otherwise why it does not. */
export function validateRecaptchaSiteKey(value) {
  if (value === undefined || value === null || value === '') {
    return 'NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set';
  }
  // Google keys are URL-safe tokens (40 characters today). This catches pasted quotes, spaces,
  // line breaks and placeholder words such as "undefined", without guessing the exact format.
  if (!/^[A-Za-z0-9_-]{20,}$/.test(value)) {
    return 'NEXT_PUBLIC_RECAPTCHA_SITE_KEY is malformed (expected the site key from the reCAPTCHA admin console, with no quotes or spaces)';
  }
  return null;
}
