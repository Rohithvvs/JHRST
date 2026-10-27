import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <>
      {/* Top Luxury Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-700 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(2,103,214,0.4)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#0267D6] to-[#014A96] border border-blue-400/30 flex items-center justify-center p-2 shadow-md group-hover:shadow-lg transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(22deg)_rotateX(8deg)]">
                {/* Stylized Futuristic JHRST Icon with Upward Arrow */}
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <defs>
                    <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="40%" stopColor="#E0F2FE" />
                      <stop offset="100%" stopColor="#38BDF8" />
                    </linearGradient>
                  </defs>
                  {/* Left pillar J */}
                  <path
                    d="M10 8 L18 8 L18 26 C18 30 14 32 10 30"
                    stroke="url(#navLogoGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  {/* Ascending Arrow pillar */}
                  <path
                    d="M22 28 L32 12 M24 12 L32 12 L32 20"
                    stroke="url(#navLogoGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                {/* Corner accent glow */}
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-sky-300 rounded-full animate-ping opacity-90" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold tracking-tight text-slate-900 font-heading group-hover:text-blue-600 transition-colors">
                    JHRST <span className="font-medium text-slate-500 text-sm hidden sm:inline">Tech Solutions</span>
                  </span>

                </div>
                <span className="text-[10px] tracking-[0.22em] font-bold text-blue-600 uppercase -mt-0.5">
                  BUILD. INNOVATE. GROW.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-white/90 border border-slate-200/90 rounded-full p-1.5 backdrop-blur-xl shadow-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-white bg-gradient-to-r from-[#00A6FB] via-[#0267D6] to-[#014A96] font-semibold shadow-sm'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/80'
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
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-400 focus:outline-none transition-colors shadow-sm"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-blue-600" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-slate-200 px-6 py-6 overflow-hidden shadow-xl"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 mt-2 border-t border-slate-200">
                  <Link to="/contact" className="block w-full">
                    <Button variant="primary" size="md" className="w-full">
                      Let's Talk
                    </Button>
                  </Link>
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-4 px-1">
                    <span>Bengaluru, India</span>
                    <span className="text-blue-600 font-mono font-medium">+91 99662 84338</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
