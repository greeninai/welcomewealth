import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Shield, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// Authorized domains and emails
const AUTHORIZED_DOMAINS = ['welcomewealth.ca'];
const AUTHORIZED_EMAILS = ['greeninco.com@gmail.com'];

export function isAuthorizedAdmin(email) {
  if (!email) return false;
  if (AUTHORIZED_EMAILS.includes(email.toLowerCase())) return true;
  const domain = email.split('@')[1]?.toLowerCase();
  return AUTHORIZED_DOMAINS.includes(domain);
}

export default function AdminGuard({ children }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try { return await base44.auth.me(); } catch { return null; }
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f6f8] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#1152d4] animate-spin" />
      </div>
    );
  }

  if (!user) {
    base44.auth.redirectToLogin(createPageUrl('AdminLogin'));
    return null;
  }

  if (!isAuthorizedAdmin(user.email)) {
    return (
      <div className="min-h-screen bg-[#f8f6f8] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h1>
          <p className="text-gray-600 mb-2">This area is restricted to authorized WelcomeWealth administrators only.</p>
          <p className="text-sm text-gray-400 mb-6">Logged in as: <span className="font-medium text-gray-600">{user.email}</span></p>
          <Link to={createPageUrl('Home')} className="inline-block px-6 py-3 bg-[#1152d4] text-white rounded-lg font-medium hover:bg-[#0d3da3] transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return children;
}