import Link from 'next/link';

// In Next.js 15 App Router, not-found.jsx cannot export metadata (it triggers Invariant: no direct app page entry found for /_not-found)
export default function NotFound() {

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden bg-slate-950 text-white">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-xl w-full text-center space-y-8 relative z-10 p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest">
          <span>Error 404</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          Page Not Found
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
          The engineering page or resource you are looking for has been moved, renamed, or is currently unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/25 active:scale-95"
          >
            Return to Homepage
          </Link>
          <Link
            href="/portfolio"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/10 transition-all active:scale-95"
          >
            Explore Portfolio
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-transparent hover:bg-white/5 text-slate-300 hover:text-white font-semibold text-sm border border-transparent transition-all"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
