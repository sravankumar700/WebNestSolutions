export interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  story?: string;
  coverImage: string;
  gallery: string[];
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  published: boolean;
}

export interface TestimonialItem {
  _id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  image?: string;
  published: boolean;
  order: number;
}

export interface EnquiryItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  service?: string;
  budget?: string;
  message: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Archived';
  createdAt: string;
}

export interface SiteSettingsData {
  siteName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  footerText: string;
  ctaText: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}
