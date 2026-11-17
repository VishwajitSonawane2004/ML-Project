import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = 'brand',
  onClick
}) {
  const colorMap = {
    brand: {
      bg: 'bg-brand-50',
      text: 'text-brand-600',
      border: 'border-brand-100',
      badge: 'bg-brand-50 text-brand-700'
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      badge: 'bg-emerald-50 text-emerald-700'
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
      badge: 'bg-amber-50 text-amber-700'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-100',
      badge: 'bg-purple-50 text-purple-700'
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      badge: 'bg-blue-50 text-blue-700'
    }
  };

  const scheme = colorMap[color] || colorMap.brand;

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 text-left ${
        onClick ? 'cursor-pointer hover:border-brand-200' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${scheme.bg} ${scheme.text}`}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </span>

        {trendValue && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
              trend === 'up'
                ? 'bg-emerald-50 text-emerald-700'
                : trend === 'down'
                ? 'bg-red-50 text-red-700'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {trend === 'up' && <ArrowUpRight size={13} />}
            {trend === 'down' && <ArrowDownRight size={13} />}
            {trend === 'neutral' && <Minus size={13} />}
            {trendValue}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-slate-500 leading-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
