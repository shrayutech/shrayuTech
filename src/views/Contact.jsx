"use client";
import { useState } from 'react';
import { revealOnScroll } from '../utils/motionPresets';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
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
  Linkedin
} from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { API_BASE_URL } from '../config/api.config';
import { useSkeleton } from '../context/SkeletonContext';
import SkeletonWrapper from '../components/skeleton/SkeletonWrapper';
import ContactSkeleton from '../components/skeleton/ContactSkeleton';
import SpotlightCard from '../components/SpotlightCard';

// Field limits — keep in sync with backend/src/middleware/validator.js
const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  mobile: { max: 20, minDigits: 10, maxDigits: 15 },
  company: { max: 100 },
  message: { min: 10, max: 2000 },
};

const NAME_PATTERN = /^[\p{L}\p{M} .'-]+$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MOBILE_PATTERN = /^\+?[0-9\s\-()]+$/;
const NO_CONTROL_CHARS = /^[^\x00-\x1F\x7F]*$/;

const contactValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Full name is required')
    .min(LIMITS.name.min, `Name must be at least ${LIMITS.name.min} characters`)
    .max(LIMITS.name.max, `Name must be ${LIMITS.name.max} characters or less`)
    .matches(NAME_PATTERN, { message: 'Use letters, spaces, apostrophes, dots or hyphens only', excludeEmptyString: true }),
  email: Yup.string()
    .trim()
    .required('Email address is required')
    .max(LIMITS.email.max, `Email must be ${LIMITS.email.max} characters or less`)
    .email('Enter a valid email address')
    .matches(EMAIL_PATTERN, { message: 'Enter a valid email address (e.g. name@company.com)', excludeEmptyString: true }),
  mobile: Yup.string()
    .trim()
    .required('Mobile number is required')
    .matches(MOBILE_PATTERN, { message: 'Only digits, spaces, +, - and () allowed', excludeEmptyString: true })
    .test('digit-count', `Enter a valid mobile number (${LIMITS.mobile.minDigits}-${LIMITS.mobile.maxDigits} digits)`, (value) => {
      if (!value) return true; // handled by required()
      const digits = value.replace(/\D/g, '').length;
      return digits >= LIMITS.mobile.minDigits && digits <= LIMITS.mobile.maxDigits;
    }),
  company: Yup.string()
    .trim()
    .max(LIMITS.company.max, `Company must be ${LIMITS.company.max} characters or less`)
    .matches(NO_CONTROL_CHARS, { message: 'Company contains invalid characters', excludeEmptyString: true }),
  message: Yup.string()
    .trim()
    .required('Project brief is required')
    .min(LIMITS.message.min, `Please write at least ${LIMITS.message.min} characters`)
    .max(LIMITS.message.max, `Message must be ${LIMITS.message.max} characters or less`),
});

