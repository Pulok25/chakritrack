import { useState } from 'react';
import StatusBadge from './StatusBadge';

const STATUS_OPTIONS = ['applied', 'interview', 'offer', 'rejected'];

export default function JobCard({ job, onUpdate, onDelete }) {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  async function handleStatusChange(e) {
    setUpdating(true);
    try {
      await onUpdate(job.id, { status: e.target.value });
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Remove this job application?')) return;
    setDeleting(true);
    try {
      await onDelete(job.id);
    } finally {
      setDeleting(false);
    }
  }

  const dateDisplay = job.dateApplied
    ? new Date(job.dateApplied).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

  return (
    <div className={`glass-card rounded-2xl p-5 animate-fade-in ${deleting ? 'opacity-50' : ''}`}>
      {/* Top Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {/* Company Logo Placeholder */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-600/30 border border-white/10 flex items-center justify-center text-xs font-bold text-indigo-300 shrink-0">
              {job.company?.charAt(0).toUpperCase() || '?'}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-white text-sm truncate">{job.role}</h3>
              <p className="text-xs text-slate-400 truncate">{job.company}</p>
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {job.location && (
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {dateDisplay}
        </span>
      </div>

      {/* Status + Notes */}
      <div className="flex items-center gap-2">
        {/* Status Dropdown */}
        <div className="relative flex-1">
          <select
            value={job.status}
            onChange={handleStatusChange}
            disabled={updating}
            className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white pr-7 transition-all cursor-pointer hover:border-indigo-500/30"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s} className="bg-[#1a1d2e] capitalize">
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            {updating ? (
              <svg className="animate-spin w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
        </div>

        <StatusBadge status={job.status} />

        {/* Notes toggle */}
        {job.notes && (
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
            title="Toggle notes"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        )}
      </div>

      {/* Notes Expandable */}
      {showNotes && job.notes && (
        <div className="mt-3 p-3 bg-white/3 rounded-xl border border-white/5 animate-fade-in">
          <p className="text-xs text-slate-400 leading-relaxed">{job.notes}</p>
        </div>
      )}
    </div>
  );
}
