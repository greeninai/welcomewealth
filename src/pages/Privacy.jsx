import React from 'react';
import { Shield, Lock, Eye, Users, Mail, ChevronRight } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      <ChevronRight className="w-5 h-5 text-[#1152d4] flex-shrink-0" />
      {title}
    </h2>
    <div className="text-gray-700 leading-relaxed space-y-3 pl-7">{children}</div>
  </div>
);

export default function Privacy() {
  return (
    <div className="bg-[#f8f6f8]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-[#1152d4] bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-[#1152d4]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: February 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-[#1152d4] border-opacity-20 rounded-2xl p-6 mb-10">
            <p className="text-gray-700 leading-relaxed">
              <strong>WelcomeWealth</strong> is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and mobile application. By using WelcomeWealth, you agree to the practices described in this policy.
            </p>
          </div>

          <Section title="Who We Are">
            <p>WelcomeWealth is a social impact initiative developed and operated by <strong>GreenIn Company</strong>, a Canadian-based organization. Our registered address and contact information are available upon request.</p>
            <p>For privacy-related inquiries, contact us at: <a href="mailto:privacy@welcomewealth.ca" className="text-[#1152d4] hover:underline">privacy@welcomewealth.ca</a></p>
          </Section>

          <Section title="Information We Collect">
            <p>We collect only the minimum information necessary to provide our educational services:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Account information:</strong> Name and email address if you create an account</li>
              <li><strong>App usage data:</strong> Budget entries and goals you choose to create within the app</li>
              <li><strong>Learning progress:</strong> Which educational content you have viewed</li>
              <li><strong>Technical data:</strong> Device type, operating system, and basic app usage patterns used solely to improve the platform</li>
            </ul>
          </Section>

          <Section title="Information We Do Not Collect">
            <p>WelcomeWealth does <strong>not</strong> collect:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Bank account numbers or financial account credentials</li>
              <li>Credit card or payment information</li>
              <li>Social Insurance Numbers (SIN) or government-issued ID</li>
              <li>Contacts, photos, or files from your device</li>
              <li>GPS location or precise location data</li>
              <li>Browsing history outside of the WelcomeWealth app</li>
            </ul>
          </Section>

          <Section title="How We Use Your Information">
            <p>Your information is used exclusively to:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Provide personalized budget tracking and goal-setting features</li>
              <li>Track your learning progress within the app</li>
              <li>Improve the quality and accessibility of our platform</li>
              <li>Respond to support requests</li>
            </ul>
            <p>We do <strong>not</strong> use your data for advertising, profiling, or to generate revenue through data sales.</p>
          </Section>

          <Section title="Data Sharing">
            <p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
            <p>Limited sharing may occur only in these circumstances:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Service providers:</strong> Trusted technical providers who help us operate the platform (under strict confidentiality agreements)</li>
              <li><strong>Legal compliance:</strong> When required by applicable Canadian law or court order</li>
              <li><strong>Partner requests:</strong> Only if you explicitly choose to submit a contact request through the Partners section — in that case, only the information you provide in the form is shared with the selected partner category</li>
            </ul>
          </Section>

          <Section title="Data Security">
            <p>We implement industry-standard security measures to protect your information:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>All data is encrypted in transit using TLS</li>
              <li>Data at rest is encrypted using AES-256</li>
              <li>Access to personal data is restricted to authorized personnel only</li>
              <li>We conduct regular security reviews and updates</li>
            </ul>
          </Section>

          <Section title="Your Rights">
            <p>Under Canadian privacy law (PIPEDA), you have the right to:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Correction:</strong> Request corrections to inaccurate information</li>
              <li><strong>Deletion:</strong> Request that we delete your account and associated data</li>
              <li><strong>Withdrawal of consent:</strong> Opt out of non-essential data collection at any time</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:privacy@welcomewealth.ca" className="text-[#1152d4] hover:underline">privacy@welcomewealth.ca</a>.</p>
          </Section>

          <Section title="Cookies">
            <p>WelcomeWealth uses only essential cookies required for the platform to function. We do not use tracking cookies, advertising cookies, or third-party analytics cookies.</p>
          </Section>

          <Section title="Children's Privacy">
            <p>WelcomeWealth is not intended for use by children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.</p>
          </Section>

          <Section title="Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. Any significant changes will be communicated through the app or website. Continued use of WelcomeWealth after changes constitutes acceptance of the updated policy.</p>
          </Section>

          <Section title="Contact">
            <p>For privacy questions or concerns, contact:</p>
            <div className="bg-[#f8f6f8] rounded-xl p-4 mt-2">
              <p><strong>GreenIn Company</strong> — Privacy Office</p>
              <p>Email: <a href="mailto:privacy@welcomewealth.ca" className="text-[#1152d4] hover:underline">privacy@welcomewealth.ca</a></p>
              <p>Website: <a href="https://www.greeninco.com" target="_blank" rel="noopener noreferrer" className="text-[#1152d4] hover:underline">www.greeninco.com</a></p>
            </div>
          </Section>
        </div>
      </section>
    </div>
  );
}