import React from 'react';
import { Quote, Star } from 'lucide-react';

export default function Testimonials({ t }) {
  const testimonials = t.testimonials.items;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1152d4] bg-opacity-10 rounded-2xl mb-5">
            <Quote className="w-7 h-7 text-[#1152d4]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[#f8f6f8] rounded-2xl p-8 flex flex-col border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 flex-grow italic">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ backgroundColor: item.avatarColor }}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}