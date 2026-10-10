# Shrayu Technologies — Enterprise Software & Engineering Platform

> High-throughput software engineering, artificial intelligence systems, cloud architectures, and programmatic delivery corridors.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.2.0-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.0-blue?logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4.2-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Audit Compliance](https://img.shields.io/badge/Audit%20Suites-1228%2F1228%20Passed-success)](#verification--audit-suites)
[![Static Pages](https://img.shields.io/badge/Static%20Prerender-101%2F101%20Pages-brightgreen)](#production-build)

---

## 🌟 Overview

**Shrayu Technologies** is an enterprise-grade web application and software showcase platform built with Next.js 15 (App Router) and React 19. Headquartered in Maharashtra with delivery corridors across Western and Southern India, the platform features:

- **25 Verified Production Codebases**: Interactive case studies, architectural specifications, algorithmic benchmarks, and Git telemetry.
- **Enterprise Service Practices**: 9 technical service offerings spanning custom full-stack development, generative AI systems, high-throughput cloud APIs, and automated DevOps.
- **Hierarchical Regional Delivery Hubs**: State, city, and 36 localized category landing pages with localized Schema.org metadata and geocoded delivery pods.
- **Head-to-Head Comparison Engine**: Curated technical comparison matrices evaluating software architectures, frameworks, and deployment corridors.
- **First-Party Empirical Research**: Reproducible data-driven studies computed directly from production repositories, CI/CD pipelines, and delivery hubs (with sample size gating and zero fabrication).
- **AI Content Governance & Editorial Workflow**: Human-in-the-loop content review studio with hallucination defenses, prompt injection protection, token accounting, and strict admin noindex shields.
- **Centralized SEO & OpenGraph Engine**: Native Next.js App Router metadata with canonical URL normalization, multilingual hreflang alternates, and dynamic robots directives.

---

## 🏗️ Architecture & Tech Stack

- **Framework**: [Next.js 15.2.0](https://nextjs.org/) (App Router, Server-Side Prerendering, Static Site Generation)
- **UI Library**: [React 19.2.0](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion 13](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Structured Data**: JSON-LD Schema.org graph (`Organization`, `WebSite`, `WebPage`, `SoftwareApplication`, `Service`, `LocalBusiness`, `TechArticle`, `Dataset`, `FAQPage`, `BreadcrumbList`, `ItemList`)
- **Metadata**: Centralized engine at `src/utils/seo/metadataBuilders.js` with native Next.js `metadata` & `generateMetadata`

---

## 📁 Repository Structure

```text
├── app/                              # Next.js 15 App Router pages & layouts
│   ├── layout.jsx                    # Root layout with metadataBase & global title template
│   ├── page.jsx                      # Homepage with rich Schema graph & hero
│   ├── about/                        # About Us & leadership
│   ├── services/                     # Service catalog & [slug] practice details
│   ├── portfolio/                    # Showcase & [slug] production repositories
│   ├── locations/                    # National, [state], [city], and [category] delivery hubs
│   ├── compare/                      # Comparison hub & [type]/[slug] decision matrices
│   ├── research/                     # First-party empirical research & [slug] papers
│   ├── admin/ai-content/             # AI content governance & review console (noindex)
│   ├── contact/                      # Contact & consultation brief
│   ├── careers/                      # Engineering careers & roles
│   ├── privacy/                      # Privacy policy & data handling
│   ├── terms/                        # Terms of service & IP agreements
│   ├── robots.js                     # Dynamic robots.txt builder
│   ├── sitemap.js                    # Dynamic sitemap.xml generator (100+ URLs)
│   └── not-found.jsx                 # Custom 404 page
├── src/
│   ├── components/                   # Reusable UI, SEO, location, & research components
│   ├── data/                         # Verified datasets (portfolio, services, locations, comparisons, research)
│   ├── utils/                        # SEO builders, Schema graphs, research calculators, AI governance
│   └── views/                        # Core page view templates
├── docs/                             # Architecture blueprints, strategy docs, and checklists
└── scripts/                          # Automated audit test suites
    ├── metadataAudit.js              # 591 checks: SEO metadata, canonicals, robots, OpenGraph
    ├── pseoAudit.js                  # 267 checks: Programmatic SEO routing & link integrity
    ├── schemaAudit.js                # 256 checks: Schema.org JSON-LD syntax & graph integrity
    ├── researchAudit.js              # 81 checks: First-party research reproducibility & gating
    └── aiContentAudit.js             # 33 checks: AI safety, hallucination guards & review states
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or `v22.x` / `v24.x`
- **npm**: `v10.x` or higher

### Installation

```bash
# Clone repository
git clone https://github.com/shrayutech/shrayuTech.git
cd shrayuTech

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=https://shrayutech.vercel.app
NEXT_PUBLIC_API_URL=https://shrayutechbackend.onrender.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key-here
```

### Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & Audit Suites

The codebase includes 5 automated audit suites validating 1,228 distinct quality, SEO, and safety assertions:

```bash
# Run SEO Metadata & OpenGraph Audit (591 checks)
npm run audit:metadata

# Run Programmatic SEO & Routing Integrity Audit (267 checks)
npm run seo:audit

# Run Schema.org Structured Data Audit (256 checks)
npm run schema:audit

# Run First-Party Research Methodology Audit (81 checks)
npm run audit:research

# Run AI Content Safety & Governance Audit (33 checks)
npm run audit:ai-content
```

---

## 📦 Production Build

```bash
# Build optimized static production bundle
npm run build

# Start local production server
npm start
```

Static generation outputs **101/101 prerendered pages** across all static routes, dynamic programmatic categories, comparisons, and research papers.

---

## 📄 License & Attribution

- Platform source code is licensed under the [MIT License](LICENSE).
- Empirical research datasets and benchmark figures are licensed under the [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) license.
