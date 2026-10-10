/**
 * researchValidators.js
 * Quality Gates, Sample Size Safeguards, and Anti-Manipulation Validators
 * for Original First-Party Research Reports.
 * 
 * Enforces zero-fabrication rules, minimum sample size requirements,
 * privacy sanitization, and data transparency before publication.
 */

export const MINIMUM_SAMPLE_THRESHOLDS = {
  software_systems: 5,        // At least 5 repositories required for architecture studies
  regional_hubs: 2,           // At least 2 geographic hubs required for regional studies
  algorithm_benchmarks: 3,    // At least 3 benchmarks required for performance studies
  delivery_disciplines: 3,    // At least 3 disciplines required for delivery studies
  survey_respondents: 500     // At least 500 verified respondents required for consumer surveys
};

/**
 * Validates whether a research report meets all publication and ethics criteria.
 * 
 * @param {object} report - The research report object to validate
 * @returns {{ isValid: boolean, isIndexable: boolean, errors: string[], warnings: string[] }}
 */
export function validateResearchReport(report) {
  const errors = [];
  const warnings = [];

  if (!report) {
    return {
      isValid: false,
      isIndexable: false,
      errors: ['Research report object is null or undefined'],
      warnings: []
    };
  }

  // 1. Core Identification & Routing Checks
  if (!report.slug || typeof report.slug !== 'string' || report.slug.trim().length === 0) {
    errors.push('Missing or invalid research slug');
  }

  if (!report.title || typeof report.title !== 'string' || report.title.trim().length === 0) {
    errors.push('Missing or invalid research title');
  }

  // 2. Methodology & Research Question Transparency
  if (!report.researchQuestion || typeof report.researchQuestion !== 'string' || report.researchQuestion.trim().length < 15) {
    errors.push('Research question must be clearly stated (minimum 15 characters)');
  }

  if (!report.methodology || typeof report.methodology !== 'string' || report.methodology.trim().length < 30) {
    errors.push('Methodology description must be comprehensive and documented (minimum 30 characters)');
  }

  // 3. Data Source Attribution & Classification
  if (!Array.isArray(report.dataSources) || report.dataSources.length === 0) {
    errors.push('Research report must explicitly declare at least one verifiable data source');
  } else {
    const validDataTypes = [
      'first_party_platform_data',
      'user_submitted_data',
      'business_provided_data',
      'public_benchmark_data',
      'survey_sample_data',
      'calculated_metric',
      'editorial_analysis'
    ];

    report.dataSources.forEach((source, idx) => {
      if (!source.name || typeof source.name !== 'string') {
        errors.push(`Data source at index ${idx} is missing a descriptive name`);
      }
      if (!source.type || !validDataTypes.includes(source.type)) {
        errors.push(`Data source at index ${idx} has invalid type: "${source.type}". Must be one of: ${validDataTypes.join(', ')}`);
      }
    });
  }

  // 4. Sample Size & Statistical Significance Safeguards
  const researchType = report.researchType || 'generic';
  const minRequiredSample = MINIMUM_SAMPLE_THRESHOLDS[researchType] || 3;

  if (typeof report.sampleSize !== 'number') {
    errors.push('Report must specify a numeric sampleSize');
  } else if (report.sampleSize < minRequiredSample) {
    if (report.status === 'published') {
      errors.push(`Sample size (${report.sampleSize}) is below minimum threshold (${minRequiredSample}) for ${researchType}. Cannot be published.`);
    } else {
      warnings.push(`Sample size (${report.sampleSize}) is below minimum threshold (${minRequiredSample}). Kept as non-published / draft.`);
    }
  }

  // 5. Data Collection Period / Timeframe
  if (!report.dateRange || typeof report.dateRange.startDate !== 'string' || typeof report.dateRange.endDate !== 'string') {
    errors.push('Report must specify a dateRange with both startDate and endDate');
  }

  // 6. Privacy & PII Leakage Safeguards
  // Ensure no unmasked customer identifiers, personal emails, or raw transaction logs exist in the report
  const rawStringified = JSON.stringify(report);
  const piiPatterns = [
    /[a-zA-Z0-9._%+-]+@(?!shrayutech\.gmail\.com|shrayutech\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i, // Non-company emails
    /(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?!.*7020041614)/ // Non-official phone numbers
  ];

  piiPatterns.forEach((pattern) => {
    if (pattern.test(rawStringified)) {
      errors.push('Potential Customer PII detected in research payload! All research data must be strictly aggregated.');
    }
  });

  // 7. Limitations & Anti-Manipulation
  if (!report.limitations || typeof report.limitations !== 'string' || report.limitations.trim().length < 20) {
    errors.push('Research report must explicitly document its operational and sample limitations (minimum 20 characters)');
  }

  // 8. Publishing Status & Indexability Rules
  const isValid = errors.length === 0;
  const isPublished = report.status === 'published';
  const isIndexable = isValid && isPublished && Boolean(report.isIndexable);

  return {
    isValid,
    isIndexable,
    status: report.status || 'draft',
    errors,
    warnings
  };
}

