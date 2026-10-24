import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'AI Solutions', path: '/ai-solutions' },
    { name: 'Projects', path: '/projects' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-[#292929] shadow-xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#141414] to-[#0D0D0D] border border-gold-500/40 flex items-center justify-center p-1.5 shadow-gold-sm group-hover:border-gold-400 transition-colors">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="navGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5D76E" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#94741B" />
                  </linearGradient>
                </defs>
                <path
                  d="M26 30 H74 M50 30 V70 M34 70 H66"
                  stroke="url(#navGold)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle cx="50" cy="50" r="4" fill="#F5D76E" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white font-heading group-hover:text-gold-300 transition-colors">
                JHRST <span className="font-light text-gray-300 text-sm hidden sm:inline">Tech Solutions</span>
              </span>
              <span className="text-[10px] tracking-[0.2em] font-medium text-gold-400/90 uppercase -mt-0.5">
                BUILD. INNOVATE. GROW.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#101010]/70 border border-[#262626] rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-3.5 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-black bg-gradient-to-r from-[#F5D76E] to-[#D4AF37] font-semibold shadow-gold-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/contact">
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
              >
                Let's Talk
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link to="/contact">
              <Button variant="primary" size="sm">
                Talk
              </Button>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-[#141414] border border-[#292929] text-gray-300 hover:text-white hover:border-gold-500/50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0a]/98 border-b border-[#292929] px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-gold-500/20 to-transparent text-gold-300 border-l-2 border-gold-400 font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-[#222]">
              <Link to="/contact" className="block w-full">
                <Button variant="primary" size="md" className="w-full">
                  Let's Talk
                </Button>
              </Link>
              <p className="text-center text-xs text-gold-400/80 tracking-widest mt-4">
                BUILD. INNOVATE. GROW.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

