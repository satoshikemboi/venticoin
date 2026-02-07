import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// 1. Import Data
import { BOTS_DATA } from "../data/botsData"; 

// 2. Import Sidebar (Default Export)
import Sidebar from "./BotSidebar"; 

// 3. Import the REAL Hero (Check if it's default or named export)
import TradingHero from "./TradingHero"; 

// 4. Import the Cards (Named Exports)
import { BotCard } from "./BotCards"; 

// 5. Import Config Modals
import DcaConfigure from './DcaConfigure';
import GridConfigure from './GridConfigure';
import ArbitrageConfigure from './ArbitrageConfigure';
import ScalpConfigure from './ScalpConfigure';
import SignalConfigure from "./SignalConfigure";

const Bots = () => {
  const location = useLocation();
  const categoryKey = location.pathname.split('/').pop() || 'dca';
  const activeData = BOTS_DATA[categoryKey] || BOTS_DATA.dca;

  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-nunito relative">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900">Trading Bots</h1>
          <p className="text-slate-500 font-medium">Manage your automated trading strategies</p>
        </header>

        <TradingHero />

        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar />
          
          <main className="flex-1">
            <h2 className="text-xl font-bold text-slate-800 mb-4">{activeData.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeData.items.map((bot) => (
                <BotCard key={bot.id} {...bot} onConfigure={() => setActiveModal(categoryKey)} />
              ))}
            </div>
          </main>
        </div>
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            {activeModal === 'dca' && <DcaConfigure onClose={closeModal} />}
            {activeModal === 'grid' && <GridConfigure onClose={closeModal} />}
            {activeModal === 'arbitrage' && <ArbitrageConfigure onClose={closeModal} />}
            {activeModal === 'scalping' && <ScalpConfigure onClose={closeModal} />}
            {activeModal === 'signals' && <SignalConfigure onClose={closeModal} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bots;