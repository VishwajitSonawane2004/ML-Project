import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Share2,
  Mic,
  ShieldAlert,
  FileText,
  RotateCcw,
  Sparkles,
  BarChart2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

import ResultCard from '../components/ResultCard';

export default function OralReadingResult() {
  const [searchParams] = useSearchParams();
  const assessmentId = searchParams.get('id');
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  useEffect(() => {
    // Attempt reading from session storage
    const raw = sessionStorage.getItem('current_oral_result');
    if (raw) {
      try {
        setResult(JSON.parse(raw));
        return;
      } catch (e) {
        console.warn(e);
      }
    }

    // Fallback demonstration result if directly navigated
    setResult({
      assessmentId: assessmentId || 'ASM-OR-DEMO-01',
      childId: 'CHD-101',
      childName: 'Aarav Sharma',
      assessmentType: 'Oral Reading Fluency',
      date: new Date().toLocaleString(),
      passageTitle: 'The Journey of a Water Drop',
      expectedPassage:
        'A tiny drop of water named Pip rested on a green lily pad. As the warm morning sun climbed higher into the sky, Pip began to evaporate into invisible water vapor. High up in the atmosphere, chilly breezes gathered millions of vapor drops together to form a fluffy white cloud. Soon, the cloud turned dark and heavy. Pip transformed into gentle rain and fell softly back to the sparkling lake.',
      recognizedTranscript:
        'A tiny drop of water named Pip rested on a green lily pad. As the warm morning sun climbed higher into the sky, Pip began to evaporate into invisible water vapor. High up in the atmosphere, chilly breezes gathered millions of vapor drops together to form a fluffy white cloud. Soon, the cloud turned dark and heavy. Pip transformed into gentle rain and fell softly back to the sparkling lake.',
      totalExpectedWords: 67,
      correctWords: 63,
      substitutions: 2,
      insertions: 1,
      deletions: 1,
      wordErrorRate: 6.0,
      characterErrorRate: 2.7,
      estimatedWpm: 94,
      estimatedMiscueRate: 6.0,
      audioDurationSec: 42,
      wordAlignments: [
        { word: 'A', recognized: 'A', status: 'correct' },
        { word: 'tiny', recognized: 'tiny', status: 'correct' },
        { word: 'drop', recognized: 'drop', status: 'correct' },
        { word: 'of', recognized: 'of', status: 'correct' },
        { word: 'water', recognized: 'water', status: 'correct' },
        { word: 'named', recognized: 'names', status: 'substitution', label: 'Substitution (names)' },
        { word: 'Pip', recognized: 'Pip', status: 'correct' },
        { word: 'rested', recognized: 'rested', status: 'correct' },
        { word: 'on', recognized: 'on', status: 'correct' },
        { word: 'a', recognized: 'a', status: 'correct' },
        { word: 'green', recognized: 'green', status: 'correct' },
        { word: 'lily', recognized: 'lily', status: 'correct' },
        { word: 'pad.', recognized: '— (omitted)', status: 'deletion', label: 'Omission' },
        { word: 'As', recognized: 'As', status: 'correct' },
        { word: 'the', recognized: 'the', status: 'correct' },
        { word: 'warm', recognized: 'warm', status: 'correct' },
        { word: 'morning', recognized: 'morning', status: 'correct' },
        { word: 'sun', recognized: 'sun', status: 'correct' },
        { word: 'climbed', recognized: 'climbed', status: 'correct' },
        { word: 'higher', recognized: 'higher', status: 'correct' },
        { word: 'into', recognized: 'into', status: 'correct' },
        { word: 'the', recognized: 'the', status: 'correct' },
        { word: 'sky,', recognized: 'sky,', status: 'correct' },
        { word: 'Pip', recognized: 'Pip', status: 'correct' },
        { word: 'began', recognized: 'began', status: 'correct' },
        { word: 'to', recognized: 'to', status: 'correct' },
        { word: 'evaporate', recognized: 'evaporate', status: 'correct' },
        { word: 'into', recognized: 'into', status: 'correct' },
        { word: 'invisible', recognized: 'invisible', status: 'correct' },
        { word: 'water', recognized: 'water', status: 'correct' },
        { word: 'vapor.', recognized: 'vapor.', status: 'correct' }
      ],
      modelNotice:
        'Provisional model-generated indicators. Estimated WPM is not standardized Words Correct Per Minute (WCPM). Human teacher evaluation is advised for definitive diagnostic decisions.',
      summary:
        'Strong phonetic decoding with natural rhythmic pacing. Subtle miscue detected on word-final inflection (-ed replaced with -s).'
    });
  }, [assessmentId]);

  if (!result) return null;

  const errorBreakdownData = [
    { name: 'Accurate Words', count: result.correctWords, color: '#10b981' },
    { name: 'Substitutions', count: result.substitutions, color: '#f59e0b' },
    { name: 'Omissions (Deletions)', count: result.deletions, color: '#ef4444' },
    { name: 'Insertions', count: result.insertions, color: '#6366f1' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          <Link
            to={`/children/${result.childId}`}
            className="p-2 rounded-xl bg-white border border-slate-200/80 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {result.assessmentId}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-500">{result.date}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              Oral Fluency Analysis: {result.childName}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Printer size={14} />
            <span>Print Report</span>
          </button>

          <Link
            to="/assess/oral"
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <RotateCcw size={14} />
            <span>New Assessment</span>
          </Link>
        </div>
      </div>

      {/* Mandatory Scientific Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 shadow-sm">
        <ShieldAlert size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-950">
            Important Educational Measurement Disclaimer
          </p>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            {result.modelNotice} Estimated Words Per Minute (Est. WPM: {result.estimatedWpm}) reflects an algorithmic acoustic speech-rate proxy and does NOT represent standardized, certified Words Correct Per Minute (WCPM).
          </p>
        </div>
      </div>

      {/* Key Metric Indicator Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <ResultCard
          label="Word Error Rate (WER)"
          value={`${result.wordErrorRate}%`}
          status={result.wordErrorRate < 10 ? 'success' : result.wordErrorRate < 20 ? 'warning' : 'danger'}
          progress={100 - result.wordErrorRate}
          helperText="Total miscue density"
        />

        <ResultCard
          label="Estimated WPM"
          value={result.estimatedWpm}
          subvalue="WPM"
          status="info"
          helperText="Acoustic reading tempo"
        />

        <ResultCard
          label="Character Error Rate"
          value={`${result.characterErrorRate}%`}
          status="neutral"
          helperText="Phonetic edit distance"
        />

        <ResultCard
          label="Estimated Miscue Rate"
          value={`${result.estimatedMiscueRate}%`}
          status={result.estimatedMiscueRate < 10 ? 'success' : 'warning'}
          helperText="Word substitutions & omissions"
        />
      </div>

      {/* Word-by-Word Alignment Diff Visualizer */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Word-by-Word Transcript Alignment
            </h3>
            <p className="text-xs text-slate-500">
              Color-coded comparison of ground truth passage against acoustic recognition
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium">
            <span className="flex items-center gap-1 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              Accurate
            </span>
            <span className="flex items-center gap-1 text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              Substitution
            </span>
            <span className="flex items-center gap-1 text-red-700">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              Omission
            </span>
          </div>
        </div>

        {/* Highlighted Word Stream */}
        <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 leading-loose text-sm font-medium flex flex-wrap gap-2">
          {result.wordAlignments ? (
            result.wordAlignments.map((item, idx) => (
              <span
                key={idx}
                title={item.label || item.status}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  item.status === 'substitution'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold'
                    : item.status === 'deletion'
                    ? 'bg-red-100 text-red-900 border border-red-300 line-through font-semibold'
                    : 'text-slate-800 hover:bg-slate-200/70'
                }`}
              >
                {item.word}
              </span>
            ))
          ) : (
            <span>{result.recognizedTranscript}</span>
          )}
        </div>

        {/* Side by side full passages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Ground Truth Passage
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              {result.expectedPassage}
            </p>
          </div>

          <div className="p-4 bg-blue-50/40 rounded-2xl border border-blue-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
              Recognized Acoustic Transcript
            </span>
            <p className="text-xs text-slate-800 leading-relaxed font-mono">
              {result.recognizedTranscript}
            </p>
          </div>
        </div>
      </div>

      {/* Miscue Classification Breakdown Chart */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Miscue Distribution Breakdown
            </h3>
            <p className="text-xs text-slate-500">
              Categorical distribution of accurate words versus acoustic errors
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {result.totalExpectedWords} Total Passage Tokens
          </span>
        </div>

        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={errorBreakdownData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '11px'
                }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {errorBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Assessment Summary & Recommendations */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Sparkles size={16} className="text-brand-600" />
          <span>Diagnostic Assessment Summary</span>
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {result.summary}
        </p>

        <div className="flex items-center justify-between pt-2 text-xs">
          <span className="text-slate-400">
            Recorded in session logs for longitudinal skill profiling
          </span>
          <Link
            to={`/children/${result.childId}`}
            className="font-bold text-brand-600 hover:underline"
          >
            View Student Reading Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}
