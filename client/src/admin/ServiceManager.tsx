import React, { useState, useEffect } from 'react';
import { fetchServices, createService, updateService, deleteService } from '../services/api';
import { ServiceItem } from '../types';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { Button } from '../components/Button';

export const ServiceManager: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [formData, setFormData] = useState<Partial<ServiceItem>>({
    title: '',
    description: '',
    icon: 'Building2',
    order: 1,
    published: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchServices(true);
      setServices(res.data.services || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      icon: 'Building2',
      order: services.length + 1,
      published: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (serv: ServiceItem) => {
    setEditingService(serv);
    setFormData(serv);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService?._id) {
        await updateService(editingService._id, formData);
      } else {
        await createService(formData);
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      alert('Failed to save service.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this service?')) {
      await deleteService(id);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display text-white">Manage Services</h2>
          <p className="text-xs text-warmNeutral-500">Configure agency service offerings displayed on the website.</p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-1.5" />
          <span>New Service</span>
        </Button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-warmNeutral-500">Loading services...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((serv) => (
            <div key={serv._id} className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-brandRed-500 bg-brandRed-500/10 px-2.5 py-1 rounded">
                    Icon: {serv.icon}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${serv.published ? 'bg-green-500/20 text-green-400' : 'bg-warmNeutral-800 text-warmNeutral-500'}`}>
                    {serv.published ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{serv.title}</h3>
                <p className="text-xs text-warmNeutral-300 leading-relaxed">{serv.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-charcoal-800 flex justify-end space-x-2">
                <button
                  onClick={() => openEditModal(serv)}
                  className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(serv._id)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
              <h3 className="text-lg font-bold font-display text-white">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-warmNeutral-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-cream-200 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cream-200 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cream-200 mb-1">Icon Name (Lucide)</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value="Building2">Building2 (Business)</option>
                  <option value="ShoppingBag">ShoppingBag (E-commerce)</option>
                  <option value="Utensils">Utensils (Restaurant)</option>
                  <option value="User">User (Portfolio)</option>
                  <option value="FileText">FileText (Landing Page)</option>
                  <option value="Settings">Settings (Custom Solutions)</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Service
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
