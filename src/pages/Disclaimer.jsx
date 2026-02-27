import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
      <ChevronRight className="w-5 h-5 text-[#d86c00] flex-shrink-0" />
      {title}
    </h2>
    <div className="text-gray-700 leading-relaxed space-y-3 pl-7">{children}</div>
  </div>
);

export default function Disclaimer() {
  return (
    <div className="bg-[#f8f6f8]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-white to-orange-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-[#d86c00] bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-[#d86c00]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-gray-600">Last updated: February 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 border border-[#d86c00] border-opacity-30 rounded-2xl p-6 mb-10">
            <p className="text-gray-800 leading-relaxed font-medium">
              <strong>Important:</strong> WelcomeWealth provides general financial education content only. Nothing on this platform constitutes financial, investment, tax, legal, or insurance advice. Please read this disclaimer carefully before using our content or making any financial decisions.
            </p>
          </div>

          <Section title="No Financial Advice">
            <p>WelcomeWealth is an educational platform. All content, tools, articles, guides, and resources provided through WelcomeWealth are intended solely for <strong>general informational and educational purposes</strong>.</p>
            <p>Content provided on WelcomeWealth does <strong>not</strong> constitute:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Financial advice or financial planning</li>
              <li>Investment advice or investment recommendations</li>
              <li>Tax advice or tax planning</li>
              <li>Legal advice</li>
              <li>Insurance advice</li>
              <li>Credit counselling</li>
              <li>Debt management advice</li>
            </ul>
          </Section>

          <Section title="Consult a Licensed Professional">
            <p>Financial decisions are personal and depend on your individual circumstances, goals, and risk tolerance. <strong>Before making any financial decision</strong>, we strongly encourage you to:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Consult a licensed financial advisor or planner registered with the appropriate Canadian regulatory body</li>
              <li>Seek professional tax advice from a certified accountant (CPA)</li>
              <li>Obtain legal advice from a qualified lawyer for legal matters</li>
              <li>Speak with a licensed insurance broker for insurance-related decisions</li>
            </ul>
            <p>The Trusted Support Directory on WelcomeWealth provides access to verified professionals, but engagement with any listed professional is at your own discretion.</p>
          </Section>

          <Section title="Content Accuracy">
            <p>While we strive to provide accurate, current, and reliable financial education content, WelcomeWealth makes no representations or warranties of any kind — express or implied — about the completeness, accuracy, reliability, suitability, or availability of the information.</p>
            <p>The Canadian financial system, tax laws, regulations, and products are subject to change. Content on WelcomeWealth may not reflect the most current developments. Always verify information with official sources or a licensed professional.</p>
          </Section>

          <Section title="Third-Party Links & Partners">
            <p>WelcomeWealth may contain links to external websites or reference third-party organizations. These links are provided for informational purposes only. WelcomeWealth does not endorse, verify, or assume responsibility for:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>The content, accuracy, or practices of any external website</li>
              <li>The products or services offered by any third party</li>
              <li>Any outcomes resulting from interactions with external organizations or partners</li>
            </ul>
            <p>Inclusion of an organization in the Partner Directory does not constitute an endorsement or guarantee of services.</p>
          </Section>

          <Section title="No Liability">
            <p>To the fullest extent permitted by applicable law, <strong>GreenIn Company</strong> and <strong>WelcomeWealth</strong> shall not be liable for any loss, damage, cost, or expense — whether direct, indirect, incidental, or consequential — arising from:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Reliance on any information provided on the platform</li>
              <li>Financial decisions made based on content accessed through WelcomeWealth</li>
              <li>Use of or inability to use the platform</li>
              <li>Services provided by any partner or third-party listed on the platform</li>
            </ul>
          </Section>

          <Section title="Not a Regulated Entity">
            <p>WelcomeWealth and GreenIn Company are <strong>not</strong> regulated financial entities. We are not registered with:</p>
            <ul className="list-disc ml-5 space-y-2">
              <li>The Investment Industry Regulatory Organization of Canada (IIROC)</li>
              <li>The Mutual Fund Dealers Association of Canada (MFDA)</li>
              <li>Any provincial securities commission as an investment dealer</li>
              <li>The Financial Consumer Agency of Canada (FCAC) as a financial institution</li>
            </ul>
          </Section>

          <Section title="Jurisdiction">
            <p>This disclaimer is governed by the laws of the Province of Ontario and the federal laws of Canada. It applies to all users accessing WelcomeWealth from any location.</p>
          </Section>

          <Section title="Questions">
            <p>If you have questions about this disclaimer, contact us at:</p>
            <div className="bg-[#f8f6f8] rounded-xl p-4 mt-2">
              <p><strong>GreenIn Company</strong></p>
              <p>Email: <a href="mailto:legal@welcomewealth.ca" className="text-[#d86c00] hover:underline">legal@welcomewealth.ca</a></p>
              <p>Website: <a href="https://www.greeninco.com" target="_blank" rel="noopener noreferrer" className="text-[#d86c00] hover:underline">www.greeninco.com</a></p>
            </div>
          </Section>
        </div>
      </section>
    </div>
  );
}