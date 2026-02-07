import React from 'react';
import { Shield, BookOpen, Target, Lock, Award, TrendingUp, PieChart, Heart, ArrowRight, CheckCircle, Users, Globe } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';
import { homeTranslations } from '../components/translations';

export default function Home() {
  const { language } = useLanguage();
  const t = homeTranslations[language] || homeTranslations.en;

  const trustSignals = [
    { icon: BookOpen, text: t.trustSignals.educational, color: '#d86c00' },
    { icon: Shield, text: t.trustSignals.privacy, color: '#1152d4' },
    { icon: Lock, text: t.trustSignals.noAdvice, color: '#188a42' },
    { icon: Award, text: t.trustSignals.noAds, color: '#d86c00' },
  ];

  const howItWorks = [
    {
      step: '1',
      title: t.howItWorks.steps[0].title,
      description: t.howItWorks.steps[0].description,
      icon: BookOpen,
      color: '#d86c00'
    },
    {
      step: '2',
      title: t.howItWorks.steps[1].title,
      description: t.howItWorks.steps[1].description,
      icon: PieChart,
      color: '#1152d4'
    },
    {
      step: '3',
      title: t.howItWorks.steps[2].title,
      description: t.howItWorks.steps[2].description,
      icon: Target,
      color: '#188a42'
    },
    {
      step: '4',
      title: t.howItWorks.steps[3].title,
      description: t.howItWorks.steps[3].description,
      icon: TrendingUp,
      color: '#d86c00'
    },
  ];

  const appFeatures = [
    {
      title: t.appPreview.features[0].title,
      description: t.appPreview.features[0].description,
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80'
    },
    {
      title: t.appPreview.features[1].title,
      description: t.appPreview.features[1].description,
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80'
    },
    {
      title: t.appPreview.features[2].title,
      description: t.appPreview.features[2].description,
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80'
    },
  ];

  return (
    <div className="bg-[#f8f6f8]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1152d4] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#188a42] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {t.hero.title}
              <br />
              <span className="text-[#1152d4]">{t.hero.titleHighlight}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div id="download" className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-[#1152d4] text-white rounded-xl text-lg font-medium hover:bg-[#0d3da3] transition-all shadow-lg hover:shadow-xl"
              >
                {t.hero.ctaIOS}
                <ArrowRight className={language === 'ar' ? 'mr-2 w-5 h-5 rotate-180' : 'ml-2 w-5 h-5'} />
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-[#1152d4] border-2 border-[#1152d4] rounded-xl text-lg font-medium hover:bg-blue-50 transition-all"
              >
                {t.hero.ctaAndroid}
              </a>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {trustSignals.map((signal, index) => {
                const Icon = signal.icon;
                return (
                  <div key={index} className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${signal.color}15` }}>
                      <Icon className="w-6 h-6" style={{ color: signal.color }} />
                    </div>
                    <p className="text-sm font-medium text-gray-800 text-center">{signal.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How WelcomeWealth Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.howItWorks.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg" style={{ backgroundColor: item.color }}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm font-bold text-gray-400 mb-2">STEP {item.step}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 text-gray-300">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="py-16 md:py-24 bg-[#f8f6f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.appPreview.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.appPreview.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {appFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* App Screenshots */}
          <div className="mt-16 bg-gradient-to-br from-[#1152d4] to-[#0d3da3] rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h3 className="text-3xl font-bold mb-4">{t.appPreview.seeInAction}</h3>
                <p className="text-blue-100 text-lg leading-relaxed mb-6">
                  {t.appPreview.seeInActionDesc}
                </p>
                <ul className="space-y-3">
                  {t.appPreview.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className={`w-6 h-6 ${language === 'ar' ? 'ml-3' : 'mr-3'} flex-shrink-0 mt-0.5`} />
                      <span className="text-blue-100">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80"
                  alt="WelcomeWealth App Preview"
                  className="rounded-2xl shadow-2xl max-w-xs w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Support Callout */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border-2 border-[#188a42] border-opacity-20">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#188a42] rounded-2xl mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t.trustedSupport.title}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {t.trustedSupport.description}
              </p>
              <a
                href="/partners"
                className="inline-flex items-center px-8 py-4 bg-[#188a42] text-white rounded-xl text-lg font-medium hover:bg-[#146835] transition-all shadow-lg hover:shadow-xl"
              >
                {t.trustedSupport.cta}
                <ArrowRight className={language === 'ar' ? 'mr-2 w-5 h-5 rotate-180' : 'ml-2 w-5 h-5'} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 md:py-24 bg-[#f8f6f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.whoItsFor.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.whoItsFor.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, ...t.whoItsFor.audiences[0] },
              { icon: Users, ...t.whoItsFor.audiences[1] },
              { icon: Heart, ...t.whoItsFor.audiences[2] },
              { icon: BookOpen, ...t.whoItsFor.audiences[3] },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#1152d4] transition-colors">
                  <Icon className="w-10 h-10 text-[#1152d4] mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1152d4] to-[#0d3da3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t.finalCTA.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            {t.finalCTA.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white text-[#1152d4] rounded-xl text-lg font-medium hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              {t.hero.ctaIOS}
              <ArrowRight className={language === 'ar' ? 'mr-2 w-5 h-5 rotate-180' : 'ml-2 w-5 h-5'} />
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl text-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all"
            >
              {t.hero.ctaAndroid}
            </a>
          </div>
          <p className="text-sm text-blue-200 mt-6">
            {t.finalCTA.footer}
          </p>
        </div>
      </section>
    </div>
  );
}