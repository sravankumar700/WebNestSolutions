import { Schema, model, Document } from 'mongoose';

export interface IAdminUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, default: 'Admin' },
    role: { type: String, default: 'superadmin' },
  },
  { timestamps: true }
);

export const AdminUser = model<IAdminUser>('AdminUser', AdminUserSchema);
