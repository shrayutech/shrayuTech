"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Code,
  Globe,
  Smartphone,
  Cpu,
  Cloud,
  Palette,
  Network,
  Layers,
  Settings,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import RelatedCategories from '../components/RelatedCategories';
import RelatedProjects from '../components/RelatedProjects';
import ContentFreshnessBadge from '../components/ContentFreshnessBadge';
import CompareButton from '../components/comparison/CompareButton';
import FAQSection from '../components/FAQSection';
import { useTheme } from '../context/ThemeContext';
import { useSkeleton } from '../context/SkeletonContext';
import SkeletonWrapper from '../components/skeleton/SkeletonWrapper';
import ServicesSkeleton from '../components/skeleton/ServicesSkeleton';
import SpotlightCard from '../components/SpotlightCard';

const Services = () => {
  const { isDark } = useTheme();
  const { isLoading } = useSkeleton();

  const serviceCategories = [
    {
      slug: 'custom-software',
      title: 'Custom Software',
      icon: <Code className="w-8 h-8 text-blue-500" />,
      tagline: 'Enterprise Core Logic',
      desc: 'Robust, secure business logic engines tailored to your specific organizational workflows. Built for high availability, security, and low latency.',
      techs: ['Node.js', 'NestJS', 'PostgreSQL', 'Go', 'Python'],
      features: ['Microservices Architecture', 'Secure Data Ingestion', 'Automated Testing Pipelines', 'Legacy System Migrations'],
      portfolioLink: '/portfolio?category=Python',
      portfolioAnchor: 'Explore Python Systems'
    },
    {
      slug: 'web-development',
      title: 'Web Applications',
      icon: <Globe className="w-8 h-8 text-indigo-500" />,
      tagline: 'Responsive Web Portals',
      desc: 'Sleek, responsive, and SEO-optimized frontend interfaces integrated with flexible state management and rapid page load speeds.',
      techs: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'GraphQL'],
      features: ['Server-Side Rendering (SSR)', 'SEO Best Practices', 'Responsive Layout Systems', 'State Hydration & Caching'],
      portfolioLink: '/portfolio?category=Full-Stack%20Development',
      portfolioAnchor: 'Explore Web Case Studies'
    },
    {
      slug: 'mobile-apps',
      title: 'Mobile Apps',
      icon: <Smartphone className="w-8 h-8 text-cyan-500" />,
      tagline: 'Handheld Experiences',
      desc: 'High-fidelity mobile applications designed to perform natively on iOS and Android devices, featuring smooth animations and offline support.',
      techs: ['Flutter', 'Swift', 'Kotlin', 'Firebase', 'SQLite'],
      features: ['Offline Data Syncing', 'Push Notification Routing', 'Dynamic Local Storage', 'Native Device Feature Access'],
      portfolioLink: '/portfolio?category=Full-Stack%20Development',
      portfolioAnchor: 'Explore Mobile & Web Projects'
    },
    {
      slug: 'ai-solutions',
      title: 'AI Solutions',
      icon: <Cpu className="w-8 h-8 text-purple-500" />,
      tagline: 'Cognitive Engineering',
      desc: 'Integrate LLMs, natural language processing models, custom recommendation algorithms, predictive analytics, and deep learning into your workflows.',
      techs: ['Python', 'OpenAI API', 'PyTorch', 'TensorFlow', 'LangChain'],
      features: ['LLM Orchestration & RAG', 'Semantic Vector Databases', 'Behavioral Pattern Analysis', 'AI Agent Workflows'],
      portfolioLink: '/portfolio?category=AI',
      portfolioAnchor: 'Explore AI Case Studies'
    },
    {
      slug: 'cloud-infrastructure',
      title: 'Cloud Infrastructure',
      icon: <Cloud className="w-8 h-8 text-sky-500" />,
      tagline: 'Auto-Scaling Clusters',
      desc: 'Robust infrastructure deployed across multi-cloud regions with auto-scaling groups, containerization, and geo-redundant backups.',
      techs: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
      features: ['Infrastructure as Code (IaC)', 'Multi-Region Orchestration', 'Cost Optimization Metrics', 'High Availability Deployments'],
      portfolioLink: '/portfolio?category=Python',
      portfolioAnchor: 'Explore Cloud Automations'
    },
    {
      slug: 'ui-ux-design',
      title: 'UI/UX Design',
      icon: <Palette className="w-8 h-8 text-rose-500" />,
      tagline: 'Visual Prototypes',
      desc: 'Intuitive user research, sleek design tokens, wireframes, and design systems crafted to ensure high retention and modern aesthetics.',
      techs: ['Figma', 'Prototyping', 'Design Systems', 'User Research'],
      features: ['Component Library Design', 'A/B Layout Prototyping', 'Accessibility Compliance (WCAG)', 'Motion & Micro-interactions'],
      portfolioLink: '/portfolio?category=Full-Stack%20Development',
      portfolioAnchor: 'Explore Frontend Architectures'
    },
    {
      slug: 'api-development',
      title: 'API Development',
      icon: <Network className="w-8 h-8 text-emerald-500" />,
      tagline: 'Data Exchange Layers',
      desc: 'Ultra-fast API design featuring middleware authentication, rate-limiting layers, real-time streams, and self-documenting endpoints.',
      techs: ['NestJS', 'Express.js', 'Swagger', 'GraphQL', 'gRPC'],
      features: ['OAuth2 / JWT Security', 'Rate Limiting & Throttling', 'Real-time WebSocket Streams', 'Swagger / OpenAPI Specs'],
      portfolioLink: '/portfolio?category=Python',
      portfolioAnchor: 'Explore Microservice APIs'
    },
    {
      slug: 'saas-development',
      title: 'SaaS Development',
      icon: <Layers className="w-8 h-8 text-violet-500" />,
      tagline: 'Multi-Tenant Platforms',
      desc: 'End-to-end SaaS application scaffolding featuring Stripe subscription models, user seats, tenant isolation, and activity logs.',
      techs: ['Next.js', 'Stripe', 'Supabase', 'Clerk', 'PostgreSQL'],
      features: ['Tenant Schema Isolation', 'Tiered Subscriptions', 'Seat Management Metrics', 'Unified Billing Portals'],
      portfolioLink: '/portfolio?category=Full-Stack%20Development',
      portfolioAnchor: 'Explore SaaS Platforms'
    },
    {
      slug: 'devops-ci-cd',
      title: 'DevOps & CI/CD',
      icon: <Settings className="w-8 h-8 text-amber-500" />,
      tagline: 'Delivery Pipelines',
      desc: 'Automate software delivery pipelines, log collection metrics, container orchestration, and real-time infrastructure alerts.',
      techs: ['GitHub Actions', 'Terraform', 'Prometheus', 'Grafana', 'Docker'],
      features: ['Zero-Downtime Releases', 'Real-Time Health Monitoring', 'Secrets Handling', 'Performance Alerting'],
      portfolioLink: '/portfolio?category=Python',
      portfolioAnchor: 'Explore DevOps Pipelines'
    }
  ];

  return (
    <SkeletonWrapper loading={isLoading} skeleton={<ServicesSkeleton />}>
      <div className="relative min-h-screen bg-services-atmosphere pt-36 pb-32 px-6 sm:px-8 overflow-hidden transition-colors duration-300">
        <SEO
          title="Services"
          description="Explore Shrayu Technologies software engineering services: Custom Software, Web Apps, Mobile Apps, AI Solutions, Cloud Architecture, UI/UX Engineering, and DevOps."
          keywords="software engineering services, custom software, web app development, mobile apps, AI integrations, cloud architecture, UI UX engineering"
        />

        {/* MULTI-LAYERED BACKGROUND SYSTEM */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 noise-overlay pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Breadcrumbs items={[{ label: 'Software Services' }]} />
            <ContentFreshnessBadge pageKey="services" />
          </div>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-500 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineering Capabilities</span>
            </div>
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Our Software Development{' '}
              <span className="gradient-text-animated">
                Services
              </span>
            </h1>
            <p className={`text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              We deliver end-to-end software development services tailored for modern business environments, from full-stack SaaS platforms to AI backend pipelines aligned with{' '}
              <a
                href="https://www.w3.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline font-semibold"
              >
                W3C Web Standards
              </a>{' '}
              and enterprise cloud architectures on{' '}
              <a
                href="https://aws.amazon.com/architecture/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline font-semibold"
              >
                AWS
              </a>.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {serviceCategories.map((service, idx) => (
              <SpotlightCard
                key={idx}
                className="glass-card-3d rounded-3xl p-8 flex flex-col justify-between space-y-8"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200'}`}>
                      {service.icon}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-colors ${
                      isDark ? 'text-blue-400 bg-blue-500/10 border-blue-500/20 group-hover:border-blue-500/40' : 'text-blue-700 bg-blue-50 border-blue-200 group-hover:border-blue-300'
                    }`}>
                      {service.tagline}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-2xl font-bold transition-colors ${isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'}`}>{service.title}</h3>
                    <p className={`text-xs font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{service.desc}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                        <span className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`space-y-5 pt-4 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                  <div className="flex flex-wrap gap-2">
                    {service.techs.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-3 py-1 rounded-md font-bold text-[10px] uppercase border transition-colors ${
                          isDark ? 'bg-white/5 text-slate-300 border-white/10 group-hover:border-blue-500/30' : 'bg-slate-100 text-slate-700 border-slate-200 group-hover:border-blue-300'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center space-x-1.5 text-xs text-blue-500 font-bold hover:text-blue-600 transition-colors uppercase tracking-wider group/link"
                    >
                      <span>Architecture Spec</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
                    </Link>
                    <div className="flex items-center gap-2">
                      <CompareButton
                        type="services"
                        item={{ ...service, name: service.title, slug: service.slug }}
                        variant="compact"
                      />
                      <Link
                        href={service.portfolioLink}
                        className={`text-[11px] font-semibold transition-colors hover:underline ${
                          isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Codebases
                      </Link>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </motion.div>

          {/* ========================================================= */}
          {/* VERIFIED PROJECTS & CATEGORY DISCOVERY HUBS */}
          {/* ========================================================= */}
          <div className="pt-16 space-y-16 border-t border-white/10">
            <RelatedProjects
              limit={3}
              title="Verified Implementations Across These Domains"
              subtitle="Review production-grade architectures and GitHub codebases built for these service categories"
            />

            <RelatedCategories
              title="Browse Case Studies by Architecture Domain"
              subtitle="Filter through our verified software engineering systems by specialization"
            />

            <FAQSection
              title="Software Engineering & Services FAQ"
              subtitle="Clear technical answers about project delivery models, IP transfer, and legacy migrations"
            />
          </div>

          {/* Bottom Conversion Banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pt-8"
          >
            <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-tr from-blue-950 via-[#0B1021] to-indigo-950 border border-white/15 p-8 sm:p-12 md:p-16 text-center shadow-2xl space-y-6">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4 sm:space-y-6">
                <h2 className="cta-heading font-black tracking-tight">
                  Need a Custom Architectural Solution?
                </h2>
                <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium">
                  Our principal engineers can evaluate your current tech stack or construct a tailored greenfield project roadmap.
                </p>
                <div className="pt-2 sm:pt-4 flex flex-wrap justify-center items-center gap-4">
                  <Link
                    href="/portfolio"
                    className="btn-secondary px-6 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center justify-center space-x-2 active:scale-95 transition-all text-xs sm:text-base font-bold !text-white !bg-white/10 hover:!bg-white/20 !border-white/20 w-full sm:w-auto"
                  >
                    <span>Browse 25+ Completed Projects</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-primary group text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center justify-center space-x-2 border border-blue-400/30 shadow-xl shadow-blue-500/30 active:scale-95 transition-all w-full sm:w-auto"
                  >
                    <span>Book Engineering Discovery Call</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SkeletonWrapper>
  );
};

export default Services;

