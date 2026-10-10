"use client";
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3';
import { toast } from 'react-toastify';
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Send,
  Sparkles,
  AlertCircle,
  Github,
  Linkedin,

  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContentFreshnessBadge from '../components/ContentFreshnessBadge';
import { API_BASE_URL } from '../config/api.config';
import { useTheme } from '../context/ThemeContext';
import { useSkeleton } from '../context/SkeletonContext';
import SkeletonWrapper from '../components/skeleton/SkeletonWrapper';
import ContactSkeleton from '../components/skeleton/ContactSkeleton';
import SpotlightCard from '../components/SpotlightCard';

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isDark } = useTheme();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      company: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      company: Yup.string()
        .max(50, 'Must be 50 characters or less'),
      message: Yup.string()
        .min(10, 'Message must be at least 10 characters')
        .required('Project brief is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        let token = 'mock_recaptcha_token';
        if (executeRecaptcha) {
          token = await executeRecaptcha('contact_form');
        }

        const endpoint = `${API_BASE_URL}/api/contact`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...values, recaptchaToken: token })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          toast.success('Your project brief has been sent successfully!');
          resetForm();
        } else {
          toast.error(data.message || 'Failed to send message. Please try again.');
        }
      } catch (err) {
        console.error('Contact Form Error:', err);
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
          toast.error('Unable to connect to server. Please check network connection.');
        } else {
          toast.error('A network error occurred. Please try again later.');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            {...formik.getFieldProps('name')}
            className={`w-full px-4 py-3.5 input-field rounded-2xl text-sm ${formik.touched.name && formik.errors.name ? 'border-rose-500' : ''}`}
            placeholder="John Doe"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-rose-500 text-[10px] mt-1.5 flex items-center font-bold uppercase">
              <AlertCircle className="h-3.5 w-3.5 mr-1 shrink-0" />
              {formik.errors.name}
            </div>
          ) : null}
        </div>
        <div>
          <label htmlFor="email" className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            {...formik.getFieldProps('email')}
            className={`w-full px-4 py-3.5 input-field rounded-2xl text-sm ${formik.touched.email && formik.errors.email ? 'border-rose-500' : ''}`}
            placeholder="john@example.com"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-rose-500 text-[10px] mt-1.5 flex items-center font-bold uppercase">
              <AlertCircle className="h-3.5 w-3.5 mr-1 shrink-0" />
              {formik.errors.email}
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="company" className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          Company (Optional)
        </label>
        <input
          id="company"
          name="company"
          type="text"
          {...formik.getFieldProps('company')}
          className={`w-full px-4 py-3.5 input-field rounded-2xl text-sm ${formik.touched.company && formik.errors.company ? 'border-rose-500' : ''}`}
          placeholder="Your Company LLC"
        />
        {formik.touched.company && formik.errors.company ? (
          <div className="text-rose-500 text-[10px] mt-1.5 flex items-center font-bold uppercase">
            <AlertCircle className="h-3.5 w-3.5 mr-1 shrink-0" />
            {formik.errors.company}
          </div>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          Project Brief / Scope
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          {...formik.getFieldProps('message')}
          className={`w-full px-4 py-3.5 input-field rounded-2xl text-sm resize-none ${formik.touched.message && formik.errors.message ? 'border-rose-500' : ''}`}
          placeholder="Tell us about your project requirements, target timeline, and technical goals..."
        ></textarea>
        {formik.touched.message && formik.errors.message ? (
          <div className="text-rose-500 text-[10px] mt-1.5 flex items-center font-bold uppercase">
            <AlertCircle className="h-3.5 w-3.5 mr-1 shrink-0" />
            {formik.errors.message}
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary group text-white rounded-2xl py-4 font-bold text-base flex items-center justify-center space-x-2 border border-blue-400/30 shadow-xl shadow-blue-500/30 disabled:opacity-50 active:scale-95 transition-all"
      >
        {isSubmitting ? (
          <span>Sending Project Brief...</span>
        ) : (
          <>
            <span>Send Project Brief</span>
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </>
        )}
      </button>

      <p className={`text-[10px] text-center leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Protected by Google reCAPTCHA and edge security layer.
      </p>
    </form>
  );
};

const Contact = () => {
  const { isDark } = useTheme();
  const { isLoading } = useSkeleton();

  return (
    <SkeletonWrapper loading={isLoading} skeleton={<ContactSkeleton />}>
      <div className="relative min-h-screen bg-contact-atmosphere pt-36 pb-32 px-6 sm:px-8 overflow-hidden transition-colors duration-300">
        <SEO
          title="Contact Us"
          description="Get in touch with Shrayu Technologies. Request a free project consultation or submit a project brief."
          keywords="contact us, software consultation, project brief, software startup"
        />

        {/* ATMOSPHERE OVERLAYS */}
        <div className="absolute inset-0 bg-blueprint-mesh opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 noise-overlay pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10 space-y-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Breadcrumbs items={[{ label: 'Contact Us' }]} />
            <ContentFreshnessBadge pageKey="contact" />
          </div>

          {/* Header section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-500 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-blue-500/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Your Project</span>
            </div>
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Let's Build Something{' '}
              <span className="gradient-text-animated">
                Great Together
              </span>
            </h1>
            <p className={`text-base sm:text-lg font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Have an application or product in mind? Send us your brief or reach out directly to schedule a project discovery session.
            </p>
          </motion.div>

          {/* Contact Layout */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            {/* Contact Information (Left 5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              <SpotlightCard className="glass-card-3d rounded-3xl p-8 space-y-6 shadow-2xl">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Direct Communication</h2>
                <div className="space-y-5 text-xs font-semibold">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200'}`}>
                      <Mail className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <span className={`uppercase tracking-wider text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Business Email</span>
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=shrayutech@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-bold cursor-pointer hover:underline transition-colors ${isDark ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'}`}
                      >
                        shrayutech@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200'}`}>
                      <Phone className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <span className={`uppercase tracking-wider text-[9px] block mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Phone / Support</span>
                      <div className="flex flex-col gap-1 text-sm font-bold min-w-0">
                        <a
                          href="tel:+917020041614"
                          className={`cursor-pointer hover:underline transition-colors ${isDark ? 'text-white hover:text-indigo-400' : 'text-slate-900 hover:text-indigo-600'}`}
                        >
                          +91 70200 41614
                        </a>
                        <a
                          href="tel:+919359514760"
                          className={`cursor-pointer hover:underline transition-colors ${isDark ? 'text-white hover:text-indigo-400' : 'text-slate-900 hover:text-indigo-600'}`}
                        >
                          +91 93595 14760
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200'}`}>
                      <MessageSquare className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <span className={`uppercase tracking-wider text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>WhatsApp Chat</span>
                      <a
                        href="https://wa.me/917020041614"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-bold transition-colors ${isDark ? 'text-white hover:text-emerald-400' : 'text-slate-900 hover:text-emerald-600'}`}
                      >
                        Connect on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200'}`}>
                      <Clock className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <span className={`uppercase tracking-wider text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Business Hours</span>
                      <span className={`block font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Monday - Friday: 09:00 - 18:00 (IST)</span>
                      <span className={`block text-[10px] pt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Emergency infrastructure support: 24/7</span>
                    </div>
                  </div>
                </div>

                {/* Social Media Row */}
                <div className={`pt-6 border-t flex space-x-3 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                  <a
                    href="https://github.com/shrayutech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                      isDark
                        ? 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-500/20'
                        : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/10'
                    }`}
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ayushkhobragade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                      isDark
                        ? 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-500/20'
                        : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/10'
                    }`}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </SpotlightCard>

              {/* Office Location Map */}
              <div className="space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className={`text-xs font-bold uppercase tracking-widest flex items-center space-x-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>Headquarters Location</span>
                  </h3>
                  <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Chhatrapati Sambhajinagar, Maharashtra
                  </span>
                </div>
                <div className={`h-48 rounded-2xl overflow-hidden border shadow-inner ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                  <iframe
                    title="Shrayu Headquarters Map - Chhatrapati Sambhajinagar"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120074.65487779774!2d75.24430485908954!3d19.865964893706013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb9815a369bc7f%3A0x7104e3f63300445d!2sChhatrapati%20Sambhajinagar%20(Aurangabad)%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: isDark ? 'invert(90%) hue-rotate(180deg)' : 'none' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Form Card (Right 7 Cols) */}
            <div className="lg:col-span-7">
              <SpotlightCard className="glass-card-3d rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
                <div>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Project Inquiry Form</h2>
                  <p className={`text-xs font-medium pt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Fill out the details below to receive a technical scoping response.</p>
                </div>

                <GoogleReCaptchaProvider
                  reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                  useRecaptchaNet={false}
                  scriptProps={{
                    async: true,
                    defer: true,
                    appendTo: 'head',
                  }}
                >
                  <ContactForm />
                </GoogleReCaptchaProvider>
              </SpotlightCard>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* EXPLORATION & RESOURCE HUB SECTION */}
          {/* ========================================================= */}
          <div className="pt-12 border-t border-white/10 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em]">Helpful Resources</span>
              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Explore Before You Reach Out
              </h2>
              <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Discover our full capabilities, verified technical deliverables, and career pathways.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SpotlightCard className="glass-card-3d rounded-2xl p-6 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-blue-500 text-xs font-bold uppercase tracking-wider block">Service Catalog</span>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Technical Services</h3>
                  <p className={`text-xs font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Discover our end-to-end full stack, machine learning, cloud architecture, and DevOps consulting solutions.
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/services"
                    className="inline-flex items-center text-xs font-bold text-blue-500 hover:text-blue-400 group"
                  >
                    <span>Browse Service Offerings</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </SpotlightCard>

              <SpotlightCard className="glass-card-3d rounded-2xl p-6 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-emerald-500 text-xs font-bold uppercase tracking-wider block">Case Studies</span>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Engineering Showcase</h3>
                  <p className={`text-xs font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Explore 25 verified production systems and public repositories built to enterprise scalability benchmarks.
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center text-xs font-bold text-emerald-500 hover:text-emerald-400 group"
                  >
                    <span>View Engineering Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </SpotlightCard>

              <SpotlightCard className="glass-card-3d rounded-2xl p-6 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-indigo-500 text-xs font-bold uppercase tracking-wider block">Talent & Culture</span>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Careers & Opportunities</h3>
                  <p className={`text-xs font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Looking to engineer high-impact software alongside senior practitioners? Review our open roles and culture.
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    href="/careers"
                    className="inline-flex items-center text-xs font-bold text-indigo-500 hover:text-indigo-400 group"
                  >
                    <span>View Open Positions</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </div>
    </SkeletonWrapper>
  );
};

export default Contact;

