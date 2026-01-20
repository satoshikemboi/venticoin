import React, { useState, useEffect } from 'react';
import { Star, ArrowUp, ArrowDown, Search } from 'lucide-react';

const Markets = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); 
  const [favorites, setFavorites] = useState(['BTC', 'ETH']);

  const symbols = ['btcusdt', 'ethusdt', 'solusdt', 'usdcusdt', 'adausdt', 'xrpusdt', 'dogeusdt', 'maticusdt', 'dotusdt', 'ltcusdt', 'bchusdt', 'avaxusdt', 'linkusdt', 'xlmusdt', 'atomusdt', 'vetusdt', 'etcusdt', 'filusdt', 'trxusdt', 'egldusdt', 'aaveusdt'];

  useEffect(() => {
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

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbols.map(s => `${s}@ticker`).join('/')}`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMarketData(prevData => prevData.map(coin => {
        if (coin.rawSymbol === data.s.toLowerCase()) {
          return { ...coin, price: parseFloat(data.c), change: parseFloat(data.P), high: parseFloat(data.h), volume: (parseFloat(data.q) / 1000000).toFixed(2) };
        }
        return coin;
      }));
    };
    return () => ws.close();
  }, []);

  const toggleFavorite = (symbol) => {
    setFavorites(prev => prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]);
  };

  const filteredData = marketData.filter(coin => {
    if (activeTab === 'favorites') return favorites.includes(coin.symbol);
    if (activeTab === 'gainers') return coin.change > 1.0; // Filter coins with >1% gain
    return true;
  }).sort((a, b) => activeTab === 'gainers' ? b.change - a.change : 0);

  if (loading) return (
    <div className="flex h-screen items-center justify-center font-bold text-emerald-500">Initializing Markets...</div>
  );

  return (
    <div className="pt-8 px-4 md:px-10 lg:px-32 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="font-bold text-3xl text-green-500">Markets</h1>
            <p className="text-slate-500 text-md font-semibold">Quick market trading with immediate returns.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input type="text" placeholder="Search coin..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-all" />
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex space-x-2 mb-8 bg-slate-200/50 p-1 rounded-xl w-fit">
          {['all', 'favorites', 'gainers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                activeTab === tab ? 'bg-white text-emerald-600 shadow-md' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab === 'all' ? 'All Assets' : tab}
            </button>
          ))}
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((coin) => (
            <div key={coin.symbol} className="bg-white border border-slate-100 shadow-sm rounded-lg p-6 hover:shadow-lg transition-all border-b-4 border-b-transparent hover:border-b-emerald-500">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4 items-center">
                  <img 
                    src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${coin.symbol.toLowerCase()}.png`}
                    alt={coin.symbol} className="w-10 h-10 rounded-full"
                    onError={(e) => { e.target.src = 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/generic.png' }}
                  />
                  <div>
                    <h3 className="font-bold text-lg text-slate-800 leading-none">{coin.symbol}</h3>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">USDT</span>
                  </div>
                </div>
                <Star 
                  onClick={() => toggleFavorite(coin.symbol)}
                  className={`w-4 h-4 cursor-pointer transition-colors ${favorites.includes(coin.symbol) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} 
                />
              </div>

              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase mb-1">Last Price</p>
                  <p className="text-xl font-bold text-gray-800 tracking-tight">
                    ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold flex items-center gap-1 ${coin.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {coin.change >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    {Math.abs(coin.change).toFixed(2)}%
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-xs border-t border-slate-50 pt-4">
                <div>
                  <p className="text-slate-400 font-bold uppercase text-[9px]">24h High</p>
                  <p className="font-semibold text-lg text-slate-700">${coin.high.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 font-bold uppercase text-[9px]">24h Volume</p>
                  <p className="font-semibold text-lg text-slate-700">{coin.volume}M</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-emerald-500 text-gray-800 py-2.5 rounded-md font-bold text-xs hover:bg-emerald-300 transition-colors">BUY</button>
                <button className="flex-1 bg-rose-300 text-gray-800 py-2.5 rounded-md font-bold text-xs hover:bg-slate-200 transition-colors">SELL</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Markets;