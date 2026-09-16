import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AgencyProject {
  id: string;
  name: string;
  category: string;
  badge: string;
  speed: string;
  growth: string;
  url: string;
  image: string;
  gradient: string;
  highlightText: string;
}

const agencyProjects: AgencyProject[] = [
  {
    id: 'hair-and-glow',
    name: 'Hair & Glow Unisex Salon',
    category: 'Salon & Spa Platform',
    badge: 'Luxury Booking Engine',
    speed: '99/100 PageSpeed',
    growth: '+55% Client Bookings',
    url: 'https://hairandglow.webnest.app',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop',
    gradient: 'from-[#1A181C] to-[#0E0C10]',
    highlightText: 'Instant Slot Booking & Stylist Selector',
  },
  {
    id: 'street-barber',
    name: 'Street Barber Studio',
    category: 'Barbershop Reservation',
    badge: 'Queue Elimination Platform',
    speed: '98/100 PageSpeed',
    growth: '100% Online Appointments',
    url: 'https://streetbarber.webnest.app',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop',
    gradient: 'from-[#171618] to-[#0D0C0E]',
    highlightText: 'Real-time Barber Slot Selector & SMS Sync',
  },
  {
    id: 'fryguy',
    name: 'FryGuy Gourmet Burgers',
    category: 'Restaurant Platform',
    badge: 'Gourmet Food Ordering',
    speed: '99/100 PageSpeed',
    growth: '+40% Order Conversion',
    url: 'https://fryguy.webnest.app',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop',
    gradient: 'from-[#1C1416] to-[#0E0B0C]',
    highlightText: '3D Burger Configurator & Fast Cart',
  },
];

export const HeroDeviceMockup: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = agencyProjects[activeIndex];

  useEffect(() => {
    const slideshow = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % agencyProjects.length);
    }, 5000);

    return () => window.clearInterval(slideshow);
  }, []);

  return (
    <div className="relative w-full max-w-[720px] ml-auto py-2 flex flex-col items-center justify-center select-none">
      
      {/* Automatic WebNest project slideshow */}
      <motion.div
        key={activeProject.id}
        initial={{ opacity: 0.8, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full relative z-10"
      >
        {/* LAPTOP SCREEN FRAME */}
        <div className="hero-mockup-frame relative rounded-[2rem] p-3 sm:p-3.5 shadow-[0_18px_38px_rgba(28,27,25,0.08)] border lg:-ml-2">
          
          {/* Webcam Notch */}
          <div className="hero-mockup-notch absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full flex items-center justify-center z-30">
            <div className="w-1 h-1 rounded-full bg-[#B9C9D8]/80" />
          </div>

          {/* DISPLAY SCREEN */}
          <div className="hero-mockup-screen relative aspect-[16/10] rounded-lg overflow-hidden border flex flex-col justify-between shadow-inner">
            
            {/* Top Browser Bar */}
            <div className="hero-browser-bar h-8 px-3 flex items-center justify-between z-20">
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>

              <div className="hero-browser-url text-[10px] font-mono px-3 py-0.5 rounded-full border flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="truncate max-w-[220px]">{activeProject.url}</span>
              </div>

              <a
                href={activeProject.url}
                target="_blank"
                rel="noreferrer"
                className="hero-live-link text-[10px] flex items-center space-x-1 font-semibold"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* Main Project Card Display */}
            <div className="hero-content px-5 py-4 flex-1 flex flex-col justify-between z-10">
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="hero-category text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded">
                    {activeProject.category}
                  </span>
                  <h3 className="hero-title-card text-base sm:text-[1.7rem] font-bold font-display mt-1 leading-[1.05] tracking-[-0.04em]">
                    {activeProject.name}
                  </h3>
                  <svg viewBox="0 0 360 28" className="hero-underline w-[55%] h-6 mt-2 overflow-visible" aria-hidden="true">
                    <path d="M 0 18 C 35 2, 120 2, 180 13 S 290 24, 360 16" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="text-right">
                  <span className="hero-speed text-xs font-bold block">{activeProject.speed}</span>
                  <span className="hero-growth text-[10px] block">{activeProject.growth}</span>
                </div>
              </div>

              {/* Showcase Image & Key Feature Details */}
              <div className="grid grid-cols-12 gap-4 items-center my-2">
                <div className="col-span-7 text-left">
                  <p className="hero-highlight text-[11px] font-medium leading-relaxed">
                    "{activeProject.highlightText}"
                  </p>
                  <div className="hero-feature-box mt-3 rounded-[2rem] border-[3px] p-3 pr-2 w-[110%] relative">
                    <div className="space-y-1.5">
                      <div className="hero-feature-item flex items-center space-x-1.5 text-[10px]">
                        <span className="hero-check inline-flex h-4 w-4 items-center justify-center rounded-full border-2">
                          <CheckCircle2 className="h-3 w-3 fill-current" />
                        </span>
                        <span>Custom React & TypeScript Code</span>
                      </div>
                      <div className="hero-feature-item flex items-center space-x-1.5 text-[10px]">
                        <span className="hero-check inline-flex h-4 w-4 items-center justify-center rounded-full border-2">
                          <CheckCircle2 className="h-3 w-3 fill-current" />
                        </span>
                        <span>Mobile Responsive Slot Booking</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-5 relative flex items-center justify-center">
                  <img
                    src={activeProject.image}
                    alt={activeProject.name}
                    className="w-28 sm:w-40 h-20 sm:h-32 object-cover rounded-xl shadow-2xl border border-white/20"
                  />
                </div>
              </div>

              {/* Bottom Agency Guarantee */}
              <div className="hero-footer pt-2 border-t flex items-center justify-between text-[10px] font-semibold">
                <span>Designed & Built by WebNest Solutions</span>
                <span className="hero-case-link flex items-center">
                  Explore Case Study <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>

            </div>

          </div>
        </div>
      </motion.div>

      <div className="flex items-center justify-center gap-2 mt-4" aria-label="Project slideshow progress">
        {agencyProjects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${project.name}`}
            className={`h-1.5 rounded-full transition-all ${
              activeIndex === index ? 'w-8 bg-brandRed-500' : 'w-1.5 bg-charcoal-700 hover:bg-brandRed-500/70'
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export const Hero3DCanvas = HeroDeviceMockup;
