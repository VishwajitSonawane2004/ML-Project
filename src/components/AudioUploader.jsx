import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileAudio,
  Play,
  Pause,
  Trash2,
  RefreshCw,
  AlertCircle,
  Volume2,
  CheckCircle2
} from 'lucide-react';

export default function AudioUploader({ onFileSelected, selectedFile, onRemoveFile }) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);

  const allowedFormats = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/m4a', 'audio/ogg', 'audio/x-m4a'];
  const maxSizeBytes = 25 * 1024 * 1024; // 25 MB

  const validateAndSetFile = (file) => {
    setError('');
    if (!file) return;

    // Check size
    if (file.size > maxSizeBytes) {
      setError(`Audio file size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds maximum limit of 25MB.`);
      return;
    }

    // Check format
    const isAudioType = file.type.startsWith('audio/') || allowedFormats.includes(file.type) || 
      file.name.match(/\.(wav|mp3|m4a|ogg|aac)$/i);

    if (!isAudioType) {
      setError('Unsupported audio format. Please upload a standard WAV, MP3, M4A, or OGG file.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setAudioUrl(objectUrl);
    if (onFileSelected) onFileSelected(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setAudioUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onRemoveFile) onRemoveFile();
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Audio playback issue:", err);
      });
    }
  };

  // Helper to load demonstration audio recording
  const handleLoadDemoAudio = () => {
    // Generate a dummy audio blob or simulate sample
    const sampleBlob = new Blob(['RIFF....WAVEfmt ....data....'], { type: 'audio/wav' });
    const sampleFile = new File([sampleBlob], 'sample_student_reading_g3.wav', { type: 'audio/wav' });
    validateAndSetFile(sampleFile);
  };

  return (
    <div className="w-full text-left">
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,.wav,.mp3,.m4a,.ogg"
        className="hidden"
        onChange={handleChange}
      />

      {error && (
        <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {!selectedFile ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? 'border-brand-500 bg-brand-50/50 scale-[1.005]'
              : 'border-slate-300 hover:border-brand-400 hover:bg-slate-50/60 bg-white'
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-inner">
              <UploadCloud size={24} />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-800">
                Click to upload or drag & drop child's audio recording
              </p>
              <p className="text-xs text-slate-400">
                Supported formats: WAV, MP3, M4A, OGG (Maximum file size: 25 MB)
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <span className="px-3 py-1 bg-slate-100 rounded-lg text-slate-600 text-xs font-medium">
                Select Audio File
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLoadDemoAudio();
                }}
                className="px-3 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-lg text-xs font-medium border border-brand-200 transition-colors"
              >
                Use Sample Demo Audio
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
                <FileAudio size={20} />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-800 truncate">{selectedFile.name}</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span>{(selectedFile.size / 1024).toFixed(1)} KB</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 size={12} /> Audio validated
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-500 hover:text-brand-600 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-slate-200"
                title="Replace Audio"
              >
                <RefreshCw size={15} />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-xl transition-colors border border-transparent hover:border-slate-200"
                title="Remove Audio"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          {/* Audio Preview Player */}
          <div className="bg-white rounded-xl p-3 border border-slate-200/80 flex items-center gap-3">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="w-9 h-9 rounded-full bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center shrink-0 shadow-sm transition-colors"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>

            {/* Simulated Acoustic Waveform Preview */}
            <div className="flex-1 flex items-center gap-1 h-8 overflow-hidden px-2">
              {[40, 65, 30, 85, 95, 60, 45, 75, 90, 100, 70, 50, 80, 60, 35, 70, 90, 50, 40, 65, 80, 95, 60, 30, 70, 85, 45, 60, 75, 40].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isPlaying ? 'bg-brand-500 animate-pulse' : 'bg-slate-300'
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <div className="flex items-center gap-1 text-slate-400 text-xs shrink-0">
              <Volume2 size={15} />
              <span className="font-mono text-[11px]">Ready</span>
            </div>

            {audioUrl && (
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