const FormField = ({ formik, name, label, required = false, as = 'input', hint, ...inputProps }) => {
  const hasError = formik.touched[name] && formik.errors[name];
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  const Control = as;

  return (
    <div>
      <label htmlFor={name} className={`block text-xs font-bold uppercase tracking-wider mb-2 ${'light:text-slate-700 dark:text-slate-300'}`}>
        {label}
        {required ? (
          <>
            <span className="text-rose-500 ml-0.5" aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
          </>
        ) : (
          <span className="normal-case font-semibold tracking-normal light:text-slate-400 dark:text-slate-500"> (Optional)</span>
        )}
      </label>
      <Control
        id={name}
        name={name}
        aria-required={required || undefined}
        aria-invalid={hasError ? true : undefined}
        aria-describedby={[hasError ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined}
        {...formik.getFieldProps(name)}
        {...inputProps}
        className={`w-full px-4 py-3.5 input-field rounded-2xl text-sm ${as === 'textarea' ? 'resize-none' : ''} ${hasError ? 'border-rose-500' : ''}`}
      />
      <div className="flex items-start justify-between gap-3">
        {hasError ? (
          <div id={errorId} role="alert" className="text-rose-500 text-[10px] mt-1.5 flex items-center font-bold uppercase">
            <AlertCircle className="h-3.5 w-3.5 mr-1 shrink-0" />
            {formik.errors[name]}
          </div>
        ) : <span />}
        {hint ? (
          <span id={hintId} className={`text-[10px] mt-1.5 shrink-0 tabular-nums ${'light:text-slate-500 dark:text-slate-400'}`}>
            {hint}
          </span>
        ) : null}
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      company: '',
      message: ''
    },
    validationSchema: contactValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const endpoint = `${API_BASE_URL}/api/contact`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // Send the trimmed values the schema validated
          body: JSON.stringify(contactValidationSchema.cast(values))
        });

        const data = await response.json();

        if (response.ok && data.success) {
          toast.success('Your project brief has been sent successfully!');
          resetForm();
        } else {
          // Validation failures carry field-level messages in `details`
          toast.error(data.details?.[0] || data.error || data.message || 'Failed to send message. Please try again.');
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

  const messageLength = formik.values.message.trim().length;

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="space-y-6">
      <p className={`text-[10px] font-semibold ${'light:text-slate-500 dark:text-slate-400'}`}>
        Fields marked <span className="text-rose-500" aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          formik={formik}
          name="name"
          label="Full Name"
          required
          type="text"
          autoComplete="name"
          maxLength={LIMITS.name.max}
          placeholder="John Doe"
        />
        <FormField
          formik={formik}
          name="email"
          label="Email Address"
          required
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={LIMITS.email.max}
          placeholder="john@example.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          formik={formik}
          name="mobile"
          label="Mobile Number"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={LIMITS.mobile.max}
          placeholder="+91 98765 43210"
        />
        <FormField
          formik={formik}
          name="company"
          label="Company"
          type="text"
          autoComplete="organization"
          maxLength={LIMITS.company.max}
          placeholder="Your Company LLC"
        />
      </div>

      <FormField
        formik={formik}
        name="message"
        label="Project Brief / Scope"
        required
        as="textarea"
        rows={5}
        maxLength={LIMITS.message.max}
        placeholder="Tell us about your project requirements, target timeline, and technical goals..."
        hint={`${messageLength}/${LIMITS.message.max}`}
      />

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
    </form>
  );
};

