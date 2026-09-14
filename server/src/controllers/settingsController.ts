import { Request, Response } from 'express';
import { SiteSettings } from '../models/SiteSettings';

export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings();
      await settings.save();
    }
    return res.json({ settings });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to fetch settings.' });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }

    await settings.save();
    return res.json({ message: 'Site settings updated successfully.', settings });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || 'Failed to update settings.' });
  }
};
