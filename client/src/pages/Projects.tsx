import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../services/api';
import { Project } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';
import { SEO } from '../components/SEO';
import { CTASection } from '../sections/CTASection';

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
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Flask API', 'MongoDB'],
    features: ['Instant Slot Booking', 'Stylist Selection Grid', 'Telegram & WhatsApp Alert Sync', 'Treatment Catalog'],
    liveUrl: 'https://hairandglow.webnest.app',
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
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Express.js', 'MongoDB'],
    features: ['Real-time Barber Booking', 'Interactive Grooming Menu', 'SMS Notifications', 'Mobile First Design'],
    liveUrl: 'https://streetbarber.webnest.app',
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
    gallery: ['https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'MongoDB'],
    features: ['3D Burger Configurator', 'Real-time Cart Management', 'Interactive Menu Filters', '98+ PageSpeed Score'],
    liveUrl: 'https://fryguy.webnest.app',
    githubUrl: 'https://github.com/webnest/fryguy-platform',
    featured: true,
    published: true,
    order: 3,
  },
  {
    _id: '4',
    title: 'Zephyr Interiors',
    slug: 'zephyr-interiors',
    category: 'Architecture & Design',
    shortDescription: 'A minimal and high-impact web portfolio for an architectural interior design firm.',
    description: 'Zephyr Interiors presents architectural photography through immersive full-bleed image sliders, dynamic project filter grids, and sleek inquiry flows.',
    story: 'Built for high-end clientele seeking bespoke luxury interiors. The typography-led design accentuates clean spatial lines and project narratives.',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop'],
    technologies: ['React', 'Vite', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
    features: ['Interactive 3D Room Viewer', 'Smooth Scroll Animations', 'High-res Gallery Viewer'],
    liveUrl: 'https://zephyr.webnest.app',
    githubUrl: 'https://github.com/webnest/zephyr-interiors',
    featured: true,
    published: true,
    order: 4,
  },
];

interface ProjectsProps {
  onOpenEnquiry: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenEnquiry }) => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Salon & Spa', 'Restaurant / Food Brand', 'Architecture & Design', 'Business', 'E-commerce'];

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetchProjects(activeCategory === 'All' ? undefined : activeCategory);
        if (res.data.projects && res.data.projects.length > 0) {
          setProjects(res.data.projects);
        } else if (activeCategory === 'All') {
          setProjects(defaultProjects);
        } else {
          const matchKey = activeCategory.split(' ')[0];
          const filtered = defaultProjects.filter((p) => p.category.toLowerCase().includes(matchKey.toLowerCase()));
          setProjects(filtered.length > 0 ? filtered : defaultProjects);
        }
      } catch (err) {
        // Fallback default projects stay loaded
      }
    };
    loadProjects();
  }, [activeCategory]);

  return (
    <div className="pt-32 pb-16 bg-cream-100 min-h-screen text-warmNeutral-900">
      <SEO title="Our Work & Portfolio" description="Explore client websites designed and developed by WebNest Solutions." />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          category="PORTFOLIO SHOWCASE"
          title="Real Websites."
          highlightText="Real Impact."
          subtitle="Explore our portfolio of custom web solutions built for salons, restaurants, brands, and modern businesses."
          lightMode={true}
        />

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-brandRed-500 text-white shadow-md'
                  : 'bg-white text-warmNeutral-900 border border-cream-300 hover:border-brandRed-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} lightMode={true} />
          ))}
        </div>
      </div>

      <div className="mt-20">
        <CTASection onOpenEnquiry={onOpenEnquiry} />
      </div>
    </div>
  );
};
