import { Schema, model, Document } from 'mongoose';

export interface ISiteSettings extends Document {
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
  salesPeople: string[];
  whatsappEnabled: boolean;
  whatsappAlertNumber: string;
  whatsappCustomerTemplate: string;
  whatsappWebhookVerifyToken: string;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    siteName: { type: String, default: 'WebNest Solutions' },
    tagline: { type: String, default: 'Ideas into Impactful Websites.' },
    description: {
      type: String,
      default: 'We design and develop modern, fast and conversion-focused websites for businesses, brands and creators.',
    },
    email: { type: String, default: 'hello@webnestsolutions.com' },
    phone: { type: String, default: '+91 98765 43210' },
    socialLinks: {
      github: { type: String, default: 'https://github.com/webnest' },
      linkedin: { type: String, default: 'https://linkedin.com/company/webnest' },
      twitter: { type: String, default: 'https://twitter.com/webnest' },
      instagram: { type: String, default: 'https://instagram.com/webnest' },
    },
    footerText: { type: String, default: '© 2026 WebNest Solutions. All rights reserved.' },
    ctaText: { type: String, default: 'Start a Project →' },
    salesPeople: {
      type: [String],
      default: ['Aisha Kumar', 'Rohan Verma', 'Priya Nair', 'Dev Shah'],
    },
    whatsappEnabled: { type: Boolean, default: false },
    whatsappAlertNumber: { type: String, default: '+91 98765 43210' },
    whatsappCustomerTemplate: { type: String, default: 'lead_confirmation' },
    whatsappWebhookVerifyToken: { type: String, default: 'webnest-whatsapp-webhook' },
  },
  { timestamps: true }
);

export const SiteSettings = model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
