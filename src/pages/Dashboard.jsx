import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../hooks/useJobs';
import JobCard from '../component/JobCard';
import AddJobModal from '../component/AddJobModal';
import StatusBadge from '../component/StatusBadge';


const STATUSES = ['all', 'applied', 'interview', 'offer', 'rejected'];

const STAT_CARDS = [
  {
    key: 'applied',
    label: 'Applied',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    gradient: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/20',
    iconBg: 'bg-blue-500/20 text-blue-400',
    text: 'text-blue-400',
  },
  {
    key: 'interview',
    label: 'Interview',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    gradient: 'from-yellow-500/20 to-yellow-600/10',
    border: 'border-yellow-500/20',
    iconBg: 'bg-yellow-500/20 text-yellow-400',
    text: 'text-yellow-400',
  },
  {
    key: 'offer',
    label: 'Offer',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    gradient: 'from-green-500/20 to-green-600/10',
    border: 'border-green-500/20',
    iconBg: 'bg-green-500/20 text-green-400',
    text: 'text-green-400',
  },
  {
    key: 'rejected',
    label: 'Rejected',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-red-500/20 to-red-600/10',
    border: 'border-red-500/20',
    iconBg: 'bg-red-500/20 text-red-400',
    text: 'text-red-400',
  },
];

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { jobs, loading, addJob, updateJob, deleteJob } = useJobs();
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const counts = {
    applied: jobs.filter((j) => j.status === 'applied').length,
    interview: jobs.filter((j) => j.status === 'interview').length,
    offer: jobs.filter((j) => j.status === 'offer').length,
    rejected: jobs.filter((j) => j.status === 'rejected').length,
  };

  const filteredJobs = jobs.filter((job) => {
    const matchStatus = activeFilter === 'all' || job.status === activeFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      job.company?.toLowerCase().includes(q) ||
      job.role?.toLowerCase().includes(q) ||
      job.location?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const firstName = currentUser?.displayName?.split(' ')[0] || 'there';

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Hey, <span className="gradient-text">{firstName}</span> 👋
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            You have <span className="text-slate-300 font-medium">{jobs.length}</span> job application{jobs.length !== 1 ? 's' : ''} tracked
          </p>
        </div>
        <button
          id="add-job-btn"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary shadow-lg shadow-indigo-500/20 shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Job
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total card */}
        <div className="col-span-2 lg:col-span-1 glass-card rounded-2xl p-5 bg-gradient-to-br from-indigo-500/20 to-purple-600/10 border border-indigo-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="text-xs text-slate-500 font-medium">Total</span>
          </div>
          <p className="text-3xl font-bold text-white">{jobs.length}</p>
          <p className="text-xs text-slate-500 mt-1">Applications</p>
        </div>

        {STAT_CARDS.map((card) => (
          <div
            key={card.key}
            className={`glass-card rounded-2xl p-5 bg-gradient-to-br ${card.gradient} border ${card.border} cursor-pointer`}
            onClick={() => setActiveFilter(activeFilter === card.key ? 'all' : card.key)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                {card.icon}
              </div>
              <span className="text-xs text-slate-500 font-medium">{card.label}</span>
            </div>
            <p className={`text-3xl font-bold ${card.text}`}>{counts[card.key]}</p>
            <p className="text-xs text-slate-500 mt-1">Jobs</p>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company, role, or location..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 transition-all"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s}
              id={`filter-${s}`}
              onClick={() => setActiveFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                activeFilter === s
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {s === 'all' ? `All (${jobs.length})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${counts[s]})`}
            </button>
          ))}
        </div>
      </div>

      {/* Job Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-4">
            <svg className="animate-spin w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <p className="text-slate-500 text-sm">Loading your jobs...</p>
          </div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-slate-300 font-semibold mb-1">
            {search || activeFilter !== 'all' ? 'No jobs match your filters' : 'No jobs yet'}
          </h3>
          <p className="text-slate-600 text-sm mb-5">
            {search || activeFilter !== 'all'
              ? 'Try adjusting your search or filter'
              : 'Start tracking your job applications'}
          </p>
          {!search && activeFilter === 'all' && (
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white btn-primary"
            >
              Add Your First Job
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onUpdate={updateJob}
              onDelete={deleteJob}
            />
          ))}
        </div>
      )}

      {/* Add Job Modal */}
      {showModal && (
        <AddJobModal
          onClose={() => setShowModal(false)}
          onAdd={addJob}
        />
      )}
    </div>
  );
}
