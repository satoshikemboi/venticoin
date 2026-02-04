import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaWallet, FaBars, FaUser, FaTimes, FaChevronDown, FaSignOutAlt } from "react-icons/fa";

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-slate-400 font-medium">{label}:</span>
    <span className="text-slate-800 font-semibold">{value || 'N/A'}</span>
  </div>
);

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Wallet dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile sidebar
  const [isAccountOpen, setIsAccountOpen] = useState(false); // Mobile sub-menu toggle
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsProfileOpen(false); // Close profile when wallet opens
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsOpen(false); // Close wallet when profile opens
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // --- API Fetch with Error Handling ---
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch('https://remocoin.onrender.com/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        // If 404 or other error, don't try to parse as JSON
        if (!response.ok) throw new Error(`Status: ${response.status}`);

        const data = await response.json();
        setUser(data.user || data.data || data);
      } catch (error) {
        console.error("Profile fetch error:", error);
        // Error remains null, UI will show "Failed to load"
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsProfileOpen(false);
    navigate('/login');
  };

  // Helper styles
  const getLinkStyles = ({ isActive }) =>
    isActive
      ? "bg-green-500 text-white px-3 py-2 rounded font-semibold shadow-sm transition-all"
      : "text-gray-700 hover:text-green-500 font-medium px-3 py-2 transition-all";

  const getMobileLinkStyles = ({ isActive }) =>
    isActive
      ? "bg-green-100 text-green-600 font-bold p-2 rounded-lg border-l-4 border-green-500"
      : "text-gray-800 font-semibold p-2 border-b border-gray-50";

  return (
    <nav className="bg-white shadow-md px-4 md:px-6 py-3 w-full flex items-center font-nunito justify-between sticky top-0 z-100">
      
      {/* --- Left Section: Logo & Mobile Toggle --- */}
      <div className="flex items-center gap-3">
        <button className="md:hidden text-gray-600 text-xl" onClick={toggleMobileMenu}>
          <FaBars />
        </button>

        <Link to="/home" className="flex items-center gap-2">
          <button className="w-8 h-8 font-bold flex items-center justify-center">
          <img src="/coinerbot.png" alt="CoinerBot Logo" className="w-full h-full object-contain" />
          </button>
          <span className="text-green-600 font-bold text-lg md:text-xl">CoinerBot</span>
        </Link>
      </div>

      {/* --- Middle Section: Desktop Links --- */}
      <div className="hidden md:flex items-center gap-4">
        <div className="md:font-bold">
        <NavLink to="/Dashboard" className={getLinkStyles}>Dashboard</NavLink>
        <NavLink to="/Markets" className={getLinkStyles}>Markets</NavLink>
        <NavLink to="/spot-trading" className={getLinkStyles}>Spot Trading</NavLink>
        <NavLink to="/futures" className={getLinkStyles}>Futures</NavLink>
        <NavLink to="/Bots" className={getLinkStyles}>Bots</NavLink>
        </div>
        
        {/* Desktop Accounts Dropdown */}
        <div className="relative group ml-2">
          <button className="text-gray-700 font-medium md:font-bold flex items-center gap-1 hover:text-green-500 py-2">
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
        <div className="relative flex gap-2 md:gap-4 pr-2">
        <button 
  onClick={toggleDropdown} 
  className="bg-green-100 text-green-600 font-semibold px-2 md:px-3 py-1 rounded inline-flex items-center gap-1.5 hover:bg-green-200 transition-colors relative z-50 text-sm md:text-base border border-green-200/50"
>
  <FaWallet className="text-xs md:text-sm" /> 
  <span>$0.00</span> 
  <span className="text-[10px] transition-transform duration-200">
    {isOpen ? '▲' : '▼'}
  </span>
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
          {/* Profile Icon Container */}
          <div className="flex items-center gap-2 md:gap-4">
      <div className="relative flex gap-2 md:gap-4 pr-2">
        

       {/* Profile Dropdown */}
       <div className="relative">
          <button
            onClick={toggleProfile}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors border border-gray-200"
          >
            <FaUser className="w-5 h-5 text-gray-600" />
          </button>

          {isProfileOpen && (
  <>
    {/* Backdrop - Good job here */}
    <div 
      className="fixed inset-0 h-screen w-screen bg-black/5 z-40" 
      onClick={() => setIsProfileOpen(false)} 
    />
    
    <div className="absolute right-0 mt-3 w-72 bg-gray-100 rounded-2xl shadow-2xl border border-gray-100 z-50 p-5 animate-in fade-in zoom-in duration-200">
      {loading ? (
        <div className="flex flex-col items-center justify-center p-8 gap-3">
          <div className="animate-spin h-6 w-6 border-2 border-green-500 rounded-full border-t-transparent" />
          <p className="text-xs text-slate-400 font-medium">Fetching profile...</p>
        </div>
      ) : user ? (
        <div className="space-y-4 text-left">
          {/* Header Section */}
          <div className="border-b border-gray-50 pb-3">
            <h3 className="text-lg font-bold text-gray-800 truncate" title={user.name}>
              {user.name}
            </h3>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>

          {/* Details Section */}
          <div className="space-y-2">
            <DetailRow label="Phone" value={user.phoneNumber} />
            <DetailRow label="Country" value={user.country} />
          </div>

          {/* Navigation Actions */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="py-2 border border-gray-100 rounded-xl text-center text-sm font-semibold text-gray-100 bg-emerald-500 transition-colors">
              Profile
            </Link>
            <Link to="/history" onClick={() => setIsProfileOpen(false)} className="py-2 border border-gray-100 rounded-xl text-center text-sm font-semibold text-gray-100 bg-emerald-500 transition-colors">
              History
            </Link>
          </div>

          {/* Sign Out */}
          <button 
            onClick={handleSignOut} 
            className="w-full flex items-center justify-center gap-2 py-2 bg-gray-200 hover:bg-red-50 rounded-xl text-gray-800 text-sm font-bold transition-all border border-transparent hover:border-red-100"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      ) : (
        <div className="text-center p-4">
          <p className="text-sm text-red-500 font-medium mb-2">Failed to load profile</p>
          <button onClick={() => window.location.reload()} className="text-xs text-blue-500 underline">Try again</button>
        </div>
      )}
    </div>
  </>
)}
        </div>
      </div>
    </div>
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