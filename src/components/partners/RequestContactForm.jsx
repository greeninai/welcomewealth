import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle2, Phone, Mail, MapPin, Globe, Clock, AlertCircle, Loader2 } from 'lucide-react';

const PROVINCES = [
  { code: 'AB', name: 'Alberta' },
  { code: 'BC', name: 'British Columbia' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'NL', name: 'Newfoundland and Labrador' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'NT', name: 'Northwest Territories' },
  { code: 'NU', name: 'Nunavut' },
  { code: 'ON', name: 'Ontario' },
  { code: 'PE', name: 'Prince Edward Island' },
  { code: 'QC', name: 'Quebec' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'YT', name: 'Yukon' },
];

const COMMON_LANGUAGES = ['English', 'French', 'Spanish', 'Mandarin', 'Cantonese', 'Punjabi', 'Arabic', 'Tagalog', 'Vietnamese', 'Hindi', 'Portuguese', 'Urdu', 'Other'];

const SERVICES_BY_CATEGORY = {
  education: ['Budgeting Workshops', 'Credit Education', 'Debt Management', 'Financial Literacy', 'Tax Education', 'Investment Basics', 'Savings Planning', 'Banking Basics'],
  professional: ['Retirement Planning', 'Investment Management', 'Estate Planning', 'Tax Planning', 'Insurance Advice', 'Financial Planning', 'Mortgage Advice', 'Business Finance'],
  community: ['Settlement Support', 'Banking Guidance', 'Credit Building', 'Integration Support', 'Employment Guidance', 'Housing Support', 'Language Assistance', 'Government Benefits'],
  all: ['Budgeting', 'Credit Education', 'Debt Management', 'Financial Planning', 'Tax Planning', 'Investment Advice', 'Settlement Support', 'Banking Guidance', 'Insurance Advice', 'Retirement Planning'],
};

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  city: '',
  province: '',
  preferred_language: '',
  partner_category: '',
  services_needed: [],
  preferred_contact_method: 'email',
  urgency: 'within_month',
  message: '',
  consent_given: false,
};

