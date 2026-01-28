import React, { useState } from "react";
import DepositCrypto from "./DepositCrypto";
import { FaPhoneAlt, FaWallet, FaCreditCard, FaExclamationCircle } from "react-icons/fa";
import Mpesa from "./Mpesa";
import Card from "./Card";

const Deposit = () => {
  const [activeTab, setActiveTab] = useState("mobile");
  const [selectedAsset, setSelectedAsset] = useState(null);

  const handleChange = (e) => {
    setSelectedAsset(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-12 px-4 flex font-nunito flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800 mb-2">Fund Your Account</h1>
        <p className="text-sm md:text-base text-gray-500">Choose your preferred deposit method below</p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-2xl bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Tabs Navigation - Responsive Flex/Grid */}
        <div className="flex flex-row p-2 md:p-6 bg-gray-50 gap-1 md:gap-2">
          {[
            { id: "mobile", icon: <FaPhoneAlt />, label: "Mobile" },
            { id: "crypto", icon: <FaWallet />, label: "Crypto" },
            { id: "card", icon: <FaCreditCard />, label: "Card" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-2 md:py-2 rounded-lg font-bold text-lg md:text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-linear-to-r from-green-500 to-green-400 text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span className="text-sm md:text-lg">{tab.icon}</span>
              <span className="text-sm md:text-lg">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Content Area */}
        <div className="p-4 md:p-8 bg-orange-50/10">
          {activeTab === "mobile" && (
            <div className="flex flex-col items-center text-center animate-fadeIn">

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">M-Pesa Payment</h2>
              <p className="text-xs md:text-sm text-gray-500 mb-6 md:mb-8">Quick deposits via mobile money</p>

              <div className="w-full max-w-xs">
                <p className="text-left text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Mobile Money Provider</p>
                <div className="bg-white rounded-xl p-4 md:p-6 flex justify-center items-center mb-4 border border-gray-100 shadow-sm transition-transform active:scale-95">
                  <img 
                    src="./Mpesa.png" 
                    alt="M-Pesa" 
                    className="h-16 md:h-32 object-contain"
                  />
                </div>
                <p className="text-[10px] text-gray-400 italic">Currently, only M-Pesa is supported</p>
              </div>

              {/* Risk Disclaimer - Integrated and Responsive */}
              <div className="w-full max-w-2/3 mt-8">
                <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 md:p-5">
                  <div className="flex gap-3">
                    <div className="text-red-500 shrink-0 mt-0.5">
                      <FaExclamationCircle size={18} />
                    </div>
                    
                    <div className="flex flex-col gap-2 text-left">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-3.5 bg-red-700 rounded-full" />
                        <h3 className="text-red-800 font-black text-xs md:text-sm uppercase tracking-tight">
                          Risk Disclaimer
                        </h3>
                      </div>
                      
                      <p className="text-red-900/70 text-[10px] md:text-xs leading-relaxed font-semibold">
                        Cryptocurrency trading is a high-risk business. Users should 
                        trade carefully and only deposit money they can afford to 
                        lose. Do not use savings or emergency funds. By depositing, 
                        you acknowledge that no reversals can be issued once funds 
                        have been deposited.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full mt-6">
                <Mpesa />
              </div>
            </div>
          )}

          {activeTab === "crypto" && (
            <div className="w-full">
              <DepositCrypto selectedAsset={selectedAsset} handleChange={handleChange} />
            </div>
          )}

          {activeTab === "card" && (
            <div className="w-full py-10 md:py-20 text-center">
              <Card />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deposit;