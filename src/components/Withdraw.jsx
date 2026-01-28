import React, { useState } from "react";
import { FaWallet, FaShieldAlt, FaInfoCircle, FaChevronDown, FaCheckCircle } from "react-icons/fa";

const Withdraw = () => {
  const [method, setMethod] = useState("crypto");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);

  const availableBalance = 0.00;

  const networks = [
    { id: "eth", name: "Ethereum (ERC20)", fee: "5.50", time: "5 mins" },
    { id: "trx", name: "Tron (TRC20)", fee: "1.00", time: "2 mins" },
    { id: "bsc", name: "BNB Smart Chain (BEP20)", fee: "0.20", time: "3 mins" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 md:py-12 px-4 flex font-nunito flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-md mb-6 px-1">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Withdraw</h1>
        <p className="text-sm text-slate-500 font-medium">Select network and enter address</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Balance Display */}
        <div className="bg-emerald-500 p-6 text-white relative overflow-hidden">
          <p className="text-gray-800 text-md text-xl font-bold tracking-wide mb-1">Available Balance</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl">{availableBalance.toLocaleString()}</span>
            <span className="font-bold text-sm">USDT</span>
          </div>
        </div>

        <form className="p-5 md:p-8 space-y-5">
          {/* Network Selection - Custom Crypto Dropdown */}
          <div className="space-y-2 relative">
            <label className="text-sm font-bold text-gray-800 tracking-tight">Select Network</label>
            <button
              type="button"
              onClick={() => setIsNetworkOpen(!isNetworkOpen)}
              className="w-full bg-slate-50 border-2 border-slate-50 rounded-lg py-2 px-5 flex justify-between items-center group transition-all hover:border-slate-200 "
            >
              <span className={`font-bold ${selectedNetwork ? 'text-slate-900' : 'text-slate-400'}`}>
                {selectedNetwork ? networks.find(n => n.id === selectedNetwork).name : "Choose Network"}
              </span>
              <FaChevronDown className={`transition-transform duration-300 ${isNetworkOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isNetworkOpen && (
              <div className="absolute z-50 top-[105%] left-0 w-full bg-gray-100 border border-slate-100 shadow-2xl rounded-lg overflow-hidden animate-fadeIn">
                {networks.map((net) => (
                  <div
                    key={net.id}
                    onClick={() => {
                      setSelectedNetwork(net.id);
                      setIsNetworkOpen(false);
                    }}
                    className="p-2 hover:bg-slate-50 cursor-pointer last:border-0 group"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm text-slate-800">{net.name}</span>
                      {selectedNetwork === net.id && <FaCheckCircle className="text-emerald-500" />}
                    </div>
                    <div className="flex justify-between text-xs font-black tracking-tight">
                      <span className="text-slate-400 tex-xs">Fee: <span className="text-slate-600 tex-xs">{net.fee} USDT</span></span>
                      <span className="text-slate-400 text-xs">Est. Arrival: <span className="text-slate-600">{net.time}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Address Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-800 tracking-tight">Recipient Address</label>
            <input
              type="text"
              className="w-full bg-slate-50 border-2 border-slate-50 rounded-lg py-2.5 px-5 font-bold text-sm focus:bg-white focus:border-emerald-100 outline-none transition-all placeholder:text-gray-500"
              placeholder="Paste your address here..."
            />
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="text-sm font-bold text-gray-800 tracking-tight">Withdraw Amount</label>
              <button type="button" className="text-sm text-emerald-600 px-2 py-1 font-nunito rounded-lg tracking-tighter">Max Amount</button>
            </div>
            <div className="relative">
              <input
                type="number"
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-lg py-2 px-5 font-black text-xl focus:bg-white focus:border-emerald-100 outline-none transition-all"
                placeholder="0.00"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-l pl-3 border-slate-200">
                <span className="font-black text-emerald-400 text-sm uppercase">USDT</span>
              </div>
            </div>
          </div>

          {/* Fee Warning */}
          <div className="p-4 bg-slate-50 rounded-lg flex gap-3 border border-slate-100">
            <FaInfoCircle className="text-slate-400 shrink-0 mt-0.5" size={14} />
            <p className="text-[10px] leading-relaxed text-slate-500 font-semibold">
              The fee is deducted from the withdrawal amount. You will receive the remaining balance after the network fee.
            </p>
          </div>

          {/* Final Button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-2.5 rounded-lg shadow-xl shadow-emerald-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
          >
            <FaShieldAlt /> Withdraw Now
          </button>
        </form>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-slate-500">
          <FaShieldAlt size={12} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Secure</span>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;