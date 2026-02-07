
import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const DcaConfigure = () => {
  const [config, setConfig] = useState({
    asset: 'BTC',
    investment: '100',
    frequency: 'Weekly',
    duration: '1 month',
    buyOnDips: false,
    considerVolume: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold text-gray-800">Configure Bot</h2>
        <p className="text-sm text-slate-500 mb-6">Bitcoin Accumulation – DCA Trading Bot</p>

        <form className="space-y-6">
          {/* Asset and Investment Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Asset</label>
              <div className="relative">
                <select 
                  name="asset"
                  value={config.asset}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>BTC</option>
                  <option>ETH</option>
                  <option>SOL</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Investment</label>
              <input 
                type="number"
                name="investment"
                value={config.investment}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="100"
              />
            </div>
          </div>

          {/* Frequency and Duration Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Frequency</label>
              <div className="relative">
                <select 
                  name="frequency"
                  value={config.frequency}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Duration</label>
              <div className="relative">
                <select 
                  name="duration"
                  value={config.duration}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-white border border-black rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option>1 month</option>
                  <option>3 months</option>
                  <option>1 year</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Market Conditions */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 block">Market Conditions</label>
            <div className="flex gap-8">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-800">
                <input 
                  type="checkbox" 
                  name="buyOnDips"
                  checked={config.buyOnDips}
                  onChange={handleChange}
                  className="w-4 h-4 border-gray-300 rounded text-emerald-500 focus:ring-emerald-500" 
                />
                Buy on dips only
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-800">
                <input 
                  type="checkbox" 
                  name="considerVolume"
                  checked={config.considerVolume}
                  onChange={handleChange}
                  className="w-4 h-4 border-gray-300 rounded text-emerald-500 focus:ring-emerald-500" 
                />
                Consider volume
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button"
              className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 bg-[#2ecc95] hover:bg-[#27af7f] text-white rounded-lg text-sm font-bold transition-colors"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DcaConfigure;