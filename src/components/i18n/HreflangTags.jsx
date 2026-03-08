import { useEffect } from 'react';

const LOCALES = ['en', 'es', 'pt', 'fr', 'zh', 'ar'];
const DOMAIN = 'https://welcomewealth.ca';

export default function HreflangTags({ pagePath = '' }) {
  useEffect(() => {
    // Remove existing hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    document.querySelectorAll('link[rel="canonical"]').forEach(el => el.remove());

    // Add hreflang for each locale (using query param strategy compatible with SPA)
    LOCALES.forEach(locale => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = locale === 'zh' ? 'zh-Hans' : locale;
      link.href = `${DOMAIN}${pagePath}?lang=${locale}`;
      document.head.appendChild(link);
    });

    // x-default hreflang
    const xDefault = document.createElement('link');
    xDefault.rel = 'alternate';
    xDefault.hreflang = 'x-default';
    xDefault.href = `${DOMAIN}${pagePath}`;
    document.head.appendChild(xDefault);

    // Canonical
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = `${DOMAIN}${pagePath || '/'}`;
    document.head.appendChild(canonical);
  }, [pagePath]);

  return null;
}