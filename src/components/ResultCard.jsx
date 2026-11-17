import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

export default function ResultCard({
  label,
  value,
  subvalue,
  status = 'neutral', // 'success', 'warning', 'danger', 'info', 'neutral'
  icon: Icon,
  progress,
  helperText
}) {
  const statusStyles = {
    success: {
      bg: 'bg-emerald-50/60',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      pill: 'bg-emerald-100 text-emerald-800',
      bar: 'bg-emerald-500'
    },
    warning: {
      bg: 'bg-amber-50/60',
      border: 'border-amber-200',
      text: 'text-amber-700',
      pill: 'bg-amber-100 text-amber-800',
      bar: 'bg-amber-500'
    },
    danger: {
      bg: 'bg-red-50/60',
      border: 'border-red-200',
      text: 'text-red-700',
      pill: 'bg-red-100 text-red-800',
      bar: 'bg-red-500'
    },
    info: {
      bg: 'bg-blue-50/60',
      border: 'border-blue-200',
      text: 'text-blue-700',
      pill: 'bg-blue-100 text-blue-800',
      bar: 'bg-blue-500'
    },
    neutral: {
      bg: 'bg-white',
      border: 'border-slate-200',
      text: 'text-slate-800',
      pill: 'bg-slate-100 text-slate-700',
      bar: 'bg-brand-600'
    }
  };

  const current = statusStyles[status] || statusStyles.neutral;

  return (
    <div className={`p-4 rounded-2xl border ${current.border} ${current.bg} shadow-sm text-left transition-all`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        {Icon ? (
          <Icon size={16} className={current.text} />
        ) : status === 'success' ? (
          <CheckCircle2 size={16} className="text-emerald-600" />
        ) : status === 'warning' ? (
          <AlertTriangle size={16} className="text-amber-600" />
        ) : status === 'danger' ? (
          <XCircle size={16} className="text-red-600" />
        ) : null}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </span>
        {subvalue && (
          <span className="text-xs font-medium text-slate-500">
            {subvalue}
          </span>
        )}
      </div>

      {typeof progress === 'number' && (
        <div className="w-full bg-slate-200/80 rounded-full h-1.5 mt-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${current.bar}`}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}

      {helperText && (
        <p className="mt-2 text-[11px] text-slate-500 leading-tight">
          {helperText}
        </p>
      )}
    </div>
  );
}
