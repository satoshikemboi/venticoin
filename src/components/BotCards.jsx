import React from 'react';

export const StatItem = ({ label, value, subValue, isPositive }) => (
  <div className="p-1">
    <div className="flex justify-between text-sm text-slate-400 pb-1">
      <span>{label}</span>
      <span className={isPositive ? "text-green-500 font-bold" : "text-slate-800 font-bold"}>{value}</span>
    </div>
    <div className="text-sm font-semibold text-gray-800">{subValue}</div>
  </div>
);

export const BotCard = ({ title, schedule, description, risk, performance, status, primaryAction, onConfigure }) => (
  <div className="border border-slate-200 rounded-xl p-5 bg-gray-100 shadow-sm flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all group">
    <div>
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-bold text-lg text-slate-800 group-hover:text-emerald-600 transition-colors">{title}</h3>
        <span className={`px-3 py-1 rounded text-xs font-bold ${status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
          {status}
        </span>
      </div>
      <p className="text-xs font-bold text-emerald-500 mb-3 uppercase tracking-tighter">{schedule}</p>
      <p className="text-sm font-semibold text-gray-800 mb-3 leading-relaxed">{description}</p>
    </div>
    <div>
      <div className="flex justify-between text-xs mb-4 border-t border-slate-50 pt-4">
        <span className="text-slate-400 font-semibold">Risk: <span className={risk === 'Low' ? 'text-green-500' : 'text-orange-500'}>{risk}</span></span>
        <span className="text-slate-400 font-semibold">Performance: <span className="text-green-500 font-bold">{performance}</span></span>
      </div>
      <div className="flex gap-3">
        <button onClick={onConfigure} className="flex-1 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition">
          Configure
        </button>
        <button className="flex-1 py-2 bg-emerald-500 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition shadow-sm">
          {primaryAction}
        </button>
      </div>
    </div>
  </div>
);


