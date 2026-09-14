import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AdminUser } from '../models/AdminUser';
import { AuthRequest } from '../middleware/authMiddleware';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const admin = await AdminUser.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const secret = process.env.JWT_SECRET || 'webnest_super_secret_jwt_key_2026_production_ready';
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      secret,
      { expiresIn: '7d' }
    );

    res.cookie('webnest_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      message: 'Login successful.',
      user: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      token,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Login failed.' });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('webnest_admin_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  return res.json({ message: 'Logged out successfully.' });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated.' });
    }

    const admin = await AdminUser.findById(req.user.id).select('-passwordHash');
    if (!admin) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json({ user: admin });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