const Contact = () => {
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
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight ${'light:text-slate-900 dark:text-white'}`}>
              Get in Touch{' '}
              <span className="gradient-text-animated">
                With Us
              </span>
            </h1>
            <p className={`text-base sm:text-lg font-medium leading-relaxed ${'light:text-slate-600 dark:text-slate-300'}`}>
              Have an application or product in mind? Send us your brief or reach out directly to schedule a project discovery session.
            </p>
          </motion.div>

          {/* Contact Layout */}
          <motion.div
            {...revealOnScroll}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            {/* Contact Information (Left 5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              <SpotlightCard className="glass-card-3d rounded-3xl p-8 space-y-6 shadow-2xl">
                <h2 className={`text-xl font-bold ${'light:text-slate-900 dark:text-white'}`}>Direct Communication</h2>
                <div className="space-y-5 text-xs font-semibold">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${'light:bg-slate-100 light:border light:border-slate-200 dark:bg-white/5 dark:border dark:border-white/10'}`}>
                      <Mail className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <span className={`uppercase tracking-wider text-[9px] block ${'light:text-slate-500 dark:text-slate-400'}`}>Business Email</span>
                      <a
                        href="mailto:contact@shrayutech.com"
                        className={`text-sm font-bold cursor-pointer hover:underline transition-colors ${'light:text-slate-900 light:hover:text-blue-600 dark:text-white dark:hover:text-blue-400'}`}
                      >
                        contact@shrayutech.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${'light:bg-slate-100 light:border light:border-slate-200 dark:bg-white/5 dark:border dark:border-white/10'}`}>
                      <Phone className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <span className={`uppercase tracking-wider text-[9px] block mb-1 ${'light:text-slate-500 dark:text-slate-400'}`}>Phone / Support</span>
                      <div className="flex flex-col gap-1 text-sm font-bold min-w-0">
                        <a
                          href="tel:+917020041614"
                          className={`cursor-pointer hover:underline transition-colors ${'light:text-slate-900 light:hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400'}`}
                        >
                          +91 70200 41614
                        </a>
                        <a
                          href="tel:+919359514760"
                          className={`cursor-pointer hover:underline transition-colors ${'light:text-slate-900 light:hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400'}`}
                        >
                          +91 93595 14760
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${'light:bg-slate-100 light:border light:border-slate-200 dark:bg-white/5 dark:border dark:border-white/10'}`}>
                      <MessageSquare className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <span className={`uppercase tracking-wider text-[9px] block ${'light:text-slate-500 dark:text-slate-400'}`}>WhatsApp Chat</span>
                      <a
                        href="https://wa.me/917020041614"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-bold transition-colors ${'light:text-slate-900 light:hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400'}`}
                      >
                        Connect on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${'light:bg-slate-100 light:border light:border-slate-200 dark:bg-white/5 dark:border dark:border-white/10'}`}>
                      <Clock className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <span className={`uppercase tracking-wider text-[9px] block ${'light:text-slate-500 dark:text-slate-400'}`}>Business Hours</span>
                      <span className={`block font-bold ${'light:text-slate-900 dark:text-white'}`}>Monday - Friday: 09:00 - 18:00 (IST)</span>
                      <span className={`block text-[10px] pt-0.5 ${'light:text-slate-500 dark:text-slate-400'}`}>Emergency infrastructure support: 24/7</span>
                    </div>
                  </div>
                </div>

                {/* Social Media Row */}
                <div className={`pt-6 border-t flex space-x-3 ${'light:border-slate-200 dark:border-white/10'}`}>
                  <a
                    href="https://github.com/shrayutech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                      'light:bg-slate-100 light:border light:border-slate-200 light:text-slate-700 light:hover:text-blue-600 light:hover:bg-blue-50 light:hover:border-blue-300 light:hover:shadow-md light:hover:shadow-blue-500/10 dark:bg-white/5 dark:border dark:border-white/10 dark:text-slate-300 dark:hover:text-white dark:hover:bg-blue-600/20 dark:hover:border-blue-500/40 dark:hover:shadow-md dark:hover:shadow-blue-500/20'
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
                      'light:bg-slate-100 light:border light:border-slate-200 light:text-slate-700 light:hover:text-blue-600 light:hover:bg-blue-50 light:hover:border-blue-300 light:hover:shadow-md light:hover:shadow-blue-500/10 dark:bg-white/5 dark:border dark:border-white/10 dark:text-slate-300 dark:hover:text-white dark:hover:bg-blue-600/20 dark:hover:border-blue-500/40 dark:hover:shadow-md dark:hover:shadow-blue-500/20'
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
                  <h3 className={`text-xs font-bold uppercase tracking-widest flex items-center space-x-2 ${'light:text-slate-700 dark:text-slate-300'}`}>
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>Headquarters Location</span>
                  </h3>
                  <span className={`text-xs font-semibold ${'light:text-slate-600 dark:text-slate-400'}`}>
                    Chhatrapati Sambhajinagar, Maharashtra
                  </span>
                </div>
                <div className={`h-48 rounded-2xl overflow-hidden border shadow-inner ${'light:border-slate-200 dark:border-white/10'}`}>
                  <iframe
                    className="dark:invert-[90%] dark:hue-rotate-180"
                    title="Shrayu Headquarters Map - Chhatrapati Sambhajinagar"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120074.65487779774!2d75.24430485908954!3d19.865964893706013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb9815a369bc7f%3A0x7104e3f63300445d!2sChhatrapati%20Sambhajinagar%20(Aurangabad)%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
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
                  <h2 className={`text-2xl font-bold ${'light:text-slate-900 dark:text-white'}`}>Project Inquiry Form</h2>
                  <p className={`text-xs font-medium pt-1 ${'light:text-slate-600 dark:text-slate-400'}`}>Fill out the details below to receive a technical scoping response.</p>
                </div>

                <ContactForm />
              </SpotlightCard>
            </div>
          </motion.div>

        </div>
      </div>
    </SkeletonWrapper>
  );
};

export default Contact;

