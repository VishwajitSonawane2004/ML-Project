import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Database,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  FileText
} from 'lucide-react';
import QuestionCard from '../components/QuestionCard';
import StatCard from '../components/StatCard';
import { questionService } from '../services/questionService';

export default function QuestionBank() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [datasetFilter, setDatasetFilter] = useState('All Datasets');
  const [domainFilter, setDomainFilter] = useState('All Domains');

  // Add Question Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    prompt: '',
    domain: 'Life Science',
    topic: 'Organisms and Environments',
    gradeLevel: 'Grade 3-4',
    sampleAnswer: ''
  });
  const [savingQuestion, setSavingQuestion] = useState(false);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await questionService.getQuestions({
        search,
        dataset: datasetFilter,
        domain: domainFilter
      });
      setQuestions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [search, datasetFilter, domainFilter]);

  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.prompt.trim()) return;

    try {
      setSavingQuestion(true);
      await questionService.createQuestion(newQuestion);
      setShowAddModal(false);
      setNewQuestion({
        prompt: '',
        domain: 'Life Science',
        topic: 'Organisms and Environments',
        gradeLevel: 'Grade 3-4',
        sampleAnswer: ''
      });
      loadQuestions();
    } catch (err) {
      alert("Failed to create question: " + err.message);
    } finally {
      setSavingQuestion(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Benchmark Question Bank
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Standardized scientific comprehension assessment items from SciEntsBank & Beetle corpora
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-xs font-semibold shadow-md shadow-purple-600/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus size={15} />
          <span>Add Custom Teacher Question</span>
        </button>
      </div>

      {/* Dataset Statistics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard
          title="Benchmark Corpus Items"
          value="253"
          subtitle="Standardized scientific prompts"
          icon={Database}
          color="purple"
        />
        <StatCard
          title="Benchmark Student Answers"
          value="16,003"
          subtitle="Reference student responses"
          icon={Layers}
          color="brand"
        />
        <StatCard
          title="SciEntsBank Items"
          value="197"
          subtitle="Physical, Earth, Life Sciences"
          icon={BookOpen}
          color="blue"
        />
        <StatCard
          title="Beetle Corpus Items"
          value="56"
          subtitle="Electrical circuits & reasoning"
          icon={Sparkles}
          color="emerald"
        />
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions by concept (e.g. 'circuit', 'heat', 'photosynthesis')..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-800 transition-all placeholder:text-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <select
            value={datasetFilter}
            onChange={(e) => setDatasetFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-700 font-medium cursor-pointer"
          >
            <option value="All Datasets">All Datasets (SciEntsBank, Beetle, Teacher)</option>
            <option value="SciEntsBank">SciEntsBank Dataset</option>
            <option value="Beetle">Beetle Dataset</option>
            <option value="Teacher Created">Teacher Created</option>
          </select>

          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-700 font-medium cursor-pointer"
          >
            <option value="All Domains">All Domains</option>
            <option value="Physical Science">Physical Science</option>
            <option value="Earth Science">Earth Science</option>
            <option value="Life Science">Life Science</option>
            <option value="Electrical Circuits">Electrical Circuits</option>
            <option value="Reading Comprehension">Reading Comprehension</option>
          </select>
        </div>
      </div>

      {/* Questions Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Querying question corpora...</p>
        </div>
      ) : questions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
          <BookOpen className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5] mb-2" />
          <p className="text-sm font-semibold text-slate-700">No questions matched your search criteria.</p>
          <p className="text-xs text-slate-400 mt-1">Try switching dataset or clearing search filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      )}

      {/* Add Custom Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 text-left animate-in fade-in-50 duration-200">
            <h3 className="text-base font-bold text-slate-900">
              Create Custom Teacher Question
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Add a custom reading comprehension prompt for your school or class.
            </p>

            <form onSubmit={handleCreateQuestion} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Question Prompt Text *
                </label>
                <textarea
                  value={newQuestion.prompt}
                  onChange={(e) => setNewQuestion({ ...newQuestion, prompt: e.target.value })}
                  rows={3}
                  required
                  placeholder="e.g. Why did the characters in the story decide to build a wooden shelter before nightfall?"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-800 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject / Domain
                  </label>
                  <select
                    value={newQuestion.domain}
                    onChange={(e) => setNewQuestion({ ...newQuestion, domain: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-800"
                  >
                    <option value="Reading Comprehension">Reading Comprehension</option>
                    <option value="Life Science">Life Science</option>
                    <option value="Physical Science">Physical Science</option>
                    <option value="Earth Science">Earth Science</option>
                    <option value="Literature & Narrative">Literature & Narrative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Grade Level
                  </label>
                  <select
                    value={newQuestion.gradeLevel}
                    onChange={(e) => setNewQuestion({ ...newQuestion, gradeLevel: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-800"
                  >
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 3-4">Grade 3-4</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Exemplar Reference Answer (Optional)
                </label>
                <textarea
                  value={newQuestion.sampleAnswer}
                  onChange={(e) => setNewQuestion({ ...newQuestion, sampleAnswer: e.target.value })}
                  rows={2}
                  placeholder="Provide a benchmark correct answer to guide future semantic comparisons..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-800 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingQuestion}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors shadow-sm disabled:opacity-50"
                >
                  {savingQuestion ? 'Saving Question...' : 'Add Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
