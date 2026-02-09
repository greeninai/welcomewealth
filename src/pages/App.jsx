import React from 'react';
import { Smartphone, Shield, Lock, Eye, EyeOff, CheckCircle, X, PieChart, BookOpen, Target, TrendingUp, Download, ArrowRight } from 'lucide-react';

export default function App() {
  const appFeatures = [
    {
      icon: PieChart,
      title: 'Budget Builder',
      description: 'Create and track your personal budget with simple, intuitive tools. See where your money goes each month.',
      color: '#1152d4'
    },
    {
      icon: BookOpen,
      title: 'Learn Hub',
      description: 'Plain-language guides on banking, credit, taxes, savings, and more — designed for Canadian residents.',
      color: '#d86c00'
    },
    {
      icon: Target,
      title: 'Goal Setting',
      description: 'Set financial goals at your own pace. No pressure, no judgment — just a tool to help you plan ahead.',
      color: '#188a42'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Track your learning journey and financial awareness over time, all within your private space.',
      color: '#1152d4'
    },
  ];

  const dataCollected = [
    'Budget entries you choose to create',
    'Learning progress within the app',
    'Goals you set (optional)',
    'Basic app usage patterns for improvements',
  ];

  const dataNotCollected = [
    'Your bank account information',
    'Credit card numbers or payment details',
    'Social insurance number or ID',
    'Your contacts or photos',
    'Your location or GPS data',
    'Browsing history outside the app',
  ];

  const privacyPrinciples = [
    {
      icon: Lock,
      title: 'Your data stays yours',
      description: 'We never sell, share, or monetize your personal information. Period.',
      color: '#1152d4'
    },
    {
      icon: Shield,
      title: 'Encrypted & secure',
      description: 'All data is encrypted in transit and at rest using industry-standard security protocols.',
      color: '#188a42'
    },
    {
      icon: Eye,
      title: 'Full transparency',
      description: 'We tell you exactly what data we collect, why we collect it, and how it is used.',
      color: '#d86c00'
    },
    {
      icon: EyeOff,
      title: 'No tracking or profiling',
      description: 'We do not track your behavior across devices or create marketing profiles.',
      color: '#1152d4'
    },
  ];

  return (
    <div className="bg-[#f8f6f8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6986a2ab487be21fdd4ca463/9391760f3_WelcomeWealth_Symbol.png" 
                alt="WelcomeWealth Symbol"
                className="w-20 h-20 mb-6"
              />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The WelcomeWealth App
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                A simple, private tool to help you understand and manage your finances in Canada — without ads, sales, or data harvesting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#1152d4] text-white rounded-xl text-lg font-medium hover:bg-[#0d3da3] transition-all shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download for iOS
                </a>
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1152d4] border-2 border-[#1152d4] rounded-xl text-lg font-medium hover:bg-blue-50 transition-all"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download for Android
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80"
                alt="WelcomeWealth App on Mobile"
                className="rounded-3xl shadow-2xl max-w-sm w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What the App Helps You Do */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What the App Helps You Do
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple tools to build financial awareness and confidence, at your own pace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {appFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-[#f8f6f8] rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${feature.color}15` }}>
                    <Icon className="w-7 h-7" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* App Screenshots */}
      <section className="py-16 md:py-24 bg-[#f8f6f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See It in Action
            </h2>
            <p className="text-lg text-gray-600">
              A peek inside the WelcomeWealth app
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-80 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <PieChart className="w-24 h-24 text-[#1152d4] opacity-30" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Budget Overview</h3>
                <p className="text-gray-600">Track income and expenses with visual charts</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-80 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                <BookOpen className="w-24 h-24 text-[#d86c00] opacity-30" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Learn Library</h3>
                <p className="text-gray-600">Bite-sized lessons on Canadian finances</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-80 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <Target className="w-24 h-24 text-[#188a42] opacity-30" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Goal Planner</h3>
                <p className="text-gray-600">Set and track your financial milestones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Philosophy */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Privacy by Design
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your financial information is deeply personal. We built WelcomeWealth with privacy as the foundation, not an afterthought.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {privacyPrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-[#f8f6f8] to-white rounded-2xl p-8 border border-gray-200">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${principle.color}15` }}>
                    <Icon className="w-6 h-6" style={{ color: principle.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{principle.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{principle.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Collection Details */}
      <section className="py-16 md:py-24 bg-[#f8f6f8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Data Is (and Is Not) Collected
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete transparency about what information WelcomeWealth accesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Data We Collect */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-[#1152d4]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">What We Collect</h3>
              </div>
              <ul className="space-y-3">
                {dataCollected.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#1152d4] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>Purpose:</strong> To provide you with personalized budget tracking and learning progress — all stored securely and privately in your account.
                </p>
              </div>
            </div>

            {/* Data We Don't Collect */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#188a42]">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">What We Don't Collect</h3>
              </div>
              <ul className="space-y-3">
                {dataNotCollected.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-green-50 rounded-xl p-4 border border-[#188a42] border-opacity-30">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>Guarantee:</strong> We never access your financial accounts, sell your data, or share your information with third parties for marketing purposes.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              Want more details? Read our full{' '}
              <a href="/privacy" className="text-[#1152d4] font-medium hover:underline">Privacy Policy</a>
              {' '}or contact us with any questions.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1152d4] to-[#0d3da3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Smartphone className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Download WelcomeWealth today and start building your financial confidence — privately, calmly, and at your own pace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white text-[#1152d4] rounded-xl text-lg font-medium hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Download for iOS
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl text-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all"
            >
              Download for Android
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-blue-200 mt-6">
            Free forever. No credit card required. No hidden fees.
          </p>
        </div>
      </section>
    </div>
  );
}