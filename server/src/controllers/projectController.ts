import { Request, Response } from 'express';
import { Project } from '../models/Project';

const getProjectImages = (projectData: any): string[] => [
  projectData.coverImage,
  ...(Array.isArray(projectData.gallery) ? projectData.gallery : []),
].filter(Boolean);

const findImageConflict = async (images: string[], projectId?: string) => {
  const uniqueImages = new Set(images);
  if (uniqueImages.size !== images.length) return 'A project cannot reuse an image within its own gallery.';

  const query: any = {
    $or: [
      { coverImage: { $in: images } },
      { gallery: { $in: images } },
    ],
  };
  if (projectId) query._id = { $ne: projectId };

  const conflict = await Project.findOne(query).select('title').lean();
  return conflict ? `Image already belongs to project "${conflict.title}".` : null;
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { category, featured, all } = req.query;
    const filter: any = {};

    if (all !== 'true') {
      filter.published = true;
    }

    if (category && typeof category === 'string' && category !== 'All') {
      filter.category = category;
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    return res.json({ projects });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to fetch projects.' });
  }
};

export const getFeaturedProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({ published: true, featured: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(6);
    return res.json({ projects });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug, published: true });

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    return res.json({ project });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const projectData = req.body;
    if (!projectData.slug && projectData.title) {
      projectData.slug = projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const imageConflict = await findImageConflict(getProjectImages(projectData));
    if (imageConflict) return res.status(400).json({ message: imageConflict });

    const project = new Project(projectData);
    await project.save();
    return res.status(201).json({ message: 'Project created successfully.', project });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || 'Failed to create project.' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const imageConflict = await findImageConflict(getProjectImages(req.body), id);
    if (imageConflict) return res.status(400).json({ message: imageConflict });

    const project = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    return res.json({ message: 'Project updated successfully.', project });
  } catch (error: any) {
    return res.status(400).json({ message: error.message || 'Failed to update project.' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    return res.json({ message: 'Project deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to delete project.' });
  }
};
