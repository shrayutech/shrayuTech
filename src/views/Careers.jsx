"use client";
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, HeartPulse, GraduationCap, Laptop, Plane, Sparkles } from 'lucide-react';
import Link from 'next/link';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContentFreshnessBadge from '../components/ContentFreshnessBadge';
import { useTheme } from '../context/ThemeContext';
import SpotlightCard from '../components/SpotlightCard';

const Careers = () => {
  const { isDark } = useTheme();

  const openPositions = [
    {
      id: 1,
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "Hybrid (Maharashtra HQ / Remote)",
      type: "Full-Time",
      description: "Looking for an experienced engineer proficient in React, Next.js, Node.js, and cloud architecture to lead our core product team."
    },
    {
      id: 2,
      title: "Product Designer (UI/UX)",
      department: "Design",
      location: "Remote (Global)",
      type: "Full-Time",
      description: "Join our design team to craft beautiful, intuitive, and user-centric interfaces for our flagship SaaS products and client portals."
    },
    {
      id: 3,
      title: "DevOps Specialist",
      department: "Infrastructure",
      location: "Remote (India / Global)",
      type: "Full-Time",
      description: "Scale our AWS infrastructure, automate CI/CD pipelines with Docker and GitHub Actions, and ensure 99.99% uptime for enterprise clients."
    },
    {
      id: 4,
      title: "Technical Project Manager",
      department: "Management",
      location: "Remote (India / Global)",
      type: "Full-Time / Contract",
      description: "Coordinate cross-functional development teams, manage agile sprints, and act as a technical liaison between stakeholders and engineering."
    }
  ];

  const benefits = [
    {
      icon: <HeartPulse className="h-8 w-8 text-rose-500" />,
      title: "Healthcare & Wellness",
      description: "Premium medical, dental, and vision coverage for you and your dependents, plus mental health stipends."
    },
    {
      icon: <Laptop className="h-8 w-8 text-blue-500" />,
      title: "Remote Work & Setup",
      description: "$2,000 work-from-home stipend to build your perfect home office, and flexible hybrid options."
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-amber-500" />,
      title: "Learning & Growth",
      description: "Dedicated annual budget for courses, conferences, and unlimited access to learning platforms."
    },
    {
      icon: <Plane className="h-8 w-8 text-emerald-500" />,
      title: "Unlimited PTO",
      description: "We focus on outcomes, not hours. Take the time you need to recharge, travel, and spend time with loved ones."
    }
  ];

  return (
    <div className="relative min-h-screen bg-services-atmosphere pt-36 pb-32 px-6 sm:px-8 overflow-hidden transition-colors duration-300">
      <SEO
        title="Careers"
        description="Join Shrayu Technologies and help us build the digital future. Explore open positions in engineering, design, and product management."
        keywords="careers at Shrayu Technologies, job openings, software engineering jobs, UI/UX design jobs, tech careers"
      />

      {/* ATMOSPHERE OVERLAYS */}
      <div className="absolute inset-0 bg-blueprint-mesh opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 noise-overlay pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Breadcrumbs items={[{ label: 'Careers & Opportunities' }]} />
          <ContentFreshnessBadge pageKey="careers" />
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-500 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-blue-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Our Engineering Collective</span>
          </div>
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Build the Future{' '}
            <span className="gradient-text-animated">
              With Us
            </span>
          </h1>
          <p className={`text-base sm:text-lg font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Join a culture of continuous innovation. We are looking for brilliant minds to help us solve the world's most complex technical challenges.
          </p>
          <div className="pt-2">
            <a
              href="#positions"
              className="btn-primary group text-white font-bold text-base px-8 py-4 rounded-full inline-flex items-center space-x-2 border border-blue-400/30 shadow-xl shadow-blue-500/30 active:scale-95 transition-all"
            >
              <span>View Open Positions</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12"
        >
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">Culture & Perks</span>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Why Shrayu Technologies?</h2>
            <p className={`text-sm sm:text-base font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              We invest heavily in our team. Review our{' '}
              <Link href="/about" className="text-blue-500 hover:underline font-semibold">
                company culture and engineering principles
              </Link>{' '}
              to see how our autonomy, wellness, and growth values shape our daily work.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <SpotlightCard key={index} className="glass-card-3d rounded-3xl p-8 space-y-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                  isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200'
                }`}>
                  {benefit.icon}
                </div>
                <h3 className={`text-xl font-bold transition-colors ${isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'}`}>
                  {benefit.title}
                </h3>
                <p className={`text-xs font-semibold leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {benefit.description}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </motion.div>

        {/* Job Listings */}
        <motion.div
          id="positions"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="scroll-mt-28 space-y-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b pb-6 border-white/10">
            <div>
              <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em] block mb-1">Opportunities</span>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Open Positions</h2>
            </div>
            <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Showing {openPositions.length} available roles
            </div>
          </div>

          <div className="space-y-6">
            {openPositions.map((job) => (
              <SpotlightCard
                key={job.id}
                className="glass-card-3d rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
                      isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700'
                    }`}>
                      {job.department}
                    </span>
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
                      isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}>
                      {job.type}
                    </span>
                  </div>
                  <h3 className={`text-2xl font-bold transition-colors ${isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'}`}>
                    {job.title}
                  </h3>
                  <div className={`flex flex-col sm:flex-row sm:space-x-4 text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <span className="flex items-center mt-1 sm:mt-0"><MapPin className="h-3.5 w-3.5 mr-1 text-blue-500" /> {job.location}</span>
                    <span className="flex items-center mt-1 sm:mt-0"><Clock className="h-3.5 w-3.5 mr-1 text-indigo-500" /> Full-time</span>
                  </div>
                  <p className={`text-xs font-medium max-w-3xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {job.description}
                  </p>
                </div>
                <div>
                  <Link href={`/contact?subject=Application for ${job.title}`}
                    className="btn-primary group w-full md:w-auto px-6 py-3 rounded-full font-bold text-xs flex items-center justify-center space-x-2 border border-blue-400/30 shadow-lg shadow-blue-500/20 active:scale-95 transition-all text-white"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Fallback box */}
          <div className="pt-6">
            <SpotlightCard className="glass-card-3d rounded-3xl p-8 text-center space-y-4">
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Don't see a perfect fit?</h3>
              <p className={`text-xs sm:text-sm font-medium max-w-xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                We're always looking for talented individuals who thrive in fast-paced software engineering environments. Take a look at our{' '}
                <Link href="/portfolio" className="text-blue-500 hover:underline font-semibold">
                  verified engineering portfolio & case studies
                </Link>{' '}
                to see the technical challenges we solve, or send your resume directly to our recruiting team.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact"
                  className="btn-primary group px-6 py-2.5 rounded-full font-bold text-xs flex items-center space-x-2 border border-blue-400/30 shadow-lg shadow-blue-500/20 active:scale-95 transition-all text-white"
                >
                  <span>Drop Us a Line</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link href="/portfolio"
                  className={`px-6 py-2.5 rounded-full font-bold text-xs flex items-center space-x-2 border transition-all ${
                    isDark
                      ? 'border-white/10 text-slate-300 hover:bg-white/5 hover:text-white'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-blue-600'
                  }`}
                >
                  <span>Explore Engineering Showcase</span>
                </Link>
              </div>
            </SpotlightCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;

