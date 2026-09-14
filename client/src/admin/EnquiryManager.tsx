import React, { useState, useEffect } from 'react';
import { fetchEnquiries, updateEnquiryStatus, deleteEnquiry } from '../services/api';
import { EnquiryItem } from '../types';
import { Search, Trash2, Mail, Phone, Calendar } from 'lucide-react';

export const EnquiryManager: React.FC = () => {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);

  const statuses = ['All', 'New', 'Contacted', 'In Progress', 'Completed', 'Archived'];

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchEnquiries(statusFilter === 'All' ? undefined : statusFilter, search || undefined);
      setEnquiries(res.data.enquiries || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, search]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateEnquiryStatus(id, newStatus);
      loadData();
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this enquiry record?')) {
      await deleteEnquiry(id);
      if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
      loadData();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-brandRed-500/20 text-brandRed-500 border-brandRed-500/40';
      case 'Contacted':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      case 'Completed':
        return 'bg-green-500/20 text-green-400 border-green-500/40';
      default:
        return 'bg-warmNeutral-800 text-warmNeutral-500 border-charcoal-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-display text-white">Lead Enquiries</h2>
          <p className="text-xs text-warmNeutral-500">Track and manage client project submissions.</p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-warmNeutral-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search leads by name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-charcoal-900 border border-charcoal-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-warmNeutral-500 focus:outline-none focus:border-brandRed-500"
          />
        </div>
      </div>

      {/* Filter Badges */}
      <div className="flex flex-wrap gap-2">
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              statusFilter === st
                ? 'bg-brandRed-500 text-white shadow-md'
                : 'bg-charcoal-900 text-warmNeutral-400 border border-charcoal-800 hover:text-white'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Enquiries List Table */}
        <div className="lg:col-span-7 bg-charcoal-900 border border-charcoal-800 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-12 text-center text-xs text-warmNeutral-500">Loading enquiries...</div>
          ) : enquiries.length === 0 ? (
            <div className="py-12 text-center text-xs text-warmNeutral-500">No enquiries found.</div>
          ) : (
            <div className="divide-y divide-charcoal-800">
              {enquiries.map((enq) => (
                <div
                  key={enq._id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                    selectedEnquiry?._id === enq._id ? 'bg-charcoal-800' : 'hover:bg-charcoal-850/60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{enq.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(enq.status)}`}>
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-xs text-warmNeutral-400">{enq.service} • Budget: {enq.budget}</p>
                    <p className="text-[11px] text-warmNeutral-500">{new Date(enq.createdAt).toLocaleDateString()}</p>
                  </div>

                  <select
                    value={enq.status}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleStatusChange(enq._id, e.target.value);
                    }}
                    className="bg-charcoal-950 border border-charcoal-700 text-xs text-cream-200 rounded-lg px-2 py-1 focus:outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Enquiry Detail Panel */}
        <div className="lg:col-span-5 bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 space-y-6">
          {selectedEnquiry ? (
            <>
              <div className="flex items-center justify-between border-b border-charcoal-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold font-display text-white">{selectedEnquiry.name}</h3>
                  <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(selectedEnquiry.status)}`}>
                    {selectedEnquiry.status}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(selectedEnquiry._id)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                  title="Delete Enquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-warmNeutral-300">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-brandRed-500" />
                  <a href={`mailto:${selectedEnquiry.email}`} className="hover:text-white underline">
                    {selectedEnquiry.email}
                  </a>
                </div>
                {selectedEnquiry.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-brandRed-500" />
                    <span>{selectedEnquiry.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-brandRed-500" />
                  <span>Submitted: {new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-charcoal-950 border border-charcoal-800 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-warmNeutral-500">Service Required:</span>
                  <span className="font-semibold text-white">{selectedEnquiry.service}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-warmNeutral-500">Budget Range:</span>
                  <span className="font-semibold text-white">{selectedEnquiry.budget}</span>
                </div>
                {selectedEnquiry.businessName && (
                  <div className="flex justify-between text-xs">
                    <span className="text-warmNeutral-500">Business Name:</span>
                    <span className="font-semibold text-white">{selectedEnquiry.businessName}</span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-cream-200">Message / Requirements:</h4>
                <p className="text-xs text-warmNeutral-300 leading-relaxed bg-charcoal-950 p-4 rounded-xl border border-charcoal-800 whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </p>
              </div>
            </>
          ) : (
            <div className="py-20 text-center text-xs text-warmNeutral-500">
              Select an enquiry from the list to view complete project details.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
