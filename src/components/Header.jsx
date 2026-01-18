
// components/Header.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { binanceService } from '../services/binanceService';

const Header = ({ activeMarket, onMarketChange }) => {
  const { data: marketData, isLoading } = useQuery({
    queryKey: ['marketData', activeMarket],
    queryFn: () => binanceService.get24hrStats(activeMarket),
    refetchInterval: 5000,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-6">
        <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  const priceChange = parseFloat(marketData.priceChangePercent);
  const currentPrice = parseFloat(marketData.lastPrice);
  const volume = parseFloat(marketData.quoteVolume);

  return (
    <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-6">
      {/* Market Info Card */}
      <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#E6F9F1] flex items-center justify-center font-bold text-xl">
            {activeMarket.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black flex items-center gap-2">
              {activeMarket}/USDT
              <span className="text-[10px] bg-[#E6F9F1] text-[#10B981] px-2 py-1 rounded-md">SPOT</span>
            </h2>
            <p className="text-sm font-medium text-slate-400">
              {activeMarket === 'BTC' ? 'Bitcoin' :
               activeMarket === 'ETH' ? 'Ethereum' :
               activeMarket === 'BNB' ? 'Binance Coin' :
               activeMarket === 'SOL' ? 'Solana' :
               activeMarket === 'XRP' ? 'Ripple' : activeMarket}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl md:text-3xl font-black tracking-tight">
            ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className={`text-sm font-bold flex items-center justify-end gap-1 ${priceChange >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
            {priceChange >= 0 ? '↗' : '↘'} {Math.abs(priceChange).toFixed(2)}%
            <span className="text-slate-400 font-normal">24h change</span>
          </p>
        </div>
      </div>

      {/* Market Selector Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 w-full lg:w-100">
        <h4 className="text-base font-bold mb-4">Select Market</h4>
        <div className="flex gap-2 flex-wrap">
          {['BTC', 'ETH', 'BNB', 'SOL', 'XRP'].map((market) => (
            <button
              key={market}
              onClick={() => onMarketChange(market)}
              className={`flex-1 min-w-15 py-2.5 rounded-xl text-sm font-bold transition-all ${activeMarket === market ? 'bg-[#10B981] text-white shadow-md' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            >
              {market}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;