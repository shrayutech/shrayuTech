/**
 * locationsData.js
 * Authoritative location hierarchy and regional service engineering hubs for Shrayu Technologies.
 * 
 * Hierarchy:
 * Country (India)
 *   ↓
 * State (e.g., Maharashtra, Karnataka)
 *   ↓
 * City / Hub (e.g., Chhatrapati Sambhajinagar, Pune, Mumbai, Nagpur, Nashik, Bengaluru)
 *   ↓
 * Category (e.g., custom-software, web-development, mobile-apps, ai-solutions, cloud-devops, saas-development)
 */

export const locationCategories = [
  {
    slug: 'custom-software',
    name: 'Custom Software Development',
    shortName: 'Custom Software',
    tagline: 'Enterprise Core Logic & Distributed Architectures',
    description: 'High-performance backend systems, microservices, and bespoke software engines built for scale.',
    portfolioCategory: 'Python',
    iconName: 'Code',
    keyFeatures: [
      'Microservices Architecture',
      'High-Throughput Concurrency',
      'Database Schema Optimization',
      'API Contract Design & gRPC'
    ]
  },
  {
    slug: 'web-development',
    name: 'Web Application Development',
    shortName: 'Web Development',
    tagline: 'Modern Responsive Web Portals & Enterprise Platforms',
    description: 'Next.js, React, and modern TypeScript web platforms optimized for sub-second load times and SEO.',
    portfolioCategory: 'Full-Stack Development',
    iconName: 'Globe',
    keyFeatures: [
      'Server-Side Rendering (SSR)',
      'Sub-Second Core Web Vitals',
      'Enterprise CMS & Portals',
      'Progressive Web Apps (PWAs)'
    ]
  },
  {
    slug: 'mobile-apps',
    name: 'Mobile App Development',
    shortName: 'Mobile Apps',
    tagline: 'Native iOS & Android Applications with Offline Sync',
    description: 'Cross-platform mobile apps engineered with Flutter, React Native, and Swift for seamless handheld experiences.',
    portfolioCategory: 'Full-Stack Development',
    iconName: 'Smartphone',
    keyFeatures: [
      'Cross-Platform Codebases',
      'Offline-First Data Syncing',
      'Biometric & Hardware Security',
      'Push Notification Pipelines'
    ]
  },
  {
    slug: 'ai-solutions',
    name: 'AI & Machine Learning Solutions',
    shortName: 'AI Solutions',
    tagline: 'LLM Orchestration, Autonomous Models & Predictive Analytics',
    description: 'Enterprise AI agents, NLP classification, and predictive models seamlessly integrated into operational software.',
    portfolioCategory: 'AI',
    iconName: 'Cpu',
    keyFeatures: [
      'LLM & RAG Vector Pipelines',
      'Anomaly & Threat Detection',
      'Predictive Demand Forecasting',
      'Autonomous Algorithmic Planners'
    ]
  },
  {
    slug: 'cloud-devops',
    name: 'Cloud Infrastructure & DevOps',
    shortName: 'Cloud & DevOps',
    tagline: 'Auto-Scaling Clusters, CI/CD & Multi-Region Cloud',
    description: 'Resilient AWS, Azure, and GCP architectures with automated container pipelines and zero-downtime releases.',
    portfolioCategory: 'Python',
    iconName: 'Cloud',
    keyFeatures: [
      'Infrastructure as Code (Terraform)',
      'Docker & Kubernetes Clusters',
      'Zero-Downtime CI/CD Pipelines',
      'Geo-Redundant Disaster Recovery'
    ]
  },
  {
    slug: 'saas-development',
    name: 'SaaS Platform Engineering',
    shortName: 'SaaS Development',
    tagline: 'Multi-Tenant Architectures & Subscription Portals',
    description: 'Complete multi-tenant software platforms featuring tiered billing, Stripe integration, and tenant data isolation.',
    portfolioCategory: 'Full-Stack Development',
    iconName: 'Layers',
    keyFeatures: [
      'Multi-Tenant Schema Isolation',
      'Automated Billing & Invoicing',
      'Role-Based Access Control (RBAC)',
      'Real-Time Telemetry & Dashboards'
    ]
  }
];

export const statesData = [
  {
    slug: 'maharashtra',
    name: 'Maharashtra',
    stateCode: 'MH',
    country: 'India',
    countryCode: 'IN',
    capital: 'Mumbai',
    region: 'Western India',
    metaTitle: 'Software Engineering & IT Delivery Hubs in Maharashtra | Shrayu Technologies',
    metaDescription: 'Explore Shrayu Technologies software development hubs across Maharashtra, anchored by our Chhatrapati Sambhajinagar headquarters.',
    overview: 'Maharashtra is India’s foremost industrial, financial, and technological powerhouse. Shrayu Technologies is proudly headquartered in Maharashtra, delivering enterprise custom software, AI integration, and cloud architectures to startups and established institutions throughout the state and globally.',
    highlights: [
      'Global Headquarters & Core R&D Lab in Chhatrapati Sambhajinagar',
      'Distributed engineering delivery covering Western and Central Maharashtra',
      'Full-stack engineering teams available for hybrid and on-site technical workshops'
    ],
    cities: [
      {
        slug: 'chhatrapati-sambhajinagar',
        name: 'Chhatrapati Sambhajinagar',
        altNames: ['Aurangabad', 'Sambhajinagar'],
        district: 'Chhatrapati Sambhajinagar',
        stateSlug: 'maharashtra',
        stateName: 'Maharashtra',
        country: 'India',
        postalCode: '431001',
        isHeadquarters: true,
        hubRole: 'Global Headquarters & Core R&D Engineering Lab',
        coordinates: {
          lat: 19.8762,
          lng: 75.3433
        },
        address: 'Chhatrapati Sambhajinagar, Maharashtra 431001, India',
        phone: '+91 70200 41614',
        secondaryPhone: '+91 93595 14760',
        email: 'contact@shrayutech.com',
        businessHours: 'Mon - Fri: 9:00 AM - 7:00 PM IST',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120074.65487779774!2d75.24430485908954!3d19.865964893706013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb9815a369bc7f%3A0x7104e3f63300445d!2sChhatrapati%20Sambhajinagar%20(Aurangabad)%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
        keyLocalities: [
          'CIDCO IT & Commercial Zone',
          'Waluj Industrial MIDC',
          'Shendra DMIC Smart City',
          'Chikalthana Industrial Area',
          'Kranti Chowk Business District'
        ],
        overview: 'Chhatrapati Sambhajinagar houses the primary headquarters, founding leadership, and foundational software engineering laboratory of Shrayu Technologies. From this central engineering hub, our team architects custom software systems, develops autonomous AI algorithms, and manages cloud operations for international and domestic clients.',
        localEcosystem: 'As an emerging smart city under the Delhi-Mumbai Industrial Corridor (AURIC), Chhatrapati Sambhajinagar is transforming into an engineering and advanced technology anchor for Maharashtra.',
        supportedCategories: [
          'custom-software',
          'web-development',
          'mobile-apps',
          'ai-solutions',
          'cloud-devops',
          'saas-development'
        ],
        nearbyCities: []
      }
    ]
  }
];

