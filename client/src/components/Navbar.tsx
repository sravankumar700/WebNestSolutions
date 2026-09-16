import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import blackLogo from '../assets/webnest-icon.png';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenEnquiry?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, onOpenEnquiry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-100/95 backdrop-blur-md border-b border-cream-300/80 py-3 shadow-sm'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Black WEBNEST logo mark + line-by-line text ("WebNest" / "SOLUTIONS") */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={blackLogo}
              alt="WebNest Logo Mark"
              className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col text-left leading-none font-display">
              <span className="font-extrabold text-lg sm:text-xl text-warmNeutral-900 tracking-tight">
                WebNest
              </span>
              <span className="font-bold text-[10px] sm:text-[11px] text-warmNeutral-700 tracking-[0.2em] uppercase mt-0.5">
                SOLUTIONS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-9">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                  isActive(link.path)
                    ? 'text-brandRed-500 font-semibold'
                    : 'text-warmNeutral-700 hover:text-brandRed-500'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brandRed-500 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right: Get a Quote CTA Button */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenEnquiry ? onOpenEnquiry : () => (window.location.href = '/contact')}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center space-x-1">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-warmNeutral-900 hover:text-brandRed-500 p-2 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream-50 border-b border-cream-300 px-4 pt-4 pb-6 space-y-4 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-brandRed-500/10 text-brandRed-500 font-semibold'
                    : 'text-warmNeutral-700 hover:bg-cream-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenEnquiry) onOpenEnquiry();
                else window.location.href = '/contact';
              }}
            >
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
