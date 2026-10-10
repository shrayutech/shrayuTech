import AIContentDashboard from '../../../src/views/admin/AIContentDashboard';
import GroundedAssistant from '../../../src/components/ai/GroundedAssistant';
import { Sparkles, ShieldCheck, Cpu } from 'lucide-react';
import { buildAdminMetadata } from '../../../src/utils/seo/metadataBuilders';

// Protected Admin Route - robots: index: false, follow: false
export const metadata = buildAdminMetadata(
  'AI Content Governance & Review Console',
  'Internal admin console for reviewing, approving, regenerating, and auditing AI-generated and assisted content across products, locations, and services.'
);


export default function AdminAIContentPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-28 pb-20 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <header className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 rounded-full text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Content Governance &amp; Editorial Review</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            AI Content Management System
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Manage, review, validate, and publish AI-assisted technical content across all system codebases, regional delivery hubs, and software engineering services. Every generation is verified against ground-truth database models to eliminate hallucinations and ungrounded marketing claims.
          </p>
        </header>

        {/* Live Grounded RAG Assistant Demonstration */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Interactive Grounded AI Technical Assistant (RAG Grounding)</span>
          </h2>
          <GroundedAssistant />
        </section>

        {/* Admin Review Dashboard */}
        <section className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Editorial Review Queue &amp; Provenance Registry
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Inspect generated drafts, review anti-hallucination checks, and approve content for production indexation.
              </p>
            </div>
          </div>

          <AIContentDashboard />
        </section>
      </div>
    </main>
  );
}

