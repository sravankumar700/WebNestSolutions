import axios from 'axios';
import { Project, ServiceItem, TestimonialItem, EnquiryItem, SiteSettingsData, User } from '../types';

const API = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Projects
export const fetchProjects = (category?: string, featured?: boolean, all?: boolean) =>
  API.get<{ projects: Project[] }>('/projects', { params: { category, featured, all } });

export const fetchFeaturedProjects = () =>
  API.get<{ projects: Project[] }>('/projects/featured');

export const fetchProjectBySlug = (slug: string) =>
  API.get<{ project: Project }>(`/projects/${slug}`);

export const createProject = (data: Partial<Project>) =>
  API.post<{ message: string; project: Project }>('/projects', data);

export const updateProject = (id: string, data: Partial<Project>) =>
  API.put<{ message: string; project: Project }>(`/projects/${id}`, data);

export const deleteProject = (id: string) =>
  API.delete<{ message: string }>(`/projects/${id}`);

// Services
export const fetchServices = (all?: boolean) =>
  API.get<{ services: ServiceItem[] }>('/services', { params: { all } });

export const createService = (data: Partial<ServiceItem>) =>
  API.post<{ message: string; service: ServiceItem }>('/services', data);

export const updateService = (id: string, data: Partial<ServiceItem>) =>
  API.put<{ message: string; service: ServiceItem }>(`/services/${id}`, data);

export const deleteService = (id: string) =>
  API.delete<{ message: string }>(`/services/${id}`);

// Testimonials
export const fetchTestimonials = (all?: boolean) =>
  API.get<{ testimonials: TestimonialItem[] }>('/testimonials', { params: { all } });

export const createTestimonial = (data: Partial<TestimonialItem>) =>
  API.post<{ message: string; testimonial: TestimonialItem }>('/testimonials', data);

export const updateTestimonial = (id: string, data: Partial<TestimonialItem>) =>
  API.put<{ message: string; testimonial: TestimonialItem }>(`/testimonials/${id}`, data);

export const deleteTestimonial = (id: string) =>
  API.delete<{ message: string }>(`/testimonials/${id}`);

// Enquiries
export const submitEnquiry = (data: Partial<EnquiryItem>) =>
  API.post<{ message: string; enquiry: EnquiryItem }>('/enquiries', data);

export const fetchEnquiries = (status?: string, search?: string) =>
  API.get<{ enquiries: EnquiryItem[] }>('/enquiries', { params: { status, search } });

export const updateEnquiryStatus = (
  id: string,
  data: { status?: string; assignedTo?: string; notes?: string }
) => API.put<{ message: string; enquiry: EnquiryItem }>(`/enquiries/${id}`, data);

export const deleteEnquiry = (id: string) =>
  API.delete<{ message: string }>(`/enquiries/${id}`);

// Settings
export const fetchSiteSettings = () =>
  API.get<{ settings: SiteSettingsData }>('/settings');

export const updateSiteSettings = (data: Partial<SiteSettingsData>) =>
  API.put<{ message: string; settings: SiteSettingsData }>('/settings', data);

// Image Upload
export const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  return API.post<{ url: string; public_id: string }>('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Auth
export const loginAdmin = (email: string, password: string) =>
  API.post<{ message: string; user: User; token: string }>('/auth/login', { email, password });

export const logoutAdmin = () =>
  API.post<{ message: string }>('/auth/logout');

export const fetchMe = () =>
  API.get<{ user: User }>('/auth/me');

export default API;
