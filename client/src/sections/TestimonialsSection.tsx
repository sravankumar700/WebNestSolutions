import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { TestimonialCard } from '../components/TestimonialCard';
import { TestimonialItem } from '../types';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="bg-cream-100 text-warmNeutral-900 py-20 lg:py-28 relative border-t border-cream-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          category="WHAT CLIENTS SAY"
          title="Kind words from"
          highlightText="our clients."
          subtitle="Real feedback. Real impact."
          align="left"
          lightMode={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id || testimonial.name} testimonial={testimonial} />
          ))}
        </div>

      </div>
    </section>
  );
};
