import React from 'react';
// --- HeroSection (Internal) ---
const TradingHero = () => {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl mb-8 bg-slate-900 text-white shadow-xl">
        {/* Background Image/Overlay */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000" 
            alt="Abstract Network" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-transparent to-transparent" />
        </div>
  
        {/* Content */}
        <div className="relative z-10 p-6 md:p-10">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Automated Trading</h2>
            <p className="text-slate-300 text-sm md:text-base">
              Create and manage algorithmic trading strategies
            </p>
          </div>
  
          <div className="flex flex-wrap items-end justify-between gap-6 md:gap-12">
            <div className="flex gap-8 md:gap-16">
              <div>
                <div className="text-2xl md:text-4xl font-bold">20</div>
                <div className="text-xs md:text-sm text-slate-400 font-medium mt-1">Total Bots</div>
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-bold">1</div>
                <div className="text-xs md:text-sm text-slate-400 font-medium mt-1">Active</div>
              </div>
              <div>
                <div className="text-2xl md:text-4xl font-bold text-emerald-400">+4.8%</div>
                <div className="text-xs md:text-sm text-slate-400 font-medium mt-1">Weekly Return</div>
              </div>
            </div>
  
            <button className="bg-white text-slate-900 px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-100 transition-all shadow-lg active:scale-95 whitespace-nowrap">
              Create New Bot 
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

export default TradingHero;