import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Globe, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'EN', nativeName: 'English' },
  { code: 'es', label: 'ES', nativeName: 'Español' },
  { code: 'pt', label: 'PT', nativeName: 'Português' },
  { code: 'fr', label: 'FR', nativeName: 'Français' },
  { code: 'zh', label: 'ZH', nativeName: '中文' },
  { code: 'ar', label: 'AR', nativeName: 'العربية' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-gray-500" />
        <span className="font-bold text-xs tracking-wide">{current.label}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                  language === lang.code ? 'bg-blue-50 text-[#1152d4] font-medium' : 'text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className={`text-xs font-bold w-6 ${language === lang.code ? 'text-[#1152d4]' : 'text-gray-400'}`}>{lang.label}</span>
                  <span>{lang.nativeName}</span>
                </span>
                {language === lang.code && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}