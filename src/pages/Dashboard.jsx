import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  FileCheck,
  Mic,
  BrainCircuit,
  PlusCircle,
  Play,
  FileBarChart2,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import {
  dashboardMonthlyActivity,
  oralFluencyDistribution,
  qaComprehensionDistribution
} from '../data/mockData';
import { assessmentService } from '../services/assessmentService';
import { childService } from '../services/childService';

export default function Dashboard() {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [childrenCount, setChildrenCount] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [asmList, childList] = await Promise.all([
          assessmentService.getAssessments(),
          childService.getChildren()
        ]);
        setAssessments(asmList.slice(0, 5));
        setChildrenCount(childList.length);
      } catch (err) {
        console.error("Dashboard data error", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const recentColumns = [
    {
      header: 'Student',
      accessor: 'childName',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-xs">
            {row.childName ? row.childName.charAt(0) : 'S'}
          </div>
          <div>
            <span className="font-semibold text-slate-800 block">{row.childName}</span>
            <span className="text-[10px] text-slate-400">{row.grade}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Assessment Type',
      accessor: 'type',
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
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
      header: 'Primary Metrics',
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
      render: (row) => <span className="text-slate-500 font-mono text-[11px]">{row.date}</span>
    },
    {
      header: 'Evaluation Status',
      accessor: 'status',
      render: (row) => (
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            row.status === 'Review Required'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          {row.status}
        </span>
      )
    },
    {
      header: 'Action',
      align: 'right',
      render: (row) => (
        <Link
          to={`/history?search=${encodeURIComponent(row.childName)}`}
          className="text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors inline-flex items-center gap-1"
        >
          <span>Inspect</span>
          <ArrowRight size={12} />
        </Link>
      )
    }
  ];

  return (
    <div className="space-y-6 text-left">
      {/* College Project Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-brand-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-semibold text-brand-300 border border-white/10">
            <Sparkles size={12} className="text-brand-300" />
            <span>Dual-Module Reading Skills Profile Architecture</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Welcome to the Reading Assessment Platform
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Conduct standardized oral fluency acoustic analysis and semantic comprehension evaluation with SciEntsBank & Beetle ML benchmarks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 z-10 shrink-0">
          <button
            onClick={() => navigate('/assess/oral')}
            className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white text-xs font-semibold shadow-lg shadow-brand-500/30 transition-all flex items-center gap-2"
          >
            <Mic size={14} />
            <span>Oral Assessment</span>
          </button>
          <button
            onClick={() => navigate('/assess/qa')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-2"
          >
            <BrainCircuit size={14} />
            <span>Q&A Assessment</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Children"
          value={childrenCount}
          subtitle="Enrolled students across Grades 2-5"
          icon={Users}
          trend="up"
          trendValue="+12% this month"
          color="brand"
          onClick={() => navigate('/children')}
        />

        <StatCard
          title="Total Assessments"
          value="145"
          subtitle="Acoustic & comprehension sessions"
          icon={FileCheck}
          trend="up"
          trendValue="+24% activity"
          color="emerald"
          onClick={() => navigate('/history')}
        />

        <StatCard
          title="Oral Fluency Tests"
          value="64"
          subtitle="Acoustic WER & Estimated WPM runs"
          icon={Mic}
          trend="neutral"
          trendValue="Avg WER 7.9%"
          color="blue"
          onClick={() => navigate('/assess/oral')}
        />

        <StatCard
          title="Q&A Comprehension Tests"
          value="81"
          subtitle="ML Ensemble evaluations"
          icon={BrainCircuit}
          trend="up"
          trendValue="86% Pass rate"
          color="purple"
          onClick={() => navigate('/assess/qa')}
        />
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Quick Assessment Workflow</h3>
            <p className="text-xs text-slate-500">Jump directly into assessment sessions or student management</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            to="/children/add"
            className="group p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-brand-300 hover:shadow-md transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <PlusCircle size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
                Add New Child
              </p>
              <p className="text-[11px] text-slate-500">Register student for profiling</p>
            </div>
          </Link>

          <Link
            to="/assess/oral"
            className="group p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-brand-300 hover:shadow-md transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Mic size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
                Start Oral Reading
              </p>
              <p className="text-[11px] text-slate-500">Upload audio & analyze WER</p>
            </div>
          </Link>

          <Link
            to="/assess/qa"
            className="group p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-brand-300 hover:shadow-md transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <BrainCircuit size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
                Start Q&A Assessment
              </p>
              <p className="text-[11px] text-slate-500">ML classification grading</p>
            </div>
          </Link>

          <Link
            to="/reports"
            className="group p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-brand-300 hover:shadow-md transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileBarChart2 size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
                View Reports
              </p>
              <p className="text-[11px] text-slate-500">Export profiles & CSV</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Analytics Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Assessment Activity Over Time */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Assessment Trajectory Over Time</h3>
              <p className="text-xs text-slate-500">Monthly sessions partitioned by assessment module</p>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600">
              Jun - Nov 2026
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardMonthlyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="oralGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="qaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
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
                <Area
                  type="monotone"
                  dataKey="oralAssessments"
                  name="Oral Fluency"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#oralGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="qaAssessments"
                  name="Q&A Comprehension"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#qaGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-600 inline-block"></span>
              <span>Oral Reading Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block"></span>
              <span>Q&A Comprehension Evaluations</span>
            </div>
          </div>
        </div>

        {/* Reading Comprehension Classification Distribution */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Comprehension Classification</h3>
              <p className="text-xs text-slate-500">Distribution across ML ensemble classifications</p>
            </div>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
              SciEntsBank & Beetle
            </span>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qaComprehensionDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {qaComprehensionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name) => [`${val}% of responses`, name]}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100">
            <div className="p-2 rounded-xl bg-emerald-50">
              <span className="block text-xs font-bold text-emerald-800">68%</span>
              <span className="text-[10px] text-emerald-700 font-medium">Correct</span>
            </div>
            <div className="p-2 rounded-xl bg-amber-50">
              <span className="block text-xs font-bold text-amber-800">22%</span>
              <span className="text-[10px] text-amber-700 font-medium">Partial</span>
            </div>
            <div className="p-2 rounded-xl bg-red-50">
              <span className="block text-xs font-bold text-red-800">10%</span>
              <span className="text-[10px] text-red-700 font-medium">Incorrect</span>
            </div>
          </div>
        </div>
      </div>

      {/* Oral Reading Performance by Grade Chart */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Oral Reading Performance Overview by Grade</h3>
            <p className="text-xs text-slate-500">Average Estimated Words-Per-Minute vs Benchmark Norms</p>
          </div>
          <span className="text-xs text-slate-400">Model-Generated Indicators</span>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={oralFluencyDistribution} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="grade" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <Tooltip
                formatter={(val, name) => [`${val} WPM`, name]}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '11px'
                }}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="averageWpm" name="Cohort Average Est. WPM" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              <Bar dataKey="targetWpm" name="Grade Reference Target WPM" fill="#94a3b8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Assessment Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Recent Assessment Activity</h3>
            <p className="text-xs text-slate-500">Most recent diagnostic sessions conducted across school cohorts</p>
          </div>
          <Link
            to="/history"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View Full Assessment History</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <DataTable
          columns={recentColumns}
          data={assessments}
          loading={loading}
          pageSize={5}
          emptyMessage="No recent assessment activity found."
        />
      </div>
    </div>
  );
}
