// components/SpotTrading.jsx
import React, { useState } from 'react';
import Header from './Header';
import TradingChart from './TradingChart';
import OrderForm from './OrderForm';
import OrderBook from './OrderBook';
import MarketInfo from './MarketInfo';

const SpotTrading = () => {
  const [activeMarket, setActiveMarket] = useState('BTC');
  const [timeFrame, setTimeFrame] = useState('1d');
  const [chartType, setChartType] = useState('Candle');
  
  // NEW: State for mobile tab switching
  const [activeTab, setActiveTab] = useState('chart'); 

  const handlePlaceOrder = (order) => {
    console.log('Order placed:', order);
    alert(`${order.side.toUpperCase()} order placed for ${order.amount} ${order.market}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-3 md:p-8 font-nunito text-[#1E293B]">
      {/* Header Section */}
      <Header activeMarket={activeMarket} onMarketChange={setActiveMarket} />

      {/* MOBILE ONLY: Tab Switcher */}
      <div className="flex lg:hidden bg-white border border-green-500 rounded-lg p-1 mb-4 shadow-sm">
        {['chart', 'orders', 'info'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-bold rounded-lg capitalize transition-all ${
              activeTab === tab ? 'bg-slate-100 text-[#10B981]' : 'text-emerald-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Left Column - Chart (Hidden on mobile unless 'chart' tab active) */}
        <div className={`lg:col-span-2 space-y-4 md:space-y-6 ${activeTab !== 'chart' ? 'hidden lg:block' : 'block'}`}>
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* Timeframes: Scrollable on very small screens */}
              <div className="flex gap-1 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto no-scrollbar">
                {['5m', '15m', '1h', '4h', '1d'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeFrame(tf)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all flex-0 ${
                      timeFrame === tf ? 'bg-[#10B981] text-white' : 'bg-slate-50 text-slate-500'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Chart Types */}
              <div className="flex bg-slate-50 p-1 rounded-xl gap-1 w-full sm:w-auto justify-center">
                {['Candle', 'Line', 'Area'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setChartType(type)}
                    className={`flex-1 sm:flex-none px-3 py-1 rounded-lg text-[10px] md:text-xs font-bold transition-all ${
                      chartType === type ? 'bg-[#10B981] text-white' : 'text-slate-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-75 md:h-125 bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <TradingChart activeMarket={activeMarket} timeFrame={timeFrame} chartType={chartType} />
          </div>
        </div>

        {/* Right Column - Order components */}
        <div className={`space-y-4 md:space-y-6 ${activeTab === 'chart' ? 'hidden lg:block' : 'block'}`}>
          
          {/* Always show OrderForm if not on chart tab, OR show in 'orders' tab */}
          <div className={activeTab === 'info' ? 'hidden lg:block' : 'block'}>
             <OrderForm activeMarket={activeMarket} onPlaceOrder={handlePlaceOrder} />
          </div>

          <div className={activeTab === 'info' ? 'block' : 'hidden lg:block'}>
            <OrderBook activeMarket={activeMarket} />
          </div>

          <div className={activeTab === 'info' ? 'block' : 'hidden lg:block'}>
            <MarketInfo activeMarket={activeMarket} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotTrading;