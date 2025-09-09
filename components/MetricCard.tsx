import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  variation?: string;
  icon?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'cyan' | 'yellow' | 'red' | 'indigo' | 'emerald';
}

const colorClasses = {
  blue: 'from-blue-900 to-blue-800 border-blue-700/30',
  green: 'from-indigo-900 to-indigo-800 border-indigo-700/30',
  purple: 'from-slate-900 to-slate-800 border-slate-700/30',
  orange: 'from-cyan-900 to-cyan-800 border-cyan-700/30',
  pink: 'from-blue-800 to-indigo-900 border-blue-600/30',
  cyan: 'from-indigo-800 to-blue-900 border-indigo-600/30',
  yellow: 'from-slate-800 to-blue-900 border-slate-600/30',
  red: 'from-cyan-800 to-slate-900 border-cyan-600/30',
  indigo: 'from-blue-950 to-indigo-900 border-blue-700/30',
  emerald: 'from-indigo-950 to-slate-900 border-indigo-700/30',
};

export default function MetricCard({ title, value, variation, icon, color = 'blue' }: MetricCardProps) {
  const isPositive = variation?.startsWith('+');
  const isNegative = variation?.startsWith('-');
  
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colorClasses[color]} p-6 shadow-xl border backdrop-blur-sm hover-lift hover:shadow-2xl group`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8 animate-pulse delay-300"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="text-white/90 text-sm font-semibold tracking-wide">{title}</div>
          {icon && (
            <div className="text-white/70 text-2xl group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          )}
        </div>
        
        <div className="text-3xl font-bold text-white mb-3 tracking-tight">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        
        {variation && (
          <div className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${
            isPositive ? 'text-green-100 bg-green-500/20' : 
            isNegative ? 'text-red-100 bg-red-500/20' : 
            'text-white/80 bg-white/10'
          }`}>
            {variation}
          </div>
        )}
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}