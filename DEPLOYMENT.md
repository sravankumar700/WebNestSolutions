# 🚀 WebNest Solutions 3.0 — Complete Production Deployment Guide

This guide provides step-by-step instructions for deploying the **WebNest Solutions 3.0** full-stack agency application to production platforms including **Vercel**, **Netlify**, **Render**, **Railway**, **MongoDB Atlas**, and **Cloudinary**.

---

## 🏆 Recommended Architecture: Which Option is Best & Why?

### **RECOMMENDED COMBINATION:**
- **Frontend (React + Vite + TypeScript + Tailwind + R3F)** → **Vercel**
- **Backend API (Node.js + Express + JWT Cookies)** → **Render** (or **Railway**)
- **Database** → **MongoDB Atlas**
- **Image Storage** → **Cloudinary**

---

### **WHY VERCEL IS BEST FOR FRONTEND:**
1. **Instant Edge Performance**: Vercel was built by the creators of modern frontend tooling. It serves your Vite React bundle from global Edge CDNs with ultra-low latency (<20ms).
2. **Zero-Configuration Routing**: Seamlessly handles Single Page Application (SPA) client-side routes (`/projects`, `/services`, `/about`, `/contact`, `/admin`) via `vercel.json`.
3. **Automatic SSL & CDNs**: Free HTTPS certificates for custom domains (`webnestsolutions.com`) with instant cache invalidation upon GitHub push.

### **WHY RENDER IS BEST FOR BACKEND:**
1. **Native Node.js & Express Support**: Render natively runs full Node.js servers, background workers, and WebSocket listeners without serverless timeout limits.
2. **Secure HTTP-Only Cookie Handling**: Properly handles cross-site HTTP-only authentication cookies when paired with Vercel over HTTPS (`sameSite: 'none'`, `secure: true`).
3. **Built-in Health Checks**: Automatically restarts services if an unhandled crash occurs.

---

## 📋 Pre-Deployment Setup: Database & Image Cloud

### Step 1: Set Up MongoDB Atlas (Database)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free or paid cluster.
2. Navigate to **Database Access** → Create a database user (e.g., `webnest_db_user` with a strong password).
3. Navigate to **Network Access** → Add IP Address `0.0.0.0/0` (Allows access from Render/Vercel servers).
4. Click **Connect** → Choose **Connect your application** → Copy your connection string:
   ```
   mongodb+srv://webnest_db_user:<password>@cluster0.abcde.mongodb.net/webnest_db?retryWrites=true&w=majority
   ```

---

### Step 2: Set Up Cloudinary (Production Image Storage)
1. Sign up for a free account at [Cloudinary](https://cloudinary.com/).
2. From your Cloudinary Dashboard, copy:
   - `Cloud Name`
   - `API Key`
   - `API Secret`

---

## 🛠️ Step-by-Step Deployment Instructions

---

### 🟢 METHOD 1: Deploy Backend to Render

1. Push your project code to **GitHub**.
2. Log into [Render Dashboard](https://dashboard.render.com/) and click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   | Key | Value |
   | :--- | :--- |
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `MONGODB_URI` | *Your MongoDB Atlas Connection String* |
   | `JWT_SECRET` | *Generates strong random 64-char string* |
   | `JWT_EXPIRES_IN` | `7d` |
   | `CLIENT_URL` | `https://webnestsolutions.com` (or your Vercel URL) |
   | `CLOUDINARY_CLOUD_NAME` | *Your Cloudinary Cloud Name* |
   | `CLOUDINARY_API_KEY` | *Your Cloudinary API Key* |
   | `CLOUDINARY_API_SECRET` | *Your Cloudinary API Secret* |
   | `SMTP_HOST` | *Your SMTP host* |
   | `SMTP_PORT` | `587` |
   | `SMTP_SECURE` | `false` |
   | `SMTP_USER` | *Your SMTP username* |
   | `SMTP_PASS` | *Your SMTP password* |
   | `SMTP_FROM` | *The newsletter sender address* |
   | `NEWSLETTER_ENABLED` | `true` |
   | `NEWSLETTER_SCHEDULE` | `0 9 * * 1,3,5` |
   | `NEWSLETTER_TIMEZONE` | `UTC` |
   | `NEWSLETTER_SUBJECT` | *Your campaign subject* |
   | `NEWSLETTER_TEXT` | *Your campaign text* |

6. Click **Create Web Service**. Once deployed, Render will provide your backend API URL (e.g., `https://webnest-backend.onrender.com`).
7. **Seed Production Admin User**:
   Run seed command via Render Shell or locally pointing to your Atlas URI:
   ```bash
   MONGODB_URI="your-atlas-uri" npm run seed --prefix server
   ```

---

### ⚡ METHOD 2: Deploy Frontend to Vercel (Recommended)

1. Log into [Vercel Dashboard](https://vercel.com/) and click **Add New...** → **Project**.
2. Import your GitHub repository.
3. Set the following configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Update `client/vercel.json` to proxy API requests to your Render backend:
   ```json
   {
     "rewrites": [
       { "source": "/api/(.*)", "destination": "https://webnest-backend.onrender.com/api/$1" },
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
5. Click **Deploy**. Vercel will build your frontend and assign your production URL.

---

### 🌐 METHOD 3: Deploy Frontend to Netlify (Alternative)

If you prefer **Netlify** over Vercel:

1. Log into [Netlify Dashboard](https://app.netlify.com/) → Click **Add new site** → **Import an existing project**.
2. Select your GitHub repo.
3. Configure build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
4. Create a file named `client/netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/api/*"
     to = "https://webnest-backend.onrender.com/api/:splat"
     status = 200

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```
5. Click **Deploy Site**. Netlify will host your site on edge nodes.

---

### 🚂 METHOD 4: Deploy Backend to Railway (Alternative to Render)

1. Sign up at [Railway.app](https://railway.app/).
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select your repo and set the root directory to `server`.
4. In Railway variables, paste your `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, and Cloudinary keys.
5. Railway will automatically generate a HTTPS domain for your API.

---

## 🔍 Pre-Flight Production Checklist

Before going live, verify the following:

- [ ] **Admin Account**: Verify the admin email configured by `ADMIN_EMAIL` works in production.
- [ ] **Enquiry Submissions**: Test submitting a lead on `/contact` or via the popup modal and confirm it saves in Atlas.
- [ ] **Admin Status Switcher**: Verify changing enquiry status to `Contacted` works in `/admin`.
- [ ] **Project CRUD**: Create a test project and upload an image via Cloudinary.
- [ ] **Cookies Over HTTPS**: Verify HTTP-only session cookies have `secure: true` and `sameSite: 'none'` in production.
- [ ] **SEO Metadata**: Check dynamic route document titles on `/projects/:slug`.

---

## 📞 Support & Maintenance

For custom domain configuration (`webnestsolutions.com`) or Cloudflare SSL setup, point your domain DNS records:
- **Vercel CNAME**: `cname.vercel-dns.com`
- **Render CNAME**: `webnest-backend.onrender.com`