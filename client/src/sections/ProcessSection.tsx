import React from 'react';
import { Search, Compass, Code, Rocket } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'Understand your business, audience, competition and primary growth goals.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Design',
      desc: 'Create bespoke UI wireframes, visual directions and interactive design mockups.',
      icon: Compass,
    },
    {
      num: '03',
      title: 'Develop',
      desc: 'Build the fast, responsive, and secure custom full-stack web application.',
      icon: Code,
    },
    {
      num: '04',
      title: 'Launch',
      desc: 'Thorough QA testing, performance optimization, SEO setup, and live deployment.',
      icon: Rocket,
    },
  ];

  return (
    <section className="bg-cream-100 text-charcoal-950 py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          category="OUR PROCESS"
          title="From idea"
          highlightText="to launch."
          subtitle="A simple, transparent process designed around your business goals."
          lightMode={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="relative group">
                {/* Connecting arrow line on desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 right-0 translate-x-1/2 w-8 border-t-2 border-dashed border-brandRed-500/40 z-10" />
                )}

                <div className="bg-white border border-cream-300/80 rounded-2xl p-7 shadow-card-light hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black font-display text-brandRed-500">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-brandRed-500/10 text-brandRed-500 flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-display text-charcoal-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-warmNeutral-700 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
