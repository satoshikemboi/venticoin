import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/** * DATA STORE 
 * Add your specific bots for each category here.
 */
const BOTS_DATA = {
  dca: {
    title: "Dollar-Cost Averaging",
    description: "Regular purchases of assets regardless of price to minimize volatility.",
    items: [
      { id: 1, title: "Bitcoin Accumulation", schedule: "Weekly.DCA", description: "Dollar-cost averaging into Bitcoin on a weekly basis.", risk: "Low", performance: "+2.4%", status: "Inactive", primaryAction: "Run Bot" },
      { id: 2, title: "ETH DCA Pro", schedule: "Daily.DCA", description: "Dynamic DCA based on RSI and volume indicators.", risk: "Medium", performance: "+3.7%", status: "Inactive", primaryAction: "Run bot" },
      { id: 3, title: "Multi-Coin DCA", schedule: "Monthly.DCA", description: "DCA into top 5 cryptocurruncies by market cap", risk: "Medium", performance: "+4.2%", status: "Inactive", primaryAction: "Run Bot" },
      { id: 4, title: "Cycle-Based Accumulation", schedule: "Bi-Weekly.DCA", description: "DCA more during market dips, less during highs.", risk: "Low", performance: "+1.8%", status: "Inactive", primaryAction: "Run bot" }
    ]
  },
  grid: {
    title: "Grid Trading",
    description: "Place buy and sell orders at predetermined levels.",
    items: [
      { id: 5, title: "BTC Grid Basic", schedule: "Continuous.Grid", description: "Profit from BTC ranging between $90000-$100000.", risk: "Medium", performance: "+5.1%", status: "Inactive", primaryAction: "Run bot" },
      { id: 6, title: "ETH Grid Advanced", schedule: "Continuous.Grid", description: "Dynamic grid with auto-adjusting ranges.", risk: "High", performance: "+7.3%", status: "Inactive", primaryAction: "Run bot" },
      { id: 7, title: "BNB Range Grid", schedule: "Continuous.Grid", description: "Grid trading optimized for BNB volatility ranges", risk: "Medium", performance: "3.6%", status: "Inactive", primaryAction: "Run bot"},
      { id: 8, title: "Solana Full Range", schedule: "Continuous.Grid", description: "Grid trading covering the full SOL price range", risk: "High", performance: "3.6%", status: "Inactive", primaryAction: "Run bot"},
    ]
  },
  arbitrage: {
    title: "Arbitrage",
    description: "Profit from price differences across various exchanges or trading pairs.",
    items: [
      { id: 9, title: "Exchange Arbitrage", schedule: "Real-time.Arbitrage", description: "Execute trades based on price differences between exchanges", risk: "High", performance: "+1.4%", status: "Inactive", primaryAction: "Run Bot" },
      { id: 10, title: "Triangle Arbitrage", schedule: "Reak-time.Arbitrage", description: "Triangular arbitrage between BTC, ETH and USDT", risk: "High", perfomance:"+0.9%", status: "Inactive", primaryAction: "Run Bot"},
      { id: 11, title: "DEX Arbitrage", schedule: "Reak-time.Arbitrage", description: "Arbitrage between decentralized exchanges", risk: "Extreme", perfomance:"+9.5%", status: "Inactive", primaryAction: "Run Bot"},
      { id: 12, title: "Futures vs Spot", schedule: "Reak-time.Arbitrage", description: "Arbitrage between decentralized exchanges", risk: "Extreme", perfomance:"+2.5%", status: "Inactive", primaryAction: "Run Bot"},
    ]
  },
  scalping: {
    title: "Scalping",
    description: "High-frequency trading aiming for small profits on minor price changes.",
    items: [
      { id: 13, title: "BTC Micro Scalper", schedule: "1m.Scalping", description: "Fast trades on small Bitcoin price movements.", risk: "High", performance: "+5.4%", status: "Inactive", primaryAction: "View Bot" },
      { id: 14, title: "ETH Volume Scalper", schedule: "5m.Scalping", description: "Scalps Etherium based on Volume spikes.", risk: "Extreme", performance: "+8.3%", status: "Inactive", primaryAction: "View Bot" },
      { id: 15, title: "Multi-Indicator Scalper", schedule: "3m.Scalping", description: "Uses MACD, RSI and Bollinger Bands for rapid trades.", risk: "High", performance: "+7.4%", status: "Inctive", primaryAction: "View Bot" },
      { id: 16, title: "Range-Breakout Scalper", schedule: "15m.Scalping", description: "Trades breakouts from consolidation patterns.", risk: "Extreme", performance: "+9.4%", status: "Inactive", primaryAction: "View Bot" }
    ]
  },
  signals: {
    title: "Signal-Based",
    description: "Bots that execute trades based on external technical or social signals.",
    items: [
      { id: 1, title: "RSI-Based Signals", schedule: "4h.Signal", description: "Trades based on RSI crossing overbought/oversold levels", risk: "Medium", performance: "Medium", status: "Inactive", primaryAction: "Setup Signal" },
      { id: 2, title: "Moving Average Bot", schedule: "1h.Signal", description: "Trades based on MA crossover signals", risk: "High", performance: "+2.8%", status: "Inactive", primaryAction: "View Bot" },
      { id: 3, title: "Pattern Recognition", schedule: "1d.Signal", description: "Identifies and trades chart patterns", risk: "Extreme", performance: "+4.3%", status: "Inactive", primaryAction: "View Bot" },
      { id: 4, title: "News Sentiment Bot", schedule: "6h.Signal", description: "Trades based on crypto news sentiment analysis", risk: "High", performance: "+10.4%", status: "Inctive", primaryAction: "View Bot" },
    ]
  }
};

