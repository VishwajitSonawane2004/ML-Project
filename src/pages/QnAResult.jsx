import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Printer,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  BrainCircuit,
  HelpCircle,
  Check,
  UserCheck,
  Ban,
  Activity
} from 'lucide-react';
import ResultCard from '../components/ResultCard';

export default function QnAResult() {
  const [searchParams] = useSearchParams();
  const assessmentId = searchParams.get('id');
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [teacherStatus, setTeacherStatus] = useState(null); // 'approved' | 'overridden'
  const [overrideClass, setOverrideClass] = useState('');
  const [teacherNotes, setTeacherNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('current_qa_result');
    if (raw) {
      try {
        setResult(JSON.parse(raw));
        return;
      } catch (e) {
        console.warn(e);
      }
    }

    // Default demonstration result
    setResult({
      assessmentId: assessmentId || 'ASM-QA-DEMO-02',
      childId: 'CHD-102',
      childName: 'Maya Patel',
      assessmentType: 'Q&A Reading Comprehension',
      date: new Date().toLocaleString(),
      questionId: 'SEB-001',
      questionText:
        'You put an ice cube on a plate in a warm room. After two hours, what happened to the ice cube, and why did this change occur?',
      sourceDataset: 'SciEntsBank',
      domain: 'Physical Science',
      studentAnswer:
        'The ice cube melted into liquid water because heat energy from the warm room transferred to the ice.',
      classification: 'Correct',
      confidence: 0.93,
      probabilities: {
        correct: 0.93,
        partial: 0.05,
        incorrect: 0.02
      },
      reviewRequired: false,
      modelArchitecture: 'ML Ensemble (DeBERTa-v3-base + Calibrated Ridge Classifier)',
      modelNotice:
        'Provisional ML ensemble score benchmarked on SemEval-2013 Task 7 (SciEntsBank & Beetle). Safe rejection filters flag out-of-domain, contradictory, or partial responses for human teacher verification.',
      modelInsights: [
        'FULL CONCEPT MATCH: Accurately identified physical phase change (ice melting to liquid water).',
        'CAUSAL MECHANISM MATCH: Accurately articulated thermal heat transfer / energy absorption from warm surroundings.'
      ],
      summary:
        'Demonstrated complete conceptual comprehension of physical phase change and thermal heat transfer.'
    });
  }, [assessmentId]);

  if (!result) return null;

  const isCorrect = result.classification === 'Correct';
  const isPartial = result.classification === 'Partially Correct' || result.classification === 'Partial';
  const isIncorrect = result.classification === 'Incorrect';

  const classificationColor = isCorrect
    ? 'bg-emerald-500'
    : isPartial
    ? 'bg-amber-500'
    : 'bg-red-500';

  const classificationBg = isCorrect
    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
    : isPartial
    ? 'bg-amber-50 border-amber-200 text-amber-950'
    : 'bg-red-50 border-red-200 text-red-950';

  const probs = result.probabilities || {
    correct: isCorrect ? result.confidence : 0.05,
    partial: isPartial ? result.confidence : 0.15,
    incorrect: isIncorrect ? result.confidence : 0.05
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      {/* Top Header */}
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
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                {result.assessmentId}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-500">{result.date}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              Q&A Comprehension Analysis: {result.childName}
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
            to="/assess/qa"
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <RotateCcw size={14} />
            <span>New Assessment</span>
          </Link>
        </div>
      </div>

      {/* Out-of-Domain / Rejection Banner */}
      {result.rejectionReason && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-300 text-red-950 text-xs flex items-start gap-3 shadow-sm">
          <Ban size={20} className="text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-red-950">
              Safe Rejection Protocol Triggered: {result.rejectionReason}
            </p>
            <p className="text-[11px] text-red-900 leading-relaxed">
              The submitted response has been evaluated against question concept semantics and ground truth SciEntsBank reference answers. Because it fails topical relevance or contradicts physical facts, it was rejected from receiving Partial or Correct credit.
            </p>
          </div>
        </div>
      )}

      {/* Review Required Warning Banner */}
      {result.reviewRequired ? (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-3 shadow-sm">
          <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-amber-950">
              Teacher Review Required (Flagged by ML Safeguard Protocol)
            </p>
            <p className="text-[11px] text-amber-900 leading-relaxed">
              {result.rejectionReason
                ? `Response was flagged as '${result.rejectionReason}'. Human educator verification is required before finalizing progress records.`
                : 'Partial classification or classifier uncertainty requires human educator verification to confirm partial credit alignment with grade rubrics.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 text-xs flex items-start gap-3 shadow-sm">
          <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold text-emerald-950">
              Definitive Classification ({Math.round(result.confidence * 100)}% Confidence)
            </p>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Target concept facets match reference ground truth in SciEntsBank dataset benchmarks.
            </p>
          </div>
        </div>
      )}

      {/* Key Metric Indicator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Classification */}
        <div className={`p-5 rounded-2xl border ${classificationBg} shadow-sm text-left`}>
          <span className="text-xs font-semibold uppercase tracking-wider block mb-2 opacity-80">
            Predicted Classification
          </span>
          <div className="flex items-center gap-2.5">
            <span className={`w-3.5 h-3.5 rounded-full ${classificationColor}`} />
            <span className="text-xl font-black tracking-tight">
              {result.classification}
            </span>
          </div>
          <span className="text-[11px] opacity-80 block mt-2">
            {result.rejectionReason || 'Evaluated via multi-aspect semantic pipeline'}
          </span>
        </div>

        {/* Confidence */}
        <ResultCard
          label="Model Confidence Score"
          value={result.confidence}
          subvalue={`${Math.round(result.confidence * 100)}%`}
          status={result.confidence > 0.85 ? 'success' : result.confidence > 0.7 ? 'warning' : 'danger'}
          progress={result.confidence * 100}
          helperText="Max posterior class probability"
        />

        {/* Review Status */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Verification Protocol
          </span>
          <div className="flex items-center gap-2">
            {result.reviewRequired ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                <AlertTriangle size={13} />
                <span>Review Required</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                <Check size={13} />
                <span>Standard Confidence</span>
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 block mt-2">
            Corpus: {result.sourceDataset} ({result.domain})
          </span>
        </div>
      </div>

      {/* Class Probability Distribution Breakdown (Requirement 5) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Activity size={16} className="text-brand-600" />
            <span>Calibrated Class Probability Distribution</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-400">Softmax Normalized (Σ = 1.0)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* P(Correct) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                P(Correct)
              </span>
              <span className="font-mono text-xs font-bold text-slate-800 shrink-0">
                {(probs.correct * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.round(probs.correct * 100)}%` }}
              />
            </div>
          </div>

          {/* P(Partial) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-amber-700 flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                P(Partial)
              </span>
              <span className="font-mono text-xs font-bold text-slate-800 shrink-0">
                {(probs.partial * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.round(probs.partial * 100)}%` }}
              />
            </div>
          </div>

          {/* P(Incorrect) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-red-700 flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                P(Incorrect)
              </span>
              <span className="font-mono text-xs font-bold text-slate-800 shrink-0">
                {(probs.incorrect * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.round(probs.incorrect * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question and Answer Comparison Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
              {result.domain} • {result.sourceDataset}
            </span>
            <h3 className="text-sm font-bold text-slate-800 mt-2">
              Question Prompt:
            </h3>
            <p className="text-xs font-medium text-slate-700 mt-1">
              {result.questionText}
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Child's Verbatim Answer
          </span>
          <p className="text-xs font-medium text-slate-900 leading-relaxed font-mono bg-white p-3 rounded-xl border border-slate-200/80">
            "{result.studentAnswer}"
          </p>
        </div>
      </div>

      {/* Model Architecture & Semantic Diagnostic Cues */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <BrainCircuit size={16} className="text-purple-600" />
            <span>ML Model Architecture & Diagnostic Cues</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            {result.modelArchitecture}
          </span>
        </div>

        {/* Model Insights List */}
        {result.modelInsights && result.modelInsights.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 block">
              Automated Semantic Reasoning Observations:
            </span>
            {result.modelInsights.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0 mt-1.5" />
                <p className="leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        )}

        <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 text-[11px] text-purple-900 leading-relaxed">
          <span className="font-bold">System Notice:</span> {result.modelNotice}
        </div>
      </div>

      {/* Human-in-the-Loop Educator Validation Gate */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <UserCheck size={16} className="text-brand-600" />
            <span>Human-in-the-Loop Educator Validation</span>
          </h3>
          <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
            Selective Scoring Gating
          </span>
        </div>

        {isSaved ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center gap-3">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">Assessment Verified by Educator</p>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Status finalized as: <span className="font-bold">{overrideClass || result.classification}</span>. 
                {teacherNotes && ` Note: "${teacherNotes}"`}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              As part of our <span className="font-semibold text-slate-900">Selective Scoring Policy</span>, predictions requiring human review must be confirmed by the teacher before finalizing the student's Reading Skills Profile.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setTeacherStatus('approved');
                  setOverrideClass(result.classification);
                  setIsSaved(true);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Check size={14} />
                <span>Confirm AI Grade ({result.classification})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTeacherStatus('overridden');
                  setOverrideClass('Partially Correct');
                }}
                className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                  overrideClass === 'Partially Correct'
                    ? 'bg-amber-100 border-amber-400 text-amber-900'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Override: Partially Correct
              </button>

              <button
                type="button"
                onClick={() => {
                  setTeacherStatus('overridden');
                  setOverrideClass('Correct');
                }}
                className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                  overrideClass === 'Correct'
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Override: Correct
              </button>

              <button
                type="button"
                onClick={() => {
                  setTeacherStatus('overridden');
                  setOverrideClass('Incorrect');
                }}
                className={`px-4 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                  overrideClass === 'Incorrect'
                    ? 'bg-red-100 border-red-400 text-red-900'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Override: Incorrect
              </button>
            </div>

            {teacherStatus === 'overridden' && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-semibold text-slate-700 block">
                  Educator Override Justification:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={teacherNotes}
                    onChange={(e) => setTeacherNotes(e.target.value)}
                    placeholder="e.g., Student understood phase change but used vernacular language..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSaved(true)}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
                  >
                    Save Final Review
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Sparkles size={16} className="text-brand-600" />
          <span>Comprehension Skill Summary</span>
        </h3>
        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {result.summary}
        </p>

        <div className="flex items-center justify-between pt-2 text-xs">
          <span className="text-slate-400">
            Profile dimension: Q&A Reading Comprehension
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
