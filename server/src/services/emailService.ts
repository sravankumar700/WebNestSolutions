import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendNewsletterWelcomeEmail = (email: string) =>
  transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Welcome to WebNest: your 10% website offer is inside',
    text: 'Thanks for subscribing to the WebNest Solutions newsletter. Use offer code WEBNEST10 on your next website quotation to receive 10% off the project price. We will also keep you updated with new projects, insights, and useful web tips.',
    html: '<div style="font-family:Arial,sans-serif;line-height:1.6;color:#1c1b19;max-width:560px;margin:auto;padding:24px"><h2 style="color:#ce422b;margin-bottom:8px">Thanks for subscribing!</h2><p>Welcome to the WebNest Solutions newsletter.</p><div style="background:#fff4ef;border:1px solid #f0c7bb;border-radius:10px;padding:16px;margin:24px 0"><strong style="color:#ce422b;font-size:18px">Get 10% off your next website quotation</strong><p style="margin:8px 0 0">Use this offer code when you contact us:</p><p style="font-family:monospace;font-size:22px;font-weight:bold;letter-spacing:2px;margin:8px 0;color:#1c1b19">WEBNEST10</p><p style="margin:0;font-size:13px">Valid for one new website project quotation. Mention the code in your project enquiry.</p></div><p>We will keep you updated with new projects, insights, and useful web tips.</p><p>WebNest Solutions</p></div>',
  });