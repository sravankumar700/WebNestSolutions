import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { AdminUser } from '../models/AdminUser';
import { Project } from '../models/Project';
import { Service } from '../models/Service';
import { Testimonial } from '../models/Testimonial';
import { SiteSettings } from '../models/SiteSettings';

dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/webnest_db';
    await mongoose.connect(mongoUri);
    console.log('[Seed]: Connected to MongoDB');

    // 1. Seed Admin
    await AdminUser.deleteMany({});
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('WebNest2026!Secret', salt);
    await AdminUser.create({
      email: 'admin@webnest.com',
      passwordHash,
      name: 'WebNest Admin',
      role: 'superadmin',
    });
    console.log('[Seed]: Admin user seeded (admin@webnest.com / WebNest2026!Secret)');

    // 2. Seed Projects (Including Hair & Glow and Street Barber)
    await Project.deleteMany({});
    await Project.create([
      {
        title: 'Hair & Glow Unisex Salon',
        slug: 'hair-and-glow',
        category: 'Salon & Spa',
        shortDescription: 'A luxury unisex salon management & online appointment booking web platform.',
        description: 'Hair & Glow Unisex Salon is a luxury salon platform featuring interactive service menus, stylist selection, appointment scheduling, Telegram & WhatsApp notification services, and Cloudinary gallery showcase.',
        story: 'Built with React 19, Vite, TypeScript, and Flask REST API to streamline online appointment bookings and elevate the brand aesthetic of Hair & Glow Unisex Salon.',
        coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop'
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
        title: 'Street Barber',
        slug: 'street-barber',
        category: 'Salon & Spa',
        shortDescription: 'Bold, urban barbershop website & grooming slot reservation engine.',
        description: 'Street Barber is an edgy, high-conversion web platform designed for premium men’s grooming studios, featuring haircut & beard service menus, real-time barber slot booking, and customer reviews.',
        story: 'Engineered to elevate the brand image of urban barbershops and eliminate waiting lines with automated slot booking.',
        coverImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop'
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
        title: 'FryGuy',
        slug: 'fryguy',
        category: 'Restaurant / Food Brand',
        shortDescription: 'A bold, mouth-watering interactive web experience for a gourmet burger brand.',
        description: 'FryGuy is a multi-brand food platform designed to increase online order conversions through hyper-visual food photography, custom interactive order configurators, and lightning-fast page speed.',
        story: 'The client needed a digital presence that stood out in a competitive food delivery market. We built a custom React platform with rich micro-animations that increased table bookings and online orders by 40%.',
        coverImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop',
        ],
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'MongoDB'],
        features: ['3D Burger Configurator', 'Real-time Cart Management', 'Interactive Menu Filters', '98+ PageSpeed Score'],
        liveUrl: 'https://fryguy.webnest.app',
        githubUrl: 'https://github.com/webnest/fryguy-platform',
        featured: true,
        published: true,
        order: 3,
      },
      {
        title: 'Zephyr Interiors',
        slug: 'zephyr-interiors',
        category: 'Architecture & Design',
        shortDescription: 'A minimal and high-impact web portfolio for an architectural interior design firm.',
        description: 'Zephyr Interiors presents architectural photography through immersive full-bleed image sliders, dynamic project filter grids, and sleek inquiry flows.',
        story: 'Built for high-end clientele seeking bespoke luxury interiors. The typography-led design accentuates clean spatial lines and project narratives.',
        coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
        ],
        technologies: ['React', 'Vite', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
        features: ['Interactive 3D Room Viewer', 'Smooth Scroll Animations', 'High-res Gallery Viewer'],
        liveUrl: 'https://zephyr.webnest.app',
        githubUrl: 'https://github.com/webnest/zephyr-interiors',
        featured: true,
        published: true,
        order: 4,
      }
    ]);
    console.log('[Seed]: Projects seeded (Hair & Glow, Street Barber, FryGuy, Zephyr Interiors)');

    // 3. Seed Services
    await Service.deleteMany({});
    await Service.create([
      {
        title: 'Business Websites',
        description: 'Professional, conversion-driven corporate websites that establish instant market authority and generate qualified leads.',
        icon: 'Building2',
        order: 1,
        published: true,
      },
      {
        title: 'Salon & Spa Platforms',
        description: 'Luxury salon digital experiences featuring online appointment scheduling, stylist selection, and automated SMS/WhatsApp alerts.',
        icon: 'User',
        order: 2,
        published: true,
      },
      {
        title: 'Restaurant & Hospitality',
        description: 'Mouth-watering digital experiences featuring interactive menus, online ordering, and table reservation engines.',
        icon: 'Utensils',
        order: 3,
        published: true,
      },
      {
        title: 'E-commerce Platforms',
        description: 'Blazing fast, secure online storefronts built to maximize cart conversion rates and delight repeat customers.',
        icon: 'ShoppingBag',
        order: 4,
        published: true,
      },
      {
        title: 'Portfolio & Creative Websites',
        description: 'Editorial showcase platforms for interior designers, architects, agencies, and high-growth personal brands.',
        icon: 'FileText',
        order: 5,
        published: true,
      },
      {
        title: 'Custom Web Solutions',
        description: 'Tailored web applications, client portals, custom dashboards, and complex API integrations engineered for speed.',
        icon: 'Settings',
        order: 6,
        published: true,
      }
    ]);
    console.log('[Seed]: Services seeded');

    // 4. Seed Testimonials
    await Testimonial.deleteMany({});
    await Testimonial.create([
      {
        name: 'Sneha Reddy',
        role: 'Owner',
        company: 'Hair & Glow Unisex Salon',
        review: 'Professional, creative and very easy to work with. Our salon website looks stunning and we saw an instant uptick in online client bookings!',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
        published: true,
        order: 1,
      },
      {
        name: 'Vikram Singh',
        role: 'Founder',
        company: 'Street Barber Studio',
        review: 'WebNest built an incredible booking site for Street Barber. Our clients love selecting their barber and slot online. It eliminated long queue waits entirely!',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        published: true,
        order: 2,
      },
      {
        name: 'Rohit Sharma',
        role: 'Founder',
        company: 'FryGuy Burgers',
        review: 'WebNest delivered an amazing interactive website for our restaurant brand. The speed, design depth, and online order boost exceeded all our expectations.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        published: true,
        order: 3,
      }
    ]);
    console.log('[Seed]: Testimonials seeded');

    // 5. Seed Site Settings
    await SiteSettings.deleteMany({});
    await SiteSettings.create({
      siteName: 'WebNest Solutions',
      tagline: 'Ideas into Impactful Websites.',
      description: 'We design and develop modern, fast and conversion-focused websites for businesses, brands and creators.',
      email: 'contact@webnestsolutions.com',
      phone: '+91 98765 43210',
      socialLinks: {
        github: 'https://github.com/webnest',
        linkedin: 'https://linkedin.com/company/webnest-solutions',
        twitter: 'https://twitter.com/webnest',
        instagram: 'https://instagram.com/webnestsolutions',
      },
      footerText: '© 2026 WebNest Solutions. All rights reserved. Built with passion in India ❤️',
      ctaText: 'Start a Project →',
      salesPeople: ['Aisha Kumar', 'Rohan Verma', 'Priya Nair', 'Dev Shah'],
      whatsappEnabled: false,
      whatsappAlertNumber: '+91 98765 43210',
      whatsappCustomerTemplate: 'lead_confirmation',
      whatsappWebhookVerifyToken: 'webnest-whatsapp-webhook',
    });
    console.log('[Seed]: Site settings seeded');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();
