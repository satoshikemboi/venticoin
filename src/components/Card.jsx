import React from 'react';
import { CreditCard, AlertCircle } from 'lucide-react';

export default function Card() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen font-nunito">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Card Deposit</h2>
        <p className="text-slate-500 text-sm mt-1">Card payments are temporarily unavailable</p>
      </div>

      <div className="flex flex-col gap-5">
        
        {/* Card Number Input (Disabled) */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800 text-start text-sm">Card Number</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <CreditCard size={18} />
            </span>
            <input 
              disabled
              type="text" 
              placeholder="4111 1111 1111 1111"
              className="w-full pl-12 pr-4 py-2 border border-emerald-100 rounded-lg bg-slate-50 cursor-not-allowed placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* Expiry and CVC Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-800 text-start text-sm">Expiry Date</label>
            <input 
              disabled
              type="text" 
              placeholder="MM/YY"
              className="w-full px-4 py-2 border border-emerald-100 rounded-lg bg-slate-50 cursor-not-allowed placeholder:text-slate-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-gray-800 text-start text-sm">CVC</label>
            <input 
              disabled
              type="text" 
              placeholder="123"
              className="w-full px-4 py-2 border border-emerald-100 rounded-lg bg-slate-50 cursor-not-allowed placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* Amount Input */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800 text-start text-sm">Amount (USD)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-bold">$</span>
            <input 
              disabled
              type="number" 
              placeholder="100"
              className="w-full pl-10 pr-4 py-2 border border-emerald-100 rounded-lg bg-slate-50 cursor-not-allowed font-semibold text-slate-400"
            />
          </div>
        </div>

        {/* Error/Unavailable Box */}
        <div className="bg-red-50 border border-red-100 rounded-lg p-5 mt-2">
          <div className="flex gap-3">
            <AlertCircle className="text-red-500 shrink-0" size={18} />
            <div className="flex flex-col gap-1">
              <h4 className="text-red-800 font-bold text-sm">Card Payments Unavailable</h4>
              <p className="text-red-700 text-xs leading-relaxed font-medium">
                Card payment functionality is currently disabled. 
                Please use cryptocurrency or mobile payment options instead.
              </p>
            </div>
          </div>
        </div>

        {/* Disabled Button */}
        <button 
          disabled
          className="w-full py-2 mt-2 bg-slate-300 text-slate-500 font-bold rounded-lg cursor-not-allowed transition-colors"
        >
          Payment Unavailable
        </button>

      </div>
    </div>
  );
}