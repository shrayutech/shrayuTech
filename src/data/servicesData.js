/**
 * servicesData.js
 * Authoritative engineering services data model for Shrayu Technologies.
 * Backs both the main /services catalog and programmatic /services/[slug] deep-dives.
 */

export const servicesData = [
  {
    slug: 'custom-software',
    name: 'Custom Software Development',
    shortName: 'Custom Software',
    tagline: 'Enterprise Core Logic & Distributed Architectures',
    overview: 'We architect and build bespoke software backends, core logic engines, and distributed microservices tailored to organizational operational requirements. Built for strict data tenancy, sub-50ms query throughput, and zero-compromise scalability.',
    category: 'Engineering & Backend',
    iconName: 'Code',
    techStack: ['Node.js', 'NestJS', 'Go', 'Python', 'PostgreSQL', 'Redis', 'Docker'],
    features: [
      'Microservices Architecture & gRPC Communication',
      'Dedicated Tenancy & Single-Tenant Schema Isolation',
      'Automated End-to-End Testing & Load Benchmarking',
      'Legacy Monolith Deconstruction & Database Migration'
    ],
    deliverables: [
      'Complete Production Source Code with Git Version Control',
      'OpenAPI / Swagger API Documentation',
      'Database Schema Migration Scripts & Seed Data',
      'Containerized Docker Compose & Kubernetes Manifests',
      'Architecture Decision Records (ADRs)'
    ],
    faqs: [
      {
        question: 'When should a business choose custom software over off-the-shelf SaaS?',
        answer: 'Custom software is recommended when your core business workflow provides your competitive edge, when standard SaaS seat licensing becomes cost-prohibitive at scale, or when strict regulatory compliance (RBI, HIPAA, GDPR) demands full control over data tenancy.'
      },
      {
        question: 'How do you ensure maintainability and low technical debt?',
        answer: 'We enforce clean architecture boundaries, strict TypeScript/Python static typing, automated CI pipelines with >80% test coverage, and comprehensive API documentation.'
      }
    ],
    portfolioCategory: 'Python',
    relatedComparisonSlug: 'custom-software-vs-saas-development',
    supportedHubCities: ['chhatrapati-sambhajinagar']
  },
  {
    slug: 'web-development',
    name: 'Web Application Development',
    shortName: 'Web Development',
    tagline: 'High-Performance Next.js & React Web Platforms',
    overview: 'We build responsive, SEO-optimized, and accessible web portals leveraging Next.js App Router, React 19, and Tailwind CSS. Every web application is engineered for sub-second Core Web Vitals, server-side rendering, and frictionless user flows.',
    category: 'Frontend & Full-Stack',
    iconName: 'Globe',
    techStack: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'REST', 'Vercel'],
    features: [
      'Server-Side Rendering (SSR) & Static Site Generation (SSG)',
      'Sub-Second First Contentful Paint & Core Web Vitals Optimization',
      'Dynamic Metadata, Open Graph, and Structured Data Schemas',
      'Accessible UI Components Complying with WCAG 2.1 AA Standards'
    ],
    deliverables: [
      'Production-Ready Next.js Application Codebase',
      'Fully Responsive Cross-Browser UI Design Tokens',
      'Sitemap, Robots.txt, and Dynamic Open Graph Route Handlers',
      'Lighthouse 95+ Performance Audit Verification'
    ],
    faqs: [
      {
        question: 'Why build with Next.js App Router instead of standard React SPA?',
        answer: 'Next.js App Router combines React Server Components (RSC) for zero-bundle-size rendering, built-in SEO metadata management, and hybrid static/dynamic generation, delivering 3x faster page loads and significantly superior search engine indexability.'
      },
      {
        question: 'Can you migrate existing Create React App (CRA) or Vite projects to Next.js?',
        answer: 'Yes. We specialize in seamless React-to-Next.js migrations, preserving 100% of existing business logic, component styling, and state management while unlocking SSR, SSG, and App Router capabilities.'
      }
    ],
    portfolioCategory: 'Full-Stack Development',
    relatedComparisonSlug: 'web-development-vs-mobile-apps',
    supportedHubCities: ['chhatrapati-sambhajinagar']
  },
  {
    slug: 'mobile-apps',
    name: 'Mobile App Development',
    shortName: 'Mobile Apps',
    tagline: 'Native iOS & Android Experiences with Offline Sync',
    overview: 'We engineer fluid, resilient cross-platform and native mobile applications using Flutter, React Native, and native SDKs. Our mobile applications feature offline-first data stores, biometric security, and responsive touch gestures.',
    category: 'Mobile Engineering',
    iconName: 'Smartphone',
    techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'SQLite', 'Firebase', 'WatermelonDB'],
    features: [
      'Offline-First Data Storage & Background Synchronization',
      'Biometric Authentication (FaceID / Fingerprint) & Keychain Security',
      'Push Notification Pipelines with Deep-Linking Handlers',
      'Hardware Sensors Integration (GPS, Camera, Bluetooth, Accelerometer)'
    ],
    deliverables: [
      'Production iOS (IPA) and Android (AAB) Build Artifacts',
      'App Store and Google Play Store Submission Verification',
      'Automated Fastlane Deployment Scripts',
      'End-to-End Mobile Testing Suites (Maestro / Detox)'
    ],
    faqs: [
      {
        question: 'Should we build with Flutter, React Native, or separate native apps?',
        answer: 'For 90% of business applications, modern cross-platform frameworks (Flutter or React Native) reduce development time and cost by ~45% while delivering 60 FPS native performance and unified business logic.'
      },
      {
        question: 'How do you handle offline mode when network drops?',
        answer: 'We implement local SQLite or reactive WatermelonDB stores that capture user actions locally and synchronize with the cloud via transactional conflict-resolution queues once connectivity is restored.'
      }
    ],
    portfolioCategory: 'Full-Stack Development',
    relatedComparisonSlug: 'web-development-vs-mobile-apps',
    supportedHubCities: ['chhatrapati-sambhajinagar']
  },
  {
    slug: 'ai-solutions',
    name: 'AI & Machine Learning Solutions',
    shortName: 'AI Solutions',
    tagline: 'Cognitive Pipelines, LLMs & Computer Vision',
    overview: 'We design and deploy real-world artificial intelligence models, computer vision inference pipelines, LLM retrieval-augmented generation (RAG) workflows, and predictive telemetry models engineered to run at scale without excessive compute overhead.',
    category: 'Artificial Intelligence',
    iconName: 'Cpu',
    techStack: ['Python', 'PyTorch', 'TensorFlow', 'YOLOv8', 'FastAPI', 'LangChain', 'ChromaDB', 'OpenCV'],
    features: [
      'Retrieval-Augmented Generation (RAG) with Semantic Vector Embeddings',
      'Edge Computer Vision & Real-Time YOLO Bounding-Box Detection',
      'Multi-Horizon Predictive Forecasting (Energy Demand, Retail Inventory)',
      'Network Telemetry Anomaly Detection & SOC Intrusion Classification'
    ],
    deliverables: [
      'Trained Model Weights (.pt, .onnx) with Benchmark Metrics',
      'FastAPI Microservice Inference Server with WebSocket Streaming',
      'Data Preprocessing & Validation Pipelines',
      'Model Performance & Confusion Matrix Evaluation Report'
    ],
    faqs: [
      {
        question: 'Can your AI solutions run on local infrastructure without costly cloud GPU instances?',
        answer: 'Yes. We specialize in quantized models (ONNX runtime, MobileNet, YOLOv8-nano) that execute high-accuracy inference on standard CPU servers or low-power edge gateways without recurring cloud GPU expenses.'
      },
      {
        question: 'How do you prevent hallucinations in enterprise LLM implementations?',
        answer: 'We employ strict RAG architectures with hybrid dense/sparse vector search, source citation enforcement, contextual guardrails, and validation prompt pipelines.'
      }
    ],
    portfolioCategory: 'AI',
    relatedComparisonSlug: 'ai-solutions-vs-traditional-automation',
    supportedHubCities: ['chhatrapati-sambhajinagar']
  },
  {
    slug: 'cloud-infrastructure',
    name: 'Cloud Infrastructure & Architecture',
    shortName: 'Cloud Infrastructure',
    tagline: 'High-Availability Multi-Cloud & Auto-Scaling Clusters',
    overview: 'We architect and provision resilient cloud topologies across AWS, Azure, and Google Cloud Platform. From Infrastructure-as-Code (Terraform) to Kubernetes cluster management, we ensure zero-downtime availability and multi-region disaster recovery.',
    category: 'Cloud & Infrastructure',
    iconName: 'Cloud',
    techStack: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Helm', 'Nginx'],
    features: [
      'Infrastructure as Code (Terraform) with GitOps Workflows',
      'Multi-Availability Zone Auto-Scaling Groups & Load Balancers',
      'Geo-Redundant Disaster Recovery & Automated Snapshot Policies',
      'Cloud Spend Audit & Resource Cost Optimization (FinOps)'
    ],
    deliverables: [
      'Modular Terraform Infrastructure Codebase',
      'Production Kubernetes Cluster Specs & Ingress Controllers',
      'Automated CloudWatch / Datadog Monitoring & Alert Thresholds',
      'SOC2 / ISO 27001 Security Hardening Configuration'
    ],
    faqs: [
      {
        question: 'How do you minimize monthly cloud hosting bills?',
        answer: 'We perform automated resource rightsizing, implement spot instance autoscaling, set up database serverless pausing, eliminate unattached storage volumes, and configure CloudFront edge caching, typically saving clients 30–50% on monthly spend.'
      },
      {
        question: 'What is your disaster recovery SLA?',
        answer: 'We engineer multi-region database replication with Recovery Point Objective (RPO) < 5 minutes and automated failover Recovery Time Objective (RTO) < 15 minutes.'
      }
    ],
    portfolioCategory: 'Python',
    relatedComparisonSlug: 'custom-software-vs-saas-development',
    supportedHubCities: ['chhatrapati-sambhajinagar']
  },
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design & Frontend Systems',
    shortName: 'UI/UX Design',
    tagline: 'Intuitive Interfaces, Design Tokens & Component Libraries',
    overview: 'We craft human-centered user experiences, cohesive design systems, and clickable high-fidelity prototypes. Our designs bridge aesthetics with engineering rigor, translating seamlessly into production-ready React and Tailwind components.',
    category: 'Design & Experience',
    iconName: 'Palette',
    techStack: ['Figma', 'Storybook', 'Tailwind CSS', 'Framer Motion', 'Radix UI', 'Tokens Studio'],
    features: [
      'Comprehensive Design Systems with Harmonized Tokens (Color, Typography, Spacing)',
      'Clickable Interactive Prototypes for User Testing & Stakeholder Alignment',
      'WCAG 2.1 AA Accessibility Validation & High-Contrast Support',
      'Component Storybook Documentation Ready for Frontend Hand-Off'
    ],
    deliverables: [
      'Master Figma File with Components, Variants, and Auto-Layout',
      'Exported Design Token System (JSON / CSS Variables)',
      'Interactive User Journey Flowcharts & Wireframes',
      'Accessibility Audit & Usability Testing Report'
    ],
    faqs: [
      {
        question: 'How do your designers collaborate with our engineering team?',
        answer: 'Our designers speak code: we organize Figma layers using standard flexbox auto-layout, maintain 1:1 token parity with Tailwind CSS, and provide Storybook components to ensure zero translation loss during development.'
      },
      {
        question: 'Do you conduct user testing during the design phase?',
        answer: 'Yes. We build clickable Figma prototypes and conduct moderated usability testing with target users to validate task completion rates before writing a single line of production code.'
      }
    ],
    portfolioCategory: 'Full-Stack Development',
    relatedComparisonSlug: 'web-development-vs-mobile-apps',
    supportedHubCities: ['chhatrapati-sambhajinagar']
  },
  {
    slug: 'api-development',
    name: 'API Development & Integration',
    shortName: 'API Development',
    tagline: 'Ultra-Fast REST, GraphQL & WebSocket Middleware',
    overview: 'We build robust, self-documenting API gateways and data exchange layers. Featuring token authentication, rate limiting, distributed caching, and WebSocket streams, our APIs connect enterprise databases with web and mobile clients seamlessly.',
    category: 'Engineering & Backend',
    iconName: 'Network',
    techStack: ['NestJS', 'FastAPI', 'GraphQL', 'Express.js', 'Redis', 'Postman', 'Swagger', 'gRPC'],
    features: [
      'Role-Based JWT & OAuth2 Authentication with Refresh Token Rotation',
      'Granular Rate Limiting & Denial-of-Service (DoS) Throttling',
      'Real-Time WebSocket & Server-Sent Events (SSE) Channels',
      'Self-Documenting OpenAPI 3.0 / Swagger Interfaces'
    ],
    deliverables: [
      'Production API Microservice with Unit & Integration Tests',
      'Interactive Swagger / Postman Collection with Environment Variables',
      'Redis Caching & Invalidation Layer',
      'API Security Audit & Penetration Test Report'
    ],
    faqs: [
      {
        question: 'Should our architecture use REST, GraphQL, or gRPC?',
        answer: 'We recommend REST with OpenAPI for public third-party APIs, GraphQL for dynamic client-side mobile/web dashboards requiring customized payloads, and gRPC for high-throughput internal microservice-to-microservice communication.'
      },
      {
        question: 'How do you secure APIs against unauthorized access and scraping?',
        answer: 'We employ cryptographically signed JWTs, IP-based rate limiting via Redis token bucket algorithms, CORS domain whitelisting, input schema validation, and SQL/NoSQL sanitization middleware.'
      }
    ],
    portfolioCategory: 'Python',
    relatedComparisonSlug: 'custom-software-vs-saas-development',
    supportedHubCities: ['chhatrapati-sambhajinagar']
  },
  {
    slug: 'saas-development',
    name: 'SaaS Platform Engineering',
    shortName: 'SaaS Development',
    tagline: 'Multi-Tenant Architectures & Subscription Engines',
    overview: 'We engineer end-to-end B2B and B2C software-as-a-service platforms. From multi-tenant schema isolation to automated Stripe subscription billing, seat management, and activity audit logging, we deliver scalable digital products.',
    category: 'Product Engineering',
    iconName: 'Layers',
    techStack: ['Next.js', 'PostgreSQL', 'Stripe', 'Supabase', 'Clerk', 'Tailwind CSS', 'Prisma'],
    features: [
      'Multi-Tenant Schema Isolation (Row-Level Security & Schema Separation)',
      'Automated Recurring Billing, Invoicing & Proration via Stripe Billing',
      'Granular Organization Team Workspaces & Role-Based Permissions (RBAC)',
      'Real-Time Analytics Dashboards & Compliance Audit Trails'
    ],
    deliverables: [
      'Complete Multi-Tenant SaaS Codebase with Authentication & Billing',
      'Customer Portal with Self-Service Plan Upgrades & Invoices',
      'Admin Super-User Portal for Tenant Lifecycle Management',
      'Stripe Webhook Handlers with Idempotency Guarantees'
    ],
    faqs: [
      {
        question: 'How do you ensure data security between different SaaS tenants?',
        answer: 'We enforce PostgreSQL Row-Level Security (RLS) or separate database schemas, ensuring that tenant queries are cryptographically and logically isolated at the database engine level.'
      },
      {
        question: 'How do you handle Stripe subscription edge cases like failed payments or downgrades?',
        answer: 'We implement idempotent webhook listeners that handle payment failures, grace periods, automated email notifications, and instant plan prorations without administrative intervention.'
      }
    ],
    portfolioCategory: 'Full-Stack Development',
    relatedComparisonSlug: 'custom-software-vs-saas-development',
    supportedHubCities: ['chhatrapati-sambhajinagar']
  },
  {
    slug: 'devops-ci-cd',
    name: 'DevOps & Continuous Delivery',
    shortName: 'DevOps & CI/CD',
    tagline: 'Automated Build Pipelines, Monitoring & Zero-Downtime Releases',
    overview: 'We establish modern continuous integration and delivery (CI/CD) pipelines, real-time observability stacks, and container registries that allow engineering teams to ship verified code to production multiple times a day with zero downtime.',
    category: 'Cloud & Infrastructure',
    iconName: 'Settings',
    techStack: ['GitHub Actions', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'ArgoCD', 'Sentry'],
    features: [
      'Automated GitHub Actions Testing, Linting & Build Verification',
      'Blue/Green & Canary Zero-Downtime Production Deployment Strategies',
      'Centralized Log Aggregation (ELK / Loki) & Performance Metrics (Grafana)',
      'Automated Vulnerability Scanning (Trivy / Snyk) in CI Pipelines'
    ],
    deliverables: [
      'Modular GitHub Actions Workflow Definitions (.github/workflows)',
      'Production Dockerfiles Optimized for Multi-Stage Builds',
      'Grafana Dashboard Configuration for Server Health & Latency',
      'Sentry Error Tracking & Real-Time Slack/Email Alert Handlers'
    ],
    faqs: [
      {
        question: 'Can CI/CD pipelines prevent broken code from hitting production?',
        answer: 'Yes. Our pipelines enforce branch protection rules where code cannot be merged without passing automated unit tests, end-to-end integration tests, TypeScript compilation, and security vulnerability scans.'
      },
      {
        question: 'What is Blue/Green deployment and how does it prevent downtime?',
        answer: 'Blue/Green deployment runs two identical production environments. The new version is deployed to idle environment "Green", verified via health checks, and traffic is switched instantaneously via load balancer, ensuring 0 seconds of user downtime.'
      }
    ],
    portfolioCategory: 'Python',
    relatedComparisonSlug: 'custom-software-vs-saas-development',
    supportedHubCities: ['chhatrapati-sambhajinagar']
  }
];

