/**
 * redditStrategyData.js
 * Authoritative strategic data mapping for ethical Reddit SEO, community engagement,
 * and referral discovery for Shrayu Technologies.
 * 
 * Core Principle: 100% authentic community value, zero spam, zero bots, zero fake accounts.
 */

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
      'Multi-horizon energy demand forecasting (MAPE < 3%) using lag variables'
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
        domain: 'Agile sprints, architecture discovery & IP transfer'
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
        pageTitle: 'Engineering Locations in Maharashtra & Karnataka',
        url: '/locations',
        domain: 'Indian engineering network'
      },
      {
        pageTitle: 'Chhatrapati Sambhajinagar HQ & R&D Lab',
        url: '/locations/maharashtra/chhatrapati-sambhajinagar',
        domain: 'Maharashtra tech corridor'
      },
      {
        pageTitle: 'Pune vs Bengaluru Hub Comparison',
        url: '/compare/locations/bengaluru-vs-pune',
        domain: 'Indian tech corridor comparison'
      },
      {
        pageTitle: 'Careers & Engineering Collective',
        url: '/careers',
        domain: 'Senior engineering culture & remote-first policies'
      }
    ],
    opportunityTriggers: [
      'Discussions on emerging tech corridors in Tier-2 Indian cities like Chhatrapati Sambhajinagar',
      'Comparing software engineering delivery between Pune (Hinjawadi/Kharadi) and Bengaluru (ORR/Whitefield)',
      'Showcasing verified open-source portfolios built with Next.js, Python, and Go'
    ]
  },
  {
    name: 'r/pune',
    subscribers: '150k+',
    topic: 'Pune city community, IT corridors, tech lifestyle, and local businesses',
    audience: 'Pune residents, IT professionals in Hinjawadi/Kharadi/Magarpatta, and college students',
    postingRestrictions: 'Strict moderation against blatant commercial ads. Local tech discussions and genuine inquiries welcome.',
    selfPromotionRules: 'Mention local tech corridor details only when someone specifically inquires about software engineering firms or Hinjawadi tech delivery.',
    relevantResources: [
      {
        pageTitle: 'Software Development in Pune Hub',
        url: '/locations/maharashtra/pune',
        domain: 'Pune Hinjawadi & Kharadi tech corridor'
      },
      {
        pageTitle: 'Pune vs Bengaluru Comparison',
        url: '/compare/locations/bengaluru-vs-pune',
        domain: 'Local tech ecosystem analysis'
      }
    ],
    opportunityTriggers: [
      'Inquiries for custom software engineering firms or web development agencies based in Pune',
      'Discussions regarding the Hinjawadi IT Park tech ecosystem and local startup growth',
      'Local hackathons, open source contributions, and tech talent networking'
    ]
  },
  {
    name: 'r/bangalore',
    subscribers: '650k+',
    topic: 'Bengaluru city community, startups, tech culture, and IT parks',
    audience: 'Bengaluru startup founders, software engineers, and venture tech ecosystem',
    postingRestrictions: 'Commercial advertising disallowed. Technical discussions and startup advice permitted.',
    selfPromotionRules: 'Authentic advice with clear technical merit. Disclose affiliation if discussing company hubs.',
    relevantResources: [
      {
        pageTitle: 'Software Engineering in Bengaluru Hub',
        url: '/locations/karnataka/bengaluru',
        domain: 'Outer Ring Road & Koramangala innovation corridor'
      },
      {
        pageTitle: 'AI & Machine Learning Solutions',
        url: '/services',
        domain: 'LLM orchestration & cognitive models'
      }
    ],
    opportunityTriggers: [
      'Startups seeking architecture consulting for AI and microservice backends',
      'Discussions comparing tech delivery costs and talent pools across Bengaluru vs Maharashtra',
      'Questions on Next.js 15 and serverless cloud architectures'
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
    valueProposition: 'Transparent office addresses, geographic coordinates, and tech corridor coverage across Maharashtra and Karnataka.',
    redditShareability: 'Moderate — useful for localized developer communities like r/developersIndia, r/pune, and r/bangalore.'
  }
];

