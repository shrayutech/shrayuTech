/**
 * aiContentRegistry.js
 * In-Memory Audit Trail and Content Registry for AI-Generated & Assisted Content.
 * 
 * Tracks provenance:
 * - Entity Type & Entity ID
 * - Content Type & Language
 * - Versioning (v1, v2...)
 * - Workflow Status (draft -> pending_review -> approved -> published -> rejected -> archived)
 * - Source Data Hash & Generation Model
 * - Reviewer details & Validation audit findings
 */

export const initialAiContentRecords = [
  {
    id: 'ai-prod-1-v1',
    entityType: 'product',
    entityId: 'ai-autonomous-navigation-system',
    contentType: 'highlights_and_faq',
    language: 'en',
    version: 1,
    title: 'AI Autonomous Navigation System Architecture',
    summary: 'Kinematic trajectory planner using A* and Dijkstra graph traversal algorithms for obstacle avoidance with zero GPU requirement.',
    content: {
      highlights: [
        'Kinematic graph traversal with sub-50ms collision-free path planning',
        'Lightweight Python 3.10 + Pygame simulation modeling robotics pipelines',
        'Verified open-source repository on GitHub'
      ],
      faqs: [
        {
          question: 'Does this autonomous navigation simulation require dedicated GPU acceleration?',
          answer: 'No. The system is engineered in Python with A* and Dijkstra graph search, running efficiently on standard multi-core CPUs without GPU hardware.'
        },
        {
          question: 'Can the trajectory planner avoid dynamic obstacles?',
          answer: 'Yes. The algorithm models dynamic sensor inputs and re-computes kinematic trajectories in real time.'
        }
      ],
      seoTitle: 'AI Autonomous Navigation System | Architecture & Python Code',
      metaDescription: 'Inspect collision-free autonomous path planning algorithms modeled in Python. Verified open-source code and zero GPU requirement.'
    },
    status: 'published',
    sourceDataHash: 'hash-nav-sys-101',
    aiProvider: 'grounded-deterministic',
    aiModel: 'deterministic-grounded-v1',
    promptVersion: 'product-description-v1',
    generatedAt: '2026-10-01T10:00:00.000Z',
    reviewedBy: 'Chief Systems Architect',
    reviewedAt: '2026-10-02T14:30:00.000Z',
    publishedAt: '2026-10-03T09:00:00.000Z',
    updatedAt: '2026-10-03T09:00:00.000Z',
    needsRefresh: false,
    validationResults: {
      isValid: true,
      errors: [],
      warnings: [],
      similarityScore: 0.42
    }
  },

  {
    id: 'ai-serv-custom-v1',
    entityType: 'service',
    entityId: 'custom-software',
    contentType: 'service_expansion',
    language: 'en',
    version: 1,
    title: 'Custom Software Development Practice',
    summary: 'Architectural overview of bespoke backend engines, single-tenant schemas, and distributed microservices.',
    content: {
      highlights: [
        'Single-tenant data isolation conforming to regulatory compliance',
        'Sub-50ms query latency through Redis caching and PostgreSQL partitioning',
        '100% intellectual property ownership transfer upon sign-off'
      ],
      faqs: [
        {
          question: 'What is the intellectual property policy for custom software engagements?',
          answer: 'You retain 100% intellectual property ownership from day one. All code and deployment scripts are transferred directly to your private git repositories.'
        }
      ],
      seoTitle: 'Custom Software Development Services | Shrayu Technologies',
      metaDescription: 'Enterprise backend engineering and distributed microservices. Built with Node.js, Go, Python, and PostgreSQL.'
    },
    status: 'pending_review', // Queued for editor approval
    sourceDataHash: 'hash-serv-custom-303',
    aiProvider: 'grounded-deterministic',
    aiModel: 'deterministic-grounded-v1',
    promptVersion: 'service-description-v1',
    generatedAt: '2026-10-09T08:00:00.000Z',
    reviewedBy: null,
    reviewedAt: null,
    publishedAt: null,
    updatedAt: '2026-10-09T08:00:00.000Z',
    needsRefresh: false,
    validationResults: {
      isValid: true,
      errors: [],
      warnings: ['Awaiting human editorial review before production publication'],
      similarityScore: 0.45
    }
  },
  {
    id: 'ai-comp-nav-vs-threat-v1',
    entityType: 'comparison',
    entityId: 'ai-autonomous-navigation-system-vs-ai-powered-cybersecurity-threat-detection',
    contentType: 'comparison_tradeoffs',
    language: 'en',
    version: 1,
    title: 'Kinematic Trajectory Simulation vs SOC Threat Detection',
    summary: 'Objective architectural trade-off analysis between graph search navigation and streaming network telemetry classification.',
    content: {
      highlights: [
        'Kinematic graph planning prioritizes spatial collision constraints',
        'SOC threat detection prioritizes flow telemetry throughput and packet triage latency',
        'Both architectures run on standard CPU infrastructure'
      ],
      faqs: [
        {
          question: 'Can the SOC intrusion model run in the same container as the path planner?',
          answer: 'Both run in isolated container environments to prevent CPU contention between graph traversals and streaming telemetry buffers.'
        }
      ],
      seoTitle: 'Autonomous Navigation vs Cyber Threat Detection | Technical Benchmark',
      metaDescription: 'Objective comparison between spatial trajectory simulation and streaming network intrusion detection.'
    },
    status: 'draft',
    sourceDataHash: 'hash-comp-nav-threat-404',
    aiProvider: 'grounded-deterministic',
    aiModel: 'deterministic-grounded-v1',
    promptVersion: 'comparison-summary-v1',
    generatedAt: '2026-10-10T12:00:00.000Z',
    reviewedBy: null,
    reviewedAt: null,
    publishedAt: null,
    updatedAt: '2026-10-10T12:00:00.000Z',
    needsRefresh: false,
    validationResults: {
      isValid: true,
      errors: [],
      warnings: [],
      similarityScore: 0.35
    }
  },
  {
    id: 'ai-stale-prod-sample',
    entityType: 'product',
    entityId: 'smart-grocery-list-inventory-manager',
    contentType: 'highlights_and_faq',
    language: 'en',
    version: 1,
    title: 'Smart Grocery Inventory System (Legacy Spec)',
    summary: 'Older version of inventory manager specifications.',
    content: {
      highlights: ['Inventory threshold alerts', 'MERN stack'],
      faqs: []
    },
    status: 'published',
    sourceDataHash: 'outdated-hash-001',
    aiProvider: 'grounded-deterministic',
    aiModel: 'deterministic-grounded-v1',
    promptVersion: 'product-description-v1',
    generatedAt: '2025-06-01T10:00:00.000Z',
    reviewedBy: 'Staff QA',
    reviewedAt: '2025-06-02T10:00:00.000Z',
    publishedAt: '2025-06-03T10:00:00.000Z',
    updatedAt: '2025-06-03T10:00:00.000Z',
    needsRefresh: true, // Content Refresh integration: flagged as stale
    validationResults: {
      isValid: true,
      errors: [],
      warnings: ['Source database specifications updated; content requires refresh'],
      similarityScore: 0.5
    }
  }
];

