import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaWallet, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Wallet dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile sidebar
  const [isAccountOpen, setIsAccountOpen] = useState(false); // Mobile sub-menu toggle

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // --- LOGIC: Redirect to warning page instead of showing popup ---
  const handleFuturesClick = (e) => {
    const hasAccepted = sessionStorage.getItem("futures_accepted");
    
    if (!hasAccepted) {
      // 1. Prevent direct navigation to /futures
      e.preventDefault(); 
      // 2. Close mobile menu if it's open
      setIsMobileMenuOpen(false); 
      // 3. Send them to the dedicated warning component page
      navigate("/futures"); 
    }
  };

  // Helper function for active link styles
  const getLinkStyles = ({ isActive }) =>
    isActive
      ? "bg-green-500 text-white px-3 py-2 rounded font-semibold shadow-sm transition-all"
      : "text-gray-700 hover:text-green-500 font-medium px-3 py-2 transition-all";

  const getMobileLinkStyles = ({ isActive }) =>
    isActive
      ? "bg-green-100 text-green-600 font-bold p-2 rounded-lg border-l-4 border-green-500"
      : "text-gray-800 font-semibold p-2 border-b border-gray-50";

  return (
    <nav className="bg-white shadow-md px-4 md:px-6 py-4 flex items-center font-nunito justify-between sticky top-0 z-100">
      
      {/* --- Left Section: Logo & Mobile Toggle --- */}
      <div className="flex items-center gap-3">
        <button className="md:hidden text-gray-600 text-2xl" onClick={toggleMobileMenu}>
          <FaBars />
        </button>

        <Link to="/home" className="flex items-center gap-2">
          <button className="w-8 h-8 bg-green-500 rounded-full text-white font-bold flex items-center justify-center">
            +
          </button>
          <span className="text-green-600 font-bold text-xl">CoinerBot</span>
        </Link>
      </div>

      {/* --- Middle Section: Desktop Links --- */}
      <div className="hidden md:flex items-center gap-4">
        <NavLink to="/Dashboard" className={getLinkStyles}>Dashboard</NavLink>
        <NavLink to="/Markets" className={getLinkStyles}>Markets</NavLink>
        <NavLink to="/spot-trading" className={getLinkStyles}>Spot Trading</NavLink>
        <NavLink to="/futures" className={getLinkStyles}>Futures</NavLink>
        <NavLink to="/Bots" className={getLinkStyles}>Bots</NavLink>
        
        {/* Desktop Accounts Dropdown */}
        <div className="relative group ml-2">
          <button className="text-gray-700 font-medium flex items-center gap-1 hover:text-green-500 py-2">
            Account <FaChevronDown className="text-[10px]" />
          </button>
          <div className="absolute font-medium top-full left-0 mt-1 w-48 bg-white border border-gray-100 rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50">
            <Link to="/deposit" className="block px-4 py-2 hover:bg-green-50">Deposit</Link>
            <Link to="/withdraw" className="block px-4 py-2 hover:bg-green-50">Withdraw</Link>
            <Link to="/transactions" className="block px-4 py-2 hover:bg-green-50">Transactions</Link>
            <Link to="/profile" className="block px-4 py-2 hover:bg-green-50">Profile</Link>
            <Link to="/verification" className="block px-4 py-2 hover:bg-green-50">Verification (KYC)</Link>
            <Link to="/support" className="block px-4 py-2 hover:bg-green-50">Live Support</Link>
            <Link to="/help" className="block px-4 py-2 hover:bg-green-50">Help center</Link>
          </div>
        </div>
      </div>

      {/* --- Right Section: Balance & Wallet --- */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative pr-2">
          <button onClick={toggleDropdown} className="bg-green-100 text-green-600 font-semibold px-2 py-2 md:px-3 md:py-1 rounded inline-flex items-center gap-1 hover:bg-green-200 transition-colors relative z-50 text-md md:text-base">
            <FaWallet /> $0.00 <span className="text-[10px]">{isOpen ? '▲' : '▼'}</span>
          </button>

          {isOpen && (
            <>
              <div className="fixed inset-0 h-screen w-screen bg-black/10 z-40" onClick={() => setIsOpen(false)} />
              <div className="absolute right-0 mt-3 w-70 md:w-80 p-4 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">
                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Account Balance</h2>
                <div className="flex gap-2 mb-4">
                  <button className="flex-1 text-sm py-2 bg-[#14d39a] text-white font-bold rounded-lg">Real</button>
                  <button className="flex-1 text-sm py-2 bg-gray-50 text-gray-800 font-bold rounded-lg border border-gray-200">Demo</button>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#f8fbff] rounded-lg border border-[#eef2f8] mb-4">
                  <span className="text-[#6b7c93] text-sm font-medium">Current Balance</span>
                  <span className="text-lg font-semibold text-[#0a1f44]">$0.00</span>
                </div>
                <div className="flex gap-3 text-center">
                  <Link to="/Deposit" onClick={() => setIsOpen(false)} className="flex-1 py-2 bg-[#10a37f] text-white text-sm font-bold rounded-lg">Deposit</Link>
                  <Link to="/Withdraw" onClick={() => setIsOpen(false)} className="flex-1 py-2 bg-[#e93370] text-white text-sm font-bold rounded-lg">Withdraw</Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* --- Mobile Sidebar Overlay --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-110 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={toggleMobileMenu} />
          <div className="fixed top-0 left-0 bottom-0 w-3/4 max-w-sm bg-white shadow-xl flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <span className="text-green-600 font-bold text-xl">Navigation</span>
              <button onClick={toggleMobileMenu} className="text-2xl font-light text-gray-600"><FaTimes /></button>
            </div>

            <nav className="flex flex-col gap-2">
              <NavLink to="/Dashboard" onClick={toggleMobileMenu} className={getMobileLinkStyles}>Dashboard</NavLink>
              <NavLink to="/Markets" onClick={toggleMobileMenu} className={getMobileLinkStyles}>Markets</NavLink>
              <NavLink to="/spot-trading" onClick={toggleMobileMenu} className={getMobileLinkStyles}>Spot Trading</NavLink>
              <NavLink to="/futures" onClick={toggleMobileMenu} className={getMobileLinkStyles}>Futures</NavLink>
              <NavLink to="/Bots" onClick={toggleMobileMenu} className={getMobileLinkStyles}>Bots</NavLink>
              
              {/* Mobile Accounts Accordion */}
              <div className="mt-2 text-left">
                <button 
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="w-full flex justify-between items-center text-gray-800 font-semibold p-3 border-b"
                >
                  Accounts <FaChevronDown className={`transition-transform duration-200 ${isAccountOpen ? 'rotate-180' : ''}`} />
                </button>
                {isAccountOpen && (
                  <div className="bg-gray-50 flex flex-col pl-4 text-sm text-gray-600">
                    <Link to="/deposit" onClick={toggleMobileMenu} className="p-3 border-b border-gray-100">Deposit</Link>
                    <Link to="/withdraw" onClick={toggleMobileMenu} className="p-3 border-b border-gray-100">Withdraw</Link>
                    <Link to="/transactions" onClick={toggleMobileMenu} className="p-3 border-b border-gray-100">Transactions</Link>
                    <Link to="/profile" onClick={toggleMobileMenu} className="p-3 border-b border-gray-100">Profile</Link>
                    <Link to="/verification" onClick={toggleMobileMenu} className="p-3 border-b border-gray-100">Verification (KYC)</Link>
                    <Link to="/support" onClick={toggleMobileMenu} className="p-3">Live Support</Link>
                    <Link to="/help" onClick={toggleMobileMenu} className="p-3 border-t border-gray-100">Help center</Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;