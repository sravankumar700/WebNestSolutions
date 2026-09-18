import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber';
import { sendNewsletterWelcomeEmail } from '../services/emailService';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const subscribeToNewsletter = async (req: Request, res: Response) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();

    if (!email || !emailPattern.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Newsletter signup is temporarily unavailable.' });
    }

    const subscriber = await NewsletterSubscriber.findOneAndUpdate(
      { email },
      { $setOnInsert: { email, subscribedAt: new Date() } },
      { new: true, upsert: true }
    );

    if (!subscriber.welcomeEmailSent) {
      try {
        await sendNewsletterWelcomeEmail(email);
        await NewsletterSubscriber.updateOne(
          { _id: subscriber._id },
          { $set: { welcomeEmailSent: true, welcomeEmailSentAt: new Date() } }
        );
      } catch (emailError: any) {
        console.error('[Newsletter] Confirmation email failed:', emailError);
        return res.status(502).json({
          message: 'Subscription could not be completed because the confirmation email failed. Please try again.',
        });
      }
    }

    return res.status(201).json({ message: 'You are subscribed to the newsletter.' });
  } catch (error: any) {
    console.error('[Newsletter] ERROR:', error.message);
    return res.status(500).json({ message: 'Failed to subscribe to the newsletter.' });
  }
};