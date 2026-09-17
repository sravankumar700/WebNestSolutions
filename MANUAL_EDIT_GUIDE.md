# Manual Content & Customization Guide

This document explains exactly where to change the editable text and content in this project without breaking the website.

Important: some content is controlled from the admin dashboard/database, while other text is still hardcoded in the frontend files. This guide separates both so you know what is easy to edit and what needs code changes.

---

## 1) What is editable from the admin panel

These values are usually stored in MongoDB and can be changed from the admin dashboard after logging in.

### A. Company / brand settings

Files involved:
- client/src/admin/SettingsManager.tsx
- client/src/types/index.ts
- server/src/models/SiteSettings.ts
- server/src/controllers/settingsController.ts

Editable fields:
- siteName
- tagline
- description
- email
- phone
- socialLinks
- footerText
- ctaText
- salesPeople
- whatsappEnabled
- whatsappAlertNumber
- whatsappCustomerTemplate
- whatsappWebhookVerifyToken

How to update:
1. Open the admin login page.
2. Login using the seeded admin credentials.
3. Go to the Settings section.
4. Update the required values and save.

These values are the main global company information and are the first place to change when you want to replace the brand name, email, phone, social URLs, or footer copy.

---

### B. Projects / portfolio cards

Files involved:
- client/src/pages/Projects.tsx
- client/src/pages/Home.tsx
- client/src/sections/FeaturedProjectsSection.tsx
- client/src/components/ProjectCard.tsx
- server/src/seed/seed.ts
- server/src/models/Project.ts

Project card fields that are editable:
- title
- slug
- category
- shortDescription
- description
- story
- coverImage
- gallery
- technologies
- features
- liveUrl
- githubUrl
- featured
- published
- order

How to update:
- Recommended way: update through the admin project manager if the project management UI is available.
- If it's hardcoded fallback content, edit the default project arrays in:
  - client/src/pages/Home.tsx
  - client/src/pages/Projects.tsx
- If you want the project data to be seeded or restored in the database, update:
  - server/src/seed/seed.ts

Important:
- slug should be unique and URL-safe.
- title and category are what appear on the portfolio cards.
- description and story control the detail page content.
- coverImage and gallery should use valid image URLs.

---

### C. Services section

Files involved:
- client/src/pages/Home.tsx
- client/src/sections/ServicesSection.tsx
- server/src/seed/seed.ts
- server/src/models/Service.ts

Editable fields:
- title
- description
- icon
- order
- published

How to update:
- Use the admin service manager if available.
- Otherwise modify the defaultServices array in Home.tsx.
- For database seed values: update server/src/seed/seed.ts.

These items are the service cards visible on the home page and services page.

---

### D. Testimonials

Files involved:
- client/src/pages/Home.tsx
- client/src/sections/TestimonialsSection.tsx
- server/src/seed/seed.ts
- server/src/models/Testimonial.ts

Editable fields:
- name
- role
- company
- review
- image
- order
- published

How to update:
- Update via admin manager if enabled.
- Or edit the defaultTestimonials array in Home.tsx.

---

## 2) Hardcoded text that must be edited in code

These are not loaded from the database and need direct file edits.

### A. Homepage and section headings

Main file:
- client/src/pages/Home.tsx

Examples:
- SEO title and description
- top heading text
- section names
- process section content
- CTA section content

Also relevant:
- client/src/sections/HeroSection.tsx
- client/src/sections/TrustSection.tsx
- client/src/sections/WhyWebNestSection.tsx
- client/src/sections/ProcessSection.tsx
- client/src/sections/CTASection.tsx

What to edit here:
- section titles
- subheadings or headlines
- call-to-action copy
- social proof labels

---

### B. About page content

File:
- client/src/pages/AboutPage.tsx

Editable content includes:
- page title
- category label like "OUR STORY"
- main heading
- description paragraph
- stat boxes and feature cards
- overlay text in the video section
- service metrics like "95+ Avg PageSpeed Score"

This page is mostly hardcoded, so if you want custom branding or a different story, update this file directly.

---

### C. Contact page and enquiry form

File:
- client/src/pages/ContactPage.tsx

Editable content includes:
- contact heading
- email address
- phone number
- office/studio text
- FAQ or quick info block
- service select options
- budget dropdown options
- offer code placeholder text
- form messages

Change these values here if you want to replace the contact details or the form options.

---

### D. Navbar, footer, and branding labels

Files involved:
- client/src/components/Navbar.tsx
- client/src/components/Footer.tsx
- client/src/components/SEO.tsx
- client/src/App.tsx

