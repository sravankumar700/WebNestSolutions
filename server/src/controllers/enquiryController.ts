import { Request, Response } from 'express';
import { Enquiry } from '../models/Enquiry';

export const createEnquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, businessName, service, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required fields.' });
    }

    const enquiry = new Enquiry({
      name,
      email,
      phone,
      businessName,
      service,
      budget,
      message,
      status: 'New',
    });

    await enquiry.save();
    return res.status(201).json({
      message: 'Thank you! Your enquiry has been received. Our team will reach out within 24 hours.',
      enquiry,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to submit enquiry.' });
  }
};

export const getEnquiries = async (req: Request, res: Response) => {
  try {
    const { status, search } = req.query;
    const filter: any = {};

    if (status && typeof status === 'string' && status !== 'All') {
      filter.status = status;
    }

    if (search && typeof search === 'string') {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { businessName: { $regex: search, $options: 'i' } },
      ];
    }

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    return res.json({ enquiries });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to fetch enquiries.' });
  }
};

export const updateEnquiryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['New', 'Contacted', 'In Progress', 'Completed', 'Archived'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found.' });
    }

    return res.json({ message: 'Enquiry status updated successfully.', enquiry });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to update enquiry.' });
  }
};

export const deleteEnquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findByIdAndDelete(id);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found.' });
    }
    return res.json({ message: 'Enquiry deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to delete enquiry.' });
  }
};
