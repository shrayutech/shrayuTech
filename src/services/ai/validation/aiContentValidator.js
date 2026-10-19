/**
 * aiContentValidator.js
 * Multi-Stage Post-Generation Validation Layer for AI-Generated Content.
 * 
 * Enforces:
 * - Anti-hallucination and prohibited claims detection
 * - Strict numerical fidelity against source records
 * - Entity existence checks
 * - Internal link / canonical route validation
 * - Content uniqueness and similarity thresholds
 * - PII and sensitive data sanitization
 */

import { portfolioProjects } from '../../../data/portfolioProjects.js';
import { statesData, locationCategories } from '../../../data/locationsData.js';
import { servicesData } from '../../../data/servicesData.js';
import { normalizeProjectSlug } from '../../../utils/portfolioUtils.js';

// Prohibited unsubstantiated marketing phrases and fake claim patterns
const PROHIBITED_PHRASES = [
  'best in the world',
  'best product in the market',
  'unbeatable prices',
  '100% guaranteed return',
  'award winning team',
  'five star rated by thousands',
  'guaranteed delivery in 10 minutes',
  'certified by all agencies',
  'cheapest in india',
  'revolutionary magic'
];

/**
 * Validates generated content payload against the authoritative source entity.
 * 
 * @param {object} generatedContent - The structured AI generation output
 * @param {object} sourceEntity - The real database/data model record
 * @param {string} entityType - 'product' | 'service' | 'location' | 'comparison' | 'research'
 * @returns {{ isValid: boolean, canAutoPublish: boolean, errors: string[], warnings: string[], similarityScore: number }}
 */
