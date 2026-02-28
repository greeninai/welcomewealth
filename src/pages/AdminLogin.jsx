import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Shield, Loader2, Lock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { isAuthorizedAdmin } from '../components/admin/AdminGuard';

export default function AdminLogin() {
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: async () => { try { return await base44.auth.me(); } catch { return null; } },
  });

  useEffect(() => {
    if (user && isAuthorizedAdmin(user.email)) {
      navigate(createPageUrl('AdminDashboard'), { replace: true });
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d1f4e] to-[#1152d4] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  // Already logged in but NOT authorized
  if (user && !isAuthorizedAdmin(user.email)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0d1f4e] to-[#1152d4] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso Denegado</h1>
          <p className="text-gray-500 mb-2 text-sm">
            Tu cuenta no tiene permisos para acceder al área administrativa.
          </p>
          <p className="text-xs text-gray-400 mb-6">
            Conectado como: <span className="font-medium text-gray-600">{user.email}</span>
          </p>
          <div className="space-y-3">
            <button
              onClick={() => base44.auth.logout()}
              className="w-full px-6 py-3 bg-[#1152d4] text-white rounded-xl font-medium hover:bg-[#0d3da3] transition-colors"
            >
              Cerrar sesión e intentar con otra cuenta
            </button>
            <Link to={createPageUrl('Home')} className="block px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              Volver al sitio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Not logged in — show login gate
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1f4e] to-[#1152d4] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Top banner */}
          <div className="bg-gradient-to-r from-[#0d1f4e] to-[#1152d4] px-8 py-8 text-center">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6986a2ab487be21fdd4ca463/f35f84552_WelcomeWealth_Logo.png"
              alt="WelcomeWealth"
              className="h-10 mx-auto mb-4 brightness-200"
            />
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              <Lock className="w-3 h-3" />
              ÁREA ADMINISTRATIVA
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-8 text-center">
            <div className="w-14 h-14 bg-[#1152d4]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Shield className="w-7 h-7 text-[#1152d4]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Panel de Control</h1>
            <p className="text-gray-500 text-sm mb-2">
              Área exclusiva para el equipo de WelcomeWealth.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-7 text-left">
              <p className="text-xs font-semibold text-[#1152d4] mb-1">Acceso permitido únicamente para:</p>
              <ul className="text-xs text-gray-600 space-y-0.5">
                <li>• Cuentas con dominio <span className="font-mono font-semibold">@welcomewealth.ca</span></li>
                <li>• <span className="font-mono font-semibold">greeninco.com@gmail.com</span></li>
              </ul>
            </div>

            <button
              onClick={() => base44.auth.redirectToLogin(window.location.origin + createPageUrl('AdminDashboard'))}
              className="w-full py-3.5 bg-[#1152d4] text-white rounded-xl font-semibold hover:bg-[#0d3da3] transition-colors shadow-md shadow-blue-200 mb-4"
            >
              Iniciar sesión con cuenta autorizada
            </button>

            <Link to={createPageUrl('Home')} className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Volver al sitio web
            </Link>
          </div>
        </div>

        <p className="text-center text-white/50 text-xs mt-6">
          © 2026 WelcomeWealth · GreenIn Impact
        </p>
      </div>
    </div>
  );
}