import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  History,
  Search,
  Filter,
  Mic,
  BrainCircuit,
  Eye,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calendar,
  X
} from 'lucide-react';
import DataTable from '../components/DataTable';
import { assessmentService } from '../services/assessmentService';

export default function AssessmentHistory() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  // Detail drawer / modal
  const [inspectTarget, setInspectTarget] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await assessmentService.getAssessments({
        search,
        type: typeFilter,
        status: statusFilter
      });
      setAssessments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, typeFilter, statusFilter]);

  const columns = [
    {
      header: 'Assessment ID',
      accessor: 'id',
      width: '140px',
      sortable: true,
      render: (row) => (
        <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
          {row.id}
        </span>
      )
    },
    {
      header: 'Student Name',
      accessor: 'childName',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
            {row.childName.charAt(0)}
          </div>
          <div>
            <span className="font-bold text-slate-800 block">{row.childName}</span>
            <span className="text-[10px] text-slate-400">{row.grade}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Assessment Type',
      accessor: 'type',
      width: '180px',
      sortable: true,
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
            row.type === 'Oral Reading'
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'bg-purple-50 text-purple-700 border border-purple-200'
          }`}
        >
          {row.type === 'Oral Reading' ? <Mic size={11} /> : <BrainCircuit size={11} />}
          {row.type}
        </span>
      )
    },
    {
      header: 'Recorded Outcomes',
      render: (row) => (
        <div className="text-xs">
          <span className="font-bold text-slate-800">{row.metric1}</span>
          <span className="text-slate-400 mx-1.5">•</span>
          <span className="text-slate-600">{row.metric2}</span>
        </div>
      )
    },
    {
      header: 'Timestamp',
      accessor: 'date',
      width: '160px',
      sortable: true,
      render: (row) => <span className="font-mono text-slate-500 text-[11px]">{row.date}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      width: '140px',
      sortable: true,
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            row.status === 'Review Required'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          {row.status === 'Review Required' ? <AlertTriangle size={11} /> : <CheckCircle2 size={11} />}
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      align: 'right',
      width: '100px',
      render: (row) => (
        <button
          onClick={() => setInspectTarget(row)}
          className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
          title="Inspect Record"
        >
          <Eye size={14} />
          <span>Inspect</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Assessment Evaluation History
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Comprehensive longitudinal audit trail of oral fluency and Q&A reading comprehension diagnostic runs
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name or assessment ID..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800 transition-all placeholder:text-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-700 font-medium cursor-pointer"
          >
            <option value="All Types">All Assessment Types</option>
            <option value="Oral Reading">Oral Reading Only</option>
            <option value="Q&A Assessment">Q&A Comprehension Only</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-700 font-medium cursor-pointer"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Review Required">Review Required</option>
          </select>
        </div>
      </div>

      {/* History Table */}
      <DataTable
        columns={columns}
        data={assessments}
        loading={loading}
        pageSize={8}
        emptyMessage="No historical assessment logs match your filter."
      />

      {/* Detail Inspection Modal */}
      {inspectTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 text-left animate-in fade-in-50 duration-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {inspectTarget.id}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {inspectTarget.childName} — {inspectTarget.type}
                </h3>
              </div>
              <button
                onClick={() => setInspectTarget(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                  Primary Outcome 1
                </span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                  {inspectTarget.metric1}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                  Primary Outcome 2
                </span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                  {inspectTarget.metric2}
                </span>
              </div>
            </div>

            <div className="text-xs space-y-2">
              <p className="text-slate-500">
                <span className="font-semibold text-slate-700">Target Item / Passage: </span>
                {inspectTarget.passageTitle || inspectTarget.questionCode || 'Standard Item'}
              </p>
              <p className="text-slate-500">
                <span className="font-semibold text-slate-700">Conducted Date: </span>
                {inspectTarget.date}
              </p>
            </div>

            {inspectTarget.summary && (
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold block text-slate-800 mb-1">Observation Summary:</span>
                {inspectTarget.summary}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  const targetChildId = inspectTarget.childId;
                  setInspectTarget(null);
                  navigate(`/children/${targetChildId}`);
                }}
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                Open Student Profile
              </button>

              <button
                type="button"
                onClick={() => setInspectTarget(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
