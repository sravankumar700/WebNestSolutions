import React from 'react';
import { Hero3DCanvas } from '../three/3DHeroCanvas';
import { Button } from '../components/Button';
import { Zap, Smartphone, Search, Users } from 'lucide-react';

interface HeroSectionProps {
  onOpenEnquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="hero-theme relative pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-5 space-y-6 text-left lg:pt-6">
            <h1 className="hero-title text-[3.4rem] sm:text-[4.2rem] lg:text-[5.5rem] font-black font-display tracking-[-0.07em] leading-[0.9]">
              Build Your <br />
              Online Presence <br />
              with <span className="text-brandRed-500">Purpose.</span>
            </h1>

            <p className="hero-copy text-base sm:text-lg max-w-[28rem] leading-relaxed">
              We design and develop clean, fast and modern websites that help businesses grow.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                className="px-7 py-3.5"
                onClick={() => {
                  const el = document.getElementById('featured-projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.location.href = '/projects';
                }}
              >
                View Our Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-7 py-3.5 border-cream-400 text-warmNeutral-900 hover:bg-cream-200 hover:border-warmNeutral-700"
                onClick={() => {
                  window.location.href = '/about';
                }}
              >
                Our Story
              </Button>
            </div>

            {/* Feature Indicators */}
            <div className="pt-8 border-t border-cream-300 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-warmNeutral-700">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-cream-200 border border-cream-300 text-brandRed-500">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-warmNeutral-900">Fast</div>
                  <div className="text-[11px] text-warmNeutral-500">Performance</div>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-cream-200 border border-cream-300 text-brandRed-500">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-warmNeutral-900">Mobile</div>
                  <div className="text-[11px] text-warmNeutral-500">Responsive</div>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-cream-200 border border-cream-300 text-brandRed-500">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-warmNeutral-900">SEO</div>
                  <div className="text-[11px] text-warmNeutral-500">Ready</div>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-cream-200 border border-cream-300 text-brandRed-500">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-warmNeutral-900">Client</div>
                  <div className="text-[11px] text-warmNeutral-500">Focused</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive WebNest Portfolio Device Showcase */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center lg:items-end lg:pr-2">
            <div className="w-full max-w-[700px] lg:translate-x-[12px]">
              <Hero3DCanvas />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
