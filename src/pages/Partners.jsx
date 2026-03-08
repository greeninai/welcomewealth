import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Shield, Award, Users, BookOpen, CheckCircle, ExternalLink, Search, X, MapPin, Globe, Building2, Loader2, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RequestContactForm from '../components/partners/RequestContactForm';
import { createPageUrl } from '@/utils';

const CATEGORY_META = {
  education: { title: 'Financial Education Organizations', description: 'Non-profit and community organizations focused on financial literacy and education', icon: BookOpen, color: '#d86c00' },
  professional: { title: 'Licensed Financial Professionals', description: 'Certified financial planners, advisors, and professionals with proper credentials', icon: Award, color: '#1152d4' },
  community: { title: 'Community & Immigrant Support', description: 'Organizations supporting newcomers, immigrants, and underserved communities', icon: Users, color: '#188a42' },
};

const principles = [
  { text: 'No ranking manipulation', icon: Shield },
  { text: 'No paid placement', icon: Award },
  { text: 'No lead selling', icon: Users },
  { text: 'No in-app recommendations', icon: BookOpen },
];

const verificationCriteria = [
  'Proper licensing (if applicable)',
  'Ethical conduct standards',
  'No predatory practices',
  'Alignment with WelcomeWealth values',
  'Periodic review and monitoring',
];

