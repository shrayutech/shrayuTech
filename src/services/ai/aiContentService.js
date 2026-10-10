/**
 * aiContentService.js
 * Central AI Content Management and Generation Service.
 * 
 * Orchestrates:
 * 1. Data retrieval from verified authoritative models
 * 2. Injection-safe prompt construction
 * 3. Multi-provider execution (deterministic / external)
 * 4. Post-generation anti-hallucination validation
 * 5. Audit trail registration and review workflow
 */

import { getAIProvider } from './providers/aiProvider.js';
import { buildPromptPayload, PROMPT_VERSIONS } from './prompts/promptTemplates.js';
import { validateAiContent } from './validation/aiContentValidator.js';
import {
  saveAiContentRecord,
  getAiContentById,
  getAllAiContentRecords,
  updateAiContentWorkflowStatus
} from '../../data/aiContentRegistry.js';
import { portfolioProjects } from '../../data/portfolioProjects.js';
import { statesData } from '../../data/locationsData.js';
import { servicesData } from '../../data/servicesData.js';
import { curatedComparisons } from '../../data/comparisonsData.js';
import { researchReports } from '../../data/researchData.js';
import { normalizeProjectSlug } from '../../utils/portfolioUtils.js';

// Telemetry counters
let totalGenerationsCount = 4;
let totalTokensCount = 1420;

/**
 * Resolves the authoritative source entity for a given entityType and entityId.
 */
export function resolveSourceEntity(entityType, entityId) {
  if (!entityId) return null;

  switch (entityType) {
    case 'product':
    case 'system': {
      const cleanSlug = entityId.toLowerCase();
      return portfolioProjects.find(
        (p) => normalizeProjectSlug(p.repo) === cleanSlug || String(p.id) === entityId
      ) || null;
    }

    case 'location': {
      // entityId can be 'maharashtra/pune' or 'pune'
      const citySlug = entityId.includes('/') ? entityId.split('/')[1] : entityId;
      for (const state of statesData) {
        const city = (state.cities || []).find((c) => c.slug === citySlug);
        if (city) {
          return { ...city, stateName: state.name, stateSlug: state.slug };
        }
      }
      return null;
    }

    case 'service': {
      const clean = entityId.toLowerCase();
      return servicesData.find((s) => s.slug === clean) || null;
    }

    case 'comparison': {
      const clean = entityId.toLowerCase();
      return curatedComparisons.find((c) => c.slug === clean) || null;
    }

    case 'research': {
      const clean = entityId.toLowerCase();
      return researchReports.find((r) => r.slug === clean) || null;
    }

    default:
      return null;
  }
}

/**
 * Generates verified AI content for an entity, validates it, and saves it as a draft or pending review.
 */
export async function generateContentForEntity({
  entityType,
  entityId,
  contentType = 'general',
  promptVersion = PROMPT_VERSIONS.PRODUCT_DESCRIPTION,
  autoApproveIfValid = false
}) {
  const sourceEntity = resolveSourceEntity(entityType, entityId);
  if (!sourceEntity) {
    throw new Error(`Source entity not found for type: "${entityType}", ID: "${entityId}"`);
  }

  // 1. Build Injection-Safe Prompt
  const promptPayload = buildPromptPayload(promptVersion, sourceEntity);

  // 2. Invoke Provider
  const provider = getAIProvider();
  const generationResponse = await provider.generateStructuredContent({
    prompt: promptPayload.prompt,
    systemInstruction: promptPayload.systemInstruction,
    contextData: { entity: sourceEntity, entityType }
  });

  totalGenerationsCount++;
  totalTokensCount += (generationResponse.promptTokens || 100) + (generationResponse.completionTokens || 200);

  // 3. Post-Generation Anti-Hallucination & Numerical Validation
  const validation = validateAiContent(generationResponse.data, sourceEntity, entityType);

  // 4. Create Audit Record
  const newId = `ai-${entityType}-${entityId.replace(/[^a-zA-Z0-9]/g, '-')}-v${Date.now()}`;
  const status = autoApproveIfValid && validation.canAutoPublish ? 'approved' : 'pending_review';

  const record = {
    id: newId,
    entityType,
    entityId,
    contentType,
    language: 'en',
    version: 1,
    title: generationResponse.data.title || `${sourceEntity.title || sourceEntity.name} AI Content`,
    summary: generationResponse.data.summary || '',
    content: generationResponse.data,
    status: validation.isValid ? status : 'rejected',
    sourceDataHash: `hash-${Date.now()}`,
    aiProvider: provider.name,
    aiModel: provider.model,
    promptVersion,
    generatedAt: new Date().toISOString(),
    reviewedBy: null,
    reviewedAt: null,
    publishedAt: null,
    needsRefresh: false,
    validationResults: validation
  };

  saveAiContentRecord(record);
  return record;
}

/**
 * Approves and publishes an AI content item.
 */
export function approveAndPublishContent(contentId, reviewerName = 'Admin Editor') {
  const record = getAiContentById(contentId);
  if (!record) {
    throw new Error(`Content record not found: ${contentId}`);
  }
  if (!record.validationResults?.isValid) {
    throw new Error('Cannot publish content with active validation errors.');
  }

  return updateAiContentWorkflowStatus(contentId, 'published', reviewerName, 'Approved following editorial review.');
}

/**
 * Rejects an AI content item.
 */
export function rejectContent(contentId, reviewerName = 'Admin Editor', reason = 'Content did not meet editorial guidelines.') {
  return updateAiContentWorkflowStatus(contentId, 'rejected', reviewerName, reason);
}

/**
 * Flags content as needing refresh when underlying source entity changes.
 */
export function markContentStale(contentId, reason = 'Source data changed') {
  const record = getAiContentById(contentId);
  if (!record) return null;
  record.needsRefresh = true;
  record.workflowNotes = reason;
  saveAiContentRecord(record);
  return record;
}

/**
 * Retrieves all items flagged as stale for the Content Refresh System.
 */
export function getStaleContentItems() {
  return getAllAiContentRecords().filter((r) => r.needsRefresh === true);
}

/**
 * Returns telemetry metrics for cost and token monitoring.
 */
export function getAIUsageTelemetry() {
  const allRecords = getAllAiContentRecords();
  return {
    totalGenerations: totalGenerationsCount,
    totalTokens: totalTokensCount,
    estimatedCostUsd: Number(((totalTokensCount / 1000) * 0.0015).toFixed(4)),
    recordsCount: allRecords.length,
    byStatus: {
      published: allRecords.filter((r) => r.status === 'published').length,
      pending_review: allRecords.filter((r) => r.status === 'pending_review').length,
      draft: allRecords.filter((r) => r.status === 'draft').length,
      rejected: allRecords.filter((r) => r.status === 'rejected').length,
      stale: allRecords.filter((r) => r.needsRefresh).length
    }
  };
}

