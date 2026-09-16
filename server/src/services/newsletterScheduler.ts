import cron from 'node-cron';
import mongoose from 'mongoose';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber';
import { sendNewsletterCampaignEmail } from './emailService';

const newsletterSchedule = process.env.NEWSLETTER_SCHEDULE || '0 9 * * 1,3,5';
const newsletterTimezone = process.env.NEWSLETTER_TIMEZONE || 'UTC';

export const sendScheduledNewsletter = async () => {
  if (mongoose.connection.readyState !== 1) {
    console.warn('[Newsletter] Scheduled send skipped because MongoDB is unavailable.');
    return;
  }

  const subscribers = await NewsletterSubscriber.find({}, { email: 1 }).lean();
  let sent = 0;
  let failed = 0;

  for (const subscriber of subscribers) {
    try {
      await sendNewsletterCampaignEmail(subscriber.email);
      sent += 1;
    } catch (error: any) {
      failed += 1;
      console.error(`[Newsletter] Failed to send to ${subscriber.email}:`, error.message);
    }
  }

  console.info(`[Newsletter] Scheduled send complete. Sent: ${sent}; failed: ${failed}.`);
};

export const startNewsletterScheduler = () => {
  if (process.env.NEWSLETTER_ENABLED !== 'true') {
    console.info('[Newsletter] Scheduler disabled. Set NEWSLETTER_ENABLED=true to enable it.');
    return;
  }

  if (!cron.validate(newsletterSchedule)) {
    throw new Error(`[Newsletter] Invalid NEWSLETTER_SCHEDULE: ${newsletterSchedule}`);
  }

  cron.schedule(newsletterSchedule, () => {
    void sendScheduledNewsletter().catch((error: any) => {
      console.error('[Newsletter] Scheduled send failed:', error.message);
    });
  }, { timezone: newsletterTimezone });

  console.info(`[Newsletter] Scheduler enabled for ${newsletterSchedule} (${newsletterTimezone}).`);
};