import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, Youtube, ArrowRight, Check } from 'lucide-react';
import blackLogo from '../assets/webnest-icon-removebg-preview.png';
import { subscribeToNewsletter } from '../services/api';

interface FooterProps {
  settings?: {
    email?: string;
    footerText?: string;
    socialLinks?: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      instagram?: string;
    };
  };
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      try {
        await subscribeToNewsletter(newsletterEmail);
      } catch (error) {
        return;
      }
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-charcoal-900 text-cream-200 border-t border-charcoal-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-charcoal-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-5 group">
              <img
                src={blackLogo}
                alt="WebNest Logo Mark"
                  className="brand-logo h-10 w-auto object-contain"
              />
              <div className="flex flex-col text-left leading-none font-display">
                <span className="font-extrabold text-xl text-white tracking-tight">
                  WebNest
                </span>
                <span className="font-bold text-[10px] text-warmNeutral-400 tracking-[0.2em] uppercase mt-0.5">
                  SOLUTIONS
                </span>
              </div>
            </Link>

            <p className="text-warmNeutral-300 text-xs sm:text-sm max-w-sm leading-relaxed">
              Designing and developing modern websites for businesses ready to grow.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={settings?.socialLinks?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-charcoal-800 hover:bg-brandRed-500 hover:text-white flex items-center justify-center text-warmNeutral-300 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings?.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-charcoal-800 hover:bg-brandRed-500 hover:text-white flex items-center justify-center text-warmNeutral-300 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={settings?.socialLinks?.github || 'https://github.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-charcoal-800 hover:bg-brandRed-500 hover:text-white flex items-center justify-center text-warmNeutral-300 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-charcoal-800 hover:bg-brandRed-500 hover:text-white flex items-center justify-center text-warmNeutral-300 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-warmNeutral-300">
              <li>
                <Link to="/" className="hover:text-brandRed-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-brandRed-500 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brandRed-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brandRed-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brandRed-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-warmNeutral-300">
              <li>
                <Link to="/services" className="hover:text-brandRed-500 transition-colors">
                  Business Websites
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brandRed-500 transition-colors">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brandRed-500 transition-colors">
                  Restaurant Websites
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brandRed-500 transition-colors">
                  Portfolio Websites
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brandRed-500 transition-colors">
                  Landing Pages
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay in touch */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">
              Newsletter
            </h4>
            <p className="text-warmNeutral-300 text-xs mb-3">
              Get updates, new projects and tips by email.
            </p>
            {subscribed ? (
              <div className="bg-brandRed-500/10 border border-brandRed-500/30 text-brandRed-500 text-xs p-3 rounded-lg flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  required
                  aria-label="Newsletter email address"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3.5 py-2 text-xs text-white placeholder-warmNeutral-500 focus:outline-none focus:border-brandRed-500 transition-colors pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 w-7 bg-brandRed-500 hover:bg-brandRed-600 text-white rounded flex items-center justify-center transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-warmNeutral-300 space-y-4 md:space-y-0">
          <p>{settings?.footerText || '© 2026 WebNest Solutions. All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
};
