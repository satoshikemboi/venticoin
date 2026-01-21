
import React, { useState, useEffect } from 'react';
import { Copy, XCircle, Clock } from 'lucide-react'; // Using lucide-react for icons

const assets = [
  { 
    id: 'btc', 
    name: 'Bitcoin', 
    symbol: 'BTC', 
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',  
    rate: 0.000016,
    walletAddress: 'bc1qskjvgmpjj9hqq0z0eqwszf32ulykp64efqa65l',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bc1qskjvgmpjj9hqq0z0eqwszf32ulykp64efqa65l',
  },
  { 
    id: 'eth', 
    name: 'Ethereum', 
    symbol: 'ETH', 
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', 
    rate: 0.00042 ,
    walletAddress: '0x34F55FB0B72ff2e9258165C338Bd60e33856F451',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=0x34F55FB0B72ff2e9258165C338Bd60e33856F451',
  },
  { id: 'usdt', 
    name: 'Tether', 
    symbol: 'USDT', 
    logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png', 
    rate: 1 ,
    walletAddress: 'TXLzPGGfAeAX7jyw5pRnyfAq5TwTXmuw5r',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TXLzPGGfAeAX7jyw5pRnyfAq5TwTXmuw5r',
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    rate: 0.005,
    walletAddress: '5DWMmYgeMVVv8dF3JYpmyownxhGVHNqHwHXJJPQdJx1r',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=5DWMmYgeMVVv8dF3JYpmyownxhGVHNqHwHXJJPQdJx1r',
  },
  {
    id: 'usdc',
    name: 'USD Coin',
    symbol: 'USDC',
    logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    rate: 1,
    walletAddress: '0x34F55FB0B72ff2e9258165C338Bd60e33856F451',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=0x34F55FB0B72ff2e9258165C338Bd60e33856F451',
  }
];

export default function CryptoPaymentFlow() {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [amount, setAmount] = useState('25');
  const [timeLeft, setLeft] = useState(900); // 15 minutes in seconds

  // Timer Logic
  useEffect(() => {
    if (!isGenerated || timeLeft <= 0) return;
    const timer = setInterval(() => setLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isGenerated, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Address copied!");
  };

  // --- VIEW 1: SELECTION ---
  if (!selectedAsset) {
    return (
      <div className="flex flex-col gap-4 p-4 md:p-6 w-full max-w-[95%] md:max-w-md mx-auto min-h-screen">
        <h2 className="font-bold text-xl text-gray-600 text-center mb-2">Select Asset</h2>
        <div className="grid grid-cols-1 gap-3">
          {assets.map(asset => (
            <div key={asset.id} onClick={() => setSelectedAsset(asset)} 
                 className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm active:scale-95">
              <img src={asset.logo} className="w-8 h-8 md:w-10 md:h-10" alt={asset.name} />
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">{asset.name}</span>
                <span className="text-xs text-gray-400">{asset.symbol}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- VIEW 2: PAYMENT CREATED ---
  if (isGenerated) {
    const cryptoAmount = (parseFloat(amount) * selectedAsset.rate).toFixed(6);

    return (
        <div className="flex flex-col gap-4 p-4 md:p-6 w-full max-w-[95%] md:max-w-md mx-auto bg-[#f8faff] min-h-screen">
          <div className="bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Payment Created</h2>
            <div className="flex items-center gap-2 mt-1">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
               </span>
               <p className="text-gray-500 text-xs md:text-sm">Status: <span className="text-blue-500 font-medium">Waiting for Deposit...</span></p>
            </div>
            
            <p className="text-sm font-semibold text-gray-700 mt-4 leading-relaxed">
              Send exactly <span className="text-blue-600 font-bold">{cryptoAmount} {selectedAsset.symbol}</span>
            </p>
            
            <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full font-bold mt-4 text-[10px] md:text-xs">
               <Clock size={14} />
               <span>{formatTime(timeLeft)} remaining</span>
            </div>
      
            <div className="my-6 p-3 md:p-4 bg-white rounded-2xl shadow-xl border border-gray-50">
              <img src={selectedAsset.qrCode} alt="Payment QR" className="w-28 h-28 md:w-36 md:h-36" />
            </div>
      
            <div className="w-full text-left mb-6">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 tracking-wider">{selectedAsset.symbol} Address</label>
              <div className="w-full flex items-center bg-gray-50 border border-blue-100 rounded-xl overflow-hidden mt-1 group">
                <div className="flex-1 p-3 text-[9px] md:text-[11px] font-mono text-gray-600 truncate">
                  {selectedAsset.walletAddress}
                </div>
                <button 
                  onClick={() => copyToClipboard(selectedAsset.walletAddress)} 
                  className="p-3 bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors border-l border-blue-100"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
      
            <div className="w-full bg-[#f0f5ff] rounded-2xl p-4 md:p-5 mb-6 text-left">
              <h3 className="text-blue-700 font-bold text-[10px] uppercase tracking-widest mb-4">Payment Summary</h3>
              <div className="space-y-3 text-xs md:text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Fiat Amount:</span>
                  <span className="font-bold text-gray-800">${parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Crypto Amount:</span>
                  <span className="font-bold text-gray-800">{cryptoAmount} {selectedAsset.symbol}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Network:</span>
                  <span className="font-bold text-blue-600 px-2 py-0.5 bg-blue-100 rounded-md">Mainnet</span>
                </div>
              </div>
            </div>
      
            <button 
              onClick={() => { setIsGenerated(false); setSelectedAsset(null); }}
              className="w-full py-3.5 bg-red-50 text-red-500 font-bold rounded-2xl hover:bg-red-100 transition-all text-sm active:scale-95"
            >
               Cancel Transaction
            </button>
          </div>
        </div>
      );
  }

  // --- VIEW 3: INITIAL DEPOSIT SCREEN ---
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full max-w-[95%] md:max-w-md mx-auto bg-[#f8faff] min-h-screen">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-800 text-xs md:text-sm ml-1">Deposit Amount (USD)</label>
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 font-bold text-lg">$</span>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            className="w-full pl-10 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-lg font-medium shadow-sm" 
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-3xl shadow-2xl shadow-blue-100 flex items-center justify-center bg-white border border-gray-50 p-4 mb-6 transform -rotate-3 hover:rotate-0 transition-transform">
          <img src={selectedAsset.logo} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">{selectedAsset.symbol} Deposit</h2>
        <p className="text-gray-400 text-xs md:text-sm mt-2 px-2 leading-relaxed">Securely generate your {selectedAsset.name} deposit address below.</p>

        <div className="w-full bg-[#f9fbff] rounded-3xl p-5 my-8 text-xs md:text-sm border border-blue-50/50">
          <h3 className="text-blue-700 font-black text-left mb-4 uppercase tracking-tighter">System Checks</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-gray-500">
                <span>Fee:</span>
                <span className="font-bold text-gray-700">0.5%</span>
            </div>
            <div className="flex justify-between items-center text-gray-500">
                <span>ETA:</span>
                <span className="font-bold text-gray-700">Instant - 30m</span>
            </div>
            <div className="flex justify-between items-center text-gray-500">
                <span>Minimum:</span>
                <span className="font-bold text-gray-700">$25.00</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsGenerated(true)}
          disabled={parseFloat(amount) < 25}
          className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl shadow-lg shadow-blue-200 hover:shadow-xl hover:translate-y-0.5 transition-all disabled:opacity-50 disabled:grayscale active:scale-95"
        >
          Generate Payment Address
        </button>
      </div>
    </div>
  );
}