import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Shield, Award, Users, Building2, BookOpen, CheckCircle, ExternalLink, Mail, Search, X, MapPin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Partners() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    partnerCategory: ''
  });

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

  const partnerCategories = [
    {
      title: 'Financial Education Organizations',
      description: 'Non-profit and community organizations focused on financial literacy and education',
      icon: BookOpen,
      color: '#d86c00',
      category: 'education',
      partners: [
        { 
          name: 'Example Financial Literacy Center', 
          verified: true, 
          website: '#',
          services: ['Budgeting Workshops', 'Credit Education', 'Debt Management'],
          location: 'Toronto, ON',
          languages: ['English', 'French', 'Spanish']
        },
        { 
          name: 'Community Finance Education', 
          verified: true, 
          website: '#',
          services: ['Financial Planning', 'Investment Basics', 'Tax Education'],
          location: 'Vancouver, BC',
          languages: ['English', 'Mandarin', 'Cantonese']
        },
      ]
    },
    {
      title: 'Licensed Financial Professionals',
      description: 'Certified financial planners, advisors, and professionals with proper credentials',
      icon: Award,
      color: '#1152d4',
      category: 'professional',
      partners: [
        { 
          name: 'Example Financial Planning Group', 
          verified: true, 
          website: '#',
          services: ['Retirement Planning', 'Investment Management', 'Estate Planning'],
          location: 'Montreal, QC',
          languages: ['English', 'French']
        },
        { 
          name: 'Certified Advisory Services', 
          verified: true, 
          website: '#',
          services: ['Financial Planning', 'Tax Planning', 'Insurance Advice'],
          location: 'Calgary, AB',
          languages: ['English', 'Punjabi']
        },
      ]
    },
    {
      title: 'Community & Immigrant Support',
      description: 'Organizations supporting newcomers, immigrants, and underserved communities',
      icon: Users,
      color: '#188a42',
      category: 'community',
      partners: [
        { 
          name: 'Newcomer Settlement Services', 
          verified: true, 
          website: '#',
          services: ['Settlement Support', 'Banking Guidance', 'Credit Building'],
          location: 'Ottawa, ON',
          languages: ['English', 'French', 'Arabic', 'Somali']
        },
        { 
          name: 'Immigrant Resource Center', 
          verified: true, 
          website: '#',
          services: ['Integration Support', 'Financial Literacy', 'Employment Guidance'],
          location: 'Edmonton, AB',
          languages: ['English', 'Tagalog', 'Vietnamese']
        },
      ]
    },
  ];

  // Extract unique values for filters
  const allServices = useMemo(() => {
    const services = new Set();
    partnerCategories.forEach(cat => {
      cat.partners.forEach(partner => {
        partner.services.forEach(service => services.add(service));
      });
    });
    return Array.from(services).sort();
  }, []);

  const allLocations = useMemo(() => {
    const locations = new Set();
    partnerCategories.forEach(cat => {
      cat.partners.forEach(partner => {
        if (partner.location) locations.add(partner.location);
      });
    });
    return Array.from(locations).sort();
  }, []);

  const allLanguages = useMemo(() => {
    const languages = new Set();
    partnerCategories.forEach(cat => {
      cat.partners.forEach(partner => {
        partner.languages.forEach(lang => languages.add(lang));
      });
    });
    return Array.from(languages).sort();
  }, []);

  // Filter partners based on all criteria
  const filteredCategories = useMemo(() => {
    return partnerCategories.map(category => {
      const filteredPartners = category.partners.filter(partner => {
        // Search query filter
        const matchesSearch = searchQuery === '' || 
          partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          partner.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

        // Category filter
        const matchesCategory = selectedCategory === 'all' || category.category === selectedCategory;

        // Service filter
        const matchesService = selectedService === 'all' || 
          partner.services.includes(selectedService);

        // Location filter
        const matchesLocation = selectedLocation === 'all' || 
          partner.location === selectedLocation;

        // Language filter
        const matchesLanguage = selectedLanguage === 'all' || 
          partner.languages.includes(selectedLanguage);

        return matchesSearch && matchesCategory && matchesService && matchesLocation && matchesLanguage;
      });

      return {
        ...category,
        partners: filteredPartners
      };
    }).filter(category => category.partners.length > 0);
  }, [searchQuery, selectedCategory, selectedService, selectedLocation, selectedLanguage]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedService('all');
    setSelectedLocation('all');
    setSelectedLanguage('all');
  };

  const activeFiltersCount = [selectedCategory, selectedService, selectedLocation, selectedLanguage].filter(f => f !== 'all').length;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact request submitted:', formData);
    alert('Thank you! Your request has been received. A partner will contact you directly if they can assist.');
    setFormData({ name: '', email: '', message: '', partnerCategory: '' });
    setShowContactForm(false);
  };

  return (
    <div className="bg-[#f8f6f8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6986a2ab487be21fdd4ca463/9391760f3_WelcomeWealth_Symbol.png" 
            alt="WelcomeWealth Symbol"
            className="w-24 h-24 mx-auto mb-8"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted Support, When You Choose
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Verified partners. No pressure. No rankings. No obligation.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            WelcomeWealth does not recommend specific providers. This directory exists to help you find verified support when you're ready — completely on your terms.
          </p>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div key={index} className="bg-[#f8f6f8] rounded-xl p-6 text-center">
                  <Icon className="w-10 h-10 text-[#1152d4] mx-auto mb-3" />
                  <p className="font-medium text-gray-900">{principle.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Verification Criteria */}
      <section className="py-16 bg-[#f8f6f8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Partner Verification Criteria
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            All partners listed here have been verified against these standards:
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <ul className="space-y-4">
              {verificationCriteria.map((criterion, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#188a42] mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Partner Categories & Directory */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Partner Directory
          </h2>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search partners by name or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-10 py-6 text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Grid */}
            <div className="bg-[#f8f6f8] rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] bg-white"
                  >
                    <option value="all">All Categories</option>
                    <option value="education">Financial Education</option>
                    <option value="professional">Licensed Professionals</option>
                    <option value="community">Community Support</option>
                  </select>
                </div>

                {/* Service Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] bg-white"
                  >
                    <option value="all">All Services</option>
                    {allServices.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] bg-white"
                  >
                    <option value="all">All Locations</option>
                    {allLocations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Language
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4] bg-white"
                  >
                    <option value="all">All Languages</option>
                    {allLanguages.map(language => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(activeFiltersCount > 0 || searchQuery) && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-600">
                      {filteredCategories.reduce((acc, cat) => acc + cat.partners.length, 0)} partners found
                    </span>
                    {activeFiltersCount > 0 && (
                      <span className="text-sm text-gray-500">
                        ({activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active)
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-[#1152d4] hover:text-[#0d3da3]"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear all
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Results */}
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No partners found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
            {filteredCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ backgroundColor: `${category.color}15` }}>
                      <Icon className="w-6 h-6" style={{ color: category.color }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.partners.map((partner, pIndex) => (
                      <div key={pIndex} className="bg-[#f8f6f8] rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-lg font-bold text-gray-900 flex-1">{partner.name}</h4>
                          {partner.verified && (
                            <Shield className="w-5 h-5 text-[#188a42] flex-shrink-0 ml-2" title="Verified Partner" />
                          )}
                        </div>
                        
                        {/* Services */}
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-2">
                            {partner.services.slice(0, 3).map((service, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 bg-white rounded-full text-gray-700 border border-gray-200">
                                {service}
                              </span>
                            ))}
                            {partner.services.length > 3 && (
                              <span className="text-xs px-2 py-1 bg-white rounded-full text-gray-500 border border-gray-200">
                                +{partner.services.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Location and Languages */}
                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                          {partner.location && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span>{partner.location}</span>
                            </div>
                          )}
                          {partner.languages && partner.languages.length > 0 && (
                            <div className="flex items-center">
                              <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span>{partner.languages.join(', ')}</span>
                            </div>
                          )}
                        </div>

                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#1152d4] font-medium hover:underline"
                        >
                          Visit website
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            How to Connect with Partners
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Two simple ways to reach out — you decide what works for you
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Direct Contact */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <ExternalLink className="w-6 h-6 text-[#1152d4]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Contact</h3>
              <p className="text-gray-600 mb-4">
                Browse partner profiles and reach out to them directly through their website or contact information.
              </p>
              <p className="text-sm text-gray-500">
                You control all communication and no information is shared with WelcomeWealth.
              </p>
            </div>

            {/* Request Contact */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#1152d4]">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-[#188a42]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Request Contact</h3>
              <p className="text-gray-600 mb-4">
                Fill out a simple form and partners in your selected category may reach out to you directly.
              </p>
              <Button
                onClick={() => setShowContactForm(!showContactForm)}
                className="w-full bg-[#1152d4] hover:bg-[#0d3da3]"
              >
                {showContactForm ? 'Hide Form' : 'Open Contact Form'}
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          {showContactForm && (
            <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Request Partner Contact</h3>
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <strong>How this works:</strong> Your name, email, and message will be shared only with verified partners in your selected category. They may reach out to you directly. You are under no obligation to respond or engage.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Partner Category</label>
                  <select
                    value={formData.partnerCategory}
                    onChange={(e) => setFormData({...formData, partnerCategory: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4]"
                  >
                    <option value="">Select a category</option>
                    <option value="education">Financial Education Organizations</option>
                    <option value="professional">Licensed Financial Professionals</option>
                    <option value="community">Community & Immigrant Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Message (Optional)</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell partners what kind of support you're looking for..."
                    className="h-32"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1 bg-[#188a42] hover:bg-[#146835]">
                    Submit Request
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1152d4] to-[#0d3da3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Are You an Organization?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Learn about becoming a verified partner and supporting financial education in Canada
          </p>
          <a
            href="/partner-application"
            className="inline-flex items-center px-8 py-4 bg-white text-[#1152d4] rounded-xl text-lg font-medium hover:bg-gray-100 transition-all shadow-lg"
          >
            Apply to Become a Partner
            <ExternalLink className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}