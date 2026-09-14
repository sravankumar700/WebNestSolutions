import React from 'react';
import { SectionHeading } from '../components/SectionHeading';

export const WhyWebNestSection: React.FC = () => {
  const pillars = [
    {
      number: '01',
      title: 'Modern & Bespoke Design',
      desc: 'No cookie-cutter templates. Every layout, color palette, and micro-interaction is custom crafted to elevate your brand prestige.',
    },
    {
      number: '02',
      title: 'Blazing Fast Performance',
      desc: 'Optimized asset delivery, lightweight React/Vite code structure, and 95+ PageSpeed scores to reduce bounce rate.',
    },
    {
      number: '03',
      title: 'Mobile-First Architecture',
      desc: 'Over 65% of your clients browse on mobile. We engineer touch-first responsive interfaces that feel native and effortless.',
    },
    {
      number: '04',
      title: 'SEO Ready Foundation',
      desc: 'Clean semantic HTML, Open Graph tags, fast indexing structural schemas, and metadata hierarchy to rank on Google search.',
    },
    {
      number: '05',
      title: 'Full-Stack Custom Code',
      desc: 'Built with React, TypeScript, Node.js and MongoDB. Scalable architecture with zero bloated plugins or security holes.',
    },
    {
      number: '06',
      title: 'Conversion Focused',
      desc: 'Strategic CTA placements, user journey mapping, and persuasive lead capture flows designed to convert visitors into clients.',
    },
  ];

  return (
    <section className="bg-cream-100 text-warmNeutral-900 py-20 lg:py-28 relative border-t border-cream-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          category="THE WEBNEST DIFFERENCE"
          title="Why"
          highlightText="WebNest?"
          subtitle="We focus on what actually drives business growth: design excellence, speed, and real lead conversion."
          lightMode={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-white border border-cream-300 rounded-2xl p-8 hover:border-brandRed-500 transition-all duration-300 shadow-card-soft group"
            >
              <div className="text-3xl font-extrabold font-display text-brandRed-500 mb-4 group-hover:scale-110 transition-transform origin-left">
                {pillar.number}
              </div>
              <h3 className="text-xl font-bold font-display text-warmNeutral-900 mb-2 group-hover:text-brandRed-500 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-warmNeutral-500 text-sm leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
