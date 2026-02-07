
import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const ArbitrageConfigure = () => {
  const [config, setConfig] = useState({
    asset: 'BTC',
    investment: '1000',
    minPriceDiff: '0.5',
    exchanges: {
      binance: true,
      coinbase: true,
      kraken: true,
      ftx: false,
    },
    autoAdjustTradeSize: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'autoAdjustTradeSize') {
      setConfig((prev) => ({ ...prev, [name]: checked }));
    } else {
      setConfig((prev) => ({
        ...prev,
        exchanges: { ...prev.exchanges, [name]: checked },
      }));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Configure Bot</h2>
          <p className="text-[15px] text-slate-500 mt-1">
            Exchange Arbitrage – Arbitrage Trading Bot
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Full-width Asset Selection */}
          <div className="space-y-2">
            <label className="text-[15px] font-bold text-gray-800">Asset</label>
            <div className="relative">
              <select
                name="asset"
                value={config.asset}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option>BTC</option>
                <option>ETH</option>
                <option>USDT</option>
              </select>
              <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Investment and Min Price Diff Row */}
          <div className="grid grid-cols-2 gap-4">
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

            <div className="space-y-2">
              <label className="text-[15px] font-bold text-gray-800">Min. Price Diff (%)</label>
              <input
                type="number"
                step="0.1"
                name="minPriceDiff"
                value={config.minPriceDiff}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          {/* Exchanges Selection */}
          <div className="space-y-4">
            <label className="text-[15px] font-bold text-gray-800">Exchanges</label>
            <div className="grid grid-cols-2 gap-y-3">
              {Object.keys(config.exchanges).map((exchange) => (
                <label key={exchange} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name={exchange}
                    checked={config.exchanges[exchange]}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-[16px] font-semibold text-gray-800 capitalize group-hover:text-black">
                    {exchange}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Global Auto-adjust Checkbox */}
          <label className="flex items-center gap-3 cursor-pointer group pt-2">
            <input
              type="checkbox"
              name="autoAdjustTradeSize"
              checked={config.autoAdjustTradeSize}
              onChange={handleCheckboxChange}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-[16px] font-semibold text-gray-800 group-hover:text-black">
              Auto-adjust trade size based on opportunity
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
              className="px-8 py-3 bg-[#2ecc95] hover:bg-[#27af7f] text-white rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArbitrageConfigure;