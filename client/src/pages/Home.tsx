import React, { useEffect, useState } from 'react';
import { HeroSection } from '../sections/HeroSection';
import { TrustSection } from '../sections/TrustSection';
import { FeaturedProjectsSection } from '../sections/FeaturedProjectsSection';
import { ServicesSection } from '../sections/ServicesSection';
import { WhyWebNestSection } from '../sections/WhyWebNestSection';
import { ProcessSection } from '../sections/ProcessSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { CTASection } from '../sections/CTASection';
import { SEO } from '../components/SEO';
import { fetchProjects, fetchServices, fetchTestimonials } from '../services/api';
import { Project, ServiceItem, TestimonialItem } from '../types';

// Default showcase projects fallback including Hair & Glow and Street Barber
const defaultProjects: Project[] = [
  {
    _id: '1',
    title: 'Hair & Glow Unisex Salon',
    slug: 'hair-and-glow',
    category: 'Salon & Spa',
    shortDescription: 'A luxury unisex salon management & online appointment booking web platform.',
    description: 'Hair & Glow Unisex Salon is a luxury salon platform featuring interactive service menus, stylist selection, appointment scheduling, Telegram & WhatsApp notification services, and Cloudinary gallery showcase.',
    story: 'Built with React 19, Vite, TypeScript, and Flask REST API to streamline online appointment bookings and elevate the brand aesthetic of Hair & Glow Unisex Salon.',
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1200&auto=format&fit=crop',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Flask API', 'MongoDB'],
    features: ['Instant Slot Booking', 'Stylist Selection Grid', 'Telegram & WhatsApp Alert Sync', 'Treatment Catalog'],
    liveUrl: 'https://hairandglow.vercel.app',
    githubUrl: 'https://github.com/webnest/hair-and-glow',
    featured: true,
    published: true,
    order: 1,
  },
  {
    _id: '2',
    title: 'Street Barber',
    slug: 'street-barber',
    category: 'Salon & Spa',
    shortDescription: 'Bold, urban barbershop website & grooming slot reservation engine.',
    description: 'Street Barber is an edgy, high-conversion web platform designed for premium men’s grooming studios, featuring haircut & beard service menus, real-time barber slot booking, and customer reviews.',
    story: 'Engineered to elevate the brand image of urban barbershops and eliminate waiting lines with automated slot booking.',
    coverImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=1200&auto=format&fit=crop',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Express.js', 'MongoDB'],
    features: ['Real-time Barber Booking', 'Interactive Grooming Menu', 'SMS Notifications', 'Mobile First Design'],
    liveUrl: 'https://streetbarberrr.vercel.app/',
    githubUrl: 'https://github.com/webnest/street-barber',
    featured: true,
    published: true,
    order: 2,
  },
  {
    _id: '3',
    title: 'FryGuy',
    slug: 'fryguy',
    category: 'Restaurant / Food Brand',
    shortDescription: 'A bold, mouth-watering interactive web experience for a gourmet burger brand.',
    description: 'FryGuy is a multi-brand food platform designed to increase online order conversions through hyper-visual food photography, custom interactive order configurators, and lightning-fast page speed.',
    story: 'The client needed a digital presence that stood out in a competitive food delivery market. We built a custom React platform with micro-animations that increased table bookings and online orders by 40%.',
    coverImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'MongoDB'],
    features: ['3D Burger Configurator', 'Real-time Cart Management', 'Interactive Menu Filters', '98+ PageSpeed Score'],
    liveUrl: 'https://fryguy.vercel.app/',
    githubUrl: 'https://github.com/webnest/fryguy-platform',
    featured: true,
    published: true,
    order: 3,
  },
  {
    _id: '4',
    title: 'MyHOme  Interiors',
    slug: 'MyHOme -interiors',
    category: 'Architecture & Design',
    shortDescription: 'A minimal and high-impact web portfolio for an architectural interior design firm.',
    description: 'MyHOme  Interiors presents architectural photography through immersive full-bleed image sliders, dynamic project filter grids, and sleek inquiry flows.',
    story: 'Built for high-end clientele seeking bespoke luxury interiors. The typography-led design accentuates clean spatial lines and project narratives.',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617104678098-de229db51175?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1615874694520-474822394e73?q=80&w=1200&auto=format&fit=crop',
    ],
    technologies: ['React', 'Vite', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
    features: ['Interactive 3D Room Viewer', 'Smooth Scroll Animations', 'High-res Gallery Viewer'],
    liveUrl: 'https://MyHOme .webnest.app',
    githubUrl: 'https://github.com/webnest/MyHOme -interiors',
    featured: true,
    published: true,
    order: 4,
  },
];

