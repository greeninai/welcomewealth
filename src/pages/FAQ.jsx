import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Users, DollarSign, BookOpen, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const FAQ_DATA = [
  {
    id: 'newcomers',
    title: 'New Residents',
    subtitle: 'For newcomers and immigrants navigating finances in Canada',
    icon: Users,
    color: '#1152d4',
    questions: [
      {
        q: 'What is WelcomeWealth?',
        a: 'WelcomeWealth is a privacy-first, educational platform designed to help newcomers and residents in Canada understand personal finance. We do not sell products, offer financial advice, or share your data. Our goal is to provide clear, neutral, and accessible financial education.'
      },
      {
        q: 'Is WelcomeWealth free to use?',
        a: 'Yes. WelcomeWealth is completely free for users. There are no fees, no subscriptions, and no hidden costs. The platform is sustained through an ethical partner contribution model — not through user charges or data selling.'
      },
      {
        q: 'Do I need to share personal or financial information?',
        a: 'No. You can use WelcomeWealth without providing any personal or financial data. We do not collect sensitive financial information, bank details, or identification documents. Your privacy is protected by design.'
      },
      {
        q: 'Is WelcomeWealth available in my language?',
        a: 'Yes. WelcomeWealth supports multiple languages including English, Spanish, Portuguese, French, Chinese, and Arabic. You can switch languages anytime using the language selector in the navigation bar.'
      },
      {
        q: 'Can WelcomeWealth help me open a bank account or apply for credit?',
        a: 'No. WelcomeWealth does not facilitate account openings, credit applications, or product purchases. We provide educational content so you can make informed decisions. If you choose to work with a professional, you can explore our Trusted Partners directory.'
      },
      {
        q: 'Is WelcomeWealth a financial advisor or institution?',
        a: 'No. WelcomeWealth is not a bank, financial institution, or financial advisor. We do not provide personalized financial advice or recommend specific products. We focus exclusively on education and awareness.'
      },
    ]
  },
  {
    id: 'transparency',
    title: 'Transparency & Funding',
    subtitle: 'How WelcomeWealth operates and is funded',
    icon: DollarSign,
    color: '#188a42',
    questions: [
      {
        q: 'How is WelcomeWealth funded?',
        a: 'WelcomeWealth is funded through an ethical contribution model. Verified partners contribute a fixed annual participation fee to be listed in our Trusted Support Directory. Partners may also make voluntary social impact contributions to GreenIn Impact programs. No payments are tied to leads, clicks, or conversions.'
      },
      {
        q: 'Does WelcomeWealth sell user data?',
        a: 'Absolutely not. WelcomeWealth never sells, rents, or shares user data with third parties. We do not display ads or paid promotions. Privacy is a core principle of our platform.'
      },
      {
        q: 'Do partners get preferential placement?',
        a: 'No. Partners are organized by category only. There is no preferential ranking, featured placement, or promoted visibility. All verified partners within a category receive the same level of presentation.'
      },
      {
        q: 'Where do partner contributions go?',
        a: 'Partner contributions support platform operations, content development, technology and security, and GreenIn Impact programs focused on financial education, newcomer integration, and community resilience across Canada. Approximate allocations are published in our Transparency Report.'
      },
      {
        q: 'Is WelcomeWealth a non-profit?',
        a: 'WelcomeWealth is a social impact initiative developed by GreenIn Company. While it is not structured as a non-profit, it operates with a social-first mission: all contributions are reinvested into the platform and community impact programs.'
      },
      {
        q: 'How can I see the financial details?',
        a: 'You can review our full Transparency Report, which outlines funding principles, contribution allocation, and impact programs. Visit the Transparency page for detailed information.'
      },
    ]
  },
  {
    id: 'partners',
    title: 'Partners',
    subtitle: 'Information for verified partners and applicants',
    icon: BookOpen,
    color: '#d86c00',
    questions: [
      {
        q: 'How can my organization become a partner?',
        a: 'Organizations can apply through the "Apply as Partner" page. You will need to provide your organization details, contact information, category (education, professional, or community), and a description of your services. All applications go through a verification process.'
      },
      {
        q: 'What are the verification requirements?',
        a: 'Partners must demonstrate valid licensing, ethical conduct, and alignment with WelcomeWealth values. We verify credentials, review business practices, and ensure partners meet our standards for transparency and user protection.'
      },
      {
        q: 'What is the contribution model?',
        a: 'Partners contribute through a fixed annual participation fee based on category. Partners may also choose to make a voluntary social impact contribution to GreenIn Impact programs. Contributions are not tied to leads, traffic, or conversions.'
      },
      {
        q: 'Can partners pay for better placement?',
        a: 'No. WelcomeWealth does not offer paid placement, promoted visibility, or ranking manipulation. All partners within a category receive equal visibility. This is a core principle of our ethical model.'
      },
      {
        q: 'What categories of partners exist?',
        a: 'Partners are organized into three categories: Education (financial education providers), Professional (licensed financial professionals and firms), and Community (community organizations and non-profits supporting newcomers).'
      },
      {
        q: 'How are partners displayed to users?',
        a: 'Partners are displayed in our Trusted Partners directory, organized by category. Users can filter by category, services, location, and languages. Users choose if, when, and how they engage with partners — there are no push notifications or promotional messages.'
      },
      {
        q: 'Can a partner be removed from the directory?',
        a: 'Yes. Partners can be suspended or removed if they violate our ethical standards, receive verified user complaints, or fail to maintain their licensing credentials. We regularly review partners to ensure ongoing compliance.'
      },
    ]
  }
];

