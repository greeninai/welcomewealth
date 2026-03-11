import React from 'react';
import { DollarSign, Shield, Eye, Heart, CheckCircle, Users, BookOpen, Briefcase, Cpu, Leaf, TrendingUp, Building2 } from 'lucide-react';

export default function Transparency() {
  const fundingPrinciples = [
    { icon: Shield, text: 'No ads or data selling', color: '#1152d4' },
    { icon: Eye, text: 'No hidden fees or commissions', color: '#188a42' },
    { icon: CheckCircle, text: 'Partner contributions disclosed', color: '#d86c00' },
    { icon: Users, text: 'User privacy always protected', color: '#1152d4' },
  ];

  const impactPrograms = [
    {
      icon: Users,
      title: 'Communities That Are Safer & More Sustainable',
      color: '#1152d4',
      description: 'Financial education as a cornerstone of community safety and resilience',
      supports: [
        'Financial awareness and risk prevention workshops',
        'Health, safety, and environmental literacy programs',
        'Community resilience for newcomers and vulnerable groups',
      ]
    },
    {
      icon: BookOpen,
      title: 'Talent GreenIn & Digital Future',
      color: '#188a42',
      description: 'Scholarships and mentorship for youth and newcomers to build long-term financial stability',
      supports: [
        'Scholarships and mentorship programs',
        'Learning pathways in HSE, ESG, leadership, and applied AI',
        'Foundations for employability and financial stability',
      ]
    },
    {
      icon: Briefcase,
      title: 'SMEs With Purpose',
      color: '#d86c00',
      description: 'Supporting organizations that serve immigrant and underserved communities',
      supports: [
        'Simplified HSE-ESG diagnostics for SMEs and NGOs',
        'Action plans for governance and sustainability',
        'Stronger local organizations serving communities',
      ]
    },
    {
      icon: Cpu,
      title: 'AI for Good & Responsible AI',
      color: '#1152d4',
      description: 'Ethical and transparent use of AI in education without exploitation',
      supports: [
        'Ethical and transparent AI in education',
        'Responsible data practices',
        'Human-centered digital tools that empower users',
      ]
    },
    {
      icon: Leaf,
      title: 'Circular Impact & GreenIn Shop',
      color: '#188a42',
      description: 'Circular economy initiatives that reinvest in social impact programs',
      supports: [
        'Circular economy initiatives',
        'Products with purpose that fund education and scholarships',
        'Traceable reinvestment into community projects',
      ]
    },
  ];

  const allocationExample = [
    { category: 'Platform Operations', percentage: 40, color: '#1152d4' },
    { category: 'Content Development', percentage: 25, color: '#188a42' },
    { category: 'GreenIn Impact Programs', percentage: 30, color: '#d86c00' },
    { category: 'Technology & Security', percentage: 5, color: '#9ca3af' },
  ];

  return (
    <div className="bg-[#f8f6f8]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6986a2ab487be21fdd4ca463/867959765_WelcomeWealth_Symbol.png" 
            alt="WelcomeWealth Symbol"
            className="w-24 h-24 mx-auto mb-8"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transparency Report
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            How WelcomeWealth operates, how we are funded, and where contributions go
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Funding Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fundingPrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div key={index} className="bg-[#f8f6f8] rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${principle.color}15` }}>
                    <Icon className="w-6 h-6" style={{ color: principle.color }} />
                  </div>
                  <p className="font-medium text-gray-900">{principle.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Fund the Mission */}
      <section className="py-16 bg-[#f8f6f8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How We Fund the Mission</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            WelcomeWealth is supported by verified partners through an ethical contribution model
          </p>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start mb-4">
                <DollarSign className="w-8 h-8 text-[#1152d4] mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Ethical Participation Fee</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Verified partners may contribute through a fixed annual participation fee to be listed in our Trusted Support Directory.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#188a42] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Fixed annual contribution (same range per partner category)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#188a42] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">No payment per lead, click, traffic, or conversion</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#188a42] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">No preferential placement or promotion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#188a42]">
              <div className="flex items-start mb-4">
                <Heart className="w-8 h-8 text-[#188a42] mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">GreenIn Impact Contribution (ESG/CSR)</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Partners may choose to make an annual social impact contribution to GreenIn Impact programs focused on financial education, newcomer integration, and community resilience across Canada.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    This contribution is framed as <strong>social investment</strong>, aligned with ESG and CSR reporting standards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-[#1152d4] border-opacity-20">
            <p className="text-center text-gray-900 font-medium text-lg">
              Partner contributions support WelcomeWealth's mission and GreenIn Impact programs.
              <span className="block mt-2 text-[#1152d4]">Contributions do not affect partner visibility, ranking, or recommendations.</span>
            </p>
          </div>
        </div>
      </section>

      {/* How Partners Are Displayed */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How Partners Are Displayed</h2>
          <div className="bg-gradient-to-br from-[#f8f6f8] to-white rounded-2xl p-8 shadow-lg">
            <div className="space-y-6">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-[#1152d4] mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No Ranking Manipulation</h3>
                  <p className="text-gray-700">Partners are organized by category only. There is no preferential ranking or featured placement.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Eye className="w-6 h-6 text-[#188a42] mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Equal Visibility</h3>
                  <p className="text-gray-700">All verified partners within a category receive the same level of visibility and presentation.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="w-6 h-6 text-[#d86c00] mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">User-Controlled</h3>
                  <p className="text-gray-700">Users choose if, when, and how they engage with partners. No push notifications or promotional messages.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-[#1152d4] mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Only</h3>
                  <p className="text-gray-700">All partners undergo verification for licensing, ethical conduct, and alignment with our values.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Allocation */}
      <section className="py-16 bg-[#f8f6f8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Where Contributions Go</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Approximate allocation of partner contributions (for illustrative purposes)
          </p>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <div className="space-y-4">
              {allocationExample.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{item.category}</span>
                    <span className="font-bold text-gray-900">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-6 text-center">
              Note: These are approximate percentages and may vary based on operational needs and program opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Platform Operations</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• App maintenance and updates</li>
                <li>• Website hosting and infrastructure</li>
                <li>• User support and moderation</li>
                <li>• Accessibility improvements</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Content Development</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Educational content creation</li>
                <li>• Multilingual translation</li>
                <li>• Content updates and reviews</li>
                <li>• Expert consultation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GreenIn Impact Programs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">GreenIn Impact Programs</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Partner contributions to GreenIn Impact support measurable social impact across the Americas, starting in Canada
          </p>

          <div className="space-y-8">
            {impactPrograms.map((program, index) => {
              const Icon = program.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-[#f8f6f8] to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ backgroundColor: `${program.color}15` }}>
                      <Icon className="w-6 h-6" style={{ color: program.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                      <p className="text-gray-700 mb-4">{program.description}</p>
                      <div className="space-y-2">
                        {program.supports.map((item, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Connection with GreenIn */}
      <section className="py-16 bg-[#f8f6f8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6986a2ab487be21fdd4ca463/ba0228ae0_Logo_WW_GreenIn.png" 
            alt="WelcomeWealth & GreenIn"
            className="h-16 mx-auto mb-8"
          />
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            WelcomeWealth & GreenIn
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-[#1152d4] border-opacity-20">
              <Building2 className="w-12 h-12 text-[#1152d4] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">GreenIn Company</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                WelcomeWealth is developed and operated by GreenIn Company, a Canadian-based organization dedicated to sustainability, ESG, digital transformation, and impact-driven solutions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                GreenIn Company administers partner contributions and oversees platform operations with full transparency and accountability.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-[#188a42] border-opacity-20">
              <Heart className="w-12 h-12 text-[#188a42] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">GreenIn Impact</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                GreenIn Impact is the social and ESG-driven initiative of GreenIn, focused on creating accessible tools and programs that support people, communities, and long-term resilience.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Impact contributions fund education, integration, and community programs aligned with measurable ESG outcomes.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong className="text-gray-900">WelcomeWealth</strong> is the educational front-end.
              <br />
              <strong className="text-gray-900">GreenIn Impact</strong> is the structural impact engine.
              <br />
              <strong className="text-gray-900">GreenIn Company</strong> ensures ethical administration and transparency.
            </p>
          </div>
        </div>
      </section>

      {/* User Transparency */}
      <section className="py-16 bg-gradient-to-br from-[#1152d4] to-[#0d3da3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TrendingUp className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-6">
            Your Role in This Ecosystem
          </h2>
          <p className="text-xl text-blue-100 leading-relaxed mb-6">
            WelcomeWealth is supported by verified partners who contribute ethically to keep the platform accessible and to fund social impact programs through GreenIn Impact.
          </p>
          <p className="text-xl text-blue-100 leading-relaxed mb-6">
            This support does not affect how partners are shown, and users always choose if and how they engage.
          </p>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
            <p className="text-lg text-white">
              By using WelcomeWealth, you are part of an ecosystem that reinvests in financial education, community resilience, and responsible innovation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}