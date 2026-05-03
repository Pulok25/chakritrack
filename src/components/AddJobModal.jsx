import { useState } from 'react';

const STATUS_OPTIONS = ['applied', 'interview', 'offer', 'rejected'];

export default function AddJobModal({ onClose, onAdd }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    company: '',
    role: '',
    location: '',
    status: 'applied',
    dateApplied: new Date().toISOString().split('T')[0],
    notes: '',
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.company || !form.role) {
      setError('Company and Role are required.');
      return;
    }
    onAdd(form);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4">
      <div
        className="glass-card rounded-2xl w-full max-w-lg animate-scale-in border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div>
            <h2 className="text-lg font-bold text-white">Add New Job</h2>
            <p className="text-xs text-slate-500 mt-0.5">Track a new job application</p>
          </div>
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {/* Company */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Company <span className="text-red-400">*</span>
              </label>
              <input
                id="company-input"
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. Google"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 transition-all"
              />
            </div>

            {/* Role */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Role <span className="text-red-400">*</span>
              </label>
              <input
                id="role-input"
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="e.g. Frontend Engineer"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 transition-all"
              />
            </div>

            {/* Location */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Location</label>
              <input
                id="location-input"
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Remote / New York"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 transition-all"
              />
            </div>

            {/* Status */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Status</label>
              <select
                id="status-select"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full bg-[#1a1d2e] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white transition-all"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s} className="capitalize">
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Applied */}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Date Applied</label>
              <input
                id="date-input"
                type="date"
                name="dateApplied"
                value={form.dateApplied}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white transition-all [color-scheme:dark]"
              />
            </div>

            {/* Notes */}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Notes</label>
              <textarea
                id="notes-input"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Any notes about this application..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 transition-all resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              id="cancel-btn"
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 border border-white/10 hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              id="submit-job-btn"
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}