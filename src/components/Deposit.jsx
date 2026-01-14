import React, { useState } from "react";
import { FaPhoneAlt, FaWallet, FaCreditCard, FaExclamationCircle } from "react-icons/fa";

const Deposit = () => {
  // State to track which tab is active: 'mobile', 'crypto', or 'card'
  const [activeTab, setActiveTab] = useState("mobile");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#0a1f44] mb-2">Fund Your Account</h1>
        <p className="text-gray-500">Choose your preferred deposit method below</p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Tabs Navigation */}
        <div className="flex p-6 bg-gray-50 gap-2">
          <button
            onClick={() => setActiveTab("mobile")}
            className={`flex-1 flex items-center justify-center gap-1 py-1 text-gray-800 rounded-lg font-bold transition-all ${
              activeTab === "mobile"
                ? "bg-linear-to-r from-green-500 to-green-400 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaPhoneAlt /> Mobile
          </button>
          
          <button
            onClick={() => setActiveTab("crypto")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
              activeTab === "crypto"
                ? "bg-linear-to-r from-orange-500 to-yellow-500 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <FaWallet /> Crypto
          </button>

          <button
            onClick={() => setActiveTab("card")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
              activeTab === "card"
                ? "bg-linear-to-r from-orange-500 to-yellow-500 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <FaCreditCard /> Card
          </button>
        </div>

        {/* Dynamic Content Area */}
        <div className="p-8 bg-orange-50/30">
          {activeTab === "mobile" && (
            <div className="flex flex-col items-center text-center animate-fadeIn">
              {/* Icon Circle */}
              <div className="w-20 h-20 bg-linear-to-b from-green-500 to-green-400 rounded-full flex items-center justify-center text-white text-3xl mb-6 shadow-lg">
                <FaPhoneAlt />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">M-Pesa Payment</h2>
              <p className="text-gray-500 mb-8">Quick deposits via mobile money</p>

              <div className="w-full max-w-xs">
                <p className="text-left text-sm font-bold text-gray-700 mb-3">Mobile Money Provider</p>
                <div className="bg-white rounded-xl p-6 flex justify-center items-center mb-4 transition-transform hover:scale-105">
                  {/* Placeholder for M-Pesa Logo */}
                  <img 
                    src="./Mpesa.png" 
                    alt="M-Pesa" 
                    className="h-32 object-contain"
                  />
                </div>
                <p className="text-xs text-gray-400 italic">Currently, only M-Pesa is supported</p>
              </div>

              {/* Risk Disclaimer */}
              <div className="mt-10 w-full p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 text-left">
                <FaExclamationCircle className="text-red-500 mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-red-700">Risk Disclaimer</h4>
                  <p className="text-xs text-red-600 leading-relaxed">
                    Cryptocurrency trading is a high-risk business. Users should conduct their own research before making any deposits.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "crypto" && (
            <div className="py-20 text-center text-gray-500 italic">
              Crypto deposit interface goes here...
            </div>
          )}

          {activeTab === "card" && (
            <div className="py-20 text-center text-gray-500 italic">
              Card payment interface goes here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deposit;