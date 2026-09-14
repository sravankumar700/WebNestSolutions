import { Router } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', requireAuth, upload.single('image'), async (req: any, res: any) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded.' });
    }

    // Try Cloudinary upload
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'webnest_cloud') {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      
      const uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: 'webnest_projects',
      });

      return res.json({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });
    }

    // Fallback: Return Data URI for immediate display
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    return res.json({ url: dataURI, public_id: 'local_data_uri' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Image upload failed.' });
  }
});

export default router;
