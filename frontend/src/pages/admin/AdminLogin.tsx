import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      error('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      success('Logged in successfully to JHRST Admin Panel.');
      navigate('/admin');
    } catch (err: any) {
      error(err.response?.data?.detail || 'Invalid administrator credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#141414] border border-gold-500/40 flex items-center justify-center p-1.5 shadow-gold-sm">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M26 30 H74 M50 30 V70 M34 70 H66"
                  stroke="#D4AF37"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle cx="50" cy="50" r="4" fill="#F5D76E" />
              </svg>
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-white font-heading">
            Admin Console
          </h2>
          <p className="text-xs text-muted mt-1">
            JHRST Tech Solutions &bull; Authorized Staff Authentication
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#0f0f0f] border border-[#262626] shadow-2xl space-y-6">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-300 text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0 text-gold-400" />
            <span>Default Seed: admin@jhrst.com (configured in .env)</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jhrst.com"
                  className="w-full bg-[#161616] border border-[#2b2b2b] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#161616] border border-[#2b2b2b] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Authenticate &amp; Enter
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-[#1c1c1c] text-center">
            <Link to="/" className="text-xs text-muted hover:text-white transition-colors">
              &larr; Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

