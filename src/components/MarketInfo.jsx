// components/MarketInfo.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { binanceService } from '../services/binanceService';

const MarketInfo = ({ activeMarket }) => {
  const { data: marketData, isLoading } = useQuery({
    queryKey: ['marketInfo', activeMarket],
    queryFn: () => binanceService.get24hrStats(activeMarket),
    refetchInterval: 5000,
  });

  if (isLoading) return <MarketInfoSkeleton />;

  const stats = {
    volume: parseFloat(marketData.quoteVolume).toLocaleString(undefined, {
      maximumFractionDigits: 0,
    }),
    high: parseFloat(marketData.highPrice).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    }),
    low: parseFloat(marketData.lowPrice).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    }),
    change: parseFloat(marketData.priceChangePercent).toFixed(2),
    priceChange: parseFloat(marketData.priceChange).toFixed(2),
  };

  const isPositive = parseFloat(stats.change) >= 0;

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border font-nunito border-slate-100 p-4 md:p-6">
      <h3 className="text-sm md:text-lg font-bold text-slate-800 mb-4 md:mb-6 uppercase md:normal-case tracking-tight">
        Market Statistics
      </h3>
      
      {/* 2x2 or 3x2 Grid on mobile for better space usage */}
      <div className="grid grid-cols-2 md:grid-cols-1 gap-y-1 md:gap-y-0 gap-x-4 md:gap-x-0">
        <InfoItem
          label="24h Volume"
          value={`$${stats.volume}`}
        />
        <InfoItem
          label="24h Change"
          value={`${isPositive ? '+' : ''}${stats.change}%`}
          color={isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}
          badge={true}
        />
        <InfoItem
          label="24h High"
          value={`$${stats.high}`}
        />
        <InfoItem
          label="24h Low"
          value={`$${stats.low}`}
        />
        {/* Hidden on very small screens to keep the grid tidy, visible on desktop */}
        <div className="hidden md:block">
          <InfoItem
            label="Price Change"
            value={`${isPositive ? '+$' : '-$'}${Math.abs(stats.priceChange)}`}
            color={isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}
          />
        </div>
      </div>
    </div>
  );
};

// Refined InfoItem for better mobile density
const InfoItem = ({ label, value, color = 'text-slate-800', badge = false }) => (
  <div className="flex flex-col md:flex-row md:justify-between md:items-center py-2 md:py-3 border-b border-slate-50 md:border-slate-100 last:border-0">
    <span className="text-[10px] md:text-sm font-bold text-slate-400 md:text-slate-500 uppercase md:normal-case md:font-medium">
      {label}
    </span>
    <span className={`text-sm md:text-sm font-black md:font-bold ${color} ${badge ? 'md:bg-transparent px-0' : ''}`}>
      {value}
    </span>
  </div>
);

const MarketInfoSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse">
    <div className="h-4 bg-slate-100 rounded w-1/2 mb-6"></div>
    <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-10 bg-slate-50 rounded"></div>
      ))}
    </div>
  </div>
);

export default MarketInfo;