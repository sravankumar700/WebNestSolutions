import { Router } from 'express';
import {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:slug', getProjectBySlug);

// Admin Protected
router.post('/', requireAuth, createProject);
router.put('/:id', requireAuth, updateProject);
router.delete('/:id', requireAuth, deleteProject);

export default router;
