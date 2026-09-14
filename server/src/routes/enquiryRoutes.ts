import { Router } from 'express';
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController';
import { requireAuth } from '../middleware/authMiddleware';
import rateLimit from 'express-rate-limit';

const router = Router();

const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per window
  message: { message: 'Too many enquiry submissions from this IP, please try again later.' },
});

router.post('/', enquiryLimiter, createEnquiry);

// Admin Protected
router.get('/', requireAuth, getEnquiries);
router.put('/:id', requireAuth, updateEnquiryStatus);
router.delete('/:id', requireAuth, deleteEnquiry);

export default router;
