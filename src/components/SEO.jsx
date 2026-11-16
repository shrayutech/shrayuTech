"use client";

import { SITE_URL } from '../config/site.config.js';
import { useEffect } from 'react';

const SEO = ({
  title,
  description,
  keywords,
  image = '/logo.png',
  url = SITE_URL,
  type = 'website'
}) => {
  const siteName = 'Shrayu Technologies';
  const fullTitle = title && title !== 'Home' ? `${title} | ${siteName}` : 'Shrayu Technologies | Software Development & Custom Web Design';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = fullTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && description) {
        metaDesc.setAttribute('content', description);
      }
    }
  }, [fullTitle, description]);

  return null;
};

export default SEO;