/**
 * Retrieves a service by its canonical slug or alias.
 */
export function getServiceBySlug(slug) {
  if (!slug || typeof slug !== 'string') return null;
  const clean = slug.trim().toLowerCase();

  // Alias lookups
  if (clean === 'cloud-devops') {
    return servicesData.find(s => s.slug === 'cloud-infrastructure') || null;
  }

  return servicesData.find(s => s.slug === clean) || null;
}

/**
 * Returns all valid service slugs.
 */
export function getAllServiceSlugs() {
  return servicesData.map(s => s.slug);
}

export const defaultServiceFAQs = [
  {
    q: 'What is Shrayu Technologies’ engagement model and pricing structure?',
    a: 'We offer two transparent models: Fixed-Scope Milestones (ideal for well-defined MVPs and greenfield architectures) and Dedicated Sprint Pods (ideal for ongoing product scaling and continuous integration). Every engagement begins with a complimentary technical discovery call and clear statement of work.'
  },
  {
    q: 'How is code ownership and intellectual property (IP) handled?',
    a: 'You retain 100% intellectual property ownership from day one. Upon deliverable completion and milestone sign-off, all codebases, Docker recipes, database schemas, CI/CD scripts, and production keys are transferred directly into your company’s private repositories.'
  },
  {
    q: 'Can you refactor, audit, or scale an existing legacy application?',
    a: 'Yes. A substantial portion of our consulting involves legacy modernization—auditing slow monoliths, migrating legacy databases to PostgreSQL/Redis, containerizing workflows with Docker, and refactoring frontends into high-speed Next.js SSR architectures.'
  },
  {
    q: 'What is the typical development timeline for an MVP or enterprise feature?',
    a: 'Production MVPs are typically delivered within 4 to 8 weeks through agile two-week sprint cycles. We deploy to live staging environments after every sprint so stakeholders can test and provide feedback in real time.'
  },
  {
    q: 'What post-launch support and infrastructure monitoring do you provide?',
    a: 'We provide SLA-backed maintenance packages including 24/7 cloud uptime monitoring, proactive security patches, PostgreSQL automated backup verification, and edge latency optimization across AWS and modern cloud providers.'
  }
];

