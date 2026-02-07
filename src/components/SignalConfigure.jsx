
import React from 'react';

const SignalConfigure = ({ onClose }) => {
  return (
    <div className="bg-white rounded-2xl p-6 w-full shadow-xl border border-slate-100">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Configure Bot</h2>
          <p className="text-sm text-slate-500 font-medium">
            Pattern Recognition – Signal Trading Bot
          </p>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <span className="text-2xl">&times;</span>
        </button>
      </div>

      <div className="space-y-5 mt-6">
        {/* Row 1: Asset & Investment */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Asset</label>
            <select className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
              <option>BTC</option>
              <option>ETH</option>
              <option>SOL</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Investment</label>
            <input 
              type="number" 
              defaultValue="250"
              className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
            />
          </div>
        </div>

        {/* Row 2: Timeframe & Signal Type */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Timeframe</label>
            <select className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
              <option>15m</option>
              <option>1h</option>
              <option>4h</option>
              <option>1d</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Signal Type</label>
            <select className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
              <option>Moving Average Crossover</option>
              <option>RSI Divergence</option>
              <option>MACD Histogram</option>
              <option>Custom Webhook</option>
            </select>
          </div>
        </div>

        {/* Row 3: RSI Period & Overbought Level */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">RSI Period</label>
            <input 
              type="number" 
              defaultValue="14"
              className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Overbought Level</label>
            <input 
              type="number" 
              defaultValue="70"
              className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
            />
          </div>
        </div>

        {/* Trend Filter Toggle */}
        <div className="flex items-center gap-2 pt-2">
          <input 
            type="checkbox" 
            id="trendFilter"
            defaultChecked 
            className="w-4 h-4 accent-emerald-500 cursor-pointer" 
          />
          <label htmlFor="trendFilter" className="text-sm font-semibold text-slate-700 cursor-pointer">
            Apply trend filter
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition active:scale-95"
          >
            Cancel
          </button>
          <button 
            className="flex-1 py-2.5 bg-emerald-400 text-white rounded-lg text-sm font-bold hover:bg-emerald-500 transition shadow-sm active:scale-95"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignalConfigure;