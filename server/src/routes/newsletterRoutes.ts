import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { subscribeToNewsletter } from '../controllers/newsletterController';

const router = Router();

const newsletterLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Too many newsletter signup attempts. Please try again later.' },
});

router.post('/subscribe', newsletterLimiter, subscribeToNewsletter);

export default router;