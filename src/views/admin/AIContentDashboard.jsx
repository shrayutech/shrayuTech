"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Eye,
  Filter,
  DollarSign,
  Activity,
  Layers,
  ArrowRight,
  Database
} from 'lucide-react';
import {
  getAllAiContentRecords,
  updateAiContentWorkflowStatus,
  saveAiContentRecord
} from '../../data/aiContentRegistry';
import { getAIUsageTelemetry } from '../../services/ai/aiContentService';

export default function AIContentDashboard() {
  const [records, setRecords] = useState(getAllAiContentRecords());
  const [telemetry, setTelemetry] = useState(getAIUsageTelemetry());
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [actionNotice, setActionNotice] = useState('');

  const handleApprove = (id) => {
    updateAiContentWorkflowStatus(id, 'published', 'Admin Editor', 'Approved and verified by admin.');
    setRecords(getAllAiContentRecords());
    setTelemetry(getAIUsageTelemetry());
    setActionNotice(`Record ${id} successfully approved and marked as Published.`);
    setTimeout(() => setActionNotice(''), 3000);
  };

  const handleReject = (id) => {
    updateAiContentWorkflowStatus(id, 'rejected', 'Admin Editor', 'Rejected by admin during editorial review.');
    setRecords(getAllAiContentRecords());
    setTelemetry(getAIUsageTelemetry());
    setActionNotice(`Record ${id} marked as Rejected.`);
    setTimeout(() => setActionNotice(''), 3000);
  };

  const handleRegenerate = (id) => {
    const item = records.find(r => r.id === id);
    if (!item) return;

    // Simulate grounded regeneration keeping version history
    const regenerated = {
      ...item,
      version: item.version + 1,
      status: 'pending_review',
      generatedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      needsRefresh: false,
      workflowNotes: `Regenerated to version ${item.version + 1}`
    };
    saveAiContentRecord(regenerated);
    setRecords(getAllAiContentRecords());
    setTelemetry(getAIUsageTelemetry());
    setActionNotice(`Record ${id} regenerated to version ${regenerated.version} and queued for review.`);
    setTimeout(() => setActionNotice(''), 3000);
  };

  const filteredRecords = records.filter((r) => {
    if (filterStatus === 'stale') return r.needsRefresh === true;
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    if (filterType !== 'all' && r.entityType !== filterType) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Telemetry & Usage Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>Total Generations</span>
          </div>
          <div className="text-2xl font-black text-white">{telemetry.totalGenerations}</div>
          <div className="text-[11px] text-slate-500">Tracked operations</div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tokens Processed</span>
          </div>
          <div className="text-2xl font-black text-white">{telemetry.totalTokens}</div>
          <div className="text-[11px] text-slate-500">Prompt &amp; Completion</div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>Estimated Cost</span>
          </div>
          <div className="text-2xl font-black text-white">${telemetry.estimatedCostUsd}</div>
          <div className="text-[11px] text-slate-500">Standard API tier</div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Pending Review</span>
          </div>
          <div className="text-2xl font-black text-amber-400">{telemetry.byStatus.pending_review}</div>
          <div className="text-[11px] text-slate-500">Requires sign-off</div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
            <span>Needs Refresh</span>
          </div>
          <div className="text-2xl font-black text-purple-400">{telemetry.byStatus.stale}</div>
          <div className="text-[11px] text-slate-500">Stale source records</div>
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center space-x-2">
          <CheckCircle className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium flex items-center space-x-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </span>
          {['all', 'pending_review', 'published', 'draft', 'rejected', 'stale'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer capitalize ${
                filterStatus === status
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400">Entity:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none"
          >
            <option value="all">All Entities</option>
            <option value="product">Products / Systems</option>
            <option value="location">Locations / Hubs</option>
            <option value="service">Services</option>
            <option value="comparison">Comparisons</option>
          </select>
        </div>
      </div>

      {/* Records Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/10 text-slate-300 font-semibold uppercase text-[11px] tracking-wider border-b border-white/10">
            <tr>
              <th className="py-3 px-4">Entity</th>
              <th className="py-3 px-4">Title &amp; Summary</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Validation</th>
              <th className="py-3 px-4">Model &amp; Prompt</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No AI content records match the active filters.
                </td>
              </tr>
            ) : (
              filteredRecords.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 capitalize">
                      {item.entityType}
                    </span>
                    <div className="font-mono text-[10px] text-slate-500 mt-1 truncate max-w-[120px]">
                      {item.entityId}
                    </div>
                  </td>

                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-semibold text-white truncate">{item.title}</div>
                    <div className="text-slate-400 text-[11px] line-clamp-1 mt-0.5">{item.summary}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.needsRefresh
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                          : item.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : item.status === 'pending_review'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : item.status === 'rejected'
                                ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                                : 'bg-slate-500/10 text-slate-400 border border-slate-500/30'
                      }`}
                    >
                      {item.needsRefresh ? 'Needs Refresh' : item.status.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {item.validationResults?.isValid ? (
                      <span className="inline-flex items-center space-x-1 text-emerald-400 text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Grounded (0 err)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-red-400 text-[11px]">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Failed validation</span>
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400">
                    <div>{item.aiModel}</div>
                    <div className="text-slate-500">{item.promptVersion}</div>
                  </td>

                  <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedRecord(item)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors cursor-pointer"
                      title="Inspect full details and diff"
                    >
                      <Eye className="w-3.5 h-3.5 inline mr-1" />
                      <span>View</span>
                    </button>

                    {item.status !== 'published' && (
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                        title="Approve and publish"
                      >
                        Approve
                      </button>
                    )}

                    {item.status === 'pending_review' && (
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-2.5 py-1 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs transition-colors cursor-pointer"
                        title="Reject generation"
                      >
                        Reject
                      </button>
                    )}

                    <button
                      onClick={() => handleRegenerate(item.id)}
                      className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-xs transition-colors cursor-pointer"
                      title="Regenerate new draft version"
                    >
                      <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                      <span>Regen</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail / Diff Modal */}
      {selectedRecord && (
        <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Database className="w-4 h-4 text-blue-400" />
              <span>Inspection View: {selectedRecord.title}</span>
            </h3>
            <button
              onClick={() => setSelectedRecord(null)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer px-2 py-1 rounded bg-white/5"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2">
              <strong className="text-slate-300 uppercase text-[10px] tracking-wider block">Generated Content Payload</strong>
              <pre className="text-slate-300 font-mono text-[11px] whitespace-pre-wrap overflow-y-auto max-h-60">
                {JSON.stringify(selectedRecord.content, null, 2)}
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2">
              <strong className="text-slate-300 uppercase text-[10px] tracking-wider block">Validation &amp; Audit Trail</strong>
              <div className="space-y-1.5 text-slate-400">
                <div><span className="text-slate-500">Record ID:</span> {selectedRecord.id}</div>
                <div><span className="text-slate-500">Status:</span> {selectedRecord.status}</div>
                <div><span className="text-slate-500">Version:</span> v{selectedRecord.version}</div>
                <div><span className="text-slate-500">AI Model:</span> {selectedRecord.aiModel}</div>
                <div><span className="text-slate-500">Prompt Template:</span> {selectedRecord.promptVersion}</div>
                <div><span className="text-slate-500">Generated At:</span> {selectedRecord.generatedAt}</div>
                {selectedRecord.reviewedBy && (
                  <div><span className="text-slate-500">Reviewed By:</span> {selectedRecord.reviewedBy} at {selectedRecord.reviewedAt}</div>
                )}
                <div><span className="text-slate-500">Validation Passed:</span> {selectedRecord.validationResults?.isValid ? 'Yes (100% Grounded)' : 'No'}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

