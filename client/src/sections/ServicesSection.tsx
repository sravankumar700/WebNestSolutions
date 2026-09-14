import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onOpenEnquiry: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onOpenEnquiry }) => {
  return (
    <section id="services" className="bg-cream-100 text-warmNeutral-900 py-20 lg:py-28 relative border-t border-cream-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          category="OUR SERVICES"
          title="Websites for"
          highlightText="every ambition."
          subtitle="Tailored solutions to help you stand out online."
          align="left"
          lightMode={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service._id || service.title}
              service={service}
              onClick={() => onOpenEnquiry(service.title)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
