/**
 * redditStrategyData.js
 * Authoritative strategic data mapping for ethical Reddit SEO, community engagement,
 * and referral discovery for Shrayu Technologies.
 * 
 * Core Principle: 100% authentic community value, zero spam, zero bots, zero fake accounts.
 */

import { SITE_URL } from '../config/site.config.js';

export const targetSubreddits = [
  {
    name: 'r/webdev',
    subscribers: '2.5M+',
    topic: 'Full-stack web architecture, frontend engines, APIs, and modern development workflows',
    audience: 'Professional software engineers, tech leads, agency developers, and architects',
    postingRestrictions: 'No low-effort self-promotion. Showoff Saturday is strictly enforced for projects.',
    selfPromotionRules: 'Must contribute substantive context and architectural breakdown in comments. Links allowed only when directly solving OP question or in Showoff Saturday threads.',
    relevantResources: [
      {
        pageTitle: 'Technical Comparison Engine',
        url: '/compare',
        domain: 'Architectural evaluation'
      },
      {
        pageTitle: 'Custom Software vs SaaS Engineering',
        url: '/compare/services/custom-software-vs-saas-development',
        domain: 'Architecture tradeoff decisions'
      },
      {
        pageTitle: 'CommSphere Live Chat Engine',
        url: '/portfolio',
        domain: 'Socket.IO bidirectional synchronization'
      }
    ],
    opportunityTriggers: [
      'Questions comparing Next.js App Router vs SPA architectures',
      'Discussions on building multi-tenant SaaS platforms vs bespoke single-tenant engines',
      'Requests for code review on full-stack MERN state hydration',
      'Questions on real-time WebSocket scaling patterns'
    ]
  },
  {
    name: 'r/reactjs',
    subscribers: '400k+',
    topic: 'React 19, Next.js, component architecture, state management, and performance',
    audience: 'React engineers, frontend leads, and UI systems designers',
    postingRestrictions: 'Direct link posts heavily scrutinized. Text posts with code breakdowns and live discussions encouraged.',
    selfPromotionRules: 'Self-promotion threads pinned monthly. Authentic answers in comments providing open-source examples are welcome.',
    relevantResources: [
      {
        pageTitle: 'Web vs Mobile Applications Comparison',
        url: '/compare/services/web-development-vs-mobile-apps',
        domain: 'Cross-platform selection'
      },
      {
        pageTitle: 'SmartSpend Personal Finance Web App',
        url: '/portfolio',
        domain: 'React 19 & Chart.js data visualization'
      }
    ],
    opportunityTriggers: [
      'Discussions on SSR vs client-side hydration in React 19',
      'Architecture tradeoffs between React Web portals and Flutter native mobile',
      'Complex UI state management and dark/light theme hydration without flash'
    ]
  },
  {
    name: 'r/nextjs',
    subscribers: '140k+',
    topic: 'Next.js 15 App Router, Server Components, SSG/SSR, and edge deployments',
    audience: 'Next.js practitioners, full-stack builders, and cloud architects',
    postingRestrictions: 'No blog spam. Detailed architectural experiences and benchmark solutions welcome.',
    selfPromotionRules: 'Links permitted when sharing open-source boilerplates, verified implementations, or answering technical bugs.',
    relevantResources: [
      {
        pageTitle: 'Web Application Development Services',
        url: '/services',
        domain: 'Next.js App Router engineering'
      },
      {
        pageTitle: 'Shrayu Technologies Systems Portfolio',
        url: '/portfolio',
        domain: '25 production-grade open-source systems'
      }
    ],
    opportunityTriggers: [
      'Debugging Next.js 15 App Router prerendering and static params generation',
      'Structuring dynamic nested routes for scalable directory engines',
      'Building accessible, semantic comparison tables with React Server Components'
    ]
  },
  {
    name: 'r/MachineLearning',
    subscribers: '2.8M+',
    topic: 'Machine learning algorithms, deep learning models, datasets, and research',
    audience: 'ML engineers, data scientists, researchers, and technical founders',
    postingRestrictions: 'Extremely strict moderation. Only high-caliber technical posts, original research, or technical discussions.',
    selfPromotionRules: 'Commercial promotion strictly forbidden. Open-source repositories with clean implementations and ablation data allowed in [Project] flairs.',
    relevantResources: [
      {
        pageTitle: 'AI Autonomous Navigation System',
        url: '/portfolio',
        domain: 'A* search and Dijkstra kinematic trajectory planning'
      },
      {
        pageTitle: 'AI-Powered Cybersecurity Threat Detection',
        url: '/portfolio',
        domain: 'Random Forest network telemetry anomaly classification'
      },
      {
        pageTitle: 'AI Autonomous Navigation vs AI Threat Detection',
        url: '/compare/systems/ai-autonomous-navigation-system-vs-ai-powered-cybersecurity-threat-detection',
        domain: 'Algorithmic complexity comparison'
      }
    ],
    opportunityTriggers: [
      'Discussions on robotics motion planning without dedicated GPU hardware',
      'Evaluating Random Forest vs deep learning for low-latency network telemetry triage',
      'Multi-horizon energy demand forecasting using lag variables'
    ]
  },
  {
    name: 'r/Python',
    subscribers: '1.3M+',
    topic: 'Python programming, open-source libraries, CLI tools, and web frameworks',
    audience: 'Python developers, backend engineers, data scientists, and students',
    postingRestrictions: 'Weekly "What are you working on?" thread is primary vehicle for project sharing.',
    selfPromotionRules: 'Open-source GitHub repositories with thorough READMEs and MIT/Apache licenses are warmly received.',
    relevantResources: [
      {
        pageTitle: 'AI-Powered Energy Consumption Forecasting',
        url: '/portfolio',
        domain: 'XGBoost & Scikit-learn industrial forecasting'
      },
      {
        pageTitle: 'Custom Software Development Services',
        url: '/services',
        domain: 'Python, FastAPI & distributed backend architecture'
      }
    ],
    opportunityTriggers: [
      'Showcasing clean Python algorithmic simulations (Pygame, NumPy kinematics)',
      'FastAPI microservices architecture patterns for real-time streaming',
      'Data science pipelines for retail inventory and meteorological modeling'
    ]
  },
  {
    name: 'r/startups',
    subscribers: '1.8M+',
    topic: 'Startup tech architecture, MVP building, tech stack decisions, and outsourcing vs in-house',
    audience: 'Founders, early-stage CTOs, product managers, and entrepreneurs',
    postingRestrictions: 'Strict anti-spam filters. Monthly feedback threads for self-promotion.',
    selfPromotionRules: 'Share founder lessons, technical debt avoidance, and architecture blueprints. Transparently disclose founder affiliation.',
    relevantResources: [
      {
        pageTitle: 'Custom Software vs SaaS Platform Engineering',
        url: '/compare/services/custom-software-vs-saas-development',
        domain: 'Build vs buy & tenant isolation'
      },
      {
        pageTitle: 'Software Engineering Services & Capabilities',
        url: '/services',
        domain: 'Agile sprints, architecture discovery & project agreements'
      }
    ],
    opportunityTriggers: [
      'Founders asking whether to build custom software or buy SaaS tools',
      'Questions about estimating engineering sprint roadmaps and tech debt mitigation',
      'How to structure IP ownership and statement of work contracts with engineering firms'
    ]
  },
  {
    name: 'r/SaaS',
    subscribers: '350k+',
    topic: 'SaaS development, multi-tenant architectures, Stripe billing, and churn reduction',
    audience: 'SaaS founders, solo builders, engineers, and growth leads',
    postingRestrictions: 'Value-first community. Case studies with transparent numbers perform best.',
    selfPromotionRules: 'Provide detailed architectural breakdowns in the post body before sharing resource links.',
    relevantResources: [
      {
        pageTitle: 'SaaS Platform Engineering',
        url: '/services',
        domain: 'Multi-tenant schema isolation & unified billing'
      },
      {
        pageTitle: 'Technical Comparison Engine',
        url: '/compare',
        domain: 'Feature and architectural comparison'
      }
    ],
    opportunityTriggers: [
      'Choosing between multi-tenant database isolation vs row-level security (RLS)',
      'Designing tier-based pricing engines with automated invoice generation',
      'Migrating from monolithic codebases to microservices without downtime'
    ]
  },
  {
    name: 'r/developersIndia',
    subscribers: '600k+',
    topic: 'Indian software industry, tech careers, open source engineering, and architecture',
    audience: 'Indian software engineers, tech architects, startup engineers, and students',
    postingRestrictions: 'Community guidelines prioritize engineering merit, career honesty, and Indian tech context.',
    selfPromotionRules: 'Sharing Indian open-source contributions, local tech hub insights, and engineering benchmarks is encouraged.',
    relevantResources: [
      {
        pageTitle: 'Engineering Locations in Maharashtra',
        url: '/locations',
        domain: 'Indian engineering network'
      },
      {
        pageTitle: 'Chhatrapati Sambhajinagar HQ & R&D Lab',
        url: '/locations/maharashtra/chhatrapati-sambhajinagar',
        domain: 'Maharashtra tech corridor'
      },

      {
        pageTitle: 'Careers & Engineering Collective',
        url: '/careers',
        domain: 'Senior engineering culture & remote-first policies'
      }
    ],
    opportunityTriggers: [
      'Discussions on emerging tech corridors in Tier-2 Indian cities like Chhatrapati Sambhajinagar',
      
      'Showcasing verified open-source portfolios built with Next.js, Python, and Go'
    ]
  }
];

