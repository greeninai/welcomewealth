import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      <ChevronRight className="w-5 h-5 text-[#1152d4] flex-shrink-0" />
      {title}
    </h2>
    <div className="text-gray-700 leading-relaxed space-y-3 pl-7">{children}</div>
  </div>
);

export default function Terms() {
  return (
    <div className="bg-[#f8f6f8]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-[#1152d4] bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-[#1152d4]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Use</h1>
          <p className="text-gray-600">Last updated: February 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-[#1152d4] border-opacity-20 rounded-2xl p-6 mb-10">
            <p className="text-gray-700 leading-relaxed">
              Please read these Terms of Use carefully before using WelcomeWealth. By accessing or using our website, mobile application, or any content we provide, you agree to be bound by these terms. If you do not agree, please do not use WelcomeWealth.
            </p>
          </div>

          <Section title="About WelcomeWealth">
            <p>WelcomeWealth is a financial education platform operated by <strong>GreenIn Company</strong>, a Canadian-based organization. WelcomeWealth provides general financial literacy content, tools, and a directory of verified support organizations.</p>
            <p>WelcomeWealth is <strong>not</strong> a financial institution, bank, investment dealer, insurance company, or registered financial advisor. Nothing on this platform constitutes financial, investment, tax, legal, or insurance advice.</p>
          </Section>

          <Section title="Eligibility">
            <p>WelcomeWealth is intended for use by individuals who are:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Residents of Canada or individuals seeking to understand the Canadian financial system</li>
              <li>At least 13 years of age</li>
              <li>Using the platform for personal, non-commercial educational purposes</li>
            </ul>
          </Section>

          <Section title="Educational Purpose Only">
            <p>All content provided by WelcomeWealth, including articles, guides, tools, budgeting features, and partner listings, is provided for <strong>general educational and informational purposes only</strong>.</p>
            <p>Content should not be construed as:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Personalized financial advice</li>
              <li>Investment recommendations</li>
              <li>Tax guidance or legal advice</li>
              <li>An endorsement of any specific financial product, service, or provider</li>
            </ul>
            <p>Users are encouraged to consult with a licensed professional before making any financial decisions.</p>
          </Section>

          <Section title="Partner Directory">
            <p>The Trusted Support Directory lists verified organizations and professionals. Inclusion in the directory does not constitute an endorsement, recommendation, or guarantee of services by WelcomeWealth or GreenIn Company.</p>
            <p>WelcomeWealth is not responsible for:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>The accuracy of information provided by listed partners</li>
              <li>The quality of services rendered by partners</li>
              <li>Any agreements, contracts, or outcomes arising from user-partner interactions</li>
            </ul>
            <p>Users engage with partners entirely at their own discretion.</p>
          </Section>

          <Section title="User Conduct">
            <p>By using WelcomeWealth, you agree not to:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Use the platform for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the platform</li>
              <li>Reproduce, distribute, or commercially exploit any content without permission</li>
              <li>Submit false, misleading, or harmful information</li>
              <li>Interfere with the security or integrity of the platform</li>
            </ul>
          </Section>

          <Section title="Intellectual Property">
            <p>All content, trademarks, logos, and materials on WelcomeWealth are the property of GreenIn Company or its licensors and are protected by applicable intellectual property laws.</p>
            <p>You may use content for personal, non-commercial purposes only. Any other use requires prior written consent from GreenIn Company.</p>
          </Section>

          <Section title="Limitation of Liability">
            <p>To the maximum extent permitted by applicable law, GreenIn Company and WelcomeWealth shall not be liable for:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Any financial decisions made based on content accessed through the platform</li>
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of data, revenue, or profits</li>
              <li>The conduct or services of any listed partner</li>
            </ul>
            <p>The platform is provided "as is" without warranties of any kind.</p>
          </Section>

          <Section title="Availability">
            <p>We strive to keep WelcomeWealth available at all times, but we do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue the platform at any time with or without notice.</p>
          </Section>

          <Section title="Governing Law">
            <p>These Terms of Use are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein. Any disputes shall be resolved in the courts of Ontario, Canada.</p>
          </Section>

          <Section title="Changes to These Terms">
            <p>We may update these Terms of Use from time to time. We will notify users of material changes via the app or website. Continued use after changes constitutes acceptance of the updated terms.</p>
          </Section>

          <Section title="Contact">
            <p>Questions about these terms? Contact us at:</p>
            <div className="bg-[#f8f6f8] rounded-xl p-4 mt-2">
              <p><strong>GreenIn Company</strong></p>
              <p>Email: <a href="mailto:legal@welcomewealth.ca" className="text-[#1152d4] hover:underline">legal@welcomewealth.ca</a></p>
              <p>Website: <a href="https://www.greeninco.com" target="_blank" rel="noopener noreferrer" className="text-[#1152d4] hover:underline">www.greeninco.com</a></p>
            </div>
          </Section>
        </div>
      </section>
    </div>
  );
}