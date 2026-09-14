import React from 'react';
import * as Icons from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  // Dynamically render Lucide Icon by name
  const IconComponent = (Icons as any)[service.icon] || Icons.Globe;

  return (
    <div
      onClick={onClick}
      className="group relative bg-white border border-cream-300 rounded-2xl p-8 transition-all duration-300 hover:border-brandRed-500 hover:-translate-y-1 hover:shadow-card-hover flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="w-14 h-14 rounded-xl bg-cream-100 border border-cream-300 flex items-center justify-center text-brandRed-500 mb-6 group-hover:bg-brandRed-500 group-hover:text-white group-hover:border-brandRed-500 transition-all duration-300">
          <IconComponent className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold font-display text-warmNeutral-900 mb-3 group-hover:text-brandRed-500 transition-colors">
          {service.title}
        </h3>
        <p className="text-warmNeutral-500 text-sm leading-relaxed">
          {service.description}
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-cream-200 flex items-center text-xs font-semibold text-brandRed-500 group-hover:translate-x-1 transition-transform">
        <span>Explore Solution</span>
        <Icons.ArrowRight className="w-3.5 h-3.5 ml-1" />
      </div>
    </div>
  );
};
