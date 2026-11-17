import React, { useState } from 'react';
import { BookOpen, Database, ChevronDown, ChevronUp, Sparkles, Check, AlertTriangle, X, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuestionCard({ question, onSelect, showActions = true }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const isSciEntsBank = question.sourceDataset === 'SciEntsBank';
  const isBeetle = question.sourceDataset === 'Beetle';
  const isTeacher = question.sourceDataset === 'Teacher Created';

  const badgeColor = isSciEntsBank
    ? 'bg-blue-50 text-blue-700 border-blue-200'
    : isBeetle
    ? 'bg-purple-50 text-purple-700 border-purple-200'
    : 'bg-emerald-50 text-emerald-700 border-emerald-200';

  const handleStartAssess = () => {
    if (onSelect) {
      onSelect(question);
    } else {
      navigate(`/assess/qa?questionId=${question.id}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all p-5 text-left">
      {/* Top Header Tags */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Dataset Tag */}
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badgeColor}`}>
            <Database size={11} />
            {question.sourceDataset}
          </span>

          {/* Domain & Topic */}
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
            {question.domain}
          </span>

          <span className="text-[11px] text-slate-400 font-mono">
            {question.code || question.id}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
            {question.gradeLevel}
          </span>
          {question.totalStudentResponses && (
            <span className="text-[11px] text-slate-400">
              {question.totalStudentResponses} benchmark responses
            </span>
          )}
        </div>
      </div>

      {/* Question Prompt */}
      <div className="py-4">
        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
          {question.prompt}
        </p>
      </div>

      {/* Sample Student Responses Accordion */}
      {question.sampleAnswers && question.sampleAnswers.length > 0 && (
        <div className="mt-1">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>{expanded ? 'Hide reference student responses' : 'View benchmark student responses'}</span>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {expanded && (
            <div className="mt-3 space-y-2 pt-2 border-t border-slate-100">
              {question.sampleAnswers.map((sample, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl text-xs border ${
                    sample.label === 'Correct'
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                      : sample.label === 'Partially Correct'
                      ? 'bg-amber-50/50 border-amber-200 text-amber-900'
                      : 'bg-red-50/50 border-red-200 text-red-900'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold mb-1">
                    <span className="flex items-center gap-1">
                      {sample.label === 'Correct' && <Check size={13} className="text-emerald-600" />}
                      {sample.label === 'Partially Correct' && <AlertTriangle size={13} className="text-amber-600" />}
                      {sample.label === 'Incorrect' && <X size={13} className="text-red-600" />}
                      {sample.label}
                    </span>
                    <span className="text-[10px] font-mono opacity-80">
                      Confidence: {Math.round(sample.confidence * 100)}%
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90 italic">
                    "{sample.answer}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Footer */}
      {showActions && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            {isTeacher ? 'Custom Teacher-Created Item' : 'Standardized Dataset Item'}
          </span>

          <button
            type="button"
            onClick={handleStartAssess}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold border border-brand-200 transition-colors"
          >
            <Play size={12} className="fill-brand-600 text-brand-600" />
            <span>Select for Q&A Assessment</span>
          </button>
        </div>
      )}
    </div>
  );
}
