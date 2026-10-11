import { getPageDates } from '../../src/data/contentRegistry';
import Link from 'next/link';
import Breadcrumbs from '../../src/components/Breadcrumbs';
import ContentFreshnessBadge from '../../src/components/ContentFreshnessBadge';
import SchemaMarkup from '../../src/components/seo/schema/SchemaMarkup';
import {
  buildWebPageSchema,
  buildBreadcrumbSchema,
  composeSchemaGraph,
  SCHEMA_BASE_URL
} from '../../src/utils/schema/schemaBuilders';

import { buildPageMetadata } from '../../src/utils/seo/metadataBuilders';

export const metadata = buildPageMetadata({
  title: 'Privacy Policy & Data Protection Standards',
  description: 'Privacy Policy of Shrayu Technologies. Learn how we safeguard client codebases, user data, and proprietary intellectual property.',
  path: '/privacy',
  keywords: ['privacy policy', 'data protection', 'client confidentiality', 'software security standards']
});

export default function PrivacyPage() {
  const url = `${SCHEMA_BASE_URL}/privacy`;

  const webPage = buildWebPageSchema({
    ...getPageDates('privacy'),
    title: 'Privacy Policy | Shrayu Technologies',
    description: 'Privacy Policy of Shrayu Technologies. Learn how we safeguard user and client project data.',
    url
  });

  const breadcrumbs = buildBreadcrumbSchema([
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy', href: '/privacy' }
  ]);

  const graph = composeSchemaGraph({
    includeOrganization: true,
    includeWebSite: false,
    webPage,
    breadcrumbs
  });

  return (
    <div className="relative min-h-screen bg-services-atmosphere pt-36 pb-32 px-6 sm:px-8">
      <SchemaMarkup schema={graph} />
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
          <ContentFreshnessBadge pageKey="privacy" />
        </div>

        <div className="glass-card-3d rounded-3xl p-8 sm:p-12 space-y-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-sm leading-relaxed text-app-secondary">
            At Shrayu Technologies, we are committed to safeguarding the privacy and confidentiality of your personal information.
            This Privacy Policy outlines how we collect, store, process, and protect your information when accessing our web services.
          </p>

          <div className="space-y-6 text-sm text-app-secondary">
            <div>
              <h2 className="text-lg font-bold text-app-primary mb-1">1. Information Collection</h2>
              <p>We only collect contact information voluntarily submitted through our inquiry forms or correspondence (such as name, email address, company name, and project briefs).</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-app-primary mb-1">2. Use of Information</h2>
              <p>Submitted information is used exclusively to evaluate technical project proposals, establish communication, and provide requested software development services.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-app-primary mb-1">3. Data Security & Storage</h2>
              <p>We deploy industry-standard encryption, role-based access control, and secure cloud protocols to prevent unauthorized access or disclosure of your data.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-app-primary mb-1">4. Related Policies & Inquiries</h2>
              <p>
                Please also review our{' '}
                <Link href="/terms" className="text-blue-500 hover:underline font-semibold">
                  Terms of Service
                </Link>{' '}
                governing client agreements, or{' '}
                <Link href="/contact" className="text-blue-500 hover:underline font-semibold">
                  contact our data privacy team
                </Link>{' '}
                if you have questions about your personal data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
