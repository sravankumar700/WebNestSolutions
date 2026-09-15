import React, { useState, useEffect, useMemo } from 'react';
import { fetchEnquiries, updateEnquiryStatus, deleteEnquiry, fetchSiteSettings } from '../services/api';
import { EnquiryItem, SiteSettingsData } from '../types';
import { Search, Trash2, Mail, Phone, Calendar, Download, UserRound, ClipboardList, ArrowUpDown } from 'lucide-react';

export const EnquiryManager: React.FC = () => {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'status'>('newest');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [assignedToInput, setAssignedToInput] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [salesPeople, setSalesPeople] = useState<string[]>([
    'Aisha Kumar',
    'Rohan Verma',
    'Priya Nair',
    'Dev Shah',
  ]);

  const statuses = ['All', 'New', 'Contacted', 'In Progress', 'Completed', 'Archived'];

  useEffect(() => {
    const loadSalesPeople = async () => {
      try {
        const res = await fetchSiteSettings();
        const list = res.data.settings?.salesPeople || [];
        if (list.length) setSalesPeople(list);
      } catch (err) {
        console.warn('Sales team list unavailable; using default names.', err);
      }
    };
    loadSalesPeople();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchEnquiries(statusFilter === 'All' ? undefined : statusFilter, search || undefined);
      const items = res.data.enquiries || [];
      setEnquiries(items);
      if (selectedEnquiry) {
        const freshSelected = items.find((item) => item._id === selectedEnquiry._id) || null;
        setSelectedEnquiry(freshSelected);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, search]);

  const sortedEnquiries = useMemo(() => {
    const items = [...enquiries];
    if (sortBy === 'oldest') {
      return items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
    if (sortBy === 'status') {
      const statusOrder = ['New', 'Contacted', 'In Progress', 'Completed', 'Archived'];
      return items.sort((a, b) => {
        const aIndex = statusOrder.indexOf(a.status || 'New');
        const bIndex = statusOrder.indexOf(b.status || 'New');
        if (aIndex === bIndex) return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return aIndex - bIndex;
      });
    }
    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [enquiries, sortBy]);

  useEffect(() => {
    if (selectedEnquiry) {
      setAssignedToInput(selectedEnquiry.assignedTo || '');
      setNotesInput(selectedEnquiry.notes || '');
    }
  }, [selectedEnquiry]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateEnquiryStatus(id, { status: newStatus });
      loadData();
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleSaveDetails = async () => {
    if (!selectedEnquiry) return;
    try {
      await updateEnquiryStatus(selectedEnquiry._id, {
        assignedTo: assignedToInput,
        notes: notesInput,
      });
      loadData();
    } catch (err) {
      alert('Failed to save CRM details.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this enquiry record?')) {
      await deleteEnquiry(id);
      if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
      loadData();
    }
  };

  const exportCsv = () => {
    if (!sortedEnquiries.length) return;

    const rows = [
      ['Name', 'Email', 'Phone', 'Business', 'Service', 'Budget', 'Status', 'Assigned To', 'Source', 'Created At', 'Notes', 'Message'],
      ...sortedEnquiries.map((item) => [
        item.name,
        item.email,
        item.phone || '',
        item.businessName || '',
        item.service || '',
        item.budget || '',
        item.status,
        item.assignedTo || '',
        item.source || 'Website Form',
        new Date(item.createdAt).toISOString(),
        (item.notes || '').replace(/\n/g, ' '),
        (item.message || '').replace(/\n/g, ' '),
      ]),
    ];

    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'webnest-enquiries.csv';
    link.click();
    URL.revokeObjectURL(url);
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
          <h2 className="text-xl font-bold font-display text-white">Lead CRM</h2>
          <p className="text-xs text-warmNeutral-500">Track client submissions, assign owners, and manage follow-up notes.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-white text-xs px-3 py-2 rounded-xl border border-charcoal-700"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <div className="relative">
            <Search className="w-4 h-4 text-warmNeutral-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-charcoal-900 border border-charcoal-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-warmNeutral-500 focus:outline-none focus:border-brandRed-500"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
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

        <button
          onClick={() => setSortBy((prev) => prev === 'newest' ? 'oldest' : 'newest')}
          className="ml-auto inline-flex items-center gap-2 bg-charcoal-900 border border-charcoal-800 text-warmNeutral-300 hover:text-white px-2.5 py-1.5 rounded-lg text-[11px]"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          {sortBy === 'newest' ? 'Newest first' : 'Oldest first'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-charcoal-900 border border-charcoal-800 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-12 text-center text-xs text-warmNeutral-500">Loading enquiries...</div>
          ) : sortedEnquiries.length === 0 ? (
            <div className="py-12 text-center text-xs text-warmNeutral-500">No enquiries found.</div>
          ) : (
            <div className="divide-y divide-charcoal-800">
              {sortedEnquiries.map((enq) => (
                <div
                  key={enq._id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                    selectedEnquiry?._id === enq._id ? 'bg-charcoal-800' : 'hover:bg-charcoal-850/60'
                  }`}
                >
                  <div className="space-y-1 min-w-0 pr-4">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <span className="font-bold text-white text-sm">{enq.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusBadge(enq.status)}`}>
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-xs text-warmNeutral-400 truncate">{enq.service || 'General Enquiry'} • Budget: {enq.budget || 'Undisclosed'}</p>
                    <p className="text-[11px] text-warmNeutral-500">{enq.assignedTo ? `Assigned: ${enq.assignedTo}` : 'Unassigned'} • {new Date(enq.createdAt).toLocaleDateString()}</p>
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
                  <span className="text-warmNeutral-500">Service:</span>
                  <span className="font-semibold text-white">{selectedEnquiry.service || 'General Enquiry'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-warmNeutral-500">Budget:</span>
                  <span className="font-semibold text-white">{selectedEnquiry.budget || 'Undisclosed'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-warmNeutral-500">Source:</span>
                  <span className="font-semibold text-white">{selectedEnquiry.source || 'Website Form'}</span>
                </div>
                {selectedEnquiry.businessName && (
                  <div className="flex justify-between text-xs">
                    <span className="text-warmNeutral-500">Business:</span>
                    <span className="font-semibold text-white">{selectedEnquiry.businessName}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-semibold text-cream-200">
                    <UserRound className="w-3.5 h-3.5 text-brandRed-500" />
                    Assigned To
                  </label>
                  <select
                    value={assignedToInput}
                    onChange={(e) => setAssignedToInput(e.target.value)}
                    className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-xs text-white focus:border-brandRed-500 focus:outline-none"
                  >
                    <option value="">Unassigned</option>
                    {salesPeople.map((person) => (
                      <option key={person} value={person}>{person}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-semibold text-cream-200">
                    <ClipboardList className="w-3.5 h-3.5 text-brandRed-500" />
                    CRM Notes
                  </label>
                  <textarea
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    rows={5}
                    placeholder="Add call notes, follow-up actions, or sales remarks..."
                    className="w-full bg-charcoal-950 border border-charcoal-700 rounded-lg px-3 py-2 text-xs text-white focus:border-brandRed-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  onClick={handleSaveDetails}
                  className="w-full bg-brandRed-500 hover:bg-brandRed-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                >
                  Save CRM Details
                </button>
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
