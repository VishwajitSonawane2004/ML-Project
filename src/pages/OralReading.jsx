import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Mic,
  FileText,
  Play,
  Sparkles,
  AlertCircle,
  BookOpen,
  Info,
  CheckCircle2,
  Clock,
  AudioWaveform
} from 'lucide-react';
import AudioUploader from '../components/AudioUploader';
import { sampleReadingPassages } from '../data/mockData';
import { childService } from '../services/childService';
import { oralReadingService } from '../services/oralReadingService';

export default function OralReading() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialChildId = searchParams.get('childId') || '';

  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(initialChildId);
  const [audioFile, setAudioFile] = useState(null);
  const [selectedPassageId, setSelectedPassageId] = useState('PSG-G3-02');
  const [expectedPassage, setExpectedPassage] = useState('');
  const [passageTitle, setPassageTitle] = useState('');

  // Assessment processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadInitial() {
      const list = await childService.getChildren();
      setChildren(list);
      if (!selectedChildId && list.length > 0) {
        setSelectedChildId(list[0].id);
      }
    }
    loadInitial();
  }, []);

  // Update expected passage when preset changes
  useEffect(() => {
    if (selectedPassageId === 'custom') {
      setExpectedPassage('');
      setPassageTitle('Custom Teacher Passage');
    } else {
      const preset = sampleReadingPassages.find(p => p.id === selectedPassageId);
      if (preset) {
        setExpectedPassage(preset.text);
        setPassageTitle(preset.title);
      }
    }
  }, [selectedPassageId]);

  const handleStartAssessment = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedChildId) {
      setError('Please select a student for assessment.');
      return;
    }
    if (!audioFile) {
      setError('Please upload or select an audio recording of the child reading.');
      return;
    }
    if (!expectedPassage.trim()) {
      setError('Expected reading passage cannot be empty.');
      return;
    }

    try {
      setIsProcessing(true);

      // Multi-stage realistic progress indicator
      setProcessingStage('Analyzing acoustic spectrum and phoneme boundaries...');
      await new Promise(r => setTimeout(r, 600));

      setProcessingStage('Performing acoustic speech-to-text decoding...');
      await new Promise(r => setTimeout(r, 700));

      setProcessingStage('Computing Levenshtein Word & Character Error alignments...');
      await new Promise(r => setTimeout(r, 600));

      const selectedChild = children.find(c => c.id === selectedChildId);

      const result = await oralReadingService.assess({
        childId: selectedChildId,
        childName: selectedChild ? selectedChild.name : 'Student',
        expectedPassage,
        audioFile,
        passageTitle
      });

      // Save result to sessionStorage for result page
      sessionStorage.setItem('current_oral_result', JSON.stringify(result));
      navigate(`/assess/oral/result?id=${result.assessmentId}`);
    } catch (err) {
      setError(err.message || 'Assessment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit mb-2">
          <Mic size={13} />
          <span>Module 1: Oral Reading Fluency</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Oral Reading Fluency Assessment
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Perform acoustic speech decoding to evaluate Word Error Rate (WER), Character Error Rate (CER), and estimated reading pace.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
          <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Assessment Form */}
      <form onSubmit={handleStartAssessment} className="space-y-6">
        {/* Step 1: Select Student */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                1
              </span>
              <span>Select Child for Assessment</span>
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
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800 font-medium"
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
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    {children.find(c => c.id === selectedChildId)?.name.charAt(0) || 'S'}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">
                      {children.find(c => c.id === selectedChildId)?.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {children.find(c => c.id === selectedChildId)?.school}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Step 2: Upload Audio Recording */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                2
              </span>
              <span>Upload Child's Audio Recording</span>
            </h3>
            <span className="text-xs text-slate-400">Acoustic Input</span>
          </div>

          <AudioUploader
            selectedFile={audioFile}
            onFileSelected={(file) => setAudioFile(file)}
            onRemoveFile={() => setAudioFile(null)}
          />
        </div>

        {/* Step 3: Expected Reading Passage */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                3
              </span>
              <span>Expected Reading Passage</span>
            </h3>
            <span className="text-xs text-slate-400">Reference Ground Truth</span>
          </div>

          {/* Preset Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Choose Preset Benchmark Passage or Enter Custom
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-3">
              {sampleReadingPassages.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPassageId(p.id)}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    selectedPassageId === p.id
                      ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20'
                      : 'bg-slate-50 border-slate-200 hover:bg-white'
                  }`}
                >
                  <span className="text-[10px] font-bold text-blue-700 uppercase block">{p.gradeLevel}</span>
                  <span className="text-xs font-semibold text-slate-800 block truncate">{p.title}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{p.wordCount} words</span>
                </button>
              ))}

              <button
                type="button"
                onClick={() => setSelectedPassageId('custom')}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  selectedPassageId === 'custom'
                    ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-white'
                }`}
              >
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Custom</span>
                <span className="text-xs font-semibold text-slate-800 block">Custom Passage</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Teacher typed</span>
              </button>
            </div>
          </div>

          {/* Text Area */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Ground Truth Passage Text
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {expectedPassage ? expectedPassage.trim().split(/\s+/).filter(Boolean).length : 0} words
              </span>
            </div>
            <textarea
              value={expectedPassage}
              onChange={(e) => setExpectedPassage(e.target.value)}
              rows={5}
              placeholder="Enter or paste the expected reading passage..."
              required
              className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800 leading-relaxed font-sans placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Scientific Disclaimer Note */}
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-start gap-2.5">
          <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <span className="font-semibold text-slate-700">Assessment Advisory:</span> Model-generated indicators provide estimated Words Per Minute (WPM), Word Error Rate (WER), and character alignments. They are intended as diagnostic screening aids and do not replace teacher-administered Words Correct Per Minute (WCPM) evaluations.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing Acoustic Analysis...</span>
              </>
            ) : (
              <>
                <Play size={15} className="fill-white" />
                <span>Execute Oral Fluency Assessment</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Progressive Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-4 animate-in fade-in-50 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
              <Mic size={32} className="animate-pulse" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Acoustic Analysis in Progress
              </h3>
              <p className="text-xs text-blue-600 font-medium mt-1 animate-pulse">
                {processingStage}
              </p>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full w-2/3 animate-[pulse_1s_ease-in-out_infinite]" />
            </div>

            <p className="text-[11px] text-slate-400">
              Aligning speech acoustic phonemes with reference ground truth passage tokens.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
