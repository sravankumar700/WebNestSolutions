import React, { useState, useEffect } from 'react';
import { fetchProjects, createProject, updateProject, deleteProject, uploadImage } from '../services/api';
import { Project } from '../types';
import { Plus, Edit, Trash2, Check, X, Upload, Star, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/Button';

export const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    category: 'Business Website',
    shortDescription: '',
    description: '',
    story: '',
    coverImage: '',
    gallery: [],
    technologies: [],
    features: [],
    liveUrl: '',
    githubUrl: '',
    featured: false,
    published: true,
    order: 1,
  });

  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [uploading, setUploading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchProjects(undefined, undefined, true);
      setProjects(res.data.projects || []);
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
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Business Website',
      shortDescription: '',
      description: '',
      story: '',
      coverImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
      gallery: [],
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      features: ['Fast Load Speed', 'Mobile Responsive'],
      liveUrl: '',
      githubUrl: '',
      featured: false,
      published: true,
      order: projects.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setFormData(proj);
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    setUploading(true);
    try {
      const res = await uploadImage(e.target.files[0]);
      setFormData((prev) => ({ ...prev, coverImage: res.data.url }));
    } catch (err) {
      alert('Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject?._id) {
        await updateProject(editingProject._id, formData);
      } else {
        await createProject(formData);
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      alert('Failed to save project.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
      loadData();
    }
  };

  const toggleFeatured = async (proj: Project) => {
    await updateProject(proj._id, { featured: !proj.featured });
    loadData();
  };

  const togglePublished = async (proj: Project) => {
    await updateProject(proj._id, { published: !proj.published });
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display text-white">Manage Portfolio Projects</h2>
          <p className="text-xs text-warmNeutral-500">Create, edit, reorder or publish portfolio case studies.</p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-1.5" />
          <span>New Project</span>
        </Button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-warmNeutral-500">Loading projects...</div>
      ) : (
        <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-cream-200">
              <thead className="bg-charcoal-950 text-warmNeutral-500 uppercase tracking-wider font-semibold border-b border-charcoal-800">
                <tr>
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4">Published</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-800">
                {projects.map((proj) => (
                  <tr key={proj._id} className="hover:bg-charcoal-850/50 transition-colors">
                    <td className="py-3.5 px-4 flex items-center space-x-3">
                      <img
                        src={proj.coverImage}
                        alt={proj.title}
                        className="w-12 h-9 object-cover rounded-lg border border-charcoal-700"
                      />
                      <div>
                        <div className="font-bold text-white text-sm">{proj.title}</div>
                        <div className="text-[11px] text-warmNeutral-500">/{proj.slug}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">{proj.category}</td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleFeatured(proj)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          proj.featured
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'text-warmNeutral-600 border-charcoal-800 hover:text-white'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => togglePublished(proj)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center space-x-1 ${
                          proj.published
                            ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                            : 'bg-warmNeutral-800 text-warmNeutral-500 border border-charcoal-700'
                        }`}
                      >
                        {proj.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{proj.published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(proj)}
                        className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 transition-colors"
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj._id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-4">
              <h3 className="text-lg font-bold font-display text-white">
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-warmNeutral-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <label className="block text-xs font-semibold text-cream-200 mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-cream-200 mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cream-200 mb-1">Project Story / Challenge *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value, story: e.target.value })}
                  className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white resize-none"
                />
              </div>

              {/* Cover Image Upload / URL */}
              <div>
                <label className="block text-xs font-semibold text-cream-200 mb-1">Cover Image URL *</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    required
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="flex-1 bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white"
                  />
                  <label className="bg-charcoal-800 hover:bg-charcoal-700 text-white px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer flex items-center space-x-1">
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">Live URL</label>
                  <input
                    type="text"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 text-xs text-cream-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded bg-charcoal-950 border-charcoal-700 text-brandRed-500 focus:ring-0"
                  />
                  <span>Mark as Featured</span>
                </label>

                <label className="flex items-center space-x-2 text-xs text-cream-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded bg-charcoal-950 border-charcoal-700 text-brandRed-500 focus:ring-0"
                  />
                  <span>Published</span>
                </label>
              </div>

              <div className="pt-4 border-t border-charcoal-800 flex justify-end space-x-3">
                <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
