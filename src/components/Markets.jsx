
import React, { useState } from 'react';
import { Star, ArrowUp, ArrowDown } from 'lucide-react';

const marketData = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', price: '$87508.88', change: '-1.32%', high: '$87508.88', volume: '$973.43M', color: 'text-orange-500' },
  { id: 2, name: 'USDC', symbol: 'USDC', price: '$1.00', change: '-0.01%', high: '$1.00', volume: '$964.55M', color: 'text-teal-500' },
  { id: 3, name: 'Ethereum', symbol: 'ETH', price: '$2932.75', change: '-1.26%', high: '$2932.75', volume: '$555.95M', color: 'text-blue-600' },
];

const Markets = () => {
  const [activeTab, setActiveTab] = useState('Markets');

  return (
    <div className="pt-8 px-32 bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-500">Markets</h1>
        <p className="text-gray-500 font-semibold">Quick market trading with immediate returns</p>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-xl flex gap-2">
            {['Markets', 'Trade History'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2 rounded-lg transition-all ${
                  activeTab === tab ? 'bg-white shadow-sm font-semibold' : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Filters & Info */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex bg-gray-100 font-semibold text-md px-2 py-0.5 rounded-md gap-4">
            {['All', 'Favorites', 'Gainers'].map((filter) => (
              <button key={filter} className={`px-4 py-1.5 ${filter === 'All' ? '' : ' text-gray-700'}`}>
                {filter}
              </button>
            ))}
          </div>
          <span className="text-emerald-500 font-medium">30 Coins</span>
        </div>

        {/* Crypto Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketData.map((coin) => (
            <div key={coin.id} className="border shadow-md border-gray-200 rounded-xl p-5 hover:border-emerald-200 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-3 items-center">
                  <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold ${coin.color}`}>
                    {coin.symbol[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{coin.symbol}</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{coin.name}</p>
                  </div>
                </div>
                <Star className="w-5 h-5 text-gray-300 cursor-pointer hover:text-yellow-400" />
              </div>

              <div className="grid grid-cols-2 text-gray-700 font-sans gap-y-8 mb-6">
                <div>
                  <p className="text-xs font-semibold text-gray-400">Price</p>
                  <p className="text-sm font-bold">{coin.price}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400">24h Change</p>
                  <p className="text-sm font-bold text-red-500">{coin.change}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400">24h High</p>
                  <p className="text-sm font-bold">{coin.high}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400">24h Volume</p>
                  <p className="text-sm font-bold">{coin.volume}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-emerald-300 text-emerald-600 py-2 rounded-lg font-bold flex items-center justify-center gap-1 hover:bg-emerald-200 transition-colors">
                  <ArrowUp size={16} /> Buy
                </button>
                <button className="flex-1 bg-red-200 text-red-500 py-2 rounded-lg font-bold flex items-center justify-center gap-1 hover:bg-red-200 transition-colors">
                  <ArrowDown size={16} /> Sell
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Markets;