function FAQItem({ question, answer, isOpen, onToggle, color }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white transition-all">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm md:text-base font-medium text-gray-900">{question}</span>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform"
          style={{ backgroundColor: `${color}15` }}
        >
          <ChevronDown
            className="w-4 h-4 transition-transform duration-300"
            style={{ color, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? '500px' : '0px' }}
      >
        <div className="px-5 pb-4 pt-1">
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('newcomers');
  const [openQuestions, setOpenQuestions] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleQuestion = (categoryId, questionIndex) => {
    const key = `${categoryId}-${questionIndex}`;
    setOpenQuestions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredData = searchQuery.trim()
    ? FAQ_DATA.map(cat => ({
        ...cat,
        questions: cat.questions.filter(
          q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
               q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.questions.length > 0)
    : FAQ_DATA;

  const activeData = searchQuery.trim()
    ? filteredData
    : filteredData.filter(cat => cat.id === activeCategory);

  return (
    <div className="bg-[#f8f6f8] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-[#1152d4] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find clear answers about WelcomeWealth, how we operate, and how to engage with our trusted partners.
          </p>
        </div>
      </section>

      {/* Search + Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4]/20 focus:border-[#1152d4] focus:bg-white transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {FAQ_DATA.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={isActive ? { backgroundColor: cat.color } : {}}
                >
                  <Icon className="w-4 h-4" />
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeData.length > 0 ? (
            activeData.map(cat => {
              const Icon = cat.icon;
              return (
                <div key={cat.id} className="mb-10 last:mb-0">
                  {!searchQuery.trim() && (
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${cat.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: cat.color }} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">{cat.title}</h2>
                        <p className="text-sm text-gray-500">{cat.subtitle}</p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-3">
                    {cat.questions.map((item, idx) => {
                      const key = `${cat.id}-${idx}`;
                      return (
                        <FAQItem
                          key={key}
                          question={item.q}
                          answer={item.a}
                          isOpen={!!openQuestions[key]}
                          onToggle={() => toggleQuestion(cat.id, idx)}
                          color={cat.color}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-500">Try searching with different keywords.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            If you couldn't find what you were looking for, our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={createPageUrl('Partners')}
              className="inline-flex items-center px-6 py-3 bg-[#1152d4] text-white rounded-xl font-medium hover:bg-[#0d3da3] transition-colors"
            >
              Explore Trusted Partners
            </Link>
            <Link
              to={createPageUrl('Transparency')}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Read Transparency Report
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}