export const linkWorthyResources = [
  {
    id: 'res_compare_engine',
    title: 'Technical Comparison Engine',
    url: '/compare',
    type: 'Interactive Tool & Canonical Benchmarks',
    valueProposition: 'Allows engineers and evaluators to objectively compare software systems, services, and hubs without artificial marketing scores.',
    redditShareability: 'High — perfect for OP questions asking "How do I choose between X and Y?".'
  },
  {
    id: 'res_portfolio_repos',
    title: '25 Verified Open Source Production Systems',
    url: '/portfolio',
    type: 'Codebases & Architectural Case Studies',
    valueProposition: 'Provides public GitHub repositories covering AI trajectory kinematics, network intrusion detection, energy forecasting, and full-stack MERN apps.',
    redditShareability: 'Very High — engineers on Reddit value verifiable code over marketing claims.'
  },
  {
    id: 'res_saas_vs_custom',
    title: 'Custom Software vs SaaS Platform Engineering Benchmark',
    url: '/compare/services/custom-software-vs-saas-development',
    type: 'Architectural Tradeoff Guide',
    valueProposition: 'Detailed breakdown of multi-tenant schema isolation, subscription overhead, and single-tenant customization.',
    redditShareability: 'High — directly answers recurring r/startups and r/SaaS dilemmas.'
  },
  {
    id: 'res_location_hubs',
    title: 'National Software Delivery Network & Regional Hubs',
    url: '/locations',
    type: 'Regional Technical Infrastructure Directory',
    valueProposition: 'Transparent office addresses, geographic coordinates, and tech corridor coverage across Maharashtra.',
    redditShareability: 'Moderate — useful for localized developer communities like r/developersIndia.'
  }
];

