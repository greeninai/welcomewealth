import React from 'react';
import { Shield, BookOpen, Heart, Users, CheckCircle, X, Leaf, Building2, Target, Lock, Globe, TrendingUp } from 'lucide-react';

export default function About() {
  const values = [
    { icon: BookOpen, title: 'Education first', desc: 'We help people understand, not decide for them', color: '#d86c00' },
    { icon: Lock, title: 'Privacy by design', desc: 'Your data stays under your control', color: '#1152d4' },
    { icon: Shield, title: 'No pressure', desc: 'No sales, no urgency, no judgment', color: '#188a42' },
    { icon: Globe, title: 'Accessibility', desc: 'Clear language, inclusive design, and multilingual support', color: '#d86c00' },
    { icon: CheckCircle, title: 'Trust & transparency', desc: 'We explain how things work, openly and simply', color: '#1152d4' },
  ];

  const whoItsFor = [
    'Newcomers and immigrants to Canada',
    'International students and families',
    'Residents seeking financial clarity',
    'Individuals who want to build healthy financial habits',
    'Anyone who prefers learning before speaking to an advisor',
  ];

  const whatItsNot = [
    'Not a bank',
    'Not a financial institution',
    'Not a financial advisor',
    'Not a product marketplace',
    'Not a data-selling platform',
  ];

  const doesNotDo = [
    'Provide financial advice',
    'Recommend specific products',
    'Sell user data',
    'Display ads or paid promotions',
  ];

  const commitment = [
    'User-controlled',
    'Privacy-first',
    'Educational by design',
    'Free from sales pressure',
  ];

  return (
    <div className="bg-[#f8f6f8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About WelcomeWealth
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            A calm, trustworthy space to understand your finances in Canada — without pressure, sales, or hidden agendas.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission & Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              WelcomeWealth exists to support financial understanding, confidence, and inclusion in Canada. Our mission is to make financial education accessible, calm, and respectful, especially for newcomers navigating the Canadian financial system for the first time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-[#f8f6f8] rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${value.color}15` }}>
                    <Icon className="w-6 h-6" style={{ color: value.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why This Project Exists */}
      <section className="py-16 md:py-24 bg-[#f8f6f8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Why This Project Exists
          </h2>
          
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              For many people arriving in Canada — and even for long-time residents — the financial system can feel <span className="font-medium text-gray-900">complex, intimidating, and difficult to navigate.</span>
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              WelcomeWealth was created to address a simple but important gap:
            </p>
            
            <div className="bg-[#1152d4] bg-opacity-5 border-l-4 border-[#1152d4] p-6 rounded-r-lg mb-8">
              <p className="text-lg font-medium text-gray-900">
                There are many financial products, but very few calm, neutral, and trustworthy spaces to learn before making decisions.
              </p>
            </div>

            <p className="text-lg text-gray-700 mb-4 font-medium">We believe people deserve:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-[#188a42] mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Time to learn at their own pace</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-[#188a42] mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Clear explanations without sales pressure</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-[#188a42] mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Tools that help build awareness, not dependency</span>
              </li>
            </ul>
          </div>

          <p className="text-center text-xl font-medium text-gray-900">
            WelcomeWealth exists to provide that foundation.
          </p>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Who WelcomeWealth Is For
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            WelcomeWealth is designed for people living in Canada who want to better understand their financial life, including:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {whoItsFor.map((item, index) => (
              <div key={index} className="flex items-center p-4 bg-[#188a42] bg-opacity-5 rounded-xl border border-[#188a42] border-opacity-20">
                <Users className="w-6 h-6 text-[#188a42] mr-3 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 border border-[#1152d4] border-opacity-20">
            <p className="text-lg text-gray-700 text-center font-medium">
              You do not need financial knowledge, accounts, or personal data to use WelcomeWealth.
            </p>
          </div>
        </div>
      </section>

      {/* What It's Not */}
      <section className="py-16 md:py-24 bg-[#f8f6f8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            What WelcomeWealth Is Not
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            To be clear and transparent, WelcomeWealth is:
          </p>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {whatItsNot.map((item, index) => (
                <div key={index} className="flex items-center p-4 bg-red-50 rounded-xl border border-red-200">
                  <X className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-lg font-medium text-gray-900 mb-4">WelcomeWealth does not:</p>
              <ul className="space-y-3">
                {doesNotDo.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-[#188a42] bg-opacity-5 rounded-xl p-6">
              <p className="text-lg font-medium text-gray-900 text-center">
                We focus on education and awareness only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Relationship with GreenIn */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Relationship with GreenIn
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            WelcomeWealth is a social impact initiative developed and led by GreenIn Company as part of its commitment to responsible innovation, sustainability, and community wellbeing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* GreenIn Impact */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-[#188a42] border-opacity-20">
              <div className="w-14 h-14 bg-[#188a42] rounded-2xl flex items-center justify-center mb-6">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">GreenIn Impact</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                GreenIn's social and ESG-driven initiative, focused on creating accessible tools that support people, communities, and long-term resilience.
              </p>
              <a
                href="https://www.greenin.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#188a42] font-medium hover:underline"
              >
                Visit GreenIn Impact
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* GreenIn Company */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-[#1152d4] border-opacity-20">
              <div className="w-14 h-14 bg-[#1152d4] rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">GreenIn Company</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                A Canadian-based organization dedicated to sustainability, ESG, digital transformation, and impact-driven solutions across the Americas.
              </p>
              <a
                href="https://www.greeninco.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#1152d4] font-medium hover:underline"
              >
                Visit GreenIn Company
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-br from-[#f8f6f8] to-white rounded-2xl p-8 border border-gray-200">
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              WelcomeWealth reflects GreenIn's belief that <span className="font-medium text-gray-900">education, trust, and transparency are essential foundations for long-term financial wellbeing.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1152d4] to-[#0d3da3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Our Commitment
          </h2>
          <p className="text-xl text-blue-100 text-center mb-12">
            WelcomeWealth will always remain:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {commitment.map((item, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-white mr-3 flex-shrink-0" />
                  <span className="text-lg font-medium text-white">{item}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
            <p className="text-lg text-white text-center leading-relaxed">
              You decide how far you want to go, when you want support, and what information you choose to share.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}