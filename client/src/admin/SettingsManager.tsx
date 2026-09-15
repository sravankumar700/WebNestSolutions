import React, { useState, useEffect } from 'react';
import { fetchSiteSettings, updateSiteSettings } from '../services/api';
import { SiteSettingsData } from '../types';
import { Button } from '../components/Button';
import { CheckCircle, Loader2 } from 'lucide-react';

export const SettingsManager: React.FC = () => {
  const [formData, setFormData] = useState<SiteSettingsData>({
    siteName: 'WebNest Solutions',
    tagline: 'Ideas into Impactful Websites.',
    description: 'We design and develop modern, fast and conversion-focused websites for businesses, brands and creators.',
    email: 'hello@webnestsolutions.com',
    phone: '+91 98765 43210',
    socialLinks: {
      github: 'https://github.com/webnest',
      linkedin: 'https://linkedin.com/company/webnest',
      twitter: 'https://twitter.com/webnest',
      instagram: 'https://instagram.com/webnest',
    },
    footerText: '© 2026 WebNest Solutions. All rights reserved.',
    ctaText: 'Start a Project →',
    salesPeople: ['Aisha Kumar', 'Rohan Verma', 'Priya Nair', 'Dev Shah'],
    whatsappEnabled: false,
    whatsappAlertNumber: '+91 98765 43210',
    whatsappCustomerTemplate: 'lead_confirmation',
    whatsappWebhookVerifyToken: 'webnest-whatsapp-webhook',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSiteSettings().then((res) => {
      if (res.data.settings) {
        setFormData(res.data.settings);
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      await updateSiteSettings(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-xs text-warmNeutral-500">Loading site settings...</div>;
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-bold font-display text-white">Global Site Settings</h2>
        <p className="text-xs text-warmNeutral-500">Configure agency branding, contact details, social links, and footer copy.</p>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-3.5 rounded-xl text-xs flex items-center space-x-2">
          <CheckCircle className="w-4 h-4" />
          <span>Site settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-cream-200 mb-1">Agency Name</label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-cream-200 mb-1">Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-cream-200 mb-1">Agency Description</label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-cream-200 mb-1">Contact Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-cream-200 mb-1">Contact Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-charcoal-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-warmNeutral-500">Sales Team</h3>
          <div>
            <label className="block text-[11px] text-cream-300 mb-1">Sales people names (comma separated)</label>
            <textarea
              rows={3}
              value={(formData.salesPeople || []).join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  salesPeople: e.target.value
                    .split(',')
                    .map((name) => name.trim())
                    .filter(Boolean),
                })
              }
              className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white resize-none"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-charcoal-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-warmNeutral-500">WhatsApp Automation</h3>
          <div className="flex items-center justify-between rounded-lg border border-charcoal-700 bg-charcoal-950 px-3 py-2">
            <div>
              <div className="text-sm font-medium text-white">Enable WhatsApp notifications</div>
              <div className="text-[11px] text-warmNeutral-500">Send internal lead alerts and customer confirmations.</div>
            </div>
            <input
              type="checkbox"
              checked={Boolean(formData.whatsappEnabled)}
              onChange={(e) => setFormData({ ...formData, whatsappEnabled: e.target.checked })}
              className="h-4 w-4 rounded border-charcoal-700 bg-charcoal-950 text-primary focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-cream-300 mb-1">Alert number</label>
              <input
                type="text"
                value={formData.whatsappAlertNumber || ''}
                onChange={(e) => setFormData({ ...formData, whatsappAlertNumber: e.target.value })}
                className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-1.5 text-xs text-white"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-[11px] text-cream-300 mb-1">Customer template</label>
              <input
                type="text"
                value={formData.whatsappCustomerTemplate || ''}
                onChange={(e) => setFormData({ ...formData, whatsappCustomerTemplate: e.target.value })}
                className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-1.5 text-xs text-white"
                placeholder="lead_confirmation"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-cream-300 mb-1">Webhook verify token</label>
            <input
              type="text"
              value={formData.whatsappWebhookVerifyToken || ''}
              onChange={(e) => setFormData({ ...formData, whatsappWebhookVerifyToken: e.target.value })}
              className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-1.5 text-xs text-white"
              placeholder="webnest-whatsapp-webhook"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-charcoal-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-warmNeutral-500">Social Media Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-cream-300 mb-1">GitHub</label>
              <input
                type="text"
                value={formData.socialLinks?.github || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, github: e.target.value },
                  })
                }
                className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-cream-300 mb-1">LinkedIn</label>
              <input
                type="text"
                value={formData.socialLinks?.linkedin || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                  })
                }
                className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-charcoal-800 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-cream-200 mb-1">Footer Copyright Text</label>
            <input
              type="text"
              value={formData.footerText}
              onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
              className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? (
              <span className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </span>
            ) : (
              'Save Settings'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
