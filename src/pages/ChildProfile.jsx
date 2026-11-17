import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mic,
  BrainCircuit,
  Calendar,
  School,
  AlertCircle,
  Clock,
  Sparkles,
  TrendingUp,
  Award,
  ShieldAlert,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

import ResultCard from '../components/ResultCard';
import DataTable from '../components/DataTable';
import { childService } from '../services/childService';
import { assessmentService } from '../services/assessmentService';

export default function ChildProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [child, setChild] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Child-specific progression timeline
  const progressTimeline = [
    { session: 'Sep 20', estimatedWpm: 72, wer: 12.5, comprehensionAcc: 70 },
    { session: 'Oct 05', estimatedWpm: 80, wer: 10.2, comprehensionAcc: 75 },
    { session: 'Oct 22', estimatedWpm: 86, wer: 9.1, comprehensionAcc: 82 },
    { session: 'Nov 04', estimatedWpm: 92, wer: 8.5, comprehensionAcc: 85 },
    { session: 'Nov 12', estimatedWpm: 96, wer: 7.8, comprehensionAcc: 88 }
  ];

  useEffect(() => {
    async function fetchChildProfile() {
      try {
        setLoading(true);
        const [cData, aList] = await Promise.all([
          childService.getChildById(id),
          assessmentService.getAssessments({ childId: id })
        ]);
        setChild(cData);
        setAssessments(aList);
      } catch (err) {
        setError(err.message || 'Failed to load child profile.');
      } finally {
        setLoading(false);
      }
    }
    fetchChildProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-slate-500 font-medium">Loading child diagnostic profile...</p>
      </div>
    );
  }

  if (error || !child) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
          <AlertCircle size={24} />
        </div>
        <h3 className="text-base font-bold text-slate-900">Student Profile Not Found</h3>
        <p className="text-xs text-slate-500 mt-1">{error || 'Requested child identifier does not exist.'}</p>
        <Link
          to="/children"
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold"
        >
          <ArrowLeft size={14} />
          <span>Return to Children List</span>
        </Link>
      </div>
    );
  }

  const assessmentColumns = [
    {
      header: 'Assessment ID',
      accessor: 'id',
      width: '130px',
      render: (row) => <span className="font-mono text-slate-600 text-xs">{row.id}</span>
    },
    {
      header: 'Module Type',
      accessor: 'type',
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
            row.type === 'Oral Reading'
              ? 'bg-blue-50 text-blue-700 border border-blue-100'
              : 'bg-purple-50 text-purple-700 border border-purple-100'
          }`}
        >
          {row.type === 'Oral Reading' ? <Mic size={11} /> : <BrainCircuit size={11} />}
          {row.type}
        </span>
      )
    },
    {
      header: 'Item / Passage',
      render: (row) => (
        <span className="font-medium text-slate-800 text-xs">
          {row.passageTitle || row.questionCode || 'Standard Prompt'}
        </span>
      )
    },
    {
      header: 'Recorded Indicators',
      render: (row) => (
        <div className="text-xs">
          <span className="font-semibold text-slate-700">{row.metric1}</span>
          <span className="text-slate-400 mx-1.5">•</span>
          <span className="text-slate-500">{row.metric2}</span>
        </div>
      )
    },
    {
      header: 'Date & Time',
      accessor: 'date',
      render: (row) => <span className="font-mono text-slate-400 text-[11px]">{row.date}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            row.status === 'Review Required'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/children"
            className="p-2 rounded-xl bg-white border border-slate-200/80 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-200/80 text-slate-700">
                {child.id}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-brand-600">{child.grade}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              {child.name}
            </h2>
          </div>
        </div>

        {/* Assessment triggers */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate(`/assess/oral?childId=${child.id}`)}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Mic size={14} />
            <span>Conduct Oral Fluency</span>
          </button>

          <button
            onClick={() => navigate(`/assess/qa?childId=${child.id}`)}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <BrainCircuit size={14} />
            <span>Conduct Q&A Comprehension</span>
          </button>
        </div>
      </div>

      {/* Demographics Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            School / Campus
          </span>
          <span className="text-sm font-bold text-slate-800 block mt-1 flex items-center gap-1.5">
            <School size={15} className="text-slate-400" />
            {child.school}
          </span>
        </div>

        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Age & Gender
          </span>
          <span className="text-sm font-bold text-slate-800 block mt-1">
            {child.age} Years ({child.gender || 'Not specified'})
          </span>
        </div>

        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Enrollment Date
          </span>
          <span className="text-sm font-bold text-slate-800 block mt-1 font-mono text-xs">
            {child.dateAdded}
          </span>
        </div>

        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Profile Status
          </span>
          <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <UserCheck size={12} />
            Active Student
          </span>
        </div>
      </div>

      {/* Scientific Principle Notice: Separate Dimensions */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <ShieldAlert size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-amber-950">
            Independent Assessment Dimensions Protocol
          </p>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            Oral Reading Fluency (decoding, acoustic timing) and Q&A Reading Comprehension (semantic reasoning) are maintained as separate diagnostic dimensions. In accordance with reading science standards, they are not collapsed into an arbitrary single composite score.
          </p>
        </div>
      </div>

      {/* Two Independent Skill Dimension Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dimension 1: Oral Reading Fluency */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Mic size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Dimension 1: Oral Reading Fluency
                </h3>
                <p className="text-[11px] text-slate-400">Acoustic ASR and phonetic accuracy</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Last: {child.oralReadingSummary?.lastAssessed || 'Pending'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Estimated WPM"
              value={child.oralReadingSummary?.estimatedWpm || '92'}
              subvalue="WPM"
              status="info"
              helperText="Provisional acoustic pace (not WCPM)"
            />
            <ResultCard
              label="Word Error Rate"
              value={`${child.oralReadingSummary?.wer || '8.5'}%`}
              subvalue="WER"
              status="success"
              progress={child.oralReadingSummary?.accuracyRate || 91.5}
              helperText="Phonetic substitutions and omissions"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-800 block mb-0.5">Clinical Note:</span>
            Demonstrates strong word recognition on grade-level sight words. Hesitation observed on multisyllabic scientific terms.
          </div>
        </div>

        {/* Dimension 2: Reading Comprehension */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <BrainCircuit size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Dimension 2: Reading Comprehension
                </h3>
                <p className="text-[11px] text-slate-400">SciEntsBank & Beetle ML ensemble</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Last: {child.comprehensionSummary?.lastAssessed || 'Pending'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="ML Classification Accuracy"
              value={`${child.comprehensionSummary?.accuracy || '84.0'}%`}
              subvalue="Accuracy"
              status="success"
              progress={child.comprehensionSummary?.accuracy || 84.0}
              helperText="Across benchmark science questions"
            />
            <ResultCard
              label="Items Attempted"
              value={child.comprehensionSummary?.totalAttempted || '14'}
              subvalue="Questions"
              status="neutral"
              helperText={`${child.comprehensionSummary?.reviewPending || 0} flagged for teacher review`}
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-800 block mb-0.5">Comprehension Insight:</span>
            Accurate retrieval of explicitly stated causal facts; emerging capability in articulating scientific mechanisms.
          </div>
        </div>
      </div>

      {/* Progress Charts Over Time */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Longitudinal Reading Progress Trajectory</h3>
            <p className="text-xs text-slate-500">Comparing Oral Reading Fluency (Estimated WPM) and Comprehension Accuracy over successive sessions</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600">
            5 Diagnostic Sessions
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressTimeline} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="session" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '11px'
                }}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px' }} />
              <Line
                type="monotone"
                dataKey="estimatedWpm"
                name="Oral Fluency (Est. WPM)"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, fill: '#3b82f6' }}
              />
              <Line
                type="monotone"
                dataKey="comprehensionAcc"
                name="Comprehension Accuracy (%)"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 4, fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Previous Assessment Records Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800">
          Historical Assessment Records for {child.name}
        </h3>
        <DataTable
          columns={assessmentColumns}
          data={assessments}
          pageSize={5}
          emptyMessage={`No assessment logs currently recorded for ${child.name}. Start an assessment using the buttons above.`}
        />
      </div>
    </div>
  );
}
