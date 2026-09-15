import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Enquiry } from '../models/Enquiry';
import { sendLeadNotifications } from '../services/whatsappService';

const getFallbackEnquiries = () => {
  const globalStore = (globalThis as any).__webnestEnquiries ?? [];
  (globalThis as any).__webnestEnquiries = globalStore;
  return globalStore as any[];
};

export const createEnquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, businessName, service, budget, message, assignedTo, notes, source } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required fields.' });
    }

    if (mongoose.connection.readyState !== 1) {
      const fallbackEnquiry = {
        _id: new mongoose.Types.ObjectId().toString(),
        name,
        email,
        phone: phone || '',
        businessName: businessName || '',
        service: service || 'General Enquiry',
        budget: budget || 'Undisclosed',
        message,
        status: 'New',
        assignedTo: assignedTo || '',
        notes: notes || '',
        source: source || 'Website Form',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      getFallbackEnquiries().unshift(fallbackEnquiry);
      return res.status(201).json({
        message: 'Thank you! Your enquiry has been received. Our team will reach out within 24 hours.',
        enquiry: fallbackEnquiry,
      });
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
      assignedTo: assignedTo || '',
      notes: notes || '',
      source: source || 'Website Form',
    });

    await enquiry.save();

    try {
      await sendLeadNotifications({
        name,
        email,
        phone,
        businessName,
        service,
        budget,
        message,
        source: source || 'Website Form',
      });
    } catch (whatsappError) {
      console.warn('[WhatsApp] Notification failed:', whatsappError);
    }

    return res.status(201).json({
      message: 'Thank you! Your enquiry has been received. Our team will reach out within 24 hours.',
      enquiry,
    });
  } catch (error: any) {
    console.error('[Enquiry] ERROR:', error.message, error.stack);
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

    if (mongoose.connection.readyState !== 1) {
      const enquiries = getFallbackEnquiries().filter((item) => {
        if (status && typeof status === 'string' && status !== 'All' && item.status !== status) return false;
        if (!search || typeof search !== 'string') return true;
        const q = search.toLowerCase();
        return (
          (item.name || '').toLowerCase().includes(q) ||
          (item.email || '').toLowerCase().includes(q) ||
          (item.businessName || '').toLowerCase().includes(q)
        );
      });
      return res.json({ enquiries });
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
    const { status, assignedTo, notes } = req.body;

    const updateData: any = {};

    if (status) {
      if (!['New', 'Contacted', 'In Progress', 'Completed', 'Archived'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value.' });
      }
      updateData.status = status;
    }

    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
    if (notes !== undefined) updateData.notes = notes;

    if (mongoose.connection.readyState !== 1) {
      const enquiries = getFallbackEnquiries();
      const enquiryIndex = enquiries.findIndex((entry) => entry._id === id || entry._id?.toString() === id);
      if (enquiryIndex === -1) {
        return res.status(404).json({ message: 'Enquiry not found.' });
      }

      enquiries[enquiryIndex] = {
        ...enquiries[enquiryIndex],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };
      return res.json({ message: 'Enquiry updated successfully.', enquiry: enquiries[enquiryIndex] });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(id, updateData, { new: true });
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found.' });
    }

    return res.json({ message: 'Enquiry updated successfully.', enquiry });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to update enquiry.' });
  }
};

export const deleteEnquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState !== 1) {
      const enquiries = getFallbackEnquiries();
      const index = enquiries.findIndex((entry) => entry._id === id || entry._id?.toString() === id);
      if (index === -1) {
        return res.status(404).json({ message: 'Enquiry not found.' });
      }
      enquiries.splice(index, 1);
      return res.json({ message: 'Enquiry deleted successfully.' });
    }

    const enquiry = await Enquiry.findByIdAndDelete(id);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found.' });
    }
    return res.json({ message: 'Enquiry deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to delete enquiry.' });
  }
};
