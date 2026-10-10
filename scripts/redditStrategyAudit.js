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
assert(Array.isArray(targetSubreddits) && targetSubreddits.length >= 10, `Found ${targetSubreddits?.length} target subreddits (min 10 required)`);

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
assert(Array.isArray(responseTemplates) && responseTemplates.length >= 3, `Found ${responseTemplates?.length} response templates (min 3 required)`);

responseTemplates.forEach(tmpl => {
  const hasDisclosure = tmpl.disclosure && tmpl.disclosure.includes('Shrayu Technologies');
  assert(hasDisclosure, `Template "${tmpl.name}" enforces mandatory transparent disclosure`);
  assert(tmpl.script && tmpl.script.length > 50, `Template "${tmpl.name}" contains substantive technical response script`);
});

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
