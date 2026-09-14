import React from 'react';
import { Button } from '../components/Button';

interface CTASectionProps {
  onOpenEnquiry: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="bg-cream-100 text-warmNeutral-900 py-20 lg:py-28 relative overflow-hidden border-t border-cream-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white border border-cream-300 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-card-soft flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">
          
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-warmNeutral-900 leading-tight">
              Let's build something <br />
              <span className="text-brandRed-500">great together.</span>
            </h2>

            <p className="text-warmNeutral-500 text-base sm:text-lg leading-relaxed">
              Your business deserves a website that works. Let's make it happen.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Button variant="primary" size="lg" onClick={onOpenEnquiry}>
                Start a Project
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-cream-400 text-warmNeutral-900 hover:bg-cream-200"
                onClick={() => (window.location.href = '/contact')}
              >
                Contact Us
              </Button>
            </div>
          </div>

          {/* Right side handwritten script overlay */}
          <div className="relative flex-shrink-0 flex items-center justify-center pt-6 lg:pt-0">
            <div className="font-handwriting text-3xl sm:text-4xl text-brandRed-500 transform -rotate-3 text-center leading-tight">
              Good Websites <br />
              Create Opportunities.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
