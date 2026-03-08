import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Home, Info, Smartphone, Users, DollarSign, FileText, ChevronDown, LayoutDashboard } from 'lucide-react';
import LanguageSwitcher from './components/LanguageSwitcher';
import { LanguageProvider } from './components/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { isAuthorizedAdmin } from './components/admin/AdminGuard';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [partnersDropdownOpen, setPartnersDropdownOpen] = React.useState(false);

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: async () => { try { return await base44.auth.me(); } catch { return null; } },
  });
  const isAdmin = user && isAuthorizedAdmin(user.email);

  const navigation = [
    { name: 'Home', path: 'Home', icon: Home },
    { name: 'About', path: 'About', icon: Info },
    { name: 'The App', path: 'App', icon: Smartphone },
    { name: 'Trusted Partners', path: 'Partners', icon: Users },
    { name: 'Transparency', path: 'Transparency', icon: DollarSign },
    { name: 'Blog', path: 'Blog', icon: FileText },
  ];

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#f8f6f8] flex flex-col" style={{ fontFamily: 'Public Sans, -apple-system, system-ui, sans-serif' }}>
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center space-x-2">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6986a2ab487be21fdd4ca463/f35f84552_WelcomeWealth_Logo.png" 
                alt="WelcomeWealth"
                className="h-8 md:h-10"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                if (item.name === 'Trusted Partners') {
                  return (
                    <div key={item.name} className="relative">
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
                            Partner Directory
                          </Link>
                          <Link
                            to={createPageUrl('PartnerApplication')}
                            onClick={() => setPartnersDropdownOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Apply as Partner
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
              {isAdmin && (
                <Link
                  to={createPageUrl('AdminLogin')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  title="Admin Panel"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Admin
                </Link>
              )}
              <a
                href="#download"
                className="ml-2 px-6 py-2 bg-[#1152d4] text-white rounded-lg text-sm font-medium hover:bg-[#0d3da3] transition-colors"
              >
                Download App
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
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
                if (item.name === 'Trusted Partners') {
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
                        Partner Directory
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
                        Apply as Partner
                      </Link>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.path)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium ${
                      currentPageName === item.path
                        ? 'bg-[#1152d4] bg-opacity-10 text-[#1152d4]'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="px-4 py-2">
                <LanguageSwitcher />
              </div>
              {isAdmin && (
                <Link
                  to={createPageUrl('AdminDashboard')}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Admin Panel
                </Link>
              )}
              <a
                href="#download"
                className="block px-4 py-3 bg-[#1152d4] text-white rounded-lg text-base font-medium text-center hover:bg-[#0d3da3]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download App
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
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6986a2ab487be21fdd4ca463/f35f84552_WelcomeWealth_Logo.png" 
                  alt="WelcomeWealth"
                  className="h-8"
                />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Financial education for everyone. Privacy-first. Ad-free. No pressure.
              </p>
            </div>

            {/* About */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link to={createPageUrl('About')} className="text-sm text-gray-600 hover:text-[#1152d4]">Our Mission</Link></li>
                <li><Link to={createPageUrl('App')} className="text-sm text-gray-600 hover:text-[#1152d4]">The App</Link></li>
                <li><Link to={createPageUrl('Transparency')} className="text-sm text-gray-600 hover:text-[#1152d4]">Transparency</Link></li>
                <li><Link to={createPageUrl('Blog')} className="text-sm text-gray-600 hover:text-[#1152d4]">Blog</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Get Help</h3>
              <ul className="space-y-2">
                <li><Link to={createPageUrl('Partners')} className="text-sm text-gray-600 hover:text-[#1152d4]">Trusted Partners</Link></li>
                <li><Link to={createPageUrl('PartnerApplication')} className="text-sm text-gray-600 hover:text-[#1152d4]">Become a Partner</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to={createPageUrl('Privacy')} className="text-sm text-gray-600 hover:text-[#1152d4]">Privacy Policy</Link></li>
                <li><Link to={createPageUrl('Terms')} className="text-sm text-gray-600 hover:text-[#1152d4]">Terms of Use</Link></li>
                <li><Link to={createPageUrl('Accessibility')} className="text-sm text-gray-600 hover:text-[#1152d4]">Accessibility</Link></li>
                <li><Link to={createPageUrl('Disclaimer')} className="text-sm text-gray-600 hover:text-[#1152d4]">Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-600">
                © 2026 WelcomeWealth. A social impact initiative by{' '}
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
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </LanguageProvider>
  );
}