import React, { createContext, useContext, useState, useEffect } from 'react';

const COOKIE_NAME = 'ww_lang';
const SUPPORTED = ['en', 'es', 'pt', 'fr', 'zh', 'ar'];

function getCookie(name) {
  try {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  } catch { return null; }
}

function setCookie(name, value, days = 365) {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {}
}

function detectBrowserLanguage() {
  try {
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
    for (const raw of langs) {
      const lang = raw.toLowerCase();
      if (lang.startsWith('es')) return 'es';
      if (lang.startsWith('pt')) return 'pt';
      if (lang.startsWith('fr')) return 'fr';
      if (lang.startsWith('zh')) return 'zh';
      if (lang.startsWith('ar')) return 'ar';
      if (lang.startsWith('en')) return 'en';
    }
  } catch {}
  return 'en';
}

function getInitialLanguage() {
  // 1. Check ?lang= query param (for SEO direct access)
  try {
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    if (urlLang && SUPPORTED.includes(urlLang)) return urlLang;
  } catch {}

  // 2. Cookie (highest user preference priority)
  const cookie = getCookie(COOKIE_NAME);
  if (cookie && SUPPORTED.includes(cookie)) return cookie;

  // 3. localStorage fallback
  try {
    const stored = localStorage.getItem('welcomewealth_language');
    if (stored && SUPPORTED.includes(stored)) return stored;
  } catch {}

  // 4. Browser language detection
  return detectBrowserLanguage();
}

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getInitialLanguage);

  const setLanguage = (lang) => {
    if (!SUPPORTED.includes(lang)) return;
    setCookie(COOKIE_NAME, lang);
    try { localStorage.setItem('welcomewealth_language', lang); } catch {}
    setLanguageState(lang);
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    // Persist on initial load
    setCookie(COOKIE_NAME, language);
    try { localStorage.setItem('welcomewealth_language', language); } catch {}
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, supportedLanguages: SUPPORTED }}>
      {children}
    </LanguageContext.Provider>
  );
};