// Approved by the owner on 2026-11-05 for MANUAL posting only. Nothing in this project posts to Reddit, and this file
// must not be imported by the website. Read each subreddit's current rules before posting; change no text without new approval.
export const responseTemplates = [
  {
    id: 'tpl_architecture_tradeoff',
    name: 'Build vs Buy Tradeoff',
    status: 'approved_manual_post_only',
    subreddits: ['r/webdev', 'r/SaaS', 'r/startups'],
    structure: [
      '1. Disclose the affiliation first.',
      '2. Answer the question asked, in plain language.',
      '3. Ask what would change the answer. Add a link only under linkPolicy.'
    ],
    disclosure: 'Disclosure: I work at Shrayu Technologies, a software development company.',
    script: `Disclosure: I work at Shrayu Technologies, a software development company.

I'd start by checking whether an existing SaaS product can meet your data and compliance requirements. If it can, buying is usually the simpler first step. Building gives you more control, but you also take on the maintenance.

What are your compliance needs, and how big is your team?`,
    linkPolicy: 'Only if someone asks for a comparison. Never in r/startups.',
    linkIfAsked: `We have a comparison on our site. It's our own page, so weigh it accordingly: ${SITE_URL}/compare/services/custom-software-vs-saas-development`
  },
  {
    id: 'tpl_open_source_reference',
    name: 'Path Planning Explanation',
    status: 'approved_manual_post_only',
    subreddits: ['r/Python', 'r/MachineLearning'],
    structure: [
      '1. Disclose the affiliation first.',
      '2. Answer the question asked and mention the practical pitfalls.',
      '3. Ask about their setup. Do not add a link.'
    ],
    disclosure: 'Disclosure: I work at Shrayu Technologies.',
    script: `Disclosure: I work at Shrayu Technologies.

If you don't have a GPU, I'd try A* on an occupancy grid first. It's easy to debug and doesn't need training data. Just make sure your heuristic doesn't overestimate the remaining cost, and check that your vehicle can actually make the turns in the path. You may need to smooth it afterward.

What does your map look like, and does it change while the robot moves?`,
    linkPolicy: 'No link until repository ownership is verified.',
    linkIfAsked: null
  }
];

