/**
 * redditReferralTracker.js
 * Privacy-first Reddit referral detection and session utility for Shrayu Technologies.
 * 
 * Complies with strict privacy guidelines:
 * - Uses ephemeral sessionStorage only (cleared when browser session ends).
 * - Zero third-party cookies or personally identifiable information (PII).
 * - Preserves clean canonical URLs and does not interfere with page indexing or hydration.
 */

const STORAGE_KEY = 'shrayu_reddit_referral';
const DISMISSED_KEY = 'shrayu_reddit_banner_dismissed';

/**
 * Checks if the current visitor arrived via Reddit (either through HTTP referrer or UTM parameters).
 * Safe to invoke in both SSR and client environments.
 * @returns {boolean}
 */
export function checkRedditReferral() {
  if (typeof window === 'undefined') return false;

  try {
    // 1. Check if already marked in active session
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) {
      const parsed = JSON.parse(existing);
      return Boolean(parsed?.isRedditReferral);
    }

    // 2. Inspect document.referrer
    const referrer = document.referrer?.toLowerCase() || '';
    const isRedditReferrer = referrer.includes('reddit.com') || referrer.includes('redd.it');

    // 3. Inspect URL query parameters (UTM tags)
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source')?.toLowerCase() || '';
    const utmMedium = urlParams.get('utm_medium')?.toLowerCase() || '';
    const isRedditUtm = utmSource === 'reddit' || utmMedium === 'reddit';

    if (isRedditReferrer || isRedditUtm) {
      const sessionData = {
        isRedditReferral: true,
        detectedAt: new Date().toISOString(),
        landingPath: window.location.pathname,
        referrerSource: isRedditReferrer ? 'http_referrer' : 'utm_source',
        campaign: urlParams.get('utm_campaign') || null,
        subredditTag: urlParams.get('r') || null
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      return true;
    }

    return false;
  } catch (err) {
    console.debug('[RedditTracker] Session check failed:', err);
    return false;
  }
}

/**
 * Retrieves the stored Reddit session data, if any.
 * @returns {object|null}
 */
export function getRedditSessionData() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Dismisses the welcoming banner for the current session.
 */
export function dismissRedditBanner() {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(DISMISSED_KEY, 'true');
  } catch {
    // Ignore storage errors
  }
}

/**
 * Checks if the user has dismissed the welcoming banner.
 * @returns {boolean}
 */
export function isRedditBannerDismissed() {
  if (typeof window === 'undefined') return true;
  try {
    return sessionStorage.getItem(DISMISSED_KEY) === 'true';
  } catch {
    return true;
  }
}

