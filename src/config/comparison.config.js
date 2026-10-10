/**
 * comparison.config.js
 * Global configuration parameters for the Comparison Pages System.
 */

export const COMPARISON_CONFIG = {
  MIN_ITEMS: 2,
  MAX_ITEMS: 4,
  STORAGE_KEY: 'shrayu_comparison_items_v1',
  DEFAULT_TYPE: 'systems',
  SUPPORTED_TYPES: {
    systems: {
      key: 'systems',
      label: 'Software Systems & Products',
      singularLabel: 'System',
      description: 'Compare verified production architectures, algorithmic pipelines, and open source systems from our engineering laboratory.',
      baseRoute: '/portfolio'
    },
    services: {
      key: 'services',
      label: 'Software Engineering Services',
      singularLabel: 'Service',
      description: 'Compare engineering deliverables, technology stacks, and deployment frameworks across our core service capabilities.',
      baseRoute: '/services'
    },
    locations: {
      key: 'locations',
      label: 'Regional Delivery Hubs',
      singularLabel: 'Delivery Hub',
      description: 'Compare tech corridors, local service capabilities, and operational infrastructure across our Indian engineering hubs.',
      baseRoute: '/locations'
    }
  }
};

