
import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const GridConfigure = () => {
  const [config, setConfig] = useState({
    asset: 'BTC',
    investment: '500',
    lowerPrice: '25000',
    upperPrice: '35000',
    gridLevels: 20,
    autoAdjust: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Configure Bot</h2>
          <p className="text-[15px] text-slate-500 mt-1">BTC Grid Basic – Grid Trading Bot</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Asset and Investment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[15px] font-bold text-gray-800">Asset</label>
              <div className="relative">
                <select
                  name="asset"
                  value={config.asset}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border-2 border-gray-900 rounded-lg appearance-none focus:outline-none font-medium"
                >
                  <option>BTC</option>
                  <option>ETH</option>
                </select>
                <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[15px] font-bold text-gray-800">Investment</label>
              <input
                type="number"
                name="investment"
                value={config.investment}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          {/* Lower and Upper Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[15px] font-bold text-gray-800">Lower Price ($)</label>
              <input
                type="number"
                name="lowerPrice"
                value={config.lowerPrice}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[15px] font-bold text-gray-800">Upper Price ($)</label>
              <input
                type="number"
                name="upperPrice"
                value={config.upperPrice}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          {/* Grid Levels Slider */}
          <div className="space-y-4">
            <label className="text-[15px] font-bold text-gray-800">Grid Levels</label>
            <div className="relative pt-2">
              <input
                type="range"
                name="gridLevels"
                min="5"
                max="50"
                step="1"
                value={config.gridLevels}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                style={{
                    background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((config.gridLevels - 5) / 45) * 100}%, #e5e7eb ${((config.gridLevels - 5) / 45) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-4 px-1 font-medium">
                <span>5</span>
                <span>20</span>
                <span>50</span>
              </div>
            </div>
          </div>

          {/* Auto-adjust Checkbox */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="autoAdjust"
              checked={config.autoAdjust}
              onChange={handleChange}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-[16px] font-semibold text-gray-800 group-hover:text-black">
              Auto-adjust grid range
            </span>
          </label>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              className="px-8 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-[#2ecc95] hover:bg-[#27af7f] text-white rounded-xl text-sm font-bold transition-shadow shadow-sm active:scale-95"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GridConfigure;