import React, { useEffect, useState } from 'react';
import { fetchServices } from '../services/api';
import { ServiceItem } from '../types';
import { ServicesSection } from '../sections/ServicesSection';
import { WhyWebNestSection } from '../sections/WhyWebNestSection';
import { ProcessSection } from '../sections/ProcessSection';
import { CTASection } from '../sections/CTASection';
import { SEO } from '../components/SEO';

interface ServicesPageProps {
  onOpenEnquiry: (serviceTitle?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenEnquiry }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    fetchServices().then((res) => setServices(res.data.services || []));
  }, []);

  return (
    <div className="pt-16">
      <SEO title="Our Services" description="Custom website design, e-commerce stores, restaurant web solutions, and custom applications." />
      <ServicesSection services={services} onOpenEnquiry={onOpenEnquiry} />
      <WhyWebNestSection />
      <ProcessSection />
      <CTASection onOpenEnquiry={() => onOpenEnquiry()} />
    </div>
  );
};
