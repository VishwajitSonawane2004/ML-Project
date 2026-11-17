import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { GraduationCap, Sparkles, CheckCircle2, BookOpen, Mic, BrainCircuit } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Side: Educational SaaS Presentation */}
        <div className="lg:col-span-5 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden text-left">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          {/* Logo & Platform Info */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight block">
                  ReadingSkills<span className="text-brand-400">.ai</span>
                </span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                  Child Profile Generation
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 text-brand-300 border border-navy-700 text-xs font-semibold">
                <Sparkles size={13} className="text-brand-400" />
                <span>College Project Prototype</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white leading-snug">
                Dual-Dimension Child Reading Assessment
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluating early literacy through independent acoustic oral reading fluency and semantic Q&A comprehension modules.
              </p>
            </div>
          </div>

          {/* Feature Pillars */}
          <div className="py-6 space-y-3 my-auto">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-navy-850/60 border border-navy-700/40">
              <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400 shrink-0 mt-0.5">
                <Mic size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Module 1: Oral Reading Fluency</p>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Word Error Rate (WER), Character Error Rate (CER), and estimated words-per-minute analysis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-navy-850/60 border border-navy-700/40">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                <BrainCircuit size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Module 2: Q&A Comprehension</p>
                <p className="text-[11px] text-slate-400 leading-tight">
                  ML Ensemble classifier on SciEntsBank and Beetle datasets with teacher review verification.
                </p>
              </div>
            </div>
          </div>

          {/* Scientific Disclaimer Footer */}
          <div className="pt-4 border-t border-navy-800 text-[11px] text-slate-400">
            <p>
              Designed for educators and reading specialists. Results provide provisional model-generated indicators.
            </p>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
