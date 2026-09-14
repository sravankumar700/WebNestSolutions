import { Schema, model, Document } from 'mongoose';

export interface IProject extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, default: 'Web Application' },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    story: { type: String, default: '' },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    technologies: [{ type: String }],
    features: [{ type: String }],
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project = model<IProject>('Project', ProjectSchema);
