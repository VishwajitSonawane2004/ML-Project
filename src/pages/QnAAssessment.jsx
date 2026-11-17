import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  BrainCircuit,
  BookOpen,
  Send,
  Sparkles,
  AlertCircle,
  Database,
  Info,
  CheckCircle2,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { initialQuestions } from '../data/mockData';
import { childService } from '../services/childService';
import { qaService } from '../services/qaService';
import { questionService } from '../services/questionService';

export default function QnAAssessment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialChildId = searchParams.get('childId') || '';
  const initialQuestionId = searchParams.get('questionId') || '';

  const [children, setChildren] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(initialChildId);
  const [selectedQuestionId, setSelectedQuestionId] = useState(initialQuestionId || 'SEB-001');

  // Custom question mode
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [customDomain, setCustomDomain] = useState('Reading Comprehension');

  // Student answer
  const [studentAnswer, setStudentAnswer] = useState('');

  // Processing state
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      const [childList, qList] = await Promise.all([
        childService.getChildren(),
        questionService.getQuestions()
      ]);
      setChildren(childList);
      setQuestions(qList);

      if (!selectedChildId && childList.length > 0) {
        setSelectedChildId(childList[0].id);
      }
      if (!selectedQuestionId && qList.length > 0) {
        setSelectedQuestionId(qList[0].id);
      }
    }
    loadData();
  }, []);

  const activeQuestion = questions.find(q => q.id === selectedQuestionId);

  const handleSelectSample = (text) => {
    setStudentAnswer(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedChildId) {
      setError('Please select a student for comprehension assessment.');
      return;
    }
    if (isCustomMode && !customPrompt.trim()) {
      setError('Custom prompt cannot be empty.');
      return;
    }
    if (!studentAnswer.trim()) {
      setError("Child's answer cannot be empty.");
      return;
    }

    try {
      setIsEvaluating(true);

      const targetChild = children.find(c => c.id === selectedChildId);

      const result = await qaService.assess({
        childId: selectedChildId,
        childName: targetChild ? targetChild.name : 'Student',
        questionId: isCustomMode ? 'CUSTOM-Q' : activeQuestion?.id,
        questionText: isCustomMode ? customPrompt : activeQuestion?.prompt,
        studentAnswer: studentAnswer.trim(),
        domain: isCustomMode ? customDomain : activeQuestion?.domain,
        sourceDataset: isCustomMode ? 'Teacher Custom' : activeQuestion?.sourceDataset
      });

      // Save to sessionStorage for result page
      sessionStorage.setItem('current_qa_result', JSON.stringify(result));
      navigate(`/assess/qa/result?id=${result.assessmentId}`);
    } catch (err) {
      setError(err.message || 'Evaluation failed.');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full w-fit mb-2">
          <BrainCircuit size={13} />
          <span>Module 2: Q&A Reading Comprehension</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Q&A Comprehension Assessment
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Evaluate child's reading comprehension response using ML ensemble classifier trained on SciEntsBank and Beetle benchmark corpora.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
          <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Advisory Banner: ML Ensemble note */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-start gap-3">
        <ShieldAlert size={18} className="text-slate-500 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-slate-900">
            Machine Learning Ensemble Model Notice
          </p>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            The assessment engine employs a DeBERTa + calibrated Ridge classifier trained on educational scientific comprehension corpora. It is an automated scoring classifier, not a generative conversational LLM. Any ambiguous or low-confidence predictions automatically flag a teacher review recommendation.
          </p>
        </div>
      </div>

      {/* Main Assessment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Select Child */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center">
                1
              </span>
              <span>Select Child for Evaluation</span>
            </h3>
            <span className="text-xs text-slate-400">Target Student</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Enrolled Student
              </label>
              <select
                value={selectedChildId}
                onChange={(e) => setSelectedChildId(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-800 font-medium"
              >
                <option value="">-- Choose a Student --</option>
                {children.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.id}) - {c.grade}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
              {selectedChildId && (
                <>
                  <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
                    {children.find(c => c.id === selectedChildId)?.name.charAt(0) || 'S'}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">
                      {children.find(c => c.id === selectedChildId)?.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {children.find(c => c.id === selectedChildId)?.school} • {children.find(c => c.id === selectedChildId)?.grade}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Step 2: Question Selection */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center">
                2
              </span>
              <span>Question Bank Prompt</span>
            </h3>

            {/* Toggle Custom Question */}
            <button
              type="button"
              onClick={() => setIsCustomMode(!isCustomMode)}
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 transition-colors"
            >
              {isCustomMode ? '← Use Benchmark Dataset Question' : '+ Enter Custom Question Prompt'}
            </button>
          </div>

          {!isCustomMode ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Benchmark Question
                </label>
                <select
                  value={selectedQuestionId}
                  onChange={(e) => setSelectedQuestionId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-800 font-medium"
                >
                  {questions.map((q) => (
                    <option key={q.id} value={q.id}>
                      [{q.sourceDataset}] {q.domain} - {q.prompt.slice(0, 60)}...
                    </option>
                  ))}
                </select>
              </div>

              {/* Display Selected Question Card */}
              {activeQuestion && (
                <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      {activeQuestion.sourceDataset} ({activeQuestion.domain})
                    </span>
                    <span className="font-mono text-slate-500">{activeQuestion.code || activeQuestion.id}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 leading-relaxed">
                    {activeQuestion.prompt}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Domain / Subject Area
                </label>
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="e.g. Life Science, Narrative Comprehension"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Custom Question Prompt
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={3}
                  placeholder="Type the reading comprehension question..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-800 leading-relaxed"
                />
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Child's Answer */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center">
                3
              </span>
              <span>Child's Response / Answer</span>
            </h3>
            <span className="text-xs text-slate-400">Verbatim Student Text</span>
          </div>

          <div>
            <textarea
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              rows={4}
              placeholder="Enter child's transcribed or written response to the question..."
              required
              className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-800 leading-relaxed placeholder:text-slate-400"
            />
          </div>

          {/* Quick-fill sample answers for convenience */}
          {activeQuestion?.sampleAnswers && (
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-500 block mb-2">
                Quick Demonstration Answers (from benchmark dataset):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeQuestion.sampleAnswers.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(s.answer)}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                      s.label === 'Correct'
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 hover:bg-emerald-100/60'
                        : s.label === 'Partially Correct'
                        ? 'bg-amber-50/60 border-amber-200 text-amber-900 hover:bg-amber-100/60'
                        : 'bg-red-50/60 border-red-200 text-red-900 hover:bg-red-100/60'
                    }`}
                  >
                    <span className="font-bold text-[10px] uppercase block mb-1">
                      {s.label} Sample
                    </span>
                    <p className="line-clamp-2 text-[11px] opacity-90 leading-tight">
                      "{s.answer}"
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isEvaluating}
            className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isEvaluating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Running ML Ensemble Inference...</span>
              </>
            ) : (
              <>
                <Send size={15} />
                <span>Submit & Classify Response</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
