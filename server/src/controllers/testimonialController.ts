import { Request, Response } from 'express';
import { Testimonial } from '../models/Testimonial';

export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const { all } = req.query;
    const filter = all === 'true' ? {} : { published: true };
    const testimonials = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 });
    return res.json({ testimonials });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to fetch testimonials.' });
  }
};

export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    return res.status(201).json({ message: 'Testimonial created successfully.', testimonial });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || 'Failed to create testimonial.' });
  }
};

export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found.' });
    }
    return res.json({ message: 'Testimonial updated successfully.', testimonial });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || 'Failed to update testimonial.' });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found.' });
    }
    return res.json({ message: 'Testimonial deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to delete testimonial.' });
  }
};
