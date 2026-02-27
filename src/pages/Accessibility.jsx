import React from 'react';
import { Eye, ChevronRight, Mail } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      <ChevronRight className="w-5 h-5 text-[#188a42] flex-shrink-0" />
      {title}
    </h2>
    <div className="text-gray-700 leading-relaxed space-y-3 pl-7">{children}</div>
  </div>
);

export default function Accessibility() {
  return (
    <div className="bg-[#f8f6f8]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-white to-green-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-[#188a42] bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Eye className="w-8 h-8 text-[#188a42]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Accessibility Statement</h1>
          <p className="text-gray-600">Last updated: February 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 border border-[#188a42] border-opacity-20 rounded-2xl p-6 mb-10">
            <p className="text-gray-700 leading-relaxed">
              WelcomeWealth is committed to making financial education accessible to everyone. We believe that all people — regardless of ability, language, or background — deserve equal access to financial literacy tools and resources.
            </p>
          </div>

          <Section title="Our Commitment">
            <p>WelcomeWealth strives to meet or exceed the accessibility standards set out in the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>, as well as the <strong>Accessibility for Ontarians with Disabilities Act (AODA)</strong>.</p>
            <p>We are committed to continuous improvement of our platform to ensure it is usable by the widest possible range of people, including those who rely on assistive technologies.</p>
          </Section>

          <Section title="Accessibility Features">
            <p>WelcomeWealth currently includes the following accessibility features:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Plain language:</strong> All content is written in clear, jargon-free language accessible to users with varying levels of financial literacy</li>
              <li><strong>Multilingual support:</strong> The platform is available in multiple languages including English, French, Spanish, Arabic, Mandarin, and Portuguese</li>
              <li><strong>RTL language support:</strong> Right-to-left reading is supported for Arabic and other applicable languages</li>
              <li><strong>Responsive design:</strong> The platform works on all devices including smartphones, tablets, and desktops</li>
              <li><strong>Color contrast:</strong> Text and interface elements meet minimum contrast ratio requirements</li>
              <li><strong>Keyboard navigation:</strong> Core features are navigable via keyboard</li>
              <li><strong>Semantic HTML:</strong> Content is structured using semantic markup to support screen readers</li>
              <li><strong>Alt text:</strong> Images include descriptive alternative text</li>
            </ul>
          </Section>

          <Section title="Known Limitations">
            <p>We acknowledge that some areas of the platform may not yet fully meet accessibility standards. Known areas of ongoing improvement include:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Some data visualizations (charts) may have limited screen reader support — we are working to add accessible text alternatives</li>
              <li>Video content accessibility features (captions, transcripts) are in development</li>
              <li>Some third-party components may have limited accessibility compliance</li>
            </ul>
            <p>We are actively working to address these limitations in upcoming platform updates.</p>
          </Section>

          <Section title="Assistive Technology Compatibility">
            <p>WelcomeWealth is designed to be compatible with:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Screen readers (including NVDA, JAWS, and VoiceOver)</li>
              <li>Browser zoom and text resizing features</li>
              <li>High contrast mode</li>
              <li>Keyboard-only navigation</li>
              <li>Voice control software</li>
            </ul>
          </Section>

          <Section title="Feedback & Support">
            <p>We welcome feedback on the accessibility of WelcomeWealth. If you experience any barriers accessing content or functionality, please contact us:</p>
            <div className="bg-[#f8f6f8] rounded-xl p-4 mt-2">
              <p><strong>Accessibility Feedback</strong></p>
              <p>Email: <a href="mailto:accessibility@welcomewealth.ca" className="text-[#188a42] hover:underline">accessibility@welcomewealth.ca</a></p>
              <p className="text-sm text-gray-600 mt-2">We aim to respond to accessibility inquiries within 5 business days.</p>
            </div>
          </Section>

          <Section title="Alternative Formats">
            <p>If you require content in an alternative format (e.g., large print, simplified text, or a different language), please contact us and we will do our best to accommodate your request.</p>
          </Section>

          <Section title="Ongoing Improvement">
            <p>Accessibility is an ongoing effort, not a one-time project. We are committed to:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Regularly auditing our platform against WCAG 2.1 AA standards</li>
              <li>Incorporating accessibility feedback into our development roadmap</li>
              <li>Training our team on accessible design and development practices</li>
              <li>Expanding multilingual and cultural accessibility over time</li>
            </ul>
          </Section>
        </div>
      </section>
    </div>
  );
}