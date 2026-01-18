
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

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              <div className="h-6 bg-slate-100 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const stats = {
    volume: parseFloat(marketData.quoteVolume).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),
    high: parseFloat(marketData.highPrice).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    low: parseFloat(marketData.lowPrice).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    change: parseFloat(marketData.priceChangePercent).toFixed(2),
    price: parseFloat(marketData.lastPrice).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    priceChange: parseFloat(marketData.priceChange).toFixed(2),
  };

  const InfoItem = ({ label, value, color = 'text-slate-800' }) => (
    <div className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className={`text-sm font-bold ${color}`}>{value}</span>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-6">Market Information</h3>
      
      <div className="space-y-1">
        <InfoItem
          label="24h Volume"
          value={`$${stats.volume}`}
        />
        <InfoItem
          label="24h High"
          value={`$${stats.high}`}
        />
        <InfoItem
          label="24h Low"
          value={`$${stats.low}`}
        />
        <InfoItem
          label="24h Change"
          value={`${stats.change}%`}
          color={parseFloat(stats.change) >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}
        />
        <InfoItem
          label="24h Price Change"
          value={`$${stats.priceChange}`}
          color={parseFloat(stats.priceChange) >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}
        />
        <InfoItem
          label="Current Price"
          value={`$${stats.price}`}
          color="text-slate-800"
        />
      </div>
    </div>
  );
};

export default MarketInfo;