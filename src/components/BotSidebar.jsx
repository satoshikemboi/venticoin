import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StatItem } from './BotCards';

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
    <aside className="w-full lg:w-64 space-y-6">
      {/* Categories Navigation */}
      <section className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          Categories
        </h2>
        <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`whitespace-nowrap px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                location.pathname === item.path
                  ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-lg'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </section>

      {/* Quick Stats Section */}
      <section className="hidden lg:block bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="font-bold text-slate-800 mb-4">Quick Stats</h2>
        <div className="space-y-4">
          <StatItem 
            label="Best Performer" 
            value="+10.2%" 
            subValue="News Sentiment Bot" 
            isPositive={true} 
          />
          <StatItem 
            label="Most Active" 
            value="143 trades" 
            subValue="BTC Micro Scalper" 
            isPositive={false} 
          />
          <StatItem 
            label="Total Profit" 
            value="+$1,240.50" 
            subValue="Last 30 Days" 
            isPositive={true} 
          />
        </div>
      </section>

      {/* Help Card (Optional visual addition) */}
      <section className="hidden lg:block bg-emerald-50 p-5 rounded-xl border border-emerald-100">
        <h3 className="text-emerald-800 font-bold text-sm mb-2">Need Help?</h3>
        <p className="text-emerald-600 text-xs leading-relaxed mb-3">
          Check out our documentation on how to optimize your bot settings.
        </p>
        <button className="text-emerald-700 font-bold text-xs hover:underline">
          View Docs →
        </button>
      </section>
    </aside>
  );
};

export default Sidebar;