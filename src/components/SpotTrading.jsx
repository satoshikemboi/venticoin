
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

  const handlePlaceOrder = (order) => {
    console.log('Order placed:', order);
    // Here you would typically send the order to your backend
    alert(
      `${order.side.toUpperCase()} order placed for ${order.amount} ${order.market} at $${order.price.toFixed(2)}`
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-[#1E293B]">
      {/* Header Section */}
      <Header activeMarket={activeMarket} onMarketChange={setActiveMarket} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left Column - Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Controls */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex gap-2">
                {['5m', '15m', '1h', '4h', '1d'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeFrame(tf)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      timeFrame === tf
                        ? 'bg-[#10B981] text-white'
                        : 'bg-slate-50 text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <div className="flex bg-slate-50 p-1 rounded-xl gap-1">
                {['Candle', 'Line', 'Area'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setChartType(type)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      chartType === type
                        ? 'bg-[#10B981] text-white'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Component */}
          <TradingChart
            activeMarket={activeMarket}
            timeFrame={timeFrame}
            chartType={chartType}
          />
        </div>

        {/* Right Column - Order Form, Order Book, Market Info */}
        <div className="space-y-6">
          <OrderForm activeMarket={activeMarket} onPlaceOrder={handlePlaceOrder} />
          <OrderBook activeMarket={activeMarket} />
          <MarketInfo activeMarket={activeMarket} />
        </div>
      </div>
    </div>
  );
};

export default SpotTrading;