export default function RequestContactForm({ onClose, initialCategory = '' }) {
  const [form, setForm] = useState({ ...EMPTY, partner_category: initialCategory });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const availableServices = SERVICES_BY_CATEGORY[form.partner_category] || SERVICES_BY_CATEGORY.all;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'A valid email is required';
    if (!form.partner_category) e.partner_category = 'Please select a partner category';
    if (!form.city.trim()) e.city = 'Please enter your city';
    if (!form.province) e.province = 'Please select your province';
    if (!form.consent_given) e.consent_given = 'You must accept the data policy to proceed';
    return e;
  };

  const mutation = useMutation({
    mutationFn: (data) => base44.entities.ContactLead.create({
      ...data,
      source: 'partners_page',
      status: 'new',
    }),
    onSuccess: async (lead) => {
      // Send confirmation email
      try {
        await base44.integrations.Core.SendEmail({
          to: form.email,
          subject: '✅ We received your request – WelcomeWealth',
          body: `Hi ${form.name},\n\nThank you for reaching out through WelcomeWealth's Trusted Partner Directory!\n\nWe have received your request and a certified partner in your selected category will contact you within 5 business days.\n\nYour request details:\n- Category: ${form.partner_category}\n- City: ${form.city}, ${form.province}\n- Preferred contact: ${form.preferred_contact_method}\n\nImportant: WelcomeWealth does not sell your data. Your information is only shared with verified partners in your selected category, solely for the purpose of connecting you with the right support.\n\nIf you have any questions, you can reply to this email.\n\nWith care,\nThe WelcomeWealth Team\nhttps://welcomewealth.ca`,
        });
      } catch (_) {
        // Silently continue if email fails
      }
      setSubmitted(true);
    },
  });

  const handleServiceToggle = (service) => {
    setForm(f => ({
      ...f,
      services_needed: f.services_needed.includes(service)
        ? f.services_needed.filter(s => s !== service)
        : [...f.services_needed, service],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    mutation.mutate(form);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-10 shadow-lg text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-[#188a42]" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
        <p className="text-gray-600 mb-2">
          Thank you, <strong>{form.name}</strong>. A confirmation has been sent to <strong>{form.email}</strong>.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          A verified partner in your selected category will reach out to you within <strong>5 business days</strong>. You are under no obligation to engage.
        </p>
        <div className="bg-blue-50 rounded-xl p-4 text-left text-sm text-gray-600 mb-6">
          <Shield className="w-4 h-4 text-[#1152d4] inline mr-1" />
          Your data is protected under WelcomeWealth's privacy policy. It will only be shared with verified partners for the sole purpose of connecting you with support.
        </div>
        <Button onClick={onClose} className="bg-[#1152d4] hover:bg-[#0d3da3] px-8">Done</Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Partner Contact</h3>
      <p className="text-gray-500 text-sm mb-6">We'll match you with a verified partner who can best help you. Fields marked * are required.</p>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex gap-3">
        <Shield className="w-5 h-5 text-[#1152d4] flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-700">
          <strong>Your privacy is protected:</strong> Your information will only be shared with verified partners in your selected category, for the sole purpose of connecting you with the right support. WelcomeWealth does not sell, rent, or use your data for advertising. You may request deletion at any time.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Personal Info */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="w-5 h-5 bg-[#1152d4] text-white rounded-full text-xs flex items-center justify-center">1</span>
            Your Contact Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" className={errors.name ? 'border-red-400' : ''} />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email Address *</label>
              <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" className={errors.email ? 'border-red-400' : ''} />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Phone Number <span className="text-gray-400 font-normal">(optional)</span></label>
              <Input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(416) 000-0000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> Preferred Language</label>
              <select value={form.preferred_language} onChange={e => setForm(f => ({ ...f, preferred_language: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]">
                <option value="">Select a language</option>
                {COMMON_LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="w-5 h-5 bg-[#1152d4] text-white rounded-full text-xs flex items-center justify-center">2</span>
            <MapPin className="w-4 h-4" /> Your Location in Canada *
          </h4>
          <p className="text-xs text-gray-500 mb-3">We use your location to find partners who operate in your area or province.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="e.g. Toronto" className={errors.city ? 'border-red-400' : ''} />
              {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Province / Territory *</label>
              <select value={form.province} onChange={e => setForm(f => ({ ...f, province: e.target.value }))} className={`w-full px-3 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4] ${errors.province ? 'border-red-400' : 'border-gray-300'}`}>
                <option value="">Select province</option>
                {PROVINCES.map(p => <option key={p.code} value={p.code}>{p.name} ({p.code})</option>)}
              </select>
              {errors.province && <p className="text-xs text-red-500 mt-1">{errors.province}</p>}
            </div>
          </div>
        </div>

        {/* Support Needed */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="w-5 h-5 bg-[#1152d4] text-white rounded-full text-xs flex items-center justify-center">3</span>
            What Support Do You Need? *
          </h4>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Partner Category *</label>
            <select value={form.partner_category} onChange={e => setForm(f => ({ ...f, partner_category: e.target.value, services_needed: [] }))} className={`w-full px-3 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4] ${errors.partner_category ? 'border-red-400' : 'border-gray-300'}`}>
              <option value="">Select a category</option>
              <option value="education">📚 Financial Education Organizations</option>
              <option value="professional">⚖️ Licensed Financial Professionals</option>
              <option value="community">🤝 Community & Immigrant Support</option>
            </select>
            {errors.partner_category && <p className="text-xs text-red-500 mt-1">{errors.partner_category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specific Services You're Looking For <span className="text-gray-400 font-normal">(select all that apply)</span></label>
            <div className="flex flex-wrap gap-2">
              {availableServices.map(service => (
                <button
                  key={service}
                  type="button"
                  onClick={() => handleServiceToggle(service)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${form.services_needed.includes(service) ? 'bg-[#1152d4] text-white border-[#1152d4]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#1152d4] hover:text-[#1152d4]'}`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="w-5 h-5 bg-[#1152d4] text-white rounded-full text-xs flex items-center justify-center">4</span>
            Contact Preferences
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method</label>
              <div className="flex gap-3">
                {[['email', '📧 Email'], ['phone', '📞 Phone'], ['either', '✅ Either']].map(([val, label]) => (
                  <label key={val} className={`flex-1 text-center px-3 py-2 rounded-lg border text-sm cursor-pointer transition-all ${form.preferred_contact_method === val ? 'bg-[#1152d4] text-white border-[#1152d4]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#1152d4]'}`}>
                    <input type="radio" name="contact_method" value={val} checked={form.preferred_contact_method === val} onChange={() => setForm(f => ({ ...f, preferred_contact_method: val }))} className="hidden" />
                    {label}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> How Urgent Is Your Need?</label>
              <select value={form.urgency} onChange={e => setForm(f => ({ ...f, urgency: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4]">
                <option value="not_urgent">Not urgent – just exploring</option>
                <option value="within_month">Within the next month</option>
                <option value="within_week">Within the next week</option>
                <option value="urgent">Urgent – need help now</option>
              </select>
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tell Us More About What You Need <span className="text-gray-400 font-normal">(optional but helpful)</span></label>
          <Textarea
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            placeholder="Describe your situation and what kind of guidance or support you're looking for. The more detail you share, the better we can match you with the right partner."
            className="h-28"
          />
        </div>

        {/* Consent */}
        <div className={`rounded-xl border p-4 ${errors.consent_given ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
          <label className="flex gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.consent_given}
              onChange={e => setForm(f => ({ ...f, consent_given: e.target.checked }))}
              className="mt-0.5 w-4 h-4 accent-[#1152d4]"
            />
            <div className="text-sm text-gray-700">
              <strong>I understand and agree</strong> that my contact information and details will be shared with verified WelcomeWealth partners in my selected category, for the sole purpose of connecting me with financial support. I understand that WelcomeWealth does not sell or commercialize my data, and I can request deletion at any time. This submission does not create any obligation.
            </div>
          </label>
          {errors.consent_given && <p className="text-xs text-red-500 mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.consent_given}</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button type="submit" disabled={mutation.isPending} className="flex-1 bg-[#188a42] hover:bg-[#146835] py-3">
            {mutation.isPending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Sending...</> : 'Submit Request'}
          </Button>
          <Button type="button" variant="outline" onClick={onClose} className="sm:w-40">Cancel</Button>
        </div>
      </form>
    </div>
  );
}