import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowUp } from 'lucide-react';

// --- NEW Component: Real Portfolio Balance (from image) ---
const MainBalanceCard = () => {
  return (
    <div className="bg-[#0a1f2c] p-6 rounded-3xl flex flex-col gap-4 mb-8 shadow-lg w-full">
      <div className="space-y-1">
        <p className="text-gray-400 text-sm font-medium">Real Portfolio</p>
        <div className="flex items-center gap-3">
          <h1 className="text-white text-3xl md:text-4xl font-bold">$0.00</h1>
          <div className="flex items-center text-emerald-400 text-sm font-semibold mt-2">
            <span className="mr-1">↑</span>1.20%
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Link to="/deposit" className="bg-[#14d39a] hover:bg-[#11b886] text-[#0a1f2c] px-6 md:px-8 py-2.5 rounded-xl font-bold transition-colors text-sm text-center">
          Deposit
        </Link>
        <Link to="/withdraw" className="bg-[#1e2d3d] hover:bg-[#2a3c50] text-white px-6 md:px-8 py-2.5 rounded-xl font-bold transition-colors text-sm text-center">
          Withdraw
        </Link>
      </div>
    </div>
  );
};

// Live Watchlist Item Component
const WatchlistItem = ({ symbol, name, price, change, color }) => {
  const isPositive = change >= 0;
  return (
    <div className={`flex items-center justify-between p-3 mb-2 rounded-xl bg-white border-l-4 shadow-sm ${color}`}>
      <div className="flex items-center gap-3">
        <img 
          src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${symbol.toLowerCase()}.png`}
          alt={symbol}
          className="w-8 h-8 rounded-full"
          onError={(e) => { e.target.src = 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/generic.png' }}
        />
        <div>
          <div className="font-bold text-sm text-slate-800">{symbol}</div>
          <div className="text-xs text-slate-400">{name}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-sm text-slate-800">${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        <div className={`text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

// Live Portfolio Card Component
const PortfolioCard = ({ symbol, name, price, change, amount }) => {
  const value = (price * amount).toLocaleString(undefined, { minimumFractionDigits: 2 });
  return (
    <div className="bg-white border border-green-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <img 
            src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${symbol.toLowerCase()}.png`}
            alt={symbol}
            className="w-10 h-10"
            onError={(e) => { e.target.src = 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/generic.png' }}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">{symbol}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${change >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {change >= 0 ? '+' : ''}{change.toFixed(2)}%
              </span>
            </div>
            <div className="text-xs text-slate-400">{name}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-slate-800 text-sm">${price.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 font-semibold uppercase">Holdings: {amount}</div>
          <div className="font-bold text-md text-emerald-600">${value}</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <button className="bg-emerald-500 text-white px-6 py-2 rounded-sm text-sm font-bold flex items-center gap-2 hover:bg-emerald-600 transition shadow-sm">
          <ArrowUp size={14} /> Trade
        </button>
        <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Live</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [marketData, setMarketData] = useState({});
  const [loading, setLoading] = useState(true);

  const assets = [
    { symbol: 'BTC', name: 'Bitcoin', amount: 0.00000001, color: 'border-orange-400' },
    { symbol: 'ETH', name: 'Ethereum', amount: 0.000001, color: 'border-blue-500' },
    { symbol: 'TRX', name: 'Tron', amount: 0.01, color: 'border-red-500' },
    { symbol: 'SOL', name: 'Solana', amount: 0.0005, color: 'border-purple-500' },
    { symbol: 'BNB', name: 'Binance', amount: 0.00004, color: 'border-yellow-400' },
  ];

  useEffect(() => {
    const symbols = assets.map(a => `${a.symbol.toLowerCase()}usdt`);
    fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${JSON.stringify(symbols.map(s => s.toUpperCase()))}`)
      .then(res => res.json())
      .then(data => {
        const initialMap = {};
        data.forEach(item => {
          initialMap[item.symbol.replace('USDT', '')] = {
            price: parseFloat(item.lastPrice),
            change: parseFloat(item.priceChangePercent)
          };
        });
        setMarketData(initialMap);
        setLoading(false);
      });

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbols.map(s => `${s}@ticker`).join('/')}`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const symbol = data.s.replace('USDT', '');
      setMarketData(prev => ({
        ...prev,
        [symbol]: { price: parseFloat(data.c), change: parseFloat(data.P) }
      }));
    };
    return () => ws.close();
  }, []);

  if (loading) return <div className="p-20 text-center font-bold text-slate-400">Loading your assets...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-nunito">
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Main Content Area (Balance + Portfolio) */}
        <div className="flex-1 order-1 md:order-2">
          {/* New Portfolio Balance Card */}
          <MainBalanceCard />

          <h2 className="font-bold text-2xl text-slate-800 mb-6">Your Portfolio</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {assets.map(asset => (
              <PortfolioCard 
                key={asset.symbol}
                symbol={asset.symbol}
                name={asset.name}
                price={marketData[asset.symbol]?.price || 0}
                change={marketData[asset.symbol]?.change || 0}
                amount={asset.amount}
              />
            ))}
          </div>
        </div>

        {/* Sidebar (Watchlist) */}
        <div className="w-full md:w-80 shrink-0 order-2 md:order-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-2xl text-slate-800">Watchlist</h2>
            <Link to="/Markets" className="text-emerald-500 text-sm font-bold hover:underline">
              See All
            </Link>
          </div>
          
          <div className="space-y-3">
            {assets.map(asset => (
              <WatchlistItem 
                key={asset.symbol}
                symbol={asset.symbol}
                name={asset.name}
                price={marketData[asset.symbol]?.price || 0}
                change={marketData[asset.symbol]?.change || 0}
                color={asset.color}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;