// components/Header.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { binanceService } from '../services/binanceService';
import { Search, ChevronDown, X } from 'lucide-react'; // Using Lucide for clean icons

const Header = ({ activeMarket, onMarketChange }) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const markets = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'DOT', 'MATIC', 'AVAX', 'LINK'];
  
  const { data: marketData, isLoading } = useQuery({
    queryKey: ['marketData', activeMarket],
    queryFn: () => binanceService.get24hrStats(activeMarket),
    refetchInterval: 5000,
  });

  const filteredMarkets = markets.filter(m => 
    m.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <HeaderSkeleton />;

  const priceChange = parseFloat(marketData.priceChangePercent);
  const currentPrice = parseFloat(marketData.lastPrice);

  return (
    <div className="relative flex flex-col lg:flex-row gap-3 md:gap-6 mb-4 md:mb-6">
      {/* Main Market Display Card */}
      <div className="flex-1 bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#E6F9F1] flex items-center justify-center font-bold text-lg md:text-xl text-[#10B981]">
            {activeMarket.charAt(0)}
          </div>
          <div 
            className="cursor-pointer group" 
            onClick={() => setIsSelectorOpen(!isSelectorOpen)}
          >
            <h2 className="text-lg md:text-2xl font-black flex items-center gap-1">
              {activeMarket}/USDT
              <ChevronDown className={`w-5 h-5 transition-transform ${isSelectorOpen ? 'rotate-180' : ''}`} />
            </h2>
            <p className="text-xs md:text-sm font-medium text-slate-400">
              Click to switch market
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-xl md:text-3xl font-black tracking-tight">
            ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className={`text-xs md:text-sm font-bold flex items-center justify-end gap-1 ${priceChange >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
            {priceChange >= 0 ? '↗' : '↘'} {Math.abs(priceChange).toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Dropdown / Search Modal Overlay */}
      {isSelectorOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white rounded-lg shadow-xl border border-slate-100 p-4 max-h-75 overflow-hidden flex flex-col">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              autoFocus
              className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#10B981] outline-none"
              placeholder="Search markets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {filteredMarkets.map((market) => (
              <button
                key={market}
                onClick={() => {
                  onMarketChange(market);
                  setIsSelectorOpen(false);
                  setSearchTerm('');
                }}
                className={`py-2 px-4 rounded-xl text-sm font-bold transition-all ${
                  activeMarket === market 
                  ? 'bg-[#10B981] text-white' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {market}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HeaderSkeleton = () => (
  <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse mb-6">
    <div className="h-8 bg-slate-100 rounded w-48 mb-2"></div>
    <div className="h-4 bg-slate-100 rounded w-32"></div>
  </div>
);

export default Header;