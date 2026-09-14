import React from 'react';

export const TrustSection: React.FC = () => {
  const logos = [
    { name: 'FryGuy', font: 'font-display font-extrabold text-brandRed-500 text-xl tracking-tight' },
    { name: '❖ SALONX', font: 'font-sans font-bold text-cream-200 tracking-wider text-sm uppercase' },
    { name: 'TechNova', font: 'font-display font-semibold text-cream-300 text-base' },
    { name: 'Bloom', font: 'font-handwriting font-bold text-cream-200 text-2xl' },
    { name: '✚ ZEPHYR', font: 'font-mono font-bold text-cream-300 text-sm tracking-widest' },
    { name: 'Vibe', font: 'font-handwriting font-bold text-brandRed-500 text-2xl' },
  ];

  return (
    <section className="bg-charcoal-900 border-y border-charcoal-800/80 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-warmNeutral-500 mb-8">
          TRUSTED BY BUSINESSES LIKE
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-80 hover:opacity-100 transition-opacity">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="py-2 px-4 rounded-xl hover:bg-charcoal-800/50 transition-colors duration-300 flex items-center justify-center"
            >
              <span className={logo.font}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
