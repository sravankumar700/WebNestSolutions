import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import serviceRoutes from './routes/serviceRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import enquiryRoutes from './routes/enquiryRoutes';
import settingsRoutes from './routes/settingsRoutes';
import uploadRoutes from './routes/uploadRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import { errorHandler } from './middleware/errorHandler';
import { verifyWebhook } from './services/whatsappService';
import { startNewsletterScheduler } from './services/newsletterScheduler';
import { verifyEmailTransport } from './services/emailService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();
startNewsletterScheduler();
void verifyEmailTransport().catch((error: any) => {
  console.error('[Email] SMTP connection verification failed:', error);
});

// Security & Parsing Middlewares
app.use(
  helmet({
    contentSecurityPolicy: false, // Allow external image URLs and R3F canvas assets
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'WebNest Solutions 3.0 API', timestamp: new Date() });
});

app.get('/api/whatsapp/webhook', async (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const verified = await verifyWebhook(String(mode || ''), String(token || ''), String(challenge || ''));
  if (verified) {
    return res.status(200).send(verified);
  }

  return res.status(403).send('Verification failed');
});

app.post('/api/whatsapp/webhook', (req, res) => {
  return res.status(200).send('OK');
});

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[WebNest Backend Server]: Running on http://localhost:${PORT}`);
});
console.log(
  "[MongoDB]: URI loaded:",
  process.env.MONGODB_URI ? "YES" : "NO"
);