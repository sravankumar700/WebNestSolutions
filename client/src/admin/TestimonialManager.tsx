import React, { useState, useEffect } from 'react';
import { fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../services/api';
import { TestimonialItem } from '../types';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { Button } from '../components/Button';

export const TestimonialManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);

  const [formData, setFormData] = useState<Partial<TestimonialItem>>({
    name: '',
    role: '',
    company: '',
    review: '',
    image: '',
    published: true,
    order: 1,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchTestimonials(true);
      setTestimonials(res.data.testimonials || []);
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
    setEditingTestimonial(null);
    setFormData({
      name: '',
      role: 'Founder',
      company: '',
      review: '',
      image: '',
      published: true,
      order: testimonials.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (t: TestimonialItem) => {
    setEditingTestimonial(t);
    setFormData(t);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTestimonial?._id) {
        await updateTestimonial(editingTestimonial._id, formData);
      } else {
        await createTestimonial(formData);
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      alert('Failed to save testimonial.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this testimonial?')) {
      await deleteTestimonial(id);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display text-white">Manage Client Testimonials</h2>
          <p className="text-xs text-warmNeutral-500">Add or edit client reviews and social proof.</p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-1.5" />
          <span>New Testimonial</span>
        </Button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-warmNeutral-500">Loading testimonials...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t._id} className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 relative flex flex-col justify-between">
              <div>
                <p className="text-xs text-cream-200 italic mb-4">"{t.review}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-brandRed-500 text-white font-bold flex items-center justify-center text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-[11px] text-warmNeutral-500">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-charcoal-800 flex justify-end space-x-2">
                <button
                  onClick={() => openEditModal(t)}
                  className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-cream-100"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white"
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
                {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-warmNeutral-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-cream-200 mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-cream-200 mb-1">Review *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
