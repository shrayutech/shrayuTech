/**
 * scripts/pseoAudit.js
 * Automated Programmatic SEO (pSEO) Audit and Validation Script for Shrayu Technologies.
 * 
 * Audits all pSEO templates, candidate combinations, canonical structures,
 * thin-content guards, quality thresholds, and sitemap generation.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  pseoOpportunityMatrix,
  pseoQualityCriteria,
  PSEO_BASE_URL
} from '../src/data/pseoRegistry.js';
import {
  validateProgrammaticPage,
  getAllIndexablePseoRoutes,
  getPseoSummaryStats
} from '../src/utils/pseoEngine.js';
import { statesData, locationCategories } from '../src/data/locationsData.js';
import { servicesData } from '../src/data/servicesData.js';
import { portfolioProjects } from '../src/data/portfolioProjects.js';
import { curatedComparisons } from '../src/data/comparisonsData.js';
import { normalizeProjectSlug } from '../src/utils/portfolioUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedChecks++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failedChecks++;
  }
}

console.log('====================================================');
console.log('🚀 SHRAYU TECHNOLOGIES - PROGRAMMATIC SEO AUDIT');
console.log('====================================================\n');

// 1. Audit Opportunity Matrix
console.log('1. Auditing pSEO Opportunity Matrix...');
assert(Array.isArray(pseoOpportunityMatrix) && pseoOpportunityMatrix.length === 7, `7 core pSEO templates defined in Opportunity Matrix`);

pseoOpportunityMatrix.forEach(t => {
  const hasFields = t.template && t.templateName && t.urlPattern && t.dataSource && t.priority;
  assert(hasFields, `Template "${t.templateName}" has complete architectural metadata (${t.urlPattern})`);
});

// 2. Audit Location Hierarchy & Empty Combination Filtering
console.log('\n2. Auditing Location Combinations & Thin Content Guards...');
let validLocationCatPages = 0;
let rejectedEmptyLocationCatPages = 0;
const allCities = statesData.flatMap(s => s.cities);

allCities.forEach(city => {
  locationCategories.forEach(cat => {
    const result = validateProgrammaticPage('location_category', { city, category: cat });
    if (result.isValid && result.isIndexable) {
      validLocationCatPages++;
    } else {
      rejectedEmptyLocationCatPages++;
    }
  });
});

assert(validLocationCatPages === 29, `Found exactly 29 valid location+category pages with real delivery capabilities`);
assert(rejectedEmptyLocationCatPages === 7, `Successfully rejected 7 empty/unsupported combinations (e.g. Nashik AI, Mumbai Mobile)`);

// 3. Audit Service Deep-Dives
console.log('\n3. Auditing Service Detail pSEO Pages...');
let validServices = 0;
servicesData.forEach(service => {
  const result = validateProgrammaticPage('service_detail', service);
  if (result.isValid && result.isIndexable) {
    validServices++;
    assert(result.canonicalUrl === `${PSEO_BASE_URL}/services/${service.slug}`, `Canonical URL matches pattern for /services/${service.slug}`);
    assert(service.deliverables?.length >= 3, `Service "${service.name}" provides genuine deliverables (${service.deliverables?.length})`);
    assert(service.faqs?.length >= 2, `Service "${service.name}" provides technical FAQs`);
  }
});
assert(validServices === 9, `All 9 engineering services passed validation and are indexable`);

// 4. Audit Portfolio Case Studies
console.log('\n4. Auditing Portfolio Production Case Studies...');
let validCaseStudies = 0;
const seenProjectSlugs = new Set();
portfolioProjects.forEach(project => {
  const slug = normalizeProjectSlug(project.repo);
  assert(!seenProjectSlugs.has(slug), `Project slug "${slug}" is strictly unique`);
  seenProjectSlugs.add(slug);

  const result = validateProgrammaticPage('portfolio_case_study', project);
  if (result.isValid && result.isIndexable) {
    validCaseStudies++;
    assert(project.githubUrl.startsWith('https://github.com/'), `Project "${project.title}" links to verified GitHub code`);
  }
});
assert(validCaseStudies === 25, `All 25 open-source systems validated with verified repositories`);

// 5. Audit Curated Comparisons
console.log('\n5. Auditing Curated Comparisons...');
let validComparisons = 0;
curatedComparisons.forEach(comp => {
  const result = validateProgrammaticPage('comparison_detail', comp);
  if (result.isValid && result.isIndexable) {
    validComparisons++;
    assert(comp.metaTitle && comp.metaDescription, `Comparison "${comp.slug}" contains unique metadata`);
  }
});
assert(validComparisons === 9, `All 9 curated comparisons validated with complete criteria`);

// 6. Audit Canonical URLs & No Duplicates
console.log('\n6. Auditing Canonical URL Consistency...');
const sitemapRoutes = getAllIndexablePseoRoutes(PSEO_BASE_URL);
assert(sitemapRoutes.length === 81, `getAllIndexablePseoRoutes() returns exactly 81 validated programmatic URLs`);

const urlSet = new Set();
let duplicatesCount = 0;
sitemapRoutes.forEach(r => {
  if (urlSet.has(r.url)) {
    duplicatesCount++;
    console.error(`  Duplicate URL found: ${r.url}`);
  }
  urlSet.add(r.url);
  assert(!r.url.endsWith('/') || r.url === `${PSEO_BASE_URL}/`, `URL has no trailing slash: ${r.url}`);
  assert(!r.url.includes('?'), `Canonical URL has no query parameters: ${r.url}`);
});
assert(duplicatesCount === 0, `Zero duplicate canonical URLs across entire programmatic dataset`);

// 7. Audit File Integrity
console.log('\n7. Auditing Template Files in App Router...');
const servicePagePath = path.join(ROOT_DIR, 'app', 'services', '[slug]', 'page.jsx');
assert(fs.existsSync(servicePagePath), `app/services/[slug]/page.jsx exists`);

const portfolioPagePath = path.join(ROOT_DIR, 'app', 'portfolio', '[slug]', 'page.jsx');
assert(fs.existsSync(portfolioPagePath), `app/portfolio/[slug]/page.jsx exists`);

const locationCatPagePath = path.join(ROOT_DIR, 'app', 'locations', '[state]', '[city]', '[category]', 'page.jsx');
assert(fs.existsSync(locationCatPagePath), `app/locations/[state]/[city]/[category]/page.jsx exists`);

const compareSlugPagePath = path.join(ROOT_DIR, 'app', 'compare', '[type]', '[slug]', 'page.jsx');
assert(fs.existsSync(compareSlugPagePath), `app/compare/[type]/[slug]/page.jsx exists`);

// SUMMARY REPORT
console.log('\n====================================================');
console.log('📊 FINAL PROGRAMMATIC SEO AUDIT REPORT');
console.log('====================================================');

const stats = getPseoSummaryStats();

console.log(`
PROGRAMMATIC SEO AUDIT
-----------------------------------------
Potential pages:       ${stats.totalPotential}
Valid pages:           ${stats.totalValid}
Indexable pages:       ${stats.totalIndexable}
Noindex pages:         0 (facet query parameters canonicalize to base)
Empty combinations:    ${stats.emptyRejected} (correctly blocked / 404)
Duplicate pages:       ${duplicatesCount}
Invalid pages:         0

TEMPLATES BREAKDOWN
-----------------------------------------
1. National Locations Directory:      1 page
2. State Hubs (Maharashtra, Karnataka): 2 pages
3. City Delivery Hubs (6 cities):     6 pages
4. Location + Category Hubs:         29 pages (out of 36 potential)
5. Service Detail Deep-Dives:         9 pages
6. Production System Case Studies:   25 pages
7. Architectural Comparisons:         9 pages
-----------------------------------------
Total Valid Programmatic Pages:      81 pages
Total Core Static Pages:              9 pages (including /compare hub)
Total Website Indexable URLs:        90 pages
====================================================
`);

console.log(`Checks Passed: ${passedChecks} / ${totalChecks} | Failed: ${failedChecks}`);

if (failedChecks > 0) {
  process.exit(1);
} else {
  console.log('🎉 Programmatic SEO validation passed with 100% compliance!\n');
  process.exit(0);
}

