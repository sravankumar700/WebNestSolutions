import React from 'react';

interface SectionHeadingProps {
  category?: string;
  title: string;
  highlightText?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  lightMode?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  category,
  title,
  highlightText,
  subtitle,
  align = 'left',
  lightMode = false,
}) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'}`}>
      {category && (
        <span className="inline-block text-xs font-bold tracking-widest text-brandRed-500 uppercase mb-3">
          {category}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight tracking-tight ${
          lightMode ? 'text-charcoal-900' : 'text-cream-100'
        }`}
      >
        {title}{' '}
        {highlightText && (
          <span className="text-brandRed-500 underline decoration-brandRed-500/40 decoration-wavy underline-offset-8">
            {highlightText}
          </span>
        )}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            lightMode ? 'text-warmNeutral-700' : 'text-warmNeutral-300'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
