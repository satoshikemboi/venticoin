
import React from 'react';

const ScalpConfigure = ({ onClose }) => {
  return (
    <div className="bg-white rounded-2xl p-6 w-full shadow-xl border border-slate-100">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Configure Bot</h2>
          <p className="text-sm text-slate-500 font-medium">
            BTC Micro Scalper – Scalping Trading Bot
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
            <select className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
              <option>BTC</option>
              <option>ETH</option>
              <option>SOL</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Investment</label>
            <input 
              type="number" 
              defaultValue="100"
              className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
            />
          </div>
        </div>

        {/* Row 2: Timeframe & Max Positions */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Timeframe</label>
            <select className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
              <option>1m</option>
              <option>3m</option>
              <option>5m</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Max Positions</label>
            <input 
              type="number" 
              defaultValue="3"
              className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
            />
          </div>
        </div>

        {/* Row 3: Take Profit & Stop Loss */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Take Profit (%)</label>
            <input 
              type="number" 
              step="0.1"
              defaultValue="0.5"
              className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Stop Loss (%)</label>
            <input 
              type="number" 
              step="0.1"
              defaultValue="0.3"
              className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
            />
          </div>
        </div>

        {/* Row 4: Indicators (Checkboxes) */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700 block">Indicators</label>
          <div className="grid grid-cols-2 gap-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-500" />
              <span className="text-sm font-semibold text-slate-700">MACD</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-500" />
              <span className="text-sm font-semibold text-slate-700">RSI</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-500" />
              <span className="text-sm font-semibold text-slate-700">Bollinger Bands</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-emerald-500" />
              <span className="text-sm font-semibold text-slate-700">Volume</span>
            </label>
          </div>
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

export default ScalpConfigure;