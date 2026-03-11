import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Shield, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// Authorized domains and emails
const AUTHORIZED_DOMAINS = ['welcomewealth.ca'];
const AUTHORIZED_EMAILS = ['greeninco.com@gmail.com', 'andres.luna@greeninco.com'];

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
    retry: false,
    staleTime: 60000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f6f8] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#1152d4] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAuthorizedAdmin(user.email)) {
    return (
      <div className="min-h-screen bg-[#f8f6f8] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso Restringido</h1>
          <p className="text-gray-600 mb-2">Esta área es exclusiva para administradores autorizados de WelcomeWealth.</p>
          <p className="text-sm text-gray-400 mb-6">Estás conectado con una cuenta no autorizada.</p>
          <div className="space-y-3">
            <button
              onClick={() => base44.auth.logout(window.location.origin + createPageUrl('AdminLogin'))}
              className="w-full px-6 py-3 bg-[#1152d4] text-white rounded-xl font-medium hover:bg-[#0d3da3] transition-colors"
            >
              Cerrar sesión e intentar con otra cuenta
            </button>
            <Link to={createPageUrl('Home')} className="block px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors text-center">
              Volver al sitio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}