export const contentCalendar = [
  {
    weekNumber: 1,
    week: 'Week 1',
    theme: 'Technical Discussion & Open Source Contributions',
    focus: 'Technical Discussion & Open Source Contributions',
    communities: ['r/webdev', 'r/Python'],
    action: 'Share architectural lessons learned from deploying A* kinematic trajectories and Next.js 15 App Router static generation. Answer developer troubleshooting queries.',
    actions: ['Contribute to r/webdev on React 19', 'Answer Python async queries', 'Review Next.js App Router performance']
  },
  {
    weekNumber: 2,
    week: 'Week 2',
    theme: 'Architecture Tradeoffs & System Design',
    focus: 'Architecture Tradeoffs & System Design',
    communities: ['r/startups', 'r/SaaS'],
    action: 'Participate in founder threads regarding custom software build vs buy decisions. Share objective comparison frameworks.',
    actions: ['Share comparison framework on r/startups', 'Answer B2B SaaS tenancy questions on r/SaaS', 'Participate in Showoff Saturday on r/webdev']
  },
  {
    weekNumber: 3,
    week: 'Week 3',
    theme: 'Regional Tech Ecosystem & Community Knowledge',
    focus: 'Regional Tech Ecosystem & Community Knowledge',
    communities: ['r/developersIndia'],
    action: 'Engage with Indian software practitioners discussing emerging engineering corridors and scalable full-stack development best practices.',
    actions: ['Discuss tech hubs on r/developersIndia', 'Share Chhatrapati Sambhajinagar HQ engineering insights where relevant', 'Provide architecture advice']
  },
  {
    weekNumber: 4,
    week: 'Week 4',
    theme: 'Machine Learning & Telemetry Anomaly Detection',
    focus: 'Machine Learning & Telemetry Anomaly Detection',
    communities: ['r/MachineLearning', 'r/node'],
    action: 'Provide technical answers on real-time network anomaly classification and WebSocket bidirectional channel scaling.',
    actions: ['Deep-dive answer on r/MachineLearning', 'WebSocket channel scaling on r/node', 'Monthly retrospective and metrics review']
  }
];

export const fourWeekCalendar = contentCalendar;

export const ethicalPrinciples = {
  zeroBotsAllowed: true,
  zeroSpamPolicy: true,
  voteManipulationForbidden: true,
  communityValueRatio: '9:1',
  transparencyRequired: true,
  noDirectAffiliateLinks: true,
  privacyCompliantReferrals: true
};
