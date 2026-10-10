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
    metaDescription: 'Explore Shrayu Technologies software development hubs across Maharashtra, including our Chhatrapati Sambhajinagar HQ, Pune, Mumbai, Nagpur, and Nashik.',
    overview: 'Maharashtra is India’s foremost industrial, financial, and technological powerhouse. Shrayu Technologies is proudly headquartered in Maharashtra, delivering enterprise custom software, AI integration, and cloud architectures to startups and established institutions throughout the state and globally.',
    highlights: [
      'Global Headquarters & Core R&D Lab in Chhatrapati Sambhajinagar',
      'Active enterprise software client partnerships across Mumbai and Pune',
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
        email: 'shrayutech@gmail.com',
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
        nearbyCities: ['pune', 'nashik', 'mumbai', 'nagpur']
      },
      {
        slug: 'pune',
        name: 'Pune',
        altNames: ['Poona'],
        district: 'Pune',
        stateSlug: 'maharashtra',
        stateName: 'Maharashtra',
        country: 'India',
        postalCode: '411057',
        isHeadquarters: false,
        hubRole: 'Enterprise IT, FinTech & SaaS Delivery Corridor',
        coordinates: {
          lat: 18.5204,
          lng: 73.8567
        },
        address: 'Hinjawadi IT Corridor & Kharadi Tech Belt, Pune, Maharashtra 411057, India',
        phone: '+91 70200 41614',
        secondaryPhone: '+91 93595 14760',
        email: 'shrayutech@gmail.com',
        businessHours: 'Mon - Fri: 9:00 AM - 7:00 PM IST',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04368819827!2d73.7929272304859!3d18.52461645803273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d3d3431!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
        keyLocalities: [
          'Hinjawadi Rajiv Gandhi Infotech Park (Phases 1-3)',
          'Kharadi EON Free Zone & World Trade Centre',
          'Magarpatta Cybercity',
          'Baner & Balewadi Tech Belt',
          'Viman Nagar & Yerwada'
        ],
        overview: 'Pune is Maharashtra’s premier technology and academic hub. Shrayu Technologies provides Pune startups, SaaS companies, and enterprise engineering departments with agile development sprints, dedicated microservices engineering, and Next.js portal refactoring.',
        localEcosystem: 'Known as the Oxford of the East and home to leading automotive and SaaS giants, Pune offers a fertile ecosystem for modern technology development and high-throughput application engineering.',
        supportedCategories: [
          'custom-software',
          'web-development',
          'mobile-apps',
          'ai-solutions',
          'cloud-devops',
          'saas-development'
        ],
        nearbyCities: ['mumbai', 'chhatrapati-sambhajinagar', 'nashik']
      },
      {
        slug: 'mumbai',
        name: 'Mumbai',
        altNames: ['Bombay'],
        district: 'Mumbai Suburban',
        stateSlug: 'maharashtra',
        stateName: 'Maharashtra',
        country: 'India',
        postalCode: '400051',
        isHeadquarters: false,
        hubRole: 'Financial Technology & Enterprise Cloud Engineering Hub',
        coordinates: {
          lat: 19.0760,
          lng: 72.8777
        },
        address: 'Bandra Kurla Complex (BKC) & Andheri MIDC, Mumbai, Maharashtra 400051, India',
        phone: '+91 70200 41614',
        secondaryPhone: '+91 93595 14760',
        email: 'shrayutech@gmail.com',
        businessHours: 'Mon - Fri: 9:00 AM - 7:00 PM IST',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709653!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
        keyLocalities: [
          'Bandra Kurla Complex (BKC)',
          'Andheri East MIDC & SEEPZ',
          'Lower Parel Business District',
          'Powai Hiranandani Tech Cluster',
          'Navi Mumbai Millennium Business Park'
        ],
        overview: 'Mumbai is the commercial and financial capital of India. Shrayu Technologies delivers mission-critical software solutions, secure API gateways, and cloud migration frameworks to financial institutions, media enterprises, and rapid-growth venture startups across the Mumbai metropolitan region.',
        localEcosystem: 'With headquarters of major banking, fintech, and multinational corporate players, Mumbai demands uncompromising software reliability, bank-grade encryption, and low-latency infrastructure.',
        supportedCategories: [
          'custom-software',
          'web-development',
          'ai-solutions',
          'cloud-devops',
          'saas-development'
        ],
        nearbyCities: ['pune', 'nashik', 'chhatrapati-sambhajinagar']
      },
      {
        slug: 'nagpur',
        name: 'Nagpur',
        altNames: [],
        district: 'Nagpur',
        stateSlug: 'maharashtra',
        stateName: 'Maharashtra',
        country: 'India',
        postalCode: '441108',
        isHeadquarters: false,
        hubRole: 'Central India Logistics & Data Science Operations Hub',
        coordinates: {
          lat: 21.1458,
          lng: 79.0882
        },
        address: 'MIHAN SEZ Information Technology Park, Nagpur, Maharashtra 441108, India',
        phone: '+91 70200 41614',
        secondaryPhone: '+91 93595 14760',
        email: 'shrayutech@gmail.com',
        businessHours: 'Mon - Fri: 9:00 AM - 7:00 PM IST',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.21639149454!2d79.00247039572221!3d21.161028702334865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06d0bb3e2b!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
        keyLocalities: [
          'MIHAN Multi-modal International Cargo Hub & IT SEZ',
          'Parsodi Information Technology Park',
          'Civil Lines Commercial Area',
          'Ramdaspeth Business District'
        ],
        overview: 'Nagpur is the geographic heart of India and a pivotal logistics hub. Shrayu Technologies serves Central Maharashtra organizations with predictive data science pipelines, logistics tracking software, and robust web applications.',
        localEcosystem: 'The MIHAN project and expanding educational infrastructure have positioned Nagpur as an emerging high-tech corridor for software engineering and data analytics.',
        supportedCategories: [
          'custom-software',
          'web-development',
          'ai-solutions',
          'cloud-devops'
        ],
        nearbyCities: ['chhatrapati-sambhajinagar', 'pune']
      },
      {
        slug: 'nashik',
        name: 'Nashik',
        altNames: ['Nasik'],
        district: 'Nashik',
        stateSlug: 'maharashtra',
        stateName: 'Maharashtra',
        country: 'India',
        postalCode: '422007',
        isHeadquarters: false,
        hubRole: 'Industrial Automation & Agile Web Engineering Hub',
        coordinates: {
          lat: 19.9975,
          lng: 73.7898
        },
        address: 'Ambad MIDC & Gangapur Road Tech Corridor, Nashik, Maharashtra 422007, India',
        phone: '+91 70200 41614',
        secondaryPhone: '+91 93595 14760',
        email: 'shrayutech@gmail.com',
        businessHours: 'Mon - Fri: 9:00 AM - 7:00 PM IST',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119981.26410406835!2d73.72107873830232!3d19.99111059437149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb2c37e584f1%3A0xc3af87c4cf338870!2sNashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
        keyLocalities: [
          'Ambad Industrial MIDC',
          'Satpur Industrial Area',
          'Gangapur Road Business Belt',
          'College Road Commercial Zone'
        ],
        overview: 'Nashik bridges Northern Maharashtra’s industrial manufacturing prowess with modern digital commerce. Shrayu Technologies assists regional manufacturers and merchants with bespoke ERP logic, responsive web storefronts, and cross-platform mobile tools.',
        localEcosystem: 'Renowned for automotive manufacturing, defense manufacturing, and agriculture tech, Nashik provides high demand for operational automation and mobile software solutions.',
        supportedCategories: [
          'custom-software',
          'web-development',
          'mobile-apps'
        ],
        nearbyCities: ['chhatrapati-sambhajinagar', 'mumbai', 'pune']
      }
    ]
  },
  {
    slug: 'karnataka',
    name: 'Karnataka',
    stateCode: 'KA',
    country: 'India',
    countryCode: 'IN',
    capital: 'Bengaluru',
    region: 'Southern India',
    metaTitle: 'Software Engineering & AI Delivery Hub in Karnataka | Shrayu Technologies',
    metaDescription: 'Explore Shrayu Technologies software development and AI engineering partnerships across Karnataka, anchored by our Bengaluru Innovation Hub.',
    overview: 'Karnataka is universally recognized as the Silicon Valley of India. Shrayu Technologies delivers advanced artificial intelligence integrations, Next.js web applications, and multi-cloud infrastructure consulting to high-growth venture scale-ups and tech firms in Karnataka.',
    highlights: [
      'Strategic AI and Microservices delivery hub in Bengaluru',
      'Direct technical architecture consulting for startup venture teams',
      'Specialized engineering in LLM orchestration, Next.js App Router, and Cloud DevOps',
      'Seamless remote-first agile sprint cadences aligned with Indian standard time'
    ],
    cities: [
      {
        slug: 'bengaluru',
        name: 'Bengaluru',
        altNames: ['Bangalore'],
        district: 'Bengaluru Urban',
        stateSlug: 'karnataka',
        stateName: 'Karnataka',
        country: 'India',
        postalCode: '560100',
        isHeadquarters: false,
        hubRole: 'Strategic AI Innovation & Venture Scale Hub',
        coordinates: {
          lat: 12.9716,
          lng: 77.5946
        },
        address: 'Outer Ring Road Tech Corridor & Koramangala, Bengaluru, Karnataka 560100, India',
        phone: '+91 70200 41614',
        secondaryPhone: '+91 93595 14760',
        email: 'shrayutech@gmail.com',
        businessHours: 'Mon - Fri: 9:00 AM - 7:00 PM IST',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.8865390924!2d77.49085449767355!3d12.953959988118835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
        keyLocalities: [
          'Electronic City IT Clusters (Phases 1-2)',
          'Outer Ring Road (ORR) Tech Belt',
          'Whitefield International Tech Park (ITPB)',
          'Koramangala Startup District',
          'HSR Layout & Indiranagar'
        ],
        overview: 'Bengaluru is India’s premier innovation capital and the global nucleus for unicorn startups. Shrayu Technologies collaborates with Bengaluru product founders and CTOs on complex technical challenges including LLM orchestration, distributed Kafka streams, and high-performance Next.js web applications.',
        localEcosystem: 'Home to premier tech venture funds, global capability centers (GCCs), and deep-tech incubators, Bengaluru commands cutting-edge engineering standards and rapid execution speeds.',
        supportedCategories: [
          'custom-software',
          'web-development',
          'ai-solutions',
          'cloud-devops',
          'saas-development'
        ],
        nearbyCities: ['pune', 'mumbai']
      }
    ]
  }
];

