import { Schema, model, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, required: true, default: 'Globe' },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Service = model<IService>('Service', ServiceSchema);
