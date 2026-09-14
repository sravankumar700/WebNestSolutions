import { Request, Response } from 'express';
import { Service } from '../models/Service';

export const getServices = async (req: Request, res: Response) => {
  try {
    const { all } = req.query;
    const filter = all === 'true' ? {} : { published: true };
    const services = await Service.find(filter).sort({ order: 1, createdAt: 1 });
    return res.json({ services });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to fetch services.' });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const service = new Service(req.body);
    await service.save();
    return res.status(201).json({ message: 'Service created successfully.', service });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || 'Failed to create service.' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!service) {
      return res.status(404).json({ message: 'Service not found.' });
    }
    return res.json({ message: 'Service updated successfully.', service });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || 'Failed to update service.' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found.' });
    }
    return res.json({ message: 'Service deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to delete service.' });
  }
};
