import React, { useState, useEffect } from 'react';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('Withdrawals');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData([]); 
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const tabs = ['All Transactions', 'Deposits', 'Withdrawals'];

  return (
    // Changed p-8 to p-4 for mobile, md:p-8 for larger screens
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-nunito">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Header Section - Adjusted text sizes */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Transaction History
        </h1>
        <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8">
          View your deposit and withdrawal history
        </p>

        {/* Tab Switcher - Removed min-width, added overflow-x-auto for very small screens */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              // whitespace-nowrap prevents text wrapping on small screens
              className={`flex-1 py-2 px-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm min-h-50 flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mb-2"></div>
              <p className="text-gray-400 text-sm">Loading transactions...</p>
            </div>
          ) : (
            <div className="py-8 md:py-12 w-full">
              {data.length > 0 ? (
                <div className="text-left w-full px-4 md:px-6">
                  <p>Transaction list goes here.</p>
                </div>
              ) : (
                <p className="text-gray-400 font-medium text-sm md:text-base">
                  No {activeTab.toLowerCase()} found
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;