import React from 'react';
import { cleanSchema } from '../../../utils/schema/schemaBuilders.js';

/**
 * SchemaMarkup.jsx
 * Authoritative, XSS-safe JSON-LD Structured Data Renderer.
 * 
 * Complies with Section 4 and Section 43:
 * - Safely serializes Schema.org JSON-LD.
 * - Sanitizes raw output to prevent script tag breakouts / HTML injection.
 * - Removes undefined and null properties automatically.
 * - Works natively in Next.js Server Components with zero client-side JavaScript.
 */
export default function SchemaMarkup({ schema }) {
  if (!schema) return null;

  const cleaned = cleanSchema(schema);
  if (!cleaned) return null;

  // Handle graph wrapper if raw array passed
  const payload = Array.isArray(cleaned)
    ? { '@context': 'https://schema.org', '@graph': cleaned }
    : cleaned;

  // Safely serialize and escape HTML / script termination sequences
  const jsonString = JSON.stringify(payload).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}

