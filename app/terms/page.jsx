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
  title: 'Terms of Service & Engineering Agreement',
  description: 'Terms of Service for Shrayu Technologies software consulting, cloud architecture deployments, and custom development engineering solutions.',
  path: '/terms',
  keywords: ['terms of service', 'engineering contracts', 'software consulting terms', 'development agreement']
});

export default function TermsPage() {
  const url = `${SCHEMA_BASE_URL}/terms`;

  const webPage = buildWebPageSchema({
    ...getPageDates('terms'),
    title: 'Terms of Service | Shrayu Technologies',
    description: 'Terms of Service for Shrayu Technologies software consulting and engineering solutions.',
    url
  });

  const breadcrumbs = buildBreadcrumbSchema([
    { label: 'Home', href: '/' },
    { label: 'Terms of Service', href: '/terms' }
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
          <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
          <ContentFreshnessBadge pageKey="terms" />
        </div>

        <div className="glass-card-3d rounded-3xl p-8 sm:p-12 space-y-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Terms of Service</h1>
          <p className="text-sm leading-relaxed text-app-secondary">
            Welcome to Shrayu Technologies. By accessing or using our websites, software products, or engineering consulting services, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <div className="space-y-6 text-sm text-app-secondary">
            <div>
              <h2 className="text-lg font-bold text-app-primary mb-1">1. Intellectual Property</h2>
              <p>All intellectual property rights associated with custom software deliverables are governed by explicit client statements of work and service contracts.</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-app-primary mb-1">2. Service Scope & Engagements</h2>
              <p>
                Project milestones, technical architectures, and deliverables are specified in project proposals. Review our{' '}
                <Link href="/services" className="text-blue-500 hover:underline font-semibold">
                  technical service catalog
                </Link>{' '}
                to understand our development scopes.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-app-primary mb-1">3. Privacy & Data Handling</h2>
              <p>
                Our collection and processing of client information is detailed in our{' '}
                <Link href="/privacy" className="text-blue-500 hover:underline font-semibold">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-app-primary mb-1">4. Contact & Legal Inquiries</h2>
              <p>
                For questions regarding contracts, licensing, or terms of service, please reach out via our{' '}
                <Link href="/contact" className="text-blue-500 hover:underline font-semibold">
                  official contact channel
                </Link>{' '}
                or email us directly at <span className="font-mono text-blue-400">contact@shrayutech.com</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
