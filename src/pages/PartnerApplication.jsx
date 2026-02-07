import React, { useState } from 'react';
import { Building2, CheckCircle, Shield, Heart, Award, FileText, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function PartnerApplication() {
  const [formData, setFormData] = useState({
    orgName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    category: '',
    description: '',
    licensing: '',
    contributionModel: '',
    whyPartner: ''
  });

  const eligibilityCriteria = [
    'Licensed or registered organization (where applicable)',
    'Minimum 2 years of operation',
    'Ethical business practices with verifiable track record',
    'Commitment to transparent communication',
    'Alignment with WelcomeWealth mission and values',
    'No predatory lending or high-pressure sales tactics',
  ];

  const ethicalStandards = [
    'Act in the best interest of clients and community members',
    'Provide clear, honest, and accessible information',
    'Respect user privacy and data protection',
    'Avoid conflicts of interest or disclose them transparently',
    'Commit to ongoing ethical conduct and periodic review',
  ];

  const contributionModels = [
    {
      title: 'Option A: Ethical Participation Fee',
      icon: DollarSign,
      color: '#1152d4',
      description: 'A fixed annual participation fee to be listed in the Trusted Support Directory',
      details: [
        'Fixed annual contribution (same range per partner category)',
        'No payment per lead, click, traffic, or conversion',
        'No preferential placement or promotion',
        'Supports platform maintenance and educational content development',
      ]
    },
    {
      title: 'Option B: GreenIn Impact Contribution',
      icon: Heart,
      color: '#188a42',
      description: 'Annual social impact contribution to GreenIn Impact programs (ESG/CSR aligned)',
      details: [
        'Supports financial education and literacy programs',
        'Funds newcomer integration and resilience initiatives',
        'Community-based learning across Canada',
        'Partners receive annual Impact Summary and public acknowledgment',
      ]
    },
    {
      title: 'Option C: Blended Contribution (Recommended)',
      icon: Award,
      color: '#d86c00',
      description: 'Combine both the Ethical Participation Fee and GreenIn Impact Contribution',
      details: [
        'Supports platform sustainability',
        'Creates measurable social impact',
        'Aligns with ESG and CSR reporting standards',
        'Demonstrates commitment to community wellbeing',
      ]
    },
  ];

  const reviewProcess = [
    { step: 1, title: 'Application Submission', desc: 'Complete and submit the application form' },
    { step: 2, title: 'Initial Review', desc: 'WelcomeWealth team reviews eligibility and alignment (2-3 weeks)' },
    { step: 3, title: 'Verification Check', desc: 'Licensing, credentials, and ethical conduct verification' },
    { step: 4, title: 'Decision & Onboarding', desc: 'Approved partners receive onboarding materials and listing details' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Partner application submitted:', formData);
    alert('Thank you for your application! We will review it and contact you within 2-3 weeks.');
    setFormData({
      orgName: '',
      contactName: '',
      email: '',
      phone: '',
      website: '',
      category: '',
      description: '',
      licensing: '',
      contributionModel: '',
      whyPartner: ''
    });
  };

  return (
    <div className="bg-[#f8f6f8]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-16 h-16 text-[#1152d4] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Become a Verified Partner
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Join organizations supporting financial education and community wellbeing across Canada
          </p>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Eligibility Criteria</h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            To be considered for partnership, organizations must meet these standards:
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
            <ul className="space-y-4">
              {eligibilityCriteria.map((criterion, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#1152d4] mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Ethical Standards */}
      <section className="py-16 bg-[#f8f6f8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Ethical Standards</h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            All partners commit to upholding these principles:
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <ul className="space-y-4">
              {ethicalStandards.map((standard, index) => (
                <li key={index} className="flex items-start">
                  <Shield className="w-6 h-6 text-[#188a42] mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">{standard}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contribution Models */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Ethical Contribution Models
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            WelcomeWealth operates under an ethical contribution model. Partner contributions do not influence ranking, placement, or visibility.
          </p>

          <div className="space-y-8">
            {contributionModels.map((model, index) => {
              const Icon = model.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-[#f8f6f8] to-white rounded-2xl p-8 border-2 border-gray-200">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ backgroundColor: `${model.color}15` }}>
                      <Icon className="w-6 h-6" style={{ color: model.color }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{model.title}</h3>
                      <p className="text-gray-600">{model.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-16">
                    {model.details.map((detail, dIndex) => (
                      <li key={dIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-[#1152d4] border-opacity-20">
            <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Transparency Commitment</h4>
            <p className="text-gray-700 text-center leading-relaxed">
              Partner contributions support WelcomeWealth's mission and GreenIn Impact programs.
              <strong className="block mt-2">Contributions do not affect partner visibility, ranking, or recommendations.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Review Process */}
      <section className="py-16 bg-[#f8f6f8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Application Review Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reviewProcess.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#1152d4] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Partner Application Form</h2>
          
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <p className="text-gray-700">
              <strong>Please note:</strong> This application is for organizations only. All information provided will be reviewed carefully. Incomplete applications may delay the review process.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name *</label>
              <Input
                value={formData.orgName}
                onChange={(e) => setFormData({...formData, orgName: e.target.value})}
                required
                placeholder="Your organization's legal name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                <Input
                  value={formData.contactName}
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  required
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="contact@organization.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website *</label>
                <Input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  required
                  placeholder="https://yourorganization.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Partner Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4]"
              >
                <option value="">Select a category</option>
                <option value="education">Financial Education Organization</option>
                <option value="professional">Licensed Financial Professional</option>
                <option value="community">Community & Immigrant Support</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization Description *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                placeholder="Briefly describe your organization, services, and target audience..."
                className="h-32"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Licensing & Credentials *</label>
              <Textarea
                value={formData.licensing}
                onChange={(e) => setFormData({...formData, licensing: e.target.value})}
                required
                placeholder="List relevant licenses, certifications, registrations, or professional memberships..."
                className="h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contribution Model *</label>
              <select
                value={formData.contributionModel}
                onChange={(e) => setFormData({...formData, contributionModel: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4]"
              >
                <option value="">Select a contribution model</option>
                <option value="option-a">Option A: Ethical Participation Fee</option>
                <option value="option-b">Option B: GreenIn Impact Contribution</option>
                <option value="option-c">Option C: Blended Contribution (Recommended)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to become a partner? *</label>
              <Textarea
                value={formData.whyPartner}
                onChange={(e) => setFormData({...formData, whyPartner: e.target.value})}
                required
                placeholder="Explain your motivation and how partnership aligns with your organization's mission..."
                className="h-32"
              />
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <h4 className="font-bold text-gray-900 mb-2">Partner Agreement Summary</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Partner contributions do not guarantee visibility, referrals, leads, or preferential placement</li>
                <li>• Contributions support educational initiatives and platform sustainability</li>
                <li>• No advisory or fiduciary relationship is created</li>
                <li>• All user interactions occur independently and at user discretion</li>
                <li>• Periodic review and ongoing ethical conduct required</li>
              </ul>
            </div>

            <Button type="submit" className="w-full bg-[#188a42] hover:bg-[#146835] py-6 text-lg">
              Submit Application
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}