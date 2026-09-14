import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitEnquiry } from '../services/api';
import { Button } from './Button';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const LeadFormModal: React.FC<LeadFormModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Business Website',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    service: defaultService,
    budget: '$1,000 - $3,000',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitEnquiry(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        service: defaultService,
        budget: '$1,000 - $3,000',
        message: '',
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl w-full max-w-xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-warmNeutral-500 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {success ? (
          <div className="text-center py-10 space-y-4">
            <CheckCircle className="w-16 h-16 text-brandRed-500 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold font-display text-white">Project Enquiry Received!</h3>
            <p className="text-warmNeutral-300 text-sm max-w-md mx-auto leading-relaxed">
              Thank you for reaching out to WebNest Solutions. Our lead strategist will review your project requirements and email you within 24 hours.
            </p>
            <div className="pt-4">
              <Button
                variant="primary"
                onClick={() => {
                  setSuccess(false);
                  onClose();
                }}
              >
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-xs font-bold text-brandRed-500 uppercase tracking-widest">
                Start a Project
              </span>
              <h3 className="text-2xl font-bold font-display text-white mt-1">
                Let's Build Your Dream Website
              </h3>
              <p className="text-warmNeutral-300 text-xs mt-1">
                Tell us about your business goals and we'll craft a custom proposal for you.
              </p>
            </div>

            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-3.5 flex items-center space-x-3 text-red-400 text-xs">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-cream-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brandRed-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-cream-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brandRed-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-cream-300 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brandRed-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-cream-300 mb-1.5">
                    Business / Brand Name
                  </label>
                  <input
                    type="text"
                    placeholder="Apex Innovations"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brandRed-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-cream-300 mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brandRed-500 transition-colors"
                  >
                    <option value="Business Website">Business Website</option>
                    <option value="Restaurant Website">Restaurant Website</option>
                    <option value="E-commerce Store">E-commerce Store</option>
                    <option value="Portfolio Website">Portfolio Website</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Custom Web Solution">Custom Web Solution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-cream-300 mb-1.5">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brandRed-500 transition-colors"
                  >
                    <option value="Under $1,000">Under $1,000</option>
                    <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                    <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-cream-300 mb-1.5">
                  Project Details / Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your project, timeline, or target audience..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-charcoal-950 border border-charcoal-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brandRed-500 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </span>
                  ) : (
                    'Start My Project →'
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
