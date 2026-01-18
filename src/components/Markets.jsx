import React, { useState, useEffect } from 'react';
import { Star, ArrowUp, ArrowDown } from 'lucide-react';

const Markets = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const symbols = ['btcusdt', 'ethusdt', 'solusdt', 'usdcusdt', 'adausdt', 'xrpusdt', 'dogeusdt', 'maticusdt', 'dotusdt', 'ltcusdt', 'bchusdt', 'avaxusdt', 'linkusdt', 'xlmusdt', 'atomusdt', 'vetusdt', 'etcusdt', 'filusdt', 'trxusdt', 'egldusdt', 'aaveusdt'];

  useEffect(() => {
    // 1. Initial REST Fetch
    const fetchInitialData = async () => {
      try {
        const symbolsParam = JSON.stringify(symbols.map(s => s.toUpperCase()));
        const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${symbolsParam}`);
        const data = await res.json();
        
        const formatted = data.map(coin => ({
          symbol: coin.symbol.replace('USDT', ''),
          rawSymbol: coin.symbol.toLowerCase(),
          price: parseFloat(coin.lastPrice),
          change: parseFloat(coin.priceChangePercent),
          high: parseFloat(coin.highPrice),
          volume: (parseFloat(coin.quoteVolume) / 1000000).toFixed(2),
        }));
        setMarketData(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch initial data", err);
      }
    };

    fetchInitialData();

    // 2. WebSocket Stream
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbols.map(s => `${s}@ticker`).join('/')}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMarketData(prevData => prevData.map(coin => {
        if (coin.rawSymbol === data.s.toLowerCase()) {
          return {
            ...coin,
            price: parseFloat(data.c),
            change: parseFloat(data.P),
            high: parseFloat(data.h),
            volume: (parseFloat(data.q) / 1000000).toFixed(2), // 'q' is quote volume
          };
        }
        return coin;
      }));
    };

    return () => ws.close();
  }, []);

  if (loading) return (
    <div className="flex h-screen items-center justify-center font-bold text-emerald-500">
      Initializing Real-time Data...
    </div>
  );

  return (
    <div className="pt-8 px-32 bg-gray-50 min-h-screen font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketData.map((coin) => (
          <div key={coin.symbol} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 hover:shadow-md transition-all">
            {/* Header: Logo & Symbol */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4 items-center">
                <img 
                  src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${coin.symbol.toLowerCase()}.png`}
                  alt={coin.symbol}
                  className="w-10 h-10 rounded-full bg-gray-50"
                  onError={(e) => { e.target.src = 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/generic.png' }}
                />
                <div>
                  <h3 className="font-bold text-lg leading-tight">{coin.symbol}</h3>
                  <span className="text-xs text-gray-400 font-medium">USDT</span>
                </div>
              </div>
              <Star className="w-5 h-5 text-gray-300 cursor-pointer hover:text-yellow-400" />
            </div>

            {/* Price & Change */}
            <div className="grid grid-cols-2 gap-4 mb-1 border-b border-gray-50 pb-6">
              <div>
                <p className="text-xs text-gray-400 font-bold mb-1">PRICE</p>
                <p className="text-xl font-extrabold tabular-nums">
                  ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-bold mb-1">24H CHANGE</p>
                <p className={`text-md font-bold ${coin.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {coin.change > 0 ? '+' : ''}{coin.change.toFixed(2)}%
                </p>
              </div>
            </div>

            {/* High & Volume */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">24h High</p>
                <p className="text-sm font-semibold text-gray-700">${coin.high.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-bold uppercase">24h Volume</p>
                <p className="text-sm font-semibold text-gray-700">{coin.volume}M</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-emerald-50 text-emerald-600 py-2.5 rounded-xl font-bold flex items-center justify-center gap-1 hover:bg-emerald-100 transition-colors">
                <ArrowUp size={16} strokeWidth={3} /> Buy
              </button>
              <button className="flex-1 bg-red-50 text-red-500 py-2.5 rounded-xl font-bold flex items-center justify-center gap-1 hover:bg-red-100 transition-colors">
                <ArrowDown size={16} strokeWidth={3} /> Sell
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Markets;