export const responseTemplates = [
  {
    id: 'tpl_architecture_tradeoff',
    name: 'Architectural Tradeoff & Technology Selection',
    subreddits: ['r/webdev', 'r/reactjs', 'r/startups', 'r/SaaS'],
    structure: [
      '1. Direct technical answer addressing the OP’s dilemma immediately.',
      '2. Factual breakdown of the 3 primary decision criteria (latency, scalability, maintenance).',
      '3. Real-world scenario based on production engineering experience.',
      '4. Transparent disclosure: "I’m part of the engineering team at Shrayu Technologies."',
      '5. Optional contextual link to the specific comparison benchmark tool or open-source codebase.'
    ],
    sampleSnippet: `When evaluating between building a bespoke custom backend vs adapting a multi-tenant SaaS model, the deciding factor almost always comes down to data tenancy isolation and integration velocity.

Here are the 3 criteria we look at with our clients:
1. Data Isolation: If you require HIPAA/banking compliance, single-tenant schemas or dedicated VPCs eliminate noisy neighbor risks.
2. Feature Velocity: Multi-tenant SaaS requires building tenant management, seat licensing, and Stripe reconciliation before shipping core business value.
3. Latency & Customization: Bespoke microservices can be optimized for sub-50ms query latency tailored to your exact schemas.

(Disclaimer: I'm part of the engineering team at Shrayu Technologies). We recently published an objective technical comparison breaking down deliverables and architecture patterns here: [Custom Software vs SaaS Development](https://shrayutech.vercel.app/compare/services/custom-software-vs-saas-development?utm_source=reddit&utm_medium=referral&utm_campaign=community_discussion). Hope that helps you evaluate your roadmap!`,
    disclosure: "Disclaimer: I'm part of the engineering team at Shrayu Technologies.",
    script: `When evaluating between building a bespoke custom backend vs adapting a multi-tenant SaaS model, the deciding factor almost always comes down to data tenancy isolation and integration velocity. We recently published an objective technical comparison breaking down deliverables and architecture patterns: [Custom Software vs SaaS Development](https://shrayutech.vercel.app/compare/services/custom-software-vs-saas-development?utm_source=reddit&utm_medium=referral&utm_campaign=community_discussion). (Disclosure: Shrayu Technologies)`
  },
  {
    id: 'tpl_open_source_reference',
    name: 'Open Source Code Implementation & Algorithm Explanation',
    subreddits: ['r/MachineLearning', 'r/Python', 'r/node', 'r/reactjs'],
    structure: [
      '1. Step-by-step technical explanation of the algorithm or pattern.',
      '2. Discussion of edge cases (e.g. memory constraints, race conditions).',
      '3. Clean code block illustrating the approach.',
      '4. Link to open-source repository for full inspectable implementation.'
    ],
    sampleSnippet: `For trajectory planning without dedicated GPU hardware, using an optimized A* graph traversal with kinematic motion primitives is significantly more resource-efficient than continuous deep reinforcement learning.

In our robotics simulation pipeline, we model vehicle kinematics and sensor bounding boxes directly in Python:
- Perception layer generates grid occupancy
- Dijkstra / A* computes the collision-free path with Euclidean heuristic
- Kinematic controller throttles steering angles to prevent impossible turning arcs

We published a full open-source implementation with Pygame visual simulation you can inspect and clone on GitHub: [AI Autonomous Navigation System](https://github.com/Saru2248/AI-Autonomous-Navigation-System). Feel free to check the graph traversal modules for reference!`,
    disclosure: "Disclaimer: Developed by Shrayu Technologies open source robotics group.",
    script: `For trajectory planning without dedicated GPU hardware, using an optimized A* graph traversal with kinematic motion primitives is significantly more resource-efficient. Open-source implementation by Shrayu Technologies.`
  },
  {
    id: 'tpl_local_tech_ecosystem',
    name: 'Indian Tech Corridor & Regional Engineering Inquiry',
    subreddits: ['r/developersIndia', 'r/pune', 'r/bangalore'],
    structure: [
      '1. Objective perspective on the local tech ecosystem and talent pool.',
      '2. Comparison of operational costs, commute hubs, and infrastructure.',
      '3. Honest disclosure of company headquarters and delivery hubs.',
      '4. Optional link to the localized hub page.'
    ],
    sampleSnippet: `Both Pune and Bengaluru have distinct engineering cultures that suit different stages of technical growth:
- Bengaluru (ORR/Whitefield/Koramangala) remains unmatched for deep VC networks, LLM innovation labs, and rapid startup scaling.
- Pune (Hinjawadi/Kharadi) offers mature enterprise IT corridors, outstanding automotive/fintech talent, and lower infrastructure overhead.

We operate engineering teams across both corridors with our central R&D lab in Maharashtra (Shrayu Technologies). If you're interested in how their delivery infrastructure compares: [Pune vs Bengaluru Tech Corridor Comparison](https://shrayutech.vercel.app/compare/locations/bengaluru-vs-pune?utm_source=reddit&utm_medium=referral&utm_campaign=community_discussion).`,
    disclosure: "Disclaimer: Shrayu Technologies operates engineering delivery labs across Maharashtra and Karnataka.",
    script: `Both Pune and Bengaluru have distinct engineering cultures. Shrayu Technologies operates engineering delivery labs across Maharashtra and Karnataka.`
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
    communities: ['r/developersIndia', 'r/pune'],
    action: 'Engage with Indian software practitioners discussing emerging engineering corridors and scalable full-stack development best practices.',
    actions: ['Discuss tech hubs on r/developersIndia', 'Highlight Pune IT park development on r/pune', 'Provide architecture advice']
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