export default function Partners() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const { data: partners = [], isLoading } = useQuery({
    queryKey: ['public-partners'],
    queryFn: () => base44.entities.Partner.filter({ status: 'active' }),
  });

  // Extract unique filter values from real data
  const allServices = useMemo(() => {
    const s = new Set();
    partners.forEach(p => (p.services || []).forEach(sv => s.add(sv)));
    return Array.from(s).sort();
  }, [partners]);

  const allLocations = useMemo(() => {
    const l = new Set();
    partners.forEach(p => { if (p.location) l.add(p.location); });
    return Array.from(l).sort();
  }, [partners]);

  const allLanguages = useMemo(() => {
    const l = new Set();
    partners.forEach(p => (p.languages || []).forEach(lang => l.add(lang)));
    return Array.from(l).sort();
  }, [partners]);

  const filteredPartners = useMemo(() => {
    return partners.filter(p => {
      const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || (p.services || []).some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchService = selectedService === 'all' || (p.services || []).includes(selectedService);
      const matchLocation = selectedLocation === 'all' || p.location === selectedLocation;
      const matchLang = selectedLanguage === 'all' || (p.languages || []).includes(selectedLanguage);
      return matchSearch && matchCat && matchService && matchLocation && matchLang;
    });
  }, [partners, searchQuery, selectedCategory, selectedService, selectedLocation, selectedLanguage]);

  // Group by category
  const groupedPartners = useMemo(() => {
    const groups = {};
    filteredPartners.forEach(p => {
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category].push(p);
    });
    return groups;
  }, [filteredPartners]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedService('all');
    setSelectedLocation('all');
    setSelectedLanguage('all');
  };

  const activeFiltersCount = [selectedCategory, selectedService, selectedLocation, selectedLanguage].filter(f => f !== 'all').length;

  return (
    <div className="bg-[#f8f6f8]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6986a2ab487be21fdd4ca463/9391760f3_WelcomeWealth_Symbol.png" alt="WelcomeWealth Symbol" className="w-24 h-24 mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Trusted Support, When You Choose</h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-4">Verified partners. No pressure. No rankings. No obligation.</p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">WelcomeWealth does not recommend specific providers. This directory exists to help you find verified support when you're ready — completely on your terms.</p>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return <div key={i} className="bg-[#f8f6f8] rounded-xl p-6 text-center"><Icon className="w-10 h-10 text-[#1152d4] mx-auto mb-3" /><p className="font-medium text-gray-900">{p.text}</p></div>;
            })}
          </div>
        </div>
      </section>

      {/* Verification Criteria */}
      <section className="py-16 bg-[#f8f6f8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Partner Verification Criteria</h2>
          <p className="text-lg text-gray-600 text-center mb-12">All partners listed here have been verified against these standards:</p>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <ul className="space-y-4">
              {verificationCriteria.map((c, i) => (
                <li key={i} className="flex items-start"><CheckCircle className="w-6 h-6 text-[#188a42] mr-3 flex-shrink-0 mt-0.5" /><span className="text-gray-700 text-lg">{c}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Partner Directory */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Partner Directory</h2>

          {/* Search & Filters */}
          <div className="mb-10 space-y-5">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input type="text" placeholder="Search partners by name or services..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-12 pr-10 py-6 text-lg" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>}
            </div>

            <div className="bg-[#f8f6f8] rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1152d4]">
                    <option value="all">All Categories</option>
                    <option value="education">Financial Education</option>
                    <option value="professional">Licensed Professionals</option>
                    <option value="community">Community Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                  <select value={selectedService} onChange={e => setSelectedService(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1152d4]">
                    <option value="all">All Services</option>
                    {allServices.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"><MapPin className="w-4 h-4 inline mr-1" />Location</label>
                  <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1152d4]">
                    <option value="all">All Locations</option>
                    {allLocations.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"><Globe className="w-4 h-4 inline mr-1" />Language</label>
                  <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1152d4]">
                    <option value="all">All Languages</option>
                    {allLanguages.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              {(activeFiltersCount > 0 || searchQuery) && (
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">{filteredPartners.length} partners found{activeFiltersCount > 0 ? ` (${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active)` : ''}</span>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[#1152d4]"><X className="w-4 h-4 mr-1" />Clear all</Button>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 text-[#1152d4] animate-spin" /></div>
          ) : filteredPartners.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{partners.length === 0 ? 'Partners coming soon' : 'No partners found'}</h3>
              <p className="text-gray-500 mb-6">{partners.length === 0 ? 'We are currently verifying and onboarding our first partners. Check back soon!' : 'Try adjusting your search or filters.'}</p>
              {partners.length > 0 && <Button onClick={clearFilters} variant="outline">Clear all filters</Button>}
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedPartners).map(([cat, catPartners]) => {
                const meta = CATEGORY_META[cat] || { title: cat, icon: Shield, color: '#1152d4', description: '' };
                const Icon = meta.icon;
                return (
                  <div key={cat}>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ backgroundColor: `${meta.color}15` }}>
                        <Icon className="w-6 h-6" style={{ color: meta.color }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{meta.title}</h3>
                        <p className="text-gray-600">{meta.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {catPartners.map(partner => (
                        <div key={partner.id} className="bg-[#f8f6f8] rounded-xl p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-lg font-bold text-gray-900 flex-1">{partner.name}</h4>
                            {partner.verified && <Shield className="w-5 h-5 text-[#188a42] flex-shrink-0 ml-2" title="Verified Partner" />}
                          </div>
                          {partner.description && <p className="text-sm text-gray-600 mb-3">{partner.description}</p>}
                          {(partner.services || []).length > 0 && (
                            <div className="mb-3 flex flex-wrap gap-2">
                              {(partner.services || []).slice(0, 3).map((s, i) => (
                                <span key={i} className="text-xs px-2 py-1 bg-white rounded-full text-gray-700 border border-gray-200">{s}</span>
                              ))}
                              {(partner.services || []).length > 3 && <span className="text-xs px-2 py-1 bg-white rounded-full text-gray-500 border border-gray-200">+{partner.services.length - 3} more</span>}
                            </div>
                          )}
                          <div className="space-y-1.5 mb-4 text-sm text-gray-600">
                            {partner.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4 flex-shrink-0" />{partner.location}</div>}
                            {(partner.languages || []).length > 0 && <div className="flex items-center gap-2"><Globe className="w-4 h-4 flex-shrink-0" />{partner.languages.join(', ')}</div>}
                          </div>
                          {partner.website && (
                            <a href={partner.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#1152d4] font-medium hover:underline text-sm">
                              Visit website <ExternalLink className="w-4 h-4 ml-1" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* How to Connect */}
      <section className="py-16 bg-[#f8f6f8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">How to Connect with Partners</h2>
          <p className="text-lg text-gray-600 text-center mb-12">Two simple ways to reach out — you decide what works for you</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <ExternalLink className="w-6 h-6 text-[#1152d4]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Contact</h3>
              <p className="text-gray-600 mb-2">Browse partner profiles and reach out to them directly through their website or contact information.</p>
              <p className="text-sm text-gray-500">You control all communication and no information is shared with WelcomeWealth.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#1152d4]">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#188a42]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Request Contact</h3>
              <p className="text-gray-600 mb-4">Fill out our secure form and a verified partner in your area will reach out within 5 business days.</p>
              <Button onClick={() => setShowContactForm(!showContactForm)} className="w-full bg-[#1152d4] hover:bg-[#0d3da3]">
                {showContactForm ? 'Hide Form' : 'Request Partner Contact'}
              </Button>
            </div>
          </div>

          {showContactForm && (
            <RequestContactForm onClose={() => setShowContactForm(false)} />
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1152d4] to-[#0d3da3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Are You an Organization?</h2>
          <p className="text-xl text-blue-100 mb-8">Learn about becoming a verified partner and supporting financial education in Canada</p>
          <a href="/partner-application" className="inline-flex items-center px-8 py-4 bg-white text-[#1152d4] rounded-xl text-lg font-medium hover:bg-gray-100 transition-all shadow-lg">
            Apply to Become a Partner <ExternalLink className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}