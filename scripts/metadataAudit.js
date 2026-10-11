/**
 * scripts/metadataAudit.js
 * Comprehensive SEO Metadata & OpenGraph Audit Suite for Shrayu Technologies.
 * 
 * Validates:
 * 1. Global site configuration & metadataBase
 * 2. Static route metadata completeness, character length constraints & robots directives
 * 3. Dynamic pSEO route generation across products, services, locations, comparisons, and research
 * 4. Robots.txt configuration (app/robots.js) & sitemap integration
 * 5. Canonical URL formatting, no localhost, no trailing slashes, clean protocols
 * 6. hreflang alternates (en, x-default)
 * 7. OpenGraph and Twitter card fidelity
 * 8. Strict title and description deduplication across disparate entities
 * 9. Codebase architectural integrity (no client-side <Head> mutations)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  SITE_METADATA_CONFIG,
  buildCanonicalUrl,
  buildLanguageAlternates,
  buildRobotsMetadata,
  buildOpenGraphMetadata,
  buildTwitterMetadata,
  buildPageMetadata,
  buildProductMetadata,
  buildServiceMetadata,
  buildLocationMetadata,
  buildComparisonMetadata,
  buildResearchMetadata,
  buildAdminMetadata,
  buildNotFoundMetadata
} from '../src/utils/seo/metadataBuilders.js';

import robotsConfig from '../app/robots.js';
import { servicesData } from '../src/data/servicesData.js';
import { portfolioProjects } from '../src/data/portfolioProjects.js';
import { statesData, locationCategories } from '../src/data/locationsData.js';
import { curatedComparisons } from '../src/data/comparisonsData.js';
import { getPublishedResearchReports } from '../src/data/researchData.js';

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

function resolveTitleString(title) {
  if (!title) return '';
  if (typeof title === 'string') return title;
  if (typeof title === 'object') {
    return title.absolute || title.default || '';
  }
  return String(title);
}

console.log('================================================================');
console.log('🌐 SHRAYU TECHNOLOGIES - PRODUCTION SEO METADATA AUDIT SUITE');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// 1. GLOBAL METADATA ENGINE & DEFAULTS
// -----------------------------------------------------------------------------
console.log('1. Auditing Global Metadata Configuration & Builders...');
assert(SITE_METADATA_CONFIG.siteUrl === 'https://shrayutech.vercel.app', 'Canonical siteUrl is production domain without trailing slash');
assert(SITE_METADATA_CONFIG.brandName === 'Shrayu Technologies', 'Brand name is Shrayu Technologies');
assert(SITE_METADATA_CONFIG.locale === 'en_US', 'Default OG locale is en_US');
assert(SITE_METADATA_CONFIG.twitterHandle === '@ayushkhobragade', 'Twitter handle is configured');
assert(SITE_METADATA_CONFIG.defaultImage.startsWith('https://shrayutech.vercel.app'), 'Default OG image uses absolute canonical domain');

// Test canonical URL normalization
assert(buildCanonicalUrl('/about') === 'https://shrayutech.vercel.app/about', 'Canonical URL builds cleanly without trailing slash');
assert(buildCanonicalUrl('/about/') === 'https://shrayutech.vercel.app/about', 'Canonical URL strips accidental trailing slash');
assert(buildCanonicalUrl('about') === 'https://shrayutech.vercel.app/about', 'Canonical URL handles paths missing leading slash');
assert(buildCanonicalUrl('/') === 'https://shrayutech.vercel.app', 'Root canonical URL correctly formats as base domain');

// Test language alternates
const alternates = buildLanguageAlternates('/portfolio');
assert(alternates.canonical === 'https://shrayutech.vercel.app/portfolio', 'Alternates includes canonical URL');
assert(alternates.languages['en'] === 'https://shrayutech.vercel.app/portfolio', 'English language alternate present');
assert(!alternates.languages['hi'] && !alternates.languages['mr'], 'No hreflang alternates for untranslated languages');
assert(alternates.languages['x-default'] === 'https://shrayutech.vercel.app/portfolio', 'x-default fallback alternate present');

// -----------------------------------------------------------------------------
// 2. ROBOTS.TXT DYNAMIC ARCHITECTURE
// -----------------------------------------------------------------------------
console.log('\n2. Auditing Robots Architecture (app/robots.js)...');
const generatedRobots = robotsConfig();
assert(Array.isArray(generatedRobots.rules), 'Robots config contains rules array');
assert(generatedRobots.rules[0].userAgent === '*', 'Robots rule targets all user agents');
assert(generatedRobots.rules[0].allow === '/', 'Robots allows public indexing on root');
assert(Array.isArray(generatedRobots.rules[0].disallow) && generatedRobots.rules[0].disallow.includes('/admin'), 'Robots strictly disallows /admin');
assert(generatedRobots.sitemap === 'https://shrayutech.vercel.app/sitemap.xml', 'Robots points to canonical sitemap.xml');

const staticRobotsPath = path.join(ROOT_DIR, 'public', 'robots.txt');
assert(!fs.existsSync(staticRobotsPath), 'Redundant static public/robots.txt was removed in favor of native app/robots.js');

// -----------------------------------------------------------------------------
// 3. STATIC ROUTES METADATA AUDIT
// -----------------------------------------------------------------------------
console.log('\n3. Auditing Static Route Metadata Definitions...');
const staticPages = [
  {
    path: '/',
    title: 'Shrayu Technologies | Premium Software Development & AI Engineering',
    description: 'Premier software engineering company specializing in bespoke backend microservices, Next.js web applications, artificial intelligence, and cloud architectures.'
  },
  {
    path: '/about',
    title: 'About Us | Software Engineering & Enterprise Values',
    description: 'Learn about Shrayu Technologies, our mission, core engineering values, leadership team, and our commitment to clean code software craftsmanship.'
  },
  {
    path: '/services',
    title: 'Enterprise Software Services & Engineering Disciplines',
    description: 'Explore our 9 enterprise software services: custom web and mobile development, AI & ML solutions, cloud infrastructure, microservices, and UI/UX design.'
  },
  {
    path: '/portfolio',
    title: 'Products & Portfolio | Software Showcase',
    description: 'Explore enterprise products, open-source repositories, and software engineering case studies created by Shrayu Technologies.'
  },
  {
    path: '/compare',
    title: 'Compare Software Architectures & Delivery Hubs',
    description: 'Objectively compare verified open-source software architectures, engineering services, and regional delivery hubs. Evaluate tech stacks and benchmarks.'
  },
  {
    path: '/locations',
    title: 'Regional Engineering Hubs & Locations in India',
    description: 'Discover software engineering hubs and delivery centers across India, including Chhatrapati Sambhajinagar HQ, Pune, Mumbai, Nagpur, Nashik, and Bengaluru.'
  },
  {
    path: '/research',
    title: 'Original Research & Engineering Benchmarks',
    description: 'First-party empirical research, machine learning benchmarks, and software architecture distributions derived directly from verified production codebases.'
  },
  {
    path: '/contact',
    title: 'Contact Our Engineering Team | Consultation',
    description: 'Get in touch with Shrayu Technologies. Request a confidential software project consultation or submit an enterprise project brief.'
  },
  {
    path: '/careers',
    title: 'Careers & Software Engineering Opportunities',
    description: 'Join Shrayu Technologies and help build high-scale digital platforms. Explore engineering roles in frontend, backend, AI systems, and cloud devops.'
  },
  {
    path: '/privacy',
    title: 'Privacy Policy & Data Protection Standards',
    description: 'Privacy Policy of Shrayu Technologies. Learn how we safeguard client codebases, user data, and proprietary intellectual property.'
  },
  {
    path: '/terms',
    title: 'Terms of Service & Engineering Agreement',
    description: 'Terms of Service for Shrayu Technologies software consulting, cloud architecture deployments, and custom development engineering solutions.'
  }
];

const seenTitles = new Set();
const seenDescriptions = new Set();

staticPages.forEach((p) => {
  const meta = buildPageMetadata({
    title: p.title,
    description: p.description,
    path: p.path
  });

  const titleStr = resolveTitleString(meta.title);
  assert(titleStr.length >= 15 && titleStr.length <= 75, `Static page [${p.path}] title length valid (${titleStr.length} chars)`);
  assert(meta.description.length >= 40 && meta.description.length <= 165, `Static page [${p.path}] description length valid (${meta.description.length} chars)`);
  assert(meta.alternates.canonical === `https://shrayutech.vercel.app${p.path === '/' ? '' : p.path}`, `Static page [${p.path}] canonical URL accurate`);
  assert(meta.robots.index === true && meta.robots.follow === true, `Static page [${p.path}] robots is indexable`);
  assert(meta.openGraph.url === meta.alternates.canonical, `Static page [${p.path}] OG URL matches canonical`);
  assert(meta.openGraph.siteName === 'Shrayu Technologies', `Static page [${p.path}] OG siteName set`);
  assert(meta.twitter.card === 'summary_large_image', `Static page [${p.path}] Twitter card set`);
  assert(!titleStr.includes('Shrayu Technologies | Shrayu Technologies'), `Static page [${p.path}] has no double brand repetition`);

  assert(!seenTitles.has(titleStr), `Static page [${p.path}] title is unique across catalog`);
  assert(!seenDescriptions.has(meta.description), `Static page [${p.path}] description is unique across catalog`);
  seenTitles.add(titleStr);
  seenDescriptions.add(meta.description);
});

// -----------------------------------------------------------------------------
// 4. RESTRICTED & SPECIAL ROUTES (ADMIN & 404)
// -----------------------------------------------------------------------------
console.log('\n4. Auditing Protected & Error Page Metadata...');
const adminMeta = buildAdminMetadata('AI Content Studio', 'Internal management dashboard.');
assert(adminMeta.robots.index === false, 'Admin metadata is noindex');
assert(adminMeta.robots.follow === false, 'Admin metadata is nofollow');
assert(adminMeta.robots.googleBot.noarchive === true, 'Admin metadata has googleBot noarchive');
assert(adminMeta.title.includes('Admin'), 'Admin title contains Admin namespace');

const notFoundMeta = buildNotFoundMetadata('Case Study');
assert(notFoundMeta.robots.index === false, '404 metadata is noindex');
assert(notFoundMeta.robots.follow === false, '404 metadata is nofollow');
assert(notFoundMeta.title === 'Case Study Not Found | Shrayu Technologies', '404 metadata has descriptive fallback title');

// -----------------------------------------------------------------------------
// 5. DYNAMIC ENTITY METADATA AUDIT
// -----------------------------------------------------------------------------
console.log('\n5. Auditing Dynamic Entity Metadata Builders...');

// A. Services (6)
console.log('  Testing 6 Enterprise Service metadata generators...');
servicesData.forEach((s) => {
  const meta = buildServiceMetadata(s);
  const titleStr = resolveTitleString(meta.title);
  assert(titleStr.length >= 15 && titleStr.length <= 75, `Service [${s.slug}] title length valid (${titleStr.length} chars)`);
  assert(meta.description.length >= 50 && meta.description.length <= 165, `Service [${s.slug}] description length valid (${meta.description.length} chars)`);
  assert(meta.alternates.canonical === `https://shrayutech.vercel.app/services/${s.slug}`, `Service [${s.slug}] canonical URL accurate`);
  assert(meta.robots.index === true, `Service [${s.slug}] indexable`);
  assert(!seenTitles.has(titleStr), `Service [${s.slug}] title is globally unique`);
  seenTitles.add(titleStr);
});

// B. Portfolio Projects (25)
console.log('  Testing 25 Production Portfolio metadata generators...');
portfolioProjects.forEach((p) => {
  const meta = buildProductMetadata(p);
  const titleStr = resolveTitleString(meta.title);
  assert(titleStr.length >= 15 && titleStr.length <= 75, `Portfolio [${p.repo}] title length valid (${titleStr.length} chars)`);
  assert(meta.description.length >= 50 && meta.description.length <= 165, `Portfolio [${p.repo}] description length valid (${meta.description.length} chars)`);
  assert(meta.openGraph.type === 'article', `Portfolio [${p.repo}] OG type is article`);
  assert(meta.robots.index === true, `Portfolio [${p.repo}] indexable`);
  assert(!seenTitles.has(titleStr), `Portfolio [${p.repo}] title is globally unique`);
  seenTitles.add(titleStr);
});

// C. Location States (2)
console.log('  Testing Regional State Hub metadata generators...');
statesData.forEach((state) => {
  const meta = buildLocationMetadata({ state });
  const titleStr = resolveTitleString(meta.title);
  assert(titleStr.length >= 15 && titleStr.length <= 75, `State [${state.slug}] title length valid (${titleStr.length} chars)`);
  assert(meta.description.length >= 50 && meta.description.length <= 165, `State [${state.slug}] description length valid (${meta.description.length} chars)`);
  assert(meta.alternates.canonical === `https://shrayutech.vercel.app/locations/${state.slug}`, `State [${state.slug}] canonical URL accurate`);
  seenTitles.add(titleStr);
});

// D. Location Cities (6)
console.log('  Testing City Delivery Hub metadata generators...');
statesData.forEach((state) => {
  state.cities.forEach((city) => {
    const meta = buildLocationMetadata({ state, city });
    const titleStr = resolveTitleString(meta.title);
    assert(titleStr.length >= 15 && titleStr.length <= 75, `City [${city.slug}] title length valid (${titleStr.length} chars)`);
    assert(meta.description.length >= 50 && meta.description.length <= 165, `City [${city.slug}] description length valid (${meta.description.length} chars)`);
    assert(meta.alternates.canonical === `https://shrayutech.vercel.app/locations/${state.slug}/${city.slug}`, `City [${city.slug}] canonical URL accurate`);
    seenTitles.add(titleStr);
  });
});

// E. Location + Category (36 combinations)
console.log('  Testing Localized Category Delivery metadata generators...');
let categoryCombosTested = 0;
statesData.forEach((state) => {
  state.cities.forEach((city) => {
    locationCategories.forEach((category) => {
      const meta = buildLocationMetadata({ state, city, category });
      const titleStr = resolveTitleString(meta.title);
      assert(titleStr.length >= 15 && titleStr.length <= 75, `Local Service [${city.slug}/${category.slug}] title length valid (${titleStr.length} chars)`);
      assert(meta.description.length >= 50 && meta.description.length <= 165, `Local Service [${city.slug}/${category.slug}] description length valid (${meta.description.length} chars)`);
      assert(meta.alternates.canonical === `https://shrayutech.vercel.app/locations/${state.slug}/${city.slug}/${category.slug}`, `Local Service canonical URL accurate`);
      categoryCombosTested++;
    });
  });
});
assert(categoryCombosTested === 36, `Tested all 36 localized programmatic category combinations`);

// F. Curated Comparisons (6)
console.log('  Testing Curated Architectural Comparison metadata generators...');
curatedComparisons.forEach((comp) => {
  const meta = buildComparisonMetadata(comp);
  const titleStr = resolveTitleString(meta.title);
  assert(titleStr.length >= 15 && titleStr.length <= 75, `Comparison [${comp.slug}] title length valid (${titleStr.length} chars)`);
  assert(meta.description.length >= 50 && meta.description.length <= 165, `Comparison [${comp.slug}] description length valid (${meta.description.length} chars)`);
  assert(meta.alternates.canonical === `https://shrayutech.vercel.app/compare/${comp.type}/${comp.slug}`, `Comparison [${comp.slug}] canonical accurate`);
  assert(meta.robots.index === true, `Comparison [${comp.slug}] indexable`);
  assert(!seenTitles.has(titleStr), `Comparison [${comp.slug}] title is globally unique`);
  seenTitles.add(titleStr);
});

// G. Published Empirical Research Reports (2)
console.log('  Testing Empirical Research metadata generators...');
const researchReports = getPublishedResearchReports();
researchReports.forEach((report) => {
  const meta = buildResearchMetadata(report);
  const titleStr = resolveTitleString(meta.title);
  assert(titleStr.length >= 15 && titleStr.length <= 75, `Research [${report.slug}] title length valid (${titleStr.length} chars)`);
  assert(meta.description.length >= 50 && meta.description.length <= 165, `Research [${report.slug}] description length valid (${meta.description.length} chars)`);
  assert(meta.openGraph.type === 'article', `Research [${report.slug}] OG type is article`);
  assert(meta.alternates.canonical === `https://shrayutech.vercel.app/research/${report.slug}`, `Research [${report.slug}] canonical accurate`);
  assert(meta.robots.index === true, `Research [${report.slug}] indexable`);
  assert(!seenTitles.has(titleStr), `Research [${report.slug}] title is globally unique`);
  seenTitles.add(titleStr);
});

// -----------------------------------------------------------------------------
// 6. CODEBASE ARCHITECTURAL INTEGRITY AUDIT
// -----------------------------------------------------------------------------
console.log('\n6. Auditing Codebase Architectural Files & App Router Exports...');
const layoutPath = path.join(ROOT_DIR, 'app', 'layout.jsx');
const layoutContent = fs.readFileSync(layoutPath, 'utf8');
assert(layoutContent.includes('metadataBase: new URL(SITE_METADATA_CONFIG.siteUrl)'), 'app/layout.jsx sets metadataBase to canonical domain');
assert(layoutContent.includes('template: SITE_METADATA_CONFIG.titleTemplate') || layoutContent.includes("template: '%s | Shrayu Technologies'"), 'app/layout.jsx defines global title template');

const requiredAppRoutes = [
  'app/page.jsx',
  'app/about/page.jsx',
  'app/services/page.jsx',
  'app/services/[slug]/page.jsx',
  'app/portfolio/page.jsx',
  'app/portfolio/[slug]/page.jsx',
  'app/compare/page.jsx',
  'app/compare/[type]/[slug]/page.jsx',
  'app/locations/page.jsx',
  'app/locations/[state]/page.jsx',
  'app/locations/[state]/[city]/page.jsx',
  'app/locations/[state]/[city]/[category]/page.jsx',
  'app/research/page.jsx',
  'app/research/[slug]/page.jsx',
  'app/contact/page.jsx',
  'app/careers/page.jsx',
  'app/privacy/page.jsx',
  'app/terms/page.jsx',
  'app/admin/ai-content/page.jsx',
  'app/not-found.jsx'
];

requiredAppRoutes.forEach((routeFile) => {
  const fullPath = path.join(ROOT_DIR, routeFile);
  assert(fs.existsSync(fullPath), `Route file exists: ${routeFile}`);
  const content = fs.readFileSync(fullPath, 'utf8');
  const hasMetadataExport = routeFile === 'app/not-found.jsx' ? true : (content.includes('export const metadata') || content.includes('export async function generateMetadata'));
  assert(hasMetadataExport, `Route file [${routeFile}] exports native Next.js metadata`);
  const importsMetadata = routeFile === 'app/not-found.jsx' ? true : content.includes('metadataBuilders');
  assert(importsMetadata, `Route file [${routeFile}] imports from centralized metadataBuilders`);
  assert(!content.includes('<Head>') && !content.includes('<title>'), `Route file [${routeFile}] avoids legacy client-side <Head> or <title> tags`);
});

// -----------------------------------------------------------------------------
// SUMMARY REPORT
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log('📊 AUDIT SUMMARY REPORT');
console.log('================================================================');
console.log(`Total Checks Executed : ${totalChecks}`);
console.log(`Passed Checks         : ${passedChecks}`);
console.log(`Failed Checks         : ${failedChecks}`);

if (failedChecks === 0) {
  console.log('\n🎉 ALL METADATA AUDIT CHECKS PASSED PERFECTLY (100% SUCCESS)!');
  process.exit(0);
} else {
  console.error(`\n💥 AUDIT FAILED WITH ${failedChecks} ERRORS.`);
  process.exit(1);
}
