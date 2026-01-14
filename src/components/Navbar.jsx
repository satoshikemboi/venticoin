import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 bg-green-500 rounded-full text-white font-bold flex items-center justify-center">
          +
        </button>
        <span className="text-green-600 font-bold text-lg">VentiCoin</span>
      </div>

      {/* Middle: Links */}
      <div className="flex items-center gap-6">
        <Link to="/Dashboard" className="flex items-center gap-1 text-white bg-green-500 px-3 py-2 rounded font-semibold hover:bg-green-600">
          Dashboard
        </Link>
        <Link to="/Markets" className="text-gray-700 hover:text-green-500 font-medium">Markets</Link>
        <Link to="/spot-trading" className="text-gray-700 hover:text-green-500 font-medium">Spot Trading</Link>
        <Link to="/futures" className="text-gray-700 hover:text-green-500 font-medium">Futures</Link>
        <Link to="/Bots" className="text-gray-700 hover:text-green-500 font-medium">Bots</Link>
        
        <div className="relative group">
          <button className="text-gray-700 font-medium flex items-center gap-1 hover:text-green-500">
            Accounts
            <span className="material-icons font-bold text-sm">⌄</span>
          </button>
          <div className="absolute top-full left-0 mt-2 w-40 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
            <Link to="/account/profile" className="block px-4 py-2 hover:bg-green-50">Profile</Link>
            <Link to="/account/settings" className="block px-4 py-2 hover:bg-green-50">Settings</Link>
          </div>
        </div>
      </div>

      {/* Right: Balance & User */}
<div className="flex items-center gap-4">
  <div className="relative">
    <button 
      onClick={toggleDropdown} 
      className="bg-green-100 text-green-600 font-semibold px-3 py-1 rounded inline-flex items-center gap-1 hover:bg-green-200 transition-colors relative z-50"
    >
      $0.00
      <span className="text-[10px]">{isOpen ? '▲' : '▼'}</span>
    </button>

    {isOpen && (
      <>
        {/* 1. THE BACKDROP */}
        <div 
          className="fixed inset-0 h-screen w-screen bg-black/5 z-40" 
          onClick={() => setIsOpen(false)}
        />

        {/* 2. THE DROPDOWN */}
        <div className="absolute right-0 mt-3 w-80 p-4 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Account Balance</h2>
          
          <div className="flex gap-2 mb-4">
            <button className="flex-1 text-xs p-2 bg-[#14d39a] text-white font-bold rounded-lg">Real</button>
            <button className="flex-1 text-xs bg-gray-50 text-gray-800 font-bold rounded-lg border border-gray-200">Demo</button>
          </div>

          <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-lg border border-[#eef2f8] mb-4">
            <span className="text-[#6b7c93] text-sm font-medium">Current Balance</span>
            <span className="text-lg font-semibold text-[#0a1f44]">$0.00</span>
          </div>

          <div className="flex gap-3 text-center">
            <Link to="/Deposit" 
            onClick={() => setIsOpen(false)}
             className="flex-1 py-2 bg-[#10a37f] text-white text-sm font-bold rounded-lg">Deposit</Link>
            <Link to="/Withdraw"
            onClick={() => setIsOpen(false)}
            className="flex-1 py-2 bg-[#e93370] text-white text-sm font-bold rounded-lg">Withdraw</Link>
          </div>
        </div>
      </>
    )}
  </div>

  <FaUserCircle className="text-4xl text-gray-700 cursor-pointer hover:text-green-500" />
</div>
    </nav>
  );
}

export default Navbar;
