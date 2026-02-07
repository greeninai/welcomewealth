import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check localStorage first, then browser language, default to English
    const saved = localStorage.getItem('welcomewealth_language');
    if (saved) return saved;
    
    const browserLang = navigator.language.split('-')[0];
    const supported = ['en', 'fr', 'zh', 'es', 'ar', 'pt'];
    return supported.includes(browserLang) ? browserLang : 'en';
  });

  useEffect(() => {
    localStorage.setItem('welcomewealth_language', language);
    // Set dir attribute for RTL languages
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};