import React, { useState } from 'react';
import { Phone, DollarSign, Info } from 'lucide-react';

export default function Mpesa() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('17');

  return (
    <div className="max-w-md mx-auto p-6 min-h-screen font-nunito">
      <div className="flex flex-col gap-6">
        
        {/* Phone Number Input */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800 text-start text-sm">Phone Number</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <Phone size={18} />
            </span>
            <input 
              type="text" 
              placeholder="e.g. 254712345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none bg-white shadow-sm placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 text-[11px] ml-1">
            <Info size={12} />
            <span>Use format 254XXXXXXXXX (Kenya)</span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800 text-start text-sm">Amount (USD)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold">$</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none bg-white shadow-sm font-semibold text-gray-700"
            />
          </div>
        </div>

        {/* Transaction Information Card */}
        <div className="bg-white rounded-2xl p-5 border border-orange-100 shadow-sm">
          <h3 className="text-gray-800 font-bold text-base mb-4">Transaction Information</h3>
          <div className="space-y-3 font-semibold text-sm">
            <div className="flex justify-between items-center text-gray-600">
              <span>Service Fee:</span>
              <span className="font-bold text-gray-700 text-right">1.5% of amount</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span>Processing Time:</span>
              <span className="font-bold text-gray-700 text-right">Instant</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span>Min. Deposit:</span>
              <span className="font-bold text-gray-700 text-right">$17.00</span>
            </div>
          </div>
        </div>

        {/* Action Button & Note */}
        <div className="flex flex-col gap-4 text-center">
          <button className="w-full py-3 bg-green-500 text-white font-bold rounded-xl shadow-lg uppercase tracking-wide">
            Pay with M-Pesa
          </button>
          
          <p className="text-gray-500 text-xs leading-relaxed px-4">
            You will receive an M-Pesa STK push prompt on your phone. <br />
            Enter your PIN to complete the payment.
          </p>
        </div>

      </div>
    </div>
  );
}