// --- StatItem (Internal) ---
const StatItem = ({ label, value, subValue, isPositive }) => (
  <div>
    <div className="flex justify-between text-sm text-slate-400 pb-1">
      <span>{label}</span>
      <span className={isPositive ? "text-green-500 font-bold" : "text-slate-800 font-bold"}>{value}</span>
    </div>
    <div className="text-sm font-semibold text-gray-800">{subValue}</div>
  </div>
);

// --- BotCard (Internal) ---
const BotCard = ({ title, schedule, description, risk, performance, status, primaryAction }) => {
  const statusColors = {
    Active: 'bg-green-100 text-green-600',
    Inactive: 'bg-gray-100 text-gray-500',
    Configured: 'bg-blue-100 text-blue-600',
  };

  return (
    <div className="border-2 border-emerald-400 rounded-xl p-5 bg-white shadow-sm flex flex-col justify-between hover:shadow-lg transition-all">
      <div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg text-slate-800">{title}</h3>
          <span className={`px-3 py-1 rounded text-xs font-bold ${statusColors[status] || statusColors.Inactive}`}>
            {status}
          </span>
        </div>
        <p className="text-sm font-semibold text-gray-400 mb-3">{schedule}</p>
        <p className="text-sm font-semibold text-gray-600 mb-6 leading-relaxed">{description}</p>
      </div>
      <div>
        <div className="flex justify-between text-xs mb-4">
          <span className="text-slate-400 font-semibold">Risk: <span className={risk === 'Low' ? 'text-green-500' : 'text-orange-500'}>{risk}</span></span>
          <span className="text-slate-400 font-semibold">Performance: <span className="text-green-500 font-bold">{performance}</span></span>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">Configure</button>
          <button className="flex-1 py-2 bg-emerald-400 text-white rounded-lg text-sm font-semibold hover:bg-emerald-500 transition shadow-sm">{primaryAction}</button>
        </div>
      </div>
    </div>
  );
};

// --- Sidebar (Internal) ---
const Sidebar = () => {
  const location = useLocation();
  const navItems = [
    { name: 'Dollar-Cost Averaging', path: '/bots/dca' },
    { name: 'Grid Trading', path: '/bots/grid' },
    { name: 'Arbitrage', path: '/bots/arbitrage' },
    { name: 'Scalping', path: '/bots/scalping' },
    { name: 'Signal-Based', path: '/bots/signals' },
  ];

  return (
    <aside className="w-full md:w-64 font-nunito space-y-8">
      <section className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="font-semibold text-lg text-slate-800 mb-4">Bot Categories</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === item.path ? 'bg-emerald-400 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-slate-100'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </section>
      <section className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="font-semibold text-slate-800 mb-4 text-lg">Bot Performance</h2>
        <div className="space-y-4">
          <StatItem label="Best Performer" value="+10.2%" subValue="News Sentiment Bot" isPositive />
          <StatItem label="Most Active" value="143 trades" subValue="BTC Micro Scalper" />
        </div>
      </section>
    </aside>
  );
};

// --- Main Export ---
const Bots = () => {
  const location = useLocation();
  const categoryKey = location.pathname.split('/').pop() || 'dca';
  const activeData = BOTS_DATA[categoryKey] || BOTS_DATA.dca;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-nunito">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <Sidebar />
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
            <h1 className="text-2xl font-bold text-slate-900">{activeData.title} Bots</h1>
            <button className="bg-emerald-400 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-emerald-500 shadow-md">
              Create {categoryKey.toUpperCase()} Bot
            </button>
          </div>
          <p className="text-slate-500 mb-8">{activeData.description}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeData.items.map((bot) => (
              <BotCard key={bot.id} {...bot} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Bots;