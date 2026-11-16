/**
 * scripts/redditStrategyAudit.js
 * Automated validation test for Shrayu Technologies Reddit SEO & Community Engagement Architecture.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  targetSubreddits,
  linkWorthyResources,
  responseTemplates,
  fourWeekCalendar,
  ethicalPrinciples
} from '../src/data/redditStrategyData.js';

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
console.log('🤖 Shrayu Technologies - Reddit Strategy Audit');
console.log('====================================================\n');

// 1. Audit Target Subreddits
console.log('1. Auditing Target Subreddits...');
// Minimums match the current strategy data, so an accidentally dropped entry fails the audit.
assert(Array.isArray(targetSubreddits) && targetSubreddits.length >= 8, `Found ${targetSubreddits?.length} target subreddits (min 8 required)`);

targetSubreddits.forEach(sub => {
  const hasFields = sub.name && sub.subscribers && sub.topic && sub.audience && sub.postingRestrictions && sub.selfPromotionRules && Array.isArray(sub.opportunityTriggers);
  assert(hasFields, `Subreddit ${sub.name} contains complete compliance specifications`);
});

// 2. Audit Link-Worthy Resources
console.log('\n2. Auditing Link-Worthy Resources...');
assert(Array.isArray(linkWorthyResources) && linkWorthyResources.length >= 3, `Found ${linkWorthyResources?.length} link-worthy resources (min 3 required)`);

linkWorthyResources.forEach(res => {
  const hasDetails = res.title && res.url && (res.valueProposition || res.rationale);
  assert(hasDetails, `Resource "${res.title}" has complete metadata and URL (${res.url})`);
});

// 3. Audit Response Templates
console.log('\n3. Auditing Response Templates & Transparency...');
assert(Array.isArray(responseTemplates) && responseTemplates.length >= 2, `Found ${responseTemplates?.length} response templates (min 2 required)`);

responseTemplates.forEach(tmpl => {
  const hasDisclosure = tmpl.disclosure && tmpl.disclosure.includes('Shrayu Technologies');
  assert(hasDisclosure, `Template "${tmpl.name}" enforces mandatory transparent disclosure`);
  assert(tmpl.script && tmpl.script.length > 50, `Template "${tmpl.name}" contains substantive technical response script`);
  assert(tmpl.script.includes(tmpl.disclosure), `Template "${tmpl.name}" includes its disclosure in the reply itself`);
  assert(!/https?:\/\//.test(tmpl.script), `Template "${tmpl.name}" has no link in the default reply`);
  assert(tmpl.status === 'approved_manual_post_only', `Template "${tmpl.name}" is approved for manual posting only`);
});

const pathPlanning = responseTemplates.find((t) => t.id === 'tpl_open_source_reference');
assert(pathPlanning?.linkIfAsked === null && !JSON.stringify(pathPlanning).includes('github.com'), 'Path planning reply has no GitHub link until ownership is verified');
const buildVsBuy = responseTemplates.find((t) => t.id === 'tpl_architecture_tradeoff');
assert(/Never in r\/startups/.test(buildVsBuy?.linkPolicy || ''), 'Build vs buy comparison link stays out of r/startups');

// Reddit content stays out of the website
const walkSource = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walkSource(path.join(dir, e.name)) : [path.join(dir, e.name)]));
const importers = ['app', 'src'].flatMap((d) => walkSource(d)).filter((f) => /\.(js|jsx)$/.test(f) && !f.endsWith('redditStrategyData.js') && fs.readFileSync(f, 'utf8').includes('redditStrategyData'));
assert(importers.length === 0, `No website file imports the Reddit data (${importers.join(', ') || 'none'})`);

// 4. Audit 4-Week Calendar
console.log('\n4. Auditing 4-Week Engagement Calendar...');
assert(Array.isArray(fourWeekCalendar) && fourWeekCalendar.length === 4, `4-week calendar defined with 4 sequential weeks`);
fourWeekCalendar.forEach(week => {
  assert(week.weekNumber && week.theme && Array.isArray(week.actions) && week.actions.length >= 3, `Week ${week.weekNumber} (${week.theme}) has structured activities`);
});

// 5. Audit Ethical Principles
console.log('\n5. Auditing Ethical Anti-Spam Principles...');
assert(ethicalPrinciples.zeroBotsAllowed === true, 'Strict zero-bots policy declared');
assert(ethicalPrinciples.zeroSpamPolicy === true, 'Strict zero-spam policy declared');
assert(ethicalPrinciples.voteManipulationForbidden === true, 'Vote manipulation strictly forbidden');
assert(ethicalPrinciples.communityValueRatio === '9:1', '9:1 value-to-mention ratio enforced');

// 6. Audit Files and Components
console.log('\n6. Auditing File Integration & Components...');
const trackerPath = path.join(ROOT_DIR, 'src', 'utils', 'redditReferralTracker.js');
assert(fs.existsSync(trackerPath), 'src/utils/redditReferralTracker.js exists');

const bannerPath = path.join(ROOT_DIR, 'src', 'components', 'analytics', 'RedditReferralBanner.jsx');
assert(fs.existsSync(bannerPath), 'src/components/analytics/RedditReferralBanner.jsx exists');

const clientProvidersPath = path.join(ROOT_DIR, 'src', 'components', 'ClientProviders.jsx');
const clientProvidersContent = fs.readFileSync(clientProvidersPath, 'utf8');
assert(clientProvidersContent.includes('RedditReferralBanner'), 'RedditReferralBanner is mounted in ClientProviders.jsx');

const playbookPath = path.join(ROOT_DIR, 'docs', 'REDDIT_SEO_PLAYBOOK.md');
assert(fs.existsSync(playbookPath), 'docs/REDDIT_SEO_PLAYBOOK.md exists');
const playbookContent = fs.readFileSync(playbookPath, 'utf8');
assert(playbookContent.length > 2000, `Playbook contains detailed documentation (${playbookContent.length} chars)`);

console.log('\n====================================================');
console.log(`Audit Summary: Total Checks: ${totalChecks} | Passed: ${passedChecks} | Failed: ${failedChecks}`);
console.log('====================================================');

if (failedChecks > 0) {
  process.exit(1);
} else {
  console.log('🎉 Reddit SEO Strategy validation passed with 100% compliance!\n');
  process.exit(0);
}