Editable content includes:
- company name in navbar/footer
- logo alt text
- menu item labels
- SEO title prefix
- meta description text
- default browser title

If you rename the company or want different website text in the top nav/footer, change these files.

---

### E. Login/admin default credentials and admin branding

Files involved:
- client/src/pages/AdminLogin.tsx
- server/src/seed/seed.ts

Editable values:
- admin email
- admin password
- admin logo text
- labels in login form

Note:
- For actual login, update the seeded admin record in MongoDB or regenerate the seed file.
- The default credential is currently:
  - Email and password: configured privately with `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env`

---

## 3) Main files to edit for each type of content

### Company name / brand name

Edit in:
- client/src/admin/SettingsManager.tsx
- server/src/models/SiteSettings.ts
- client/src/components/Navbar.tsx
- client/src/components/Footer.tsx
- client/src/pages/AboutPage.tsx
- client/src/pages/ContactPage.tsx
- client/src/components/SEO.tsx

If the site is still using the WebNest brand name in many places, search the project for "WebNest" and replace carefully.

---

### Company email / phone / contact details

Edit in:
- client/src/admin/SettingsManager.tsx
- server/src/models/SiteSettings.ts
- client/src/pages/ContactPage.tsx
- client/src/components/Footer.tsx

---

### Project card names and details

Edit in:
- client/src/pages/Home.tsx
- client/src/pages/Projects.tsx
- server/src/seed/seed.ts
- admin project manager (if available)

For each project, update:
- title
- slug
- category
- shortDescription
- description
- story
- technologies
- features
- coverImage / gallery
- liveUrl / githubUrl

---

### Services card names and descriptions

Edit in:
- client/src/pages/Home.tsx
- server/src/seed/seed.ts
- admin service manager (if available)

---

### Testimonials text and people names

Edit in:
- client/src/pages/Home.tsx
- server/src/seed/seed.ts
- admin testimonial manager (if available)

---

## 4) Best practice when changing content

### Option 1: Easy editable via admin
Use this when you want to change:
- company name
- slogan
- email
- phone
- footer text
- social profiles

Go to the admin settings form.

### Option 2: Edit the static frontend files
Use this when you want to change:
- homepage section titles
- about page story
- contact page form text
- CTA text
- navigation labels
- page metadata

### Option 3: Edit seed data for fresh installs
Use this when you want to change the default content loaded on first setup.

Update:
- server/src/seed/seed.ts

This is especially useful if you want the database to start with your own project names, services, or testimonials.

---

## 5) Quick search words to find editable text

Use these search strings in the editor or terminal to locate content quickly:

- WebNest
- Hair & Glow
- Street Barber
- FryGuy
- Zephyr Interiors
- CONTACT_EMAIL
- CONTACT_PHONE
- Start a Project
- Our Story
- Contact Us
- Ideas into Impactful Websites

This helps find all hardcoded content locations fast.

---

## 6) Recommended editing workflow

1. Decide if the value is global company information or page content.
2. If it is global company info, edit admin settings or SiteSettings.
3. If it is section copy, edit the page/section file directly.
4. If it is portfolio, service, or testimonial content, edit the project/service/testimonial data model or admin manager.
5. If you want the new values to appear for fresh installs, also update server/src/seed/seed.ts.
6. Run the project and check the page after changes.

---

## 7) Checklist before publishing

When you finish edits, verify these points:
- company name is consistent across navbar, footer, and SEO
- contact email/phone match the real business info
- project card titles and URLs are correct
- section headings look clean and aligned
- no hardcoded old brand text remains
- admin settings save successfully

---

## 8) Example: changing company name

If you want to replace "WebNest Solutions" with your own brand name:

1. Update admin settings if possible.
2. Search for "WebNest Solutions" in the project.
3. Replace common admin values in:
   - server/src/models/SiteSettings.ts
   - client/src/admin/SettingsManager.tsx
4. Update page-specific hardcoded references in:
   - client/src/pages/AboutPage.tsx
   - client/src/pages/ContactPage.tsx
   - client/src/components/Navbar.tsx
   - client/src/components/Footer.tsx
   - client/src/components/SEO.tsx
5. Update project/testimonial data if they still mention the old business name.

---

## 9) Final reminder

This project is a mix of:
- database-driven data
- fallback hardcoded arrays
- direct static JSX text

So the safest editing method is:
- change settings in admin for global brand contact data
- change project/service/testimonial data in admin or seed files for portfolio content
- change page sections manually for real page copy and design text

If you want, the next step can be creating a second file that is even more specific per page, such as:
- Homepage content editing checklist
- About page editing checklist
- Project card editing checklist
- Contact form editing checklist