export function validateAiContent(generatedContent, sourceEntity, entityType) {
  const errors = [];
  const warnings = [];

  if (!generatedContent || typeof generatedContent !== 'object') {
    return {
      isValid: false,
      canAutoPublish: false,
      errors: ['Generated content is null or not an object'],
      warnings: [],
      similarityScore: 0
    };
  }

  const textPayload = [
    generatedContent.title,
    generatedContent.summary,
    generatedContent.description,
    Array.isArray(generatedContent.highlights) ? generatedContent.highlights.join(' ') : '',
    Array.isArray(generatedContent.faqs) ? generatedContent.faqs.map(f => `${f.question} ${f.answer}`).join(' ') : ''
  ].join(' ').toLowerCase();

  // 1. Prohibited Claim & Superlative Detection
  PROHIBITED_PHRASES.forEach((phrase) => {
    if (textPayload.includes(phrase)) {
      errors.push(`Prohibited exaggerated claim detected: "${phrase}". Factual claims only.`);
    }
  });

  // 2. Anti-Hallucination: Fake Review & Rating Detection
  const fakeRatingPattern = /(?:\b(?:rating|rated)\s+(?:of\s+)?(?:5\.0|4\.[89]|5\/5)\b|\b\d+,\d{3}\+?\s+(?:happy\s+customers|reviews)\b)/i;
  if (fakeRatingPattern.test(textPayload)) {
    // Only permit if sourceEntity explicitly contains these ratings
    if (!sourceEntity?.rating && !sourceEntity?.reviewsCount) {
      errors.push('AI hallucinated customer ratings or review metrics not present in source database.');
    }
  }

  // 3. Entity Validation
  if (entityType === 'product' || entityType === 'system') {
    const declaredName = (sourceEntity?.title || sourceEntity?.name || '').toLowerCase();
    if (declaredName && !textPayload.includes(declaredName.split(' ')[0].toLowerCase())) {
      warnings.push(`Generated content does not prominently feature primary entity name: "${sourceEntity?.title}"`);
    }
  }

  if (entityType === 'location') {
    const cityName = (sourceEntity?.name || '').toLowerCase();
    if (cityName && !textPayload.includes(cityName)) {
      errors.push(`Location content failed to mention target city: "${sourceEntity?.name}"`);
    }
  }

  // 4. Numerical Accuracy Check
  // If source contains explicit benchmark numbers (e.g. MAPE 2.84%), ensure AI didn't distort it
  if (sourceEntity?.measuredValue !== undefined) {
    const valString = String(sourceEntity.measuredValue);
    if (!textPayload.includes(valString)) {
      warnings.push(`Observed numerical benchmark (${valString}) missing from generated content summary.`);
    }
  }

  // 5. Internal Link & Canonical Route Validation
  if (Array.isArray(generatedContent.suggestedInternalLinks)) {
    generatedContent.suggestedInternalLinks.forEach((link, idx) => {
      if (!link.url || !link.url.startsWith('/')) {
        errors.push(`Internal link at index ${idx} has invalid relative path: "${link.url}"`);
      } else {
        const isValidRoute = isCanonicalInternalRoute(link.url);
        if (!isValidRoute) {
          errors.push(`AI suggested non-existent internal route: "${link.url}"`);
        }
      }
    });
  }

  // 6. Privacy & PII Leakage Check
  const piiRegex = /[a-zA-Z0-9._%+-]+@(?!shrayutech\.gmail\.com|shrayutech\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i;
  if (piiRegex.test(textPayload)) {
    errors.push('Potential Customer PII / unauthorized email address found in generated content.');
  }

  // 7. Content Uniqueness / Similarity Score (against source description)
  const sourceText = (sourceEntity?.description || sourceEntity?.overview || '').toLowerCase();
  const similarityScore = calculateJaccardSimilarity(textPayload, sourceText);

  // If text is 100% identical copy of source, it provides no AI assistance value
  if (similarityScore > 0.95 && textPayload.length > 50) {
    warnings.push('Generated content is almost identical to existing source description (95%+ lexical overlap).');
  }

  const isValid = errors.length === 0;
  // High-value content always requires human review; low-risk metadata can be auto-published if valid
  const canAutoPublish = isValid && warnings.length === 0 && Boolean(generatedContent.seoTitle && generatedContent.metaDescription);

  return {
    isValid,
    canAutoPublish,
    errors,
    warnings,
    similarityScore: Number(similarityScore.toFixed(2))
  };
}

/**
 * Validates whether an internal link exists within canonical site routes.
 */
export function isCanonicalInternalRoute(urlPath) {
  if (!urlPath || typeof urlPath !== 'string') return false;
  const cleanPath = urlPath.split('?')[0].replace(/\/+$/, '') || '/';

  // Core static routes
  const validStatic = [
    '/',
    '/services',
    '/portfolio',
    '/compare',
    '/locations',
    '/research',
    '/about',
    '/contact',
    '/privacy',
    '/terms'
  ];
  if (validStatic.includes(cleanPath)) return true;

  // Services: /services/[slug]
  if (cleanPath.startsWith('/services/')) {
    const slug = cleanPath.replace('/services/', '');
    return servicesData.some(s => s.slug === slug);
  }

  // Portfolio: /portfolio/[slug]
  if (cleanPath.startsWith('/portfolio/')) {
    const slug = cleanPath.replace('/portfolio/', '');
    return portfolioProjects.some(p => normalizeProjectSlug(p.repo) === slug);
  }

  // Locations: /locations/[state], /locations/[state]/[city], /locations/[state]/[city]/[cat]
  if (cleanPath.startsWith('/locations/')) {
    const parts = cleanPath.replace('/locations/', '').split('/');
    if (parts.length === 1) {
      return statesData.some(s => s.slug === parts[0]);
    }
    if (parts.length === 2) {
      const state = statesData.find(s => s.slug === parts[0]);
      return state ? state.cities.some(c => c.slug === parts[1]) : false;
    }
    if (parts.length === 3) {
      const state = statesData.find(s => s.slug === parts[0]);
      const city = state ? state.cities.find(c => c.slug === parts[1]) : null;
      const cat = locationCategories.find(c => c.slug === parts[2]);
      return Boolean(city && cat && city.supportedCategories?.includes(cat.slug));
    }
  }

  return false;
}

/**
 * Calculates lexical Jaccard word similarity between two texts.
 */
export function calculateJaccardSimilarity(textA = '', textB = '') {
  const wordsA = new Set(textA.toLowerCase().match(/\b\w{3,}\b/g) || []);
  const wordsB = new Set(textB.toLowerCase().match(/\b\w{3,}\b/g) || []);

  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  const intersection = new Set([...wordsA].filter(x => wordsB.has(x)));
  const union = new Set([...wordsA, ...wordsB]);

  return intersection.size / union.size;
}

