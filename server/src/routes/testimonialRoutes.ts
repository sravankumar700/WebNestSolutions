import { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getTestimonials);
router.post('/', requireAuth, createTestimonial);
router.put('/:id', requireAuth, updateTestimonial);
router.delete('/:id', requireAuth, deleteTestimonial);

export default router;
