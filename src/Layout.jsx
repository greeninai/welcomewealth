import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Home, Info, Smartphone, Users, DollarSign, FileText, ChevronDown, LayoutDashboard } from 'lucide-react';
import LanguageSwitcher from './components/LanguageSwitcher';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { isAuthorizedAdmin } from './components/admin/AdminGuard';
import { navTranslations, footerTranslations } from './components/i18n/navTranslations';
import HreflangTags from './components/i18n/HreflangTags';
import GlobalSearch from './components/GlobalSearch';

function LayoutInner({ children, currentPageName }) {
  const { language } = useLanguage();
  const nt = navTranslations[language] || navTranslations.en;
  const ft = footerTranslations[language] || footerTranslations.en;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [partnersDropdownOpen, setPartnersDropdownOpen] = useState(false);
  const partnersDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (partnersDropdownRef.current && !partnersDropdownRef.current.contains(event.target)) {
        setPartnersDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try { return await base44.auth.me(); } catch { return null; }
    },
    retry: false,
    staleTime: 60000,
  });
  const isAdmin = user && isAuthorizedAdmin(user.email);

  const navigation = [
    { name: nt.home, path: 'Home', icon: Home },
    { name: nt.about, path: 'About', icon: Info },
    { name: nt.theApp, path: 'App', icon: Smartphone },
    { name: nt.trustedPartners, path: 'Partners', icon: Users },
    { name: nt.transparency, path: 'Transparency', icon: DollarSign },
    { name: nt.blog, path: 'Blog', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f8] flex flex-col" style={{ fontFamily: 'Public Sans, -apple-system, system-ui, sans-serif' }}>
      <HreflangTags />
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center space-x-2">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6986a2ab487be21fdd4ca463/867959765_WelcomeWealth_Symbol.png" 
                alt="WelcomeWealth Symbol"
                className="h-8 md:h-10"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <GlobalSearch />
              {navigation.map((item) => {
                if (item.name === 'Trusted Partners' || item.path === 'Partners') {
                  return (
                    <div key={item.name} className="relative" ref={partnersDropdownRef}>
                      <button
                        onClick={() => setPartnersDropdownOpen(!partnersDropdownOpen)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                          currentPageName === 'Partners' || currentPageName === 'PartnerApplication'
                            ? 'bg-[#1152d4] bg-opacity-10 text-[#1152d4]'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.name}
                        <ChevronDown className="ml-1 w-4 h-4" />
                      </button>
                      {partnersDropdownOpen && (
                        <div className="absolute top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50">
                          <Link
                            to={createPageUrl('Partners')}
                            onClick={() => setPartnersDropdownOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {nt.partnerDirectory}
                          </Link>
                          <Link
                            to={createPageUrl('PartnerApplication')}
                            onClick={() => setPartnersDropdownOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {nt.applyAsPartner}
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.path)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPageName === item.path
                        ? 'bg-[#1152d4] bg-opacity-10 text-[#1152d4]'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <LanguageSwitcher />

              <a
                href="#download"
                className="ml-2 px-6 py-2 bg-[#1152d4] text-white rounded-lg text-sm font-medium hover:bg-[#0d3da3] transition-colors"
              >
                {nt.downloadApp}
              </a>
            </div>

            {/* Mobile search */}
            <div className="md:hidden">
              <GlobalSearch />
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-3 rounded-lg text-gray-700 hover:bg-gray-100 touch-manipulation"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-1">
              {navigation.map((item) => {
                if (item.name === 'Trusted Partners' || item.path === 'Partners') {
                  return (
                    <div key={item.name}>
                      <Link
                        to={createPageUrl('Partners')}
                        className={`block px-4 py-3 rounded-lg text-base font-medium ${
                          currentPageName === 'Partners'
                            ? 'bg-[#1152d4] bg-opacity-10 text-[#1152d4]'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {nt.partnerDirectory}
                      </Link>
                      <Link
                        to={createPageUrl('PartnerApplication')}
                        className={`block px-4 py-3 rounded-lg text-base font-medium ${
                          currentPageName === 'PartnerApplication'
                            ? 'bg-[#1152d4] bg-opacity-10 text-[#1152d4]'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {nt.applyAsPartner}
                      </Link>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.path)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${
                      currentPageName === item.path
                        ? 'bg-[#1152d4] bg-opacity-10 text-[#1152d4] font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {currentPageName === item.path && <div className="w-1.5 h-1.5 rounded-full bg-[#1152d4]" />}
                    {item.name}
                  </Link>
                );
              })}
              <div className="px-4 py-2">
                <LanguageSwitcher />
              </div>

              <a
                href="#download"
                className="block px-4 py-3 bg-[#1152d4] text-white rounded-lg text-base font-medium text-center hover:bg-[#0d3da3]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {nt.downloadApp}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6986a2ab487be21fdd4ca463/66e0f624d_WelcomeWealth_Logo.png" 
                  alt="WelcomeWealth Logo"
                  className="h-8"
                />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {ft.tagline}
              </p>
              <a href="https://www.welcomewealth.ca" target="_blank" rel="noopener noreferrer" className="text-sm text-[#1152d4] hover:underline font-medium">
                www.welcomewealth.ca
              </a>
            </div>

            {/* About */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{ft.about}</h3>
              <ul className="space-y-2">
                <li><Link to={createPageUrl('About')} className="text-sm text-gray-600 hover:text-[#1152d4]">{ft.ourMission}</Link></li>
                <li><Link to={createPageUrl('App')} className="text-sm text-gray-600 hover:text-[#1152d4]">{ft.theApp}</Link></li>
                <li><Link to={createPageUrl('Transparency')} className="text-sm text-gray-600 hover:text-[#1152d4]">{ft.transparency}</Link></li>
                <li><Link to={createPageUrl('Blog')} className="text-sm text-gray-600 hover:text-[#1152d4]">{ft.blog}</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{ft.getHelp}</h3>
              <ul className="space-y-2">
                <li><Link to={createPageUrl('Partners')} className="text-sm text-gray-600 hover:text-[#1152d4]">{ft.trustedPartners}</Link></li>
                <li><Link to={createPageUrl('PartnerApplication')} className="text-sm text-gray-600 hover:text-[#1152d4]">{ft.becomePartner}</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{ft.legal}</h3>
              <ul className="space-y-2">
                <li><Link to={createPageUrl('Privacy')} className="text-sm text-gray-600 hover:text-[#1152d4]">{ft.privacy}</Link></li>
                <li><Link to={createPageUrl('Terms')} className="text-sm text-gray-600 hover:text-[#1152d4]">{ft.terms}</Link></li>
                <li><Link to={createPageUrl('Accessibility')} className="text-sm text-gray-600 hover:text-[#1152d4]">{ft.accessibility}</Link></li>
                <li><Link to={createPageUrl('Disclaimer')} className="text-sm text-gray-600 hover:text-[#1152d4]">{ft.disclaimer}</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-600">
                {ft.copyright}{' '}
                <a href="https://www.greenin.org" target="_blank" rel="noopener noreferrer" className="text-[#188a42] hover:underline">
                  GreenIn Impact
                </a>
              </p>
              <div className="flex items-center space-x-4">
                <a href="https://www.greenin.org" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-[#188a42]">
                  GreenIn Impact
                </a>
                <span className="text-gray-300">•</span>
                <a href="https://www.greeninco.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-[#188a42]">
                  GreenIn Company
                </a>
                <span className="text-gray-300">•</span>
                <Link
                  to={createPageUrl('AdminLogin')}
                  className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#1152d4] transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  {ft.admin}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  return (
    <LanguageProvider>
      <LayoutInner currentPageName={currentPageName}>{children}</LayoutInner>
    </LanguageProvider>
  );
}