const defaultServices: ServiceItem[] = [
  { _id: '1', title: 'Business Websites', description: 'Professional corporate websites that establish instant market authority.', icon: 'Building2', order: 1, published: true },
  { _id: '2', title: 'Salon & Spa Platforms', description: 'Luxury salon platforms with appointment scheduling & SMS/WhatsApp alerts.', icon: 'User', order: 2, published: true },
  { _id: '3', title: 'Restaurant Websites', description: 'Interactive menus, online ordering, and table reservation engines.', icon: 'Utensils', order: 3, published: true },
  { _id: '4', title: 'E-commerce Platforms', description: 'Blazing fast online storefronts built to maximize cart conversion rates.', icon: 'ShoppingBag', order: 4, published: true },
  { _id: '5', title: 'Portfolio Websites', description: 'Editorial showcase platforms for creative agencies and brands.', icon: 'FileText', order: 5, published: true },
  { _id: '6', title: 'Custom Web Solutions', description: 'Tailored web applications and complex API integrations.', icon: 'Settings', order: 6, published: true },
];

const defaultTestimonials: TestimonialItem[] = [
  { _id: '1', name: 'Sneha Reddy', role: 'Owner', company: 'Hair & Glow Unisex Salon', review: 'Professional, creative and very easy to work with. Our salon website looks stunning and we saw an instant uptick in online bookings!', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop', published: true, order: 1 },
  { _id: '2', name: 'Vikram Singh', role: 'Founder', company: 'Street Barber Studio', review: 'WebNest built an incredible booking site for Street Barber. Our clients love selecting their barber and slot online. It eliminated long queue waits entirely!', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop', published: true, order: 2 },
  { _id: '3', name: 'Rohit Sharma', role: 'Founder', company: 'FryGuy Burgers', review: 'WebNest delivered an amazing interactive website for our restaurant brand. The speed, design depth, and online order boost exceeded all expectations.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', published: true, order: 3 },
];

interface HomeProps {
  onOpenEnquiry: (serviceTitle?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenEnquiry }) => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(defaultTestimonials);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projRes, servRes, testRes] = await Promise.all([
          fetchProjects(undefined, true),
          fetchServices(),
          fetchTestimonials(),
        ]);
        if (projRes.data.projects && projRes.data.projects.length > 0) setProjects(projRes.data.projects);
        if (servRes.data.services && servRes.data.services.length > 0) setServices(servRes.data.services);
        if (testRes.data.testimonials && testRes.data.testimonials.length > 0) setTestimonials(testRes.data.testimonials);
      } catch (err) {
        // Fallback defaults stay loaded seamlessly
      }
    };
    loadData();
  }, []);

  return (
    <>
      <SEO title="Ideas into Impactful Websites" description="WebNest Solutions - Premium web development agency." />
      <HeroSection onOpenEnquiry={() => onOpenEnquiry()} />
      <TrustSection />
      <FeaturedProjectsSection projects={projects} />
      <ServicesSection services={services} onOpenEnquiry={(s) => onOpenEnquiry(s)} />
      <WhyWebNestSection />
      <ProcessSection />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection onOpenEnquiry={() => onOpenEnquiry()} />
    </>
  );
};
