import React from 'react';

export const TrustSection: React.FC = () => {
  const logos = [
    { name: 'Hair & Glow', font: 'font-display font-extrabold text-lg tracking-tight' },
    { name: 'Street Barber', font: 'font-display font-extrabold text-lg tracking-tight' },
    { name: 'My Home Interiors', font: 'font-display font-extrabold text-lg tracking-tight' },
    { name: 'Fry Guy', font: 'font-display font-extrabold text-lg tracking-tight' },

  ];

  return (
    <section className="bg-charcoal-900 border-y border-charcoal-800/80 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-warmNeutral-500 mb-8">
          TRUSTED BY BUSINESSES LIKE
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-80 hover:opacity-100 transition-opacity">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="group relative py-2 px-4 rounded-xl cursor-default hover:bg-brandRed-500/10 transition-all duration-300 flex items-center justify-center hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_24px_rgba(206,66,43,0.16)] after:absolute after:left-4 after:right-4 after:bottom-0 after:h-px after:bg-brandRed-500 after:origin-center after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100"
            >
              <span className={`${logo.font} text-cream-200 transition-colors duration-300 group-hover:text-brandRed-500`}>
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
