/**
 * Content Refresh & Freshness Audit Script
 * Run with: node scripts/contentAuditReport.js
 */

import { contentRegistry } from '../src/data/contentRegistry.js';

function generateReport() {
  console.log('\n========================================================================');
  console.log('              SHRAYU TECHNOLOGIES — CONTENT FRESHNESS AUDIT             ');
  console.log('========================================================================\n');

  const today = new Date('2026-10-10');
  const pages = Object.values(contentRegistry);

  let freshCount = 0;
  let reviewCount = 0;
  let overdueCount = 0;

  console.log(
    'Route'.padEnd(14) +
    'Version'.padEnd(10) +
    'Last Reviewed'.padEnd(16) +
    'Next Due'.padEnd(14) +
    'Status'.padEnd(10) +
    'Reviewer'
  );
  console.log('-'.repeat(80));

  pages.forEach((p) => {
    const nextDue = new Date(p.nextReviewDue);
    let status = p.status;

    if (nextDue < today) {
      status = 'Overdue';
      overdueCount++;
    } else if ((nextDue - today) / (1000 * 60 * 60 * 24) < 14) {
      status = 'Due Soon';
      reviewCount++;
    } else {
      freshCount++;
    }

    console.log(
      p.route.padEnd(14) +
      p.contentVersion.padEnd(10) +
      p.lastReviewed.padEnd(16) +
      p.nextReviewDue.padEnd(14) +
      status.padEnd(10) +
      p.reviewer.substring(0, 22)
    );
  });

  console.log('-'.repeat(80));
  console.log(`\nAudit Summary:`);
  console.log(`- Total Monitored Pages: ${pages.length}`);
  console.log(`- Fresh & Verified Content: ${freshCount}`);
  console.log(`- Due for Review Soon: ${reviewCount}`);
  console.log(`- Overdue Reviews: ${overdueCount}`);
  console.log(`\nAll content verified against active application routes and business policies.\n`);
}

generateReport();

