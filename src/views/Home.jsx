"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Code,
  Layers,
  Smartphone,
  Cpu,
  Cloud,
  Palette,
  Terminal,
  Activity,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  Database,
  Server,
  Zap,
  Globe,
  MessageSquare,
  Sparkles,
  Search,
  Eye,
  Lock,
  BarChart3,
  ExternalLink
} from 'lucide-react';
import SEO from '../components/SEO';
import RelatedCategories from '../components/RelatedCategories';
import ContentFreshnessBadge from '../components/ContentFreshnessBadge';
import { useTheme } from '../context/ThemeContext';
import { useSkeleton } from '../context/SkeletonContext';
import SkeletonWrapper from '../components/skeleton/SkeletonWrapper';
import HomeSkeleton from '../components/skeleton/HomeSkeleton';
import SpotlightCard from '../components/SpotlightCard';

const Home = () => {
  const { isDark } = useTheme();
  const { isLoading } = useSkeleton();

  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const techLogos = [
    { name: 'React', icon: <Globe className="w-6 h-6 text-[#61DAFB]" />, docsUrl: 'https://react.dev' },
    { name: 'Next.js', icon: <Layers className="w-6 h-6 text-blue-500" />, docsUrl: 'https://nextjs.org' },
    { name: 'Node.js', icon: <Server className="w-6 h-6 text-[#339933]" />, docsUrl: 'https://nodejs.org' },
    { name: 'TypeScript', icon: <Code className="w-6 h-6 text-[#3178C6]" />, docsUrl: 'https://www.typescriptlang.org' },
    { name: 'Python', icon: <Terminal className="w-6 h-6 text-[#3776AB]" />, docsUrl: 'https://www.python.org' },
    { name: 'Java', icon: <Code className="w-6 h-6 text-[#ED8B00]" />, docsUrl: 'https://dev.java' },
    { name: 'Flutter', icon: <Smartphone className="w-6 h-6 text-[#02569B]" />, docsUrl: 'https://flutter.dev' },
    { name: 'AWS', icon: <Cloud className="w-6 h-6 text-[#FF9900]" />, docsUrl: 'https://aws.amazon.com' },
    { name: 'Azure', icon: <Cloud className="w-6 h-6 text-[#0089D6]" />, docsUrl: 'https://azure.microsoft.com' },
    { name: 'Docker', icon: <Database className="w-6 h-6 text-[#2496ED]" />, docsUrl: 'https://www.docker.com' },
    { name: 'PostgreSQL', icon: <Database className="w-6 h-6 text-[#4169E1]" />, docsUrl: 'https://www.postgresql.org' },
    { name: 'MongoDB', icon: <Database className="w-6 h-6 text-[#47A248]" />, docsUrl: 'https://www.mongodb.com' },
    { name: 'Redis', icon: <Zap className="w-6 h-6 text-[#DC382D]" />, docsUrl: 'https://redis.io' },
    { name: 'Tailwind CSS', icon: <Palette className="w-6 h-6 text-[#38BDF8]" />, docsUrl: 'https://tailwindcss.com' }
  ];

  const services = [
    {
      title: 'Custom Software Development',
      icon: <Code className="w-8 h-8 text-blue-500" />,
      desc: 'High-performance, secure business logic engines tailored to your organizational workflows.',
      techs: ['Node.js', 'NestJS', 'PostgreSQL', 'Go'],
      link: '/services',
      actionText: 'Explore Custom Software'
    },
    {
      title: 'AI Solutions',
      icon: <Cpu className="w-8 h-8 text-purple-500" />,
      desc: 'Intelligent systems, NLP tools, recommendation models, LLM orchestration, and deep learning.',
      techs: ['Python', 'OpenAI', 'PyTorch', 'LangChain'],
      link: '/portfolio?category=AI',
      actionText: 'View AI Case Studies'
    },
    {
      title: 'Web Development',
      icon: <Globe className="w-8 h-8 text-indigo-500" />,
      desc: 'Next-gen responsive web portals, SaaS platforms, and SEO-optimized frontend web applications.',
      techs: ['React', 'Next.js', 'Tailwind', 'GraphQL'],
      link: '/services',
      actionText: 'Explore Web Architecture'
    },
    {
      title: 'Mobile App Development',
      icon: <Smartphone className="w-8 h-8 text-cyan-500" />,
      desc: 'Cross-platform native iOS & Android applications with offline sync and dynamic UI.',
      techs: ['Flutter', 'Swift', 'Kotlin', 'Firebase'],
      link: '/services',
      actionText: 'Explore Mobile Solutions'
    },
    {
      title: 'SaaS Development',
      icon: <Layers className="w-8 h-8 text-violet-500" />,
      desc: 'Multi-tenant product platforms featuring subscription tiers, seat licensing, and billing portals.',
      techs: ['Next.js', 'Stripe', 'Supabase', 'PostgreSQL'],
      link: '/portfolio?category=Full-Stack%20Development',
      actionText: 'View SaaS Case Studies'
    },
    {
      title: 'Cloud Solutions & DevOps',
      icon: <Cloud className="w-8 h-8 text-sky-500" />,
      desc: 'Multi-region cloud infrastructure, container orchestration, and zero-downtime CI/CD pipelines.',
      techs: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      link: '/services',
      actionText: 'Explore Cloud & DevOps'
    }
  ];

  const whyChooseUs = [
    { title: 'Clean Architecture', icon: <Code className="w-6 h-6 text-blue-500" />, desc: 'Modular design patterns that eliminate debt and keep software maintainable.' },
    { title: 'Scalable Solutions', icon: <Layers className="w-6 h-6 text-cyan-500" />, desc: 'Engineered from day one to handle traffic spikes and multi-region expansion.' },
    { title: 'Agile Development', icon: <Activity className="w-6 h-6 text-indigo-500" />, desc: 'Rapid sprint cycles, continuous integration, and transparent roadmap updates.' },
    { title: 'Security First', icon: <Lock className="w-6 h-6 text-purple-500" />, desc: 'Encrypted payloads, JWT authentication, and strict vulnerability audits.' },
    { title: 'Performance Optimization', icon: <Zap className="w-6 h-6 text-emerald-500" />, desc: 'Edge caching, SSR optimization, and sub-100ms API response latency.' },
    { title: 'Long-Term Support', icon: <ShieldCheck className="w-6 h-6 text-amber-500" />, desc: 'Continuous cloud monitoring, security patches, and ongoing performance tuning.' },
    { title: 'Transparent Communication', icon: <MessageSquare className="w-6 h-6 text-rose-500" />, desc: 'Direct access to founding tech leads with zero middle management noise.' }
  ];

  const processSteps = [
    { name: 'Discovery', icon: <Search className="w-5 h-5 text-blue-500" />, desc: 'Scoping business goals & technical specs.' },
    { name: 'Research', icon: <Eye className="w-5 h-5 text-indigo-500" />, desc: 'Architecture evaluation & stack selection.' },
    { name: 'Planning', icon: <GitBranch className="w-5 h-5 text-cyan-500" />, desc: 'Database schema & API contract design.' },
    { name: 'Design', icon: <Palette className="w-5 h-5 text-purple-500" />, desc: 'High-fidelity UI/UX design tokens.' },
    { name: 'Development', icon: <Code className="w-5 h-5 text-pink-500" />, desc: 'Clean, modular, test-driven coding.' },
    { name: 'Testing', icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />, desc: 'Security audits & QA stress testing.' },
    { name: 'Deployment', icon: <Globe className="w-5 h-5 text-sky-500" />, desc: 'Zero-downtime production release.' },
    { name: 'Support', icon: <MessageSquare className="w-5 h-5 text-amber-500" />, desc: 'Real-time telemetry & system updates.' }
  ];

  const featuredCaseStudies = [
    {
      title: 'AI-Powered Cybersecurity Threat Detection',
      category: 'AI & Threat Intelligence',
      impact: 'Real-time SOC network intrusion classification',
      challenge: 'High-throughput telemetry requires zero-latency triage without triggering false positive alert fatigue.',
      solution: 'Constructed an intelligent intrusion detection pipeline combining Random Forest classification and unsupervised telemetry analysis.',
      techs: ['Python', 'Flask', 'Random Forest', 'Scikit-learn', 'Docker'],
      link: '/portfolio?category=AI'
    },
    {
      title: 'AI Autonomous Navigation System',
      category: 'Autonomous Systems & Graph Traversal',
      impact: 'Zero-GPU collision-free kinematic trajectory planning',
      challenge: 'Modeling vehicle kinematics and dynamic obstacle avoidance within strictly constrained memory budgets.',
      solution: 'Engineered A* and Dijkstra graph traversal algorithms calculating collision-free optimal paths in dynamic environments.',
      techs: ['Python 3.10+', 'Pygame', 'OpenCV', 'A* Search', 'Kinematics'],
      link: '/portfolio?category=AI'
    }
  ];

  return (
    <SkeletonWrapper loading={isLoading} skeleton={<HomeSkeleton />}>
      <div className="relative w-full overflow-hidden transition-colors duration-300">
        <SEO
          title="Home"
          description="Shrayu Technologies - Building Software That Powers Modern Businesses. Custom software development, AI solutions, web & mobile apps, SaaS, and cloud engineering."
          keywords="software engineering, custom software development, AI solutions, web development startup, mobile apps, SaaS, Shrayu Technologies"
        />

        {/* MULTI-LAYERED VISUAL ATMOSPHERE ENGINE */}
        <div className="absolute inset-0 bg-hero-atmosphere pointer-events-none"></div>
        <div className="absolute inset-0 bg-blueprint-mesh opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 noise-overlay pointer-events-none"></div>

        {/* Floating Glowing Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px] animate-float-orb pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[160px] animate-pulse-glow pointer-events-none"></div>

        {/* Abstract Flowing Ribbon Vector Overlay */}
        <div className="absolute top-0 inset-x-0 h-[800px] opacity-25 pointer-events-none overflow-hidden floating-hero-visual">
          <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100 200 C 300 400, 700 100, 1540 300" stroke="url(#ribbonGradient1)" strokeWidth="2" strokeDasharray="6 6" />
            <path d="M-100 350 C 400 100, 900 500, 1540 200" stroke="url(#ribbonGradient2)" strokeWidth="3" />
            <defs>
              <linearGradient id="ribbonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="ribbonGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* HERO SECTION */}
        <section className="relative pt-36 pb-28 md:pt-44 md:pb-36 px-6 sm:px-8 max-w-5xl mx-auto z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8 flex flex-col items-center"
          >
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-500 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-blue-500/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>World-Class Software Engineering</span>
              </div>
              <ContentFreshnessBadge pageKey="home" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] max-w-4xl ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Building Software <br />
              That Powers{' '}
              <span className="gradient-text-animated">
                Modern Businesses
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className={`text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              We help startups, small businesses, and enterprises transform ideas into scalable digital products through modern software engineering, AI, cloud technologies, and exceptional user experiences.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-2 justify-center"
            >
              <Link href="/contact"
                className="btn-primary group text-white font-bold text-base px-8 py-4 rounded-full flex items-center justify-center space-x-2 border border-blue-400/30 shadow-xl shadow-blue-500/30 active:scale-95 transition-all"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link href="/portfolio"
                className="btn-secondary text-base font-bold px-8 py-4 rounded-full flex items-center justify-center space-x-2 active:scale-95 transition-all"
              >
                <span>View Case Studies</span>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className={`pt-8 border-t flex flex-wrap justify-center gap-8 text-xs font-semibold w-full max-w-xl ${
                isDark ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>Technical Excellence</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                <span>Startup Agility</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                <span>Process Transparency</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* TECH STACK ENVIRONMENT */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`py-24 border-t bg-services-atmosphere relative z-10 px-6 sm:px-8 ${
            isDark ? 'border-white/10' : 'border-slate-200'
          }`}
        >
          <div className="max-w-7xl mx-auto text-center space-y-12">
            <div className="space-y-3">
              <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">Technology Stack</span>
              <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Trusted Technologies We Build With
              </h2>
              <p className={`text-xs sm:text-sm font-medium max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Our architectures conform to modern specifications published by the{' '}
                <a
                  href="https://www.w3.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline font-semibold"
                >
                  World Wide Web Consortium (W3C)
                </a>{' '}
                and cloud infrastructure best practices on{' '}
                <a
                  href="https://aws.amazon.com/architecture/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline font-semibold"
                >
                  Amazon Web Services (AWS)
                </a>.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {techLogos.map((tech) => (
                <a
                  key={tech.name}
                  href={tech.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Read official ${tech.name} documentation`}
                  className="block focus:outline-none"
                >
                  <SpotlightCard
                    className="p-6 rounded-2xl glass-card-3d hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-center text-center space-y-3 w-full h-full">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                        isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200'
                      }`}>
                        {tech.icon}
                      </div>
                      <span className={`text-xs font-bold transition-colors ${
                        isDark ? 'text-slate-300 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'
                      }`}>
                        {tech.name}
                      </span>
                    </div>
                  </SpotlightCard>
                </a>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SERVICES OVERVIEW */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`py-32 relative z-10 border-t bg-services-atmosphere px-6 sm:px-8 ${
            isDark ? 'border-white/10' : 'border-slate-200'
          }`}
        >
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">What We Build</span>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Tailored Digital Solutions
              </h2>
              <p className={`text-base sm:text-lg font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                We construct high-performance software applications optimized for velocity, visual excellence, and elastic scaling.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <SpotlightCard
                  key={idx}
                  className="glass-card-3d rounded-3xl p-8 flex flex-col justify-between space-y-8"
                >
                  <div className="space-y-6">
                    <div className={`p-4 rounded-2xl w-max transition-transform duration-300 group-hover:scale-105 ${
                      isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200'
                    }`}>
                      {service.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className={`text-2xl font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {service.title}
                      </h3>
                      <p className={`text-sm leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  <div className={`space-y-6 pt-4 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <div className="flex flex-wrap gap-2">
                      {service.techs.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className={`px-3 py-1 rounded-md font-bold text-[10px] uppercase border transition-colors ${
                            isDark
                              ? 'bg-white/5 text-slate-300 border-white/10 group-hover:border-blue-500/30'
                              : 'bg-slate-100 text-slate-700 border-slate-200 group-hover:border-blue-300'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <Link
                        href={service.link}
                        className="inline-flex items-center space-x-1.5 text-xs text-blue-500 font-bold hover:text-blue-600 transition-colors uppercase tracking-wider group"
                      >
                        <span>{service.actionText}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                      <Link
                        href="/contact"
                        className={`text-[11px] font-semibold transition-colors hover:underline ${
                          isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Consult Lead
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>

            {/* Related Categories Navigation */}
            <div className="pt-8">
              <RelatedCategories
                title="Browse Verified Case Studies by Category"
                subtitle="Explore our 25 production-grade GitHub systems organized by technical domain"
              />
            </div>

            {/* Contextual Hub Discovery Bar */}
            <div className="pt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-bold">
              <Link
                href="/services"
                className="btn-secondary px-6 py-3 rounded-full flex items-center space-x-2 active:scale-95 transition-all"
              >
                <span>View Full Services Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portfolio"
                className="btn-secondary px-6 py-3 rounded-full flex items-center space-x-2 active:scale-95 transition-all"
              >
                <span>Browse 25+ Completed Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* WHY CHOOSE US */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`py-32 relative z-10 border-t bg-about-atmosphere px-6 sm:px-8 ${
            isDark ? 'border-white/10' : 'border-slate-200'
          }`}
        >
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">Why Trust Us</span>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Why Choose Shrayu Technologies
              </h2>
              <p className={`text-base font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                We focus on robust software architecture, clear communication, and high-performance execution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUs.map((feature, idx) => (
                <SpotlightCard
                  key={idx}
                  className="glass-card-3d rounded-3xl p-8 space-y-5"
                >
                  <div className={`p-3.5 rounded-2xl w-max transition-transform duration-300 group-hover:scale-105 ${
                    isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
                  }`}>
                    {feature.icon}
                  </div>
                  <h3 className={`font-bold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{feature.title}</h3>
                  <p className={`text-sm font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{feature.desc}</p>
                </SpotlightCard>
              ))}
            </div>

            <div className="pt-2 text-center">
              <p className={`text-xs sm:text-sm font-semibold max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Passionate about clean code, distributed systems, and machine learning?{' '}
                <Link href="/careers" className="text-blue-500 hover:underline font-bold inline-flex items-center space-x-1">
                  <span>Explore open positions on our Careers page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </p>
            </div>
          </div>
        </motion.section>

        {/* DEVELOPMENT PROCESS TIMELINE */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`py-32 relative z-10 border-t bg-hero-atmosphere px-6 sm:px-8 ${
            isDark ? 'border-white/10' : 'border-slate-200'
          }`}
        >
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">Development Process</span>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                How We Build Products
              </h2>
              <p className={`text-base font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                A transparent, end-to-end software development methodology engineered for quality.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 relative pt-6">
              {processSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-4 group">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center relative shadow-xl group-hover:scale-110 transition-all duration-300 ${
                    isDark
                      ? 'bg-[#111827] border-white/15 group-hover:border-blue-500/50 group-hover:shadow-blue-500/20'
                      : 'bg-white border-slate-200 group-hover:border-blue-500/50 group-hover:shadow-blue-500/10'
                  }`}>
                    {step.icon}
                    <div className="absolute -top-3 -right-2 text-[10px] bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded-full shadow">
                      0{idx + 1}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className={`font-bold text-sm sm:text-base transition-colors ${isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'}`}>
                      {step.name}
                    </h3>
                    <p className={`text-xs font-medium leading-relaxed px-1 sm:px-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <p className={`text-xs sm:text-sm font-medium max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Every sprint is executed with high visibility and test coverage.{' '}
                <Link href="/about" className="text-blue-500 hover:underline font-bold inline-flex items-center space-x-1">
                  <span>Learn more about our core values on the About page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </p>
            </div>
          </div>
        </motion.section>

        {/* FEATURED CASE STUDIES PREVIEW */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`py-32 relative z-10 border-t bg-portfolio-atmosphere px-6 sm:px-8 ${
            isDark ? 'border-white/10' : 'border-slate-200'
          }`}
        >
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="space-y-4 max-w-2xl">
                <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">Featured Case Studies</span>
                <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Engineering Case Studies</h2>
                <p className={`text-base font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Real-world technical solutions solved using clean backend architectures and modern web engines.</p>
              </div>
              <Link href="/portfolio"
                className="btn-secondary group text-xs font-bold px-6 py-3 rounded-full flex items-center space-x-2 active:scale-95 transition-all"
              >
                <span>Explore All Case Studies</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredCaseStudies.map((study, idx) => (
                <SpotlightCard
                  key={idx}
                  className="glass-card-3d rounded-3xl p-8 sm:p-10 space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                      isDark ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : 'text-blue-700 bg-blue-50 border-blue-200'
                    }`}>
                      {study.category}
                    </span>
                    <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{study.title}</h3>
                    <div className={`p-4 rounded-2xl font-bold text-xs flex items-center space-x-2 border ${
                      isDark
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    }`}>
                      <BarChart3 className="w-4 h-4 shrink-0" />
                      <span>Impact: {study.impact}</span>
                    </div>
                    <div className="space-y-2 pt-2 text-xs font-medium">
                      <p className={isDark ? 'text-slate-300' : 'text-slate-600'}><strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>Challenge:</strong> {study.challenge}</p>
                      <p className={isDark ? 'text-slate-300' : 'text-slate-600'}><strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>Solution:</strong> {study.solution}</p>
                    </div>
                  </div>

                  <div className={`space-y-4 pt-6 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <div className="flex flex-wrap gap-2">
                      {study.techs.map((t, tIdx) => (
                        <span key={tIdx} className={`px-3 py-1 rounded-md font-bold text-[10px] uppercase border ${
                          isDark
                            ? 'bg-white/5 text-slate-300 border-white/10'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link href={study.link || '/portfolio'} className="inline-flex items-center space-x-2 text-xs text-blue-500 font-bold uppercase tracking-widest hover:text-blue-600 transition-colors group">
                      <span>Read Full Case Study</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FINAL CONVERSION CTA */}
        <section className="py-20 sm:py-28 md:py-32 relative z-10 px-4 sm:px-6 lg:px-8 bg-contact-atmosphere">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-tr from-blue-950 via-[#0B1021] to-indigo-950 border border-white/15 p-8 sm:p-12 md:p-16 text-center shadow-2xl space-y-6 sm:space-y-8"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4 sm:space-y-6">
                <h2 className="cta-heading font-black tracking-tight">
                  Ready to Build Your Platform?
                </h2>
                <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                  Connect directly with our software leads. We will map out your requirements, system architecture, and development timeline within 2 hours.
                </p>
                <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row justify-center items-center gap-3.5 sm:gap-4">
                  <Link href="/contact"
                    className="btn-primary group text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center justify-center space-x-2 border border-blue-400/30 w-full sm:w-auto shadow-xl shadow-blue-500/30 active:scale-95 transition-all"
                  >
                    <span>Start Your Project</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
                  </Link>
                  <Link href="/portfolio"
                    className="btn-secondary !text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full flex items-center justify-center w-full sm:w-auto active:scale-95 transition-all !bg-white/10 hover:!bg-white/20 !border-white/20"
                  >
                    <span>Explore Case Studies</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </SkeletonWrapper>
  );
};

export default Home;

