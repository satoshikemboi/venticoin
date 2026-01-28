import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const FuturesModal = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    sessionStorage.setItem("futures_accepted", "true");
    navigate("/futures"); // Go to the actual trading page
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 font-nunito bg-gray-50">
      <div className="bg-white w-full max-w-md rounded-4xl p-10 shadow-xl flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mb-6">
          <FaExclamationTriangle className="text-yellow-500 text-3xl" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-4">High Risk Trading</h2>
        <p className="text-slate-500 mb-8 font-medium">
          Futures trading involves substantial risk. Please ensure you fully understand the risks involved before proceeding.
        </p>
        <button
          onClick={handleConfirm}
          className="w-full bg-[#10B981] hover:bg-[#0da673] text-white font-bold py-2 rounded-lg shadow-lg transition-all"
        >
          I Understand
        </button>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-4 text-slate-400 text-xs font-bold uppercase tracking-widest"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default FuturesModal;