import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TestimonialItem } from '../types';

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white border border-cream-300 rounded-2xl p-7 relative flex flex-col justify-between hover:border-brandRed-500 transition-all duration-300 shadow-card-soft">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <Quote className="w-8 h-8 text-cream-300" />
        </div>
        <p className="text-warmNeutral-700 text-sm leading-relaxed italic mb-6">
          "{testimonial.review}"
        </p>
      </div>

      <div className="flex items-center space-x-4 pt-4 border-t border-cream-200">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-11 h-11 rounded-full object-cover border border-brandRed-500/40"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-brandRed-500 text-white flex items-center justify-center font-bold text-base">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="text-warmNeutral-900 text-sm font-semibold">{testimonial.name}</h4>
          <p className="text-warmNeutral-500 text-xs">
            {testimonial.role}, <span className="text-warmNeutral-700 font-medium">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
