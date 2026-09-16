import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { SEO } from '../components/SEO';
import { Button } from '../components/Button';
import { submitEnquiry } from '../services/api';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    service: 'Business Website',
    budget: '$1,000 - $3,000',
    offerCode: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
        service: 'Business Website',
        budget: '$1,000 - $3,000',
        offerCode: '',
        message: '',
      });
    } catch (err: any) {
      console.error('Enquiry submit failed:', err);
      setError(
        err.response?.data?.message ||
          'Unable to reach the server. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-charcoal-950 text-cream-100 min-h-screen">
      <SEO title="Contact Us" description="Get in touch with WebNest Solutions to start your website project." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          category="GET IN TOUCH"
          title="Let's build something"
          highlightText="extraordinary."
          subtitle="Ready to transform your business website? Reach out and we'll reply within 24 hours."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold font-display text-white">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-warmNeutral-300">
                  <div className="w-10 h-10 rounded-full bg-brandRed-500/10 text-brandRed-500 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-warmNeutral-500 uppercase tracking-wider">Email Us</p>
                    <a href="mailto:hello@webnestsolutions.com" className="text-white hover:text-brandRed-500 text-sm font-semibold transition-colors">
                      hello@webnestsolutions.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-warmNeutral-300">
                  <div className="w-10 h-10 rounded-full bg-brandRed-500/10 text-brandRed-500 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-warmNeutral-500 uppercase tracking-wider">Call Us</p>
                    <a href="tel:+919876543210" className="text-white hover:text-brandRed-500 text-sm font-semibold transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-warmNeutral-300">
                  <div className="w-10 h-10 rounded-full bg-brandRed-500/10 text-brandRed-500 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-warmNeutral-500 uppercase tracking-wider">Office Studio</p>
                    <p className="text-white text-sm font-semibold">WebNest Studios, Innovation Hub</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ Box */}
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-8 space-y-4">
              <h3 className="text-lg font-bold font-display text-white">How fast can we launch?</h3>
              <p className="text-xs text-warmNeutral-300 leading-relaxed">
                Most custom website projects are completed within 2 to 4 weeks depending on client feedback speed and scope complexity.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-charcoal-900 border border-charcoal-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
            {success ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle className="w-16 h-16 text-brandRed-500 mx-auto" />
                <h3 className="text-2xl font-bold font-display text-white">Enquiry Submitted!</h3>
                <p className="text-warmNeutral-300 text-sm max-w-md mx-auto">
                  We have received your message. Our team will review your requirements and send a project timeline within 24 hours.
                </p>
                <Button variant="primary" onClick={() => setSuccess(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-bold font-display text-white">Start Your Project</h3>
                
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-cream-200 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-brandRed-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-cream-200 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-brandRed-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-cream-200 mb-1">Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-brandRed-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-cream-200 mb-1">Business Name</label>
                    <input
                      type="text"
                      placeholder="Your Company / Brand"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-brandRed-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-cream-200 mb-1">Service Type</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-brandRed-500 focus:outline-none"
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
                    <label className="block text-xs font-semibold text-cream-200 mb-1">Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-brandRed-500 focus:outline-none"
                    >
                      <option value="Under $1,000">Under $1,000</option>
                      <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                      <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                      <option value="$5,000+">$5,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">Newsletter Offer Code</label>
                  <input
                    type="text"
                    placeholder="WEBNEST10"
                    value={formData.offerCode}
                    onChange={(e) => setFormData({ ...formData, offerCode: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-brandRed-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-warmNeutral-500 mt-1">Use WEBNEST10 for 10% off your website quotation.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your project requirements and goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-brandRed-500 focus:outline-none resize-none"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </span>
                  ) : (
                    'Start My Project →'
                  )}
                </Button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
