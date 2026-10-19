"use client";

import { useEffect } from 'react';

const SEO = ({
  title,
  description,
  keywords,
  image = '/logo.png',
  url = 'https://shrayutech.vercel.app',
  type = 'website'
}) => {
  const siteName = 'Shrayu Technologies';
  const fullTitle = title && title !== 'Home' ? `${title} | ${siteName}` : 'Shrayu Technologies | Premium Software Development & Custom Web Design';

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