let inMemoryRegistry = [...initialAiContentRecords];

export function getAllAiContentRecords() {
  return [...inMemoryRegistry];
}

export function getAiContentById(id) {
  return inMemoryRegistry.find(r => r.id === id) || null;
}

export function getAiContentByEntity(entityType, entityId) {
  return inMemoryRegistry.filter(r => r.entityType === entityType && r.entityId === entityId);
}

export function saveAiContentRecord(record) {
  const existingIdx = inMemoryRegistry.findIndex(r => r.id === record.id);
  if (existingIdx >= 0) {
    inMemoryRegistry[existingIdx] = { ...record, updatedAt: new Date().toISOString() };
  } else {
    inMemoryRegistry.push({
      ...record,
      createdAt: record.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  return record;
}

export function updateAiContentWorkflowStatus(id, newStatus, reviewer = null, notes = '') {
  const item = getAiContentById(id);
  if (!item) return null;

  const validStatuses = ['draft', 'pending_review', 'approved', 'published', 'rejected', 'archived'];
  if (!validStatuses.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }

  item.status = newStatus;
  item.updatedAt = new Date().toISOString();

  if (reviewer) {
    item.reviewedBy = reviewer;
    item.reviewedAt = new Date().toISOString();
  }

  if (newStatus === 'published') {
    item.publishedAt = new Date().toISOString();
    item.needsRefresh = false;
  }

  if (notes) {
    item.workflowNotes = notes;
  }

  saveAiContentRecord(item);
  return item;
}

export function resetAiContentRegistry() {
  inMemoryRegistry = [...initialAiContentRecords];
}

