import React, { useState, useEffect } from 'react';
import {
  FileBarChart2,
  Download,
  Printer,
  Calendar,
  Filter,
  CheckCircle2,
  Mic,
  BrainCircuit,
  Users,
  Sparkles,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import { initialChildren, oralFluencyDistribution, qaComprehensionDistribution } from '../data/mockData';
import { childService } from '../services/childService';
import { assessmentService } from '../services/assessmentService';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'childwise' | 'oral' | 'qa'
  const [children, setChildren] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReportData() {
      try {
        setLoading(true);
        const [cList, aList] = await Promise.all([
          childService.getChildren(),
          assessmentService.getAssessments()
        ]);
        setChildren(cList);
        setAssessments(aList);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchReportData();
  }, []);

  // CSV Export Generator
  const handleExportCSV = () => {
    const headers = [
      'Assessment ID',
      'Child ID',
      'Child Name',
      'Grade',
      'Assessment Type',
      'Date',
      'Outcome Metric 1',
      'Outcome Metric 2',
      'Status'
    ];

    const rows = assessments.map(a => [
      `"${a.id}"`,
      `"${a.childId}"`,
      `"${a.childName}"`,
      `"${a.grade}"`,
      `"${a.type}"`,
      `"${a.date}"`,
      `"${a.metric1}"`,
      `"${a.metric2}"`,
      `"${a.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Reading_Skills_Profiles_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const childWiseColumns = [
    {
      header: 'Child ID',
      accessor: 'id',
      width: '100px',
      render: (r) => <span className="font-mono text-xs">{r.id}</span>
    },
    {
      header: 'Student Name',
      accessor: 'name',
      render: (r) => <span className="font-bold text-slate-800">{r.name}</span>
    },
    {
      header: 'Grade',
      accessor: 'grade',
      render: (r) => <span className="text-xs font-semibold text-slate-600">{r.grade}</span>
    },
    {
      header: 'Oral Fluency Status',
      render: (r) => (
        r.oralReadingSummary ? (
          <span className="text-xs text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
            {r.oralReadingSummary.estimatedWpm} Est. WPM ({r.oralReadingSummary.wer}% WER)
          </span>
        ) : (
          <span className="text-xs text-slate-400">Not assessed</span>
        )
      )
    },
    {
      header: 'Comprehension Status',
      render: (r) => (
        r.comprehensionSummary ? (
          <span className="text-xs text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-full">
            {r.comprehensionSummary.accuracy}% Acc ({r.comprehensionSummary.totalAttempted} items)
          </span>
        ) : (
          <span className="text-xs text-slate-400">Not assessed</span>
        )
      )
    },
    {
      header: 'Overall Readiness',
      render: (r) => (
        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Profile Generated
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Top Header & Export Options */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Reading Skills Diagnostics & Institutional Reports
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Aggregated cohort statistics, longitudinal skill profiles, and CSV export utilities
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Download size={14} className="text-brand-600" />
            <span>Export to CSV</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer size={14} />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-200 no-print">
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2 text-xs font-bold transition-colors border-b-2 ${
            activeTab === 'summary'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Overview Summary
        </button>
        <button
          onClick={() => setActiveTab('childwise')}
          className={`px-4 py-2 text-xs font-bold transition-colors border-b-2 ${
            activeTab === 'childwise'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Child-Wise Profiles ({children.length})
        </button>
        <button
          onClick={() => setActiveTab('oral')}
          className={`px-4 py-2 text-xs font-bold transition-colors border-b-2 ${
            activeTab === 'oral'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Oral Fluency Diagnostics
        </button>
        <button
          onClick={() => setActiveTab('qa')}
          className={`px-4 py-2 text-xs font-bold transition-colors border-b-2 ${
            activeTab === 'qa'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Q&A Comprehension Analytics
        </button>
      </div>

      {/* Tab 1: Overview Summary */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <StatCard
              title="Students Enrolled"
              value={children.length}
              subtitle="Covering grades 2 through 5"
              icon={Users}
              color="brand"
            />
            <StatCard
              title="Evaluations Completed"
              value={assessments.length}
              subtitle="Dual-module sessions"
              icon={FileBarChart2}
              color="emerald"
            />
            <StatCard
              title="Oral Benchmark Pass"
              value="88.4%"
              subtitle="WER within grade targets"
              icon={Mic}
              color="blue"
            />
            <StatCard
              title="Comprehension Pass"
              value="86.2%"
              subtitle="Correct/Partial ML classifications"
              icon={BrainCircuit}
              color="purple"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Grade Oral Reading Trends */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-800">
                Grade-Level Estimated Oral Fluency Norms
              </h3>
              <p className="text-xs text-slate-500">
                Comparison of actual student cohort averages against grade-level reference targets
              </p>
              <div className="h-60 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={oralFluencyDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="grade" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
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
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="averageWpm" name="Actual Est. WPM" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="targetWpm" name="Benchmark Target WPM" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Comprehension Distribution */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-800">
                Comprehension ML Ensemble Evaluation Breakdown
              </h3>
              <p className="text-xs text-slate-500">
                Classification outcomes across SciEntsBank and Beetle questions
              </p>
              <div className="h-60 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={qaComprehensionDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                    >
                      {qaComprehensionDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderRadius: '12px',
                        border: 'none',
                        color: '#fff',
                        fontSize: '11px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Child-Wise Profiles Table */}
      {activeTab === 'childwise' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Individual Child Skill Summary Table</h3>
              <p className="text-xs text-slate-500">Summary across both independent reading dimensions</p>
            </div>
          </div>
          <DataTable
            columns={childWiseColumns}
            data={children}
            pageSize={10}
          />
        </div>
      )}

      {/* Tab 3: Oral Fluency Details */}
      {activeTab === 'oral' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800">
            Oral Reading Fluency Dimension Analytics
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            The Oral Reading Fluency module utilizes acoustic automatic speech recognition to estimate phonetic word decoding and rhythm. Students are evaluated on Word Error Rate (substitutions, insertions, deletions) and Estimated Words Per Minute.
          </p>
          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-xs text-blue-950">
            <span className="font-bold block mb-1">Standardized Advisory Note:</span>
            Estimated WPM represents algorithmic acoustic reading rate and does not substitute for clinically validated Words Correct Per Minute (WCPM).
          </div>
        </div>
      )}

      {/* Tab 4: Q&A Details */}
      {activeTab === 'qa' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800">
            Q&A Reading Comprehension Dimension Analytics
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Evaluated using machine learning ensemble classifiers calibrated on the 253 benchmark science items and 16,003 student answers from the SciEntsBank and Beetle datasets.
          </p>
          <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 text-xs text-purple-950">
            <span className="font-bold block mb-1">Teacher Review Safeguard:</span>
            When the posterior probability confidence falls below 0.78, the system flags a "Review Required" recommendation for human educator inspection.
          </div>
        </div>
      )}
    </div>
  );
}
