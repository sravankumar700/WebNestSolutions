# 🦅 WebNest Solutions 3.0 — Production Full-Stack Web Development Agency Platform

WebNest Solutions 3.0 is a complete, high-converting, full-stack website designed for a modern web development agency. It combines a dramatic dark charcoal & red hero aesthetic with an editorial warm cream section layout, an interactive Three.js 3D laptop hero visual, a MongoDB REST API backend, an HTTP-only JWT admin portal, and lead enquiry management.

---

## 📐 Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Three.js, `@react-three/fiber`, `@react-three/drei`, Lucide Icons, Axios.
- **Backend**: Node.js, Express.js, TypeScript, Mongoose, JWT (`jsonwebtoken`), `bcryptjs`, `cookie-parser`, `helmet`, `express-rate-limit`, `cloudinary`, `multer`.
- **Database**: MongoDB (Local `mongodb://127.0.0.1:27017/webnest_db` or MongoDB Atlas).
- **Deployment Ready**: Frontend configured for Vercel (`client/vercel.json`), Backend configured for Render/Railway (`server/render.yaml`).

---

## 🎨 Visual Identity & Brand Guidelines

- **Primary Dark**: `#0B0C10` (Deep Charcoal)
- **Primary Light**: `#FAF8F5` (Warm Cream)
- **Accent Red**: `#E52E2E` (Vibrant WebNest Red Glow)
- **Rules**: NO Blue color palette, NO blue-purple gradients, NO generic AI/SaaS templates.
- **Official Logo**: Uses supplied WebNest bird & text logo mark across Desktop Navbar, Mobile Drawer, Footer, Admin Login, Admin Header, and custom Favicons.

---

## 🚀 How to Run Locally Step-by-Step

### Prerequisites
1. Node.js (v18 or higher)
2. MongoDB running locally on port 27017 (`mongodb://127.0.0.1:27017`) OR a remote MongoDB Atlas URI.

---

### Step 1: Install Dependencies
From the root project directory (`Company/`), run:

```bash
# Option A: Run single command from root workspace
npm run install:all

# OR Option B: Install individually
cd server
npm install

cd ../client
npm install
```

---

### Step 2: Seed Initial Database Data
Populate MongoDB with the admin user configured by `ADMIN_EMAIL`, realistic portfolio projects (*FryGuy*, *SalonX*, *Zephyr Interiors*), agency services, testimonials, and site settings.

```bash
# From root workspace:
npm run seed

# OR inside server/ folder:
cd server
npm run seed
```

> **Admin Credentials:** Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env` before running the seed command. Never commit these values.

---

### Step 3: Start Backend API Server
```bash
# From root workspace:
npm run dev:server

# OR inside server/ folder:
cd server
npm run dev
```
- Express API server runs at: `http://localhost:5000`
- Health check API: `http://localhost:5000/api/health`

---

### Step 4: Start Frontend Vite Application
Open a new terminal window and run:

```bash
# From root workspace:
npm run dev:client

# OR inside client/ folder:
cd client
npm run dev
```
- React application opens at: `http://localhost:5173`

---

## 🔑 Key Web Application Routes

| Route | Purpose | Features |
| :--- | :--- | :--- |
| `/` | **Home Page** | 3D Hero Laptop, Trusted Logos, Featured Projects, Dark Services Grid, Why WebNest, 4-Step Process Timeline, Testimonials, CTA. |
| `/projects` | **Portfolio** | Filterable project showcase grid by category tabs. |
| `/projects/:slug` | **Project Details** | Dynamic details loaded from MongoDB: Story, Features, Tech chips, Gallery, Live Link, GitHub link, CTA. |
| `/services` | **Services Page** | Agency service solutions grid with dynamic Lucide icons. |
| `/about` | **About Agency** | Agency story, ROI-driven philosophy, speed & custom code metrics. |
| `/contact` | **Contact Page** | Project enquiry form with budget selector, phone, service type, and validation. |
| `/admin/login` | **Admin Login** | Secure authentication form setting HTTP-only JWT cookies. |
| `/admin` | **Admin Dashboard** | Overview metrics counters, Project CRUD, Service CRUD, Testimonial CRUD, Enquiry Status Manager, Site Settings. |

---

## ⚙️ Environment Variables Config (`server/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/webnest_db
JWT_SECRET=webnest_super_secret_jwt_key_2026_production_ready
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=webnest_cloud
CLOUDINARY_API_KEY=1234567890
CLOUDINARY_API_SECRET=webnest_cloudinary_secret
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_FROM=newsletter@example.com
NEWSLETTER_ENABLED=false
NEWSLETTER_SCHEDULE=0 9 * * 1,3,5
NEWSLETTER_TIMEZONE=UTC
NEWSLETTER_SUBJECT=WebNest weekly web insight
NEWSLETTER_TEXT=Here is this week's web insight from WebNest Solutions.
```

Set `NEWSLETTER_ENABLED=true` after configuring SMTP to send the newsletter every Monday, Wednesday, and Friday at 09:00 in `NEWSLETTER_TIMEZONE`. The HTML campaign body can be supplied through `NEWSLETTER_HTML` when richer formatting is needed.

---

## 📦 Production Deployment

- **Frontend → Vercel**: Import `client` directory, build command `npm run build`, output folder `dist`.
- **Backend → Render / Railway**: Import `server` directory, build command `npm run build`, start command `npm start`.
- **Database → MongoDB Atlas**: Update `MONGODB_URI` environment variable in production settings.
