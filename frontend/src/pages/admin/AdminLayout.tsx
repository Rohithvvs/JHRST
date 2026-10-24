import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  FileCode, 
  LogOut, 
  Globe, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Inquiries Review', path: '/admin/inquiries', icon: MessageSquare },
    { name: 'Job Applications', path: '/admin/applications', icon: Users },
    { name: 'Content & Settings', path: '/admin/content', icon: FileCode },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0d0d0d] border-r border-[#1f1f1f] flex flex-col justify-between shrink-0">
        <div>
          {/* Brand */}
          <div className="p-6 border-b border-[#1f1f1f] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#141414] border border-gold-500/40 flex items-center justify-center p-1">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M26 30 H74 M50 30 V70 M34 70 H66"
                  stroke="#D4AF37"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-bold font-heading text-white">JHRST Tech</h2>
              <span className="text-[10px] text-gold-400 tracking-wider uppercase font-semibold">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-500/20 to-transparent border-l-2 border-gold-400 text-gold-300 font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 text-current" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#1f1f1f] space-y-3">
          <div className="p-3 rounded-xl bg-[#141414] border border-[#222] flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-bold">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-muted truncate">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/" target="_blank" className="flex-1">
              <Button variant="secondary" size="sm" className="w-full text-xs" leftIcon={<Globe className="w-3.5 h-3.5 text-muted" />}>
                Live Site
              </Button>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-[#141414] border border-[#222] text-gray-400 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen p-6 sm:p-10">
        <Outlet />
      </main>
    </div>
  );
};

