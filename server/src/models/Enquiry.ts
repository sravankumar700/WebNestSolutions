import { Schema, model, Document } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  service?: string;
  budget?: string;
  message: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Archived';
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, default: '' },
    businessName: { type: String, default: '' },
    service: { type: String, default: 'General Enquiry' },
    budget: { type: String, default: 'Undisclosed' },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Completed', 'Archived'],
      default: 'New',
    },
  },
  { timestamps: true }
);

export const Enquiry = model<IEnquiry>('Enquiry', EnquirySchema);
