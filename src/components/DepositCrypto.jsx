
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
      <div className="flex flex-col gap-4 p-6 max-w-md mx-auto">
        <h2 className="font-bold text-xl text-gray-600 text-center">Select Asset</h2>
        {assets.map(asset => (
          <div key={asset.id} onClick={() => setSelectedAsset(asset)} className="flex items-center gap-4 p-4 border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-all shadow-md">
            <img src={asset.logo} className="w-8 h-8" alt={asset.name} />
            <span className="font-bold">{asset.name}</span>
          </div>
        ))}
      </div>
    );
  }

  // --- VIEW 2: PAYMENT CREATED ---
  if (isGenerated) {
    const cryptoAmount = (parseFloat(amount) * selectedAsset.rate).toFixed(2);

    return (
        <div className="flex flex-col gap-4 p-6 max-w-md mx-auto bg-[#f8faff] min-h-screen">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <h2 className="text-xl font-bold text-gray-900">Payment Created</h2>
            <p className="text-gray-500 text-sm mt-1">Status: <span className="text-blue-500 font-medium animate-pulse">Waiting for Deposit...</span></p>
            
            <p className="text-sm font-semibold text-gray-700 mt-2">
              Please send exactly <span className="text-blue-600">{cryptoAmount} {selectedAsset.symbol}</span>
            </p>
            
            {/* Timer with a slight background for visibility */}
            <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-3 py-1 rounded-full font-bold mt-3 text-xs">
               <Clock size={14} />
               <span>{formatTime(timeLeft)} remaining</span>
            </div>
      
            {/* QR Code with "Click to Enlarge" feel */}
            <div className="my-6 p-4 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
              <img 
                src={selectedAsset.qrCode} 
                alt="Payment QR" 
                className="w-32 h-32" 
              />
            </div>
      
            {/* Address Bar with Label */}
            <div className="w-full text-left mb-6">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">{selectedAsset.symbol} Address</label>
              <div className="w-full flex items-center bg-gray-50 border border-blue-100 rounded-xl overflow-hidden mt-1">
                <div className="flex-1 p-3 text-[10px] font-sans text-gray-600 truncate">
                  {selectedAsset.walletAddress}
                </div>
                <button 
                  onClick={() => copyToClipboard(selectedAsset.walletAddress)} 
                  className="p-3 text-blue-500 hover:bg-blue-100 transition-colors"
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>
      
            {/* Payment Info Table */}
            <div className="w-full bg-[#f0f5ff] rounded-2xl p-5 mb-6">
              <h3 className="text-blue-700 font-bold text-left text-xs uppercase tracking-wider mb-4">Payment Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Amount in USD:</span>
                  <span className="font-bold text-gray-800">${parseFloat(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Amount in {selectedAsset.symbol}:</span>
                  <span className="font-bold text-gray-800">{cryptoAmount}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Network:</span>
                  <span className="font-bold text-blue-600 text-xs">Mainnet</span>
                </div>
              </div>
            </div>
      
            <button 
              onClick={() => { setIsGenerated(false); setSelectedAsset(null); }}
              className="w-full py-3 bg-[#f14668] text-white font-bold rounded-2xl shadow-md hover:bg-red-600 transition-all flex items-center justify-center gap-2"
            >
               Cancel Payment
            </button>
          </div>
        </div>
      );
  }

  // --- VIEW 3: INITIAL DEPOSIT SCREEN (Image 1) ---
  return (
    <div className="flex flex-col gap-6 p-6 max-w-md mx-auto bg-[#f8faff] min-h-screen">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-800 text-sm">Amount (USD)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 font-semibold">$</span>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full pl-8 pr-4 py-3 border border-blue-200 rounded-xl outline-none" />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center bg-white border border-gray-50 p-3 mb-4">
          <img src={selectedAsset.logo} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{selectedAsset.symbol} Deposit</h2>
        <p className="text-gray-400 text-sm mt-1">Enter an amount and click "Generate Payment Address"</p>

        <div className="w-full bg-[#f0f5ff] rounded-2xl p-5 my-6 text-sm">
          <h3 className="text-blue-700 font-bold text-left mb-3">Transaction Information</h3>
          <div className="flex justify-between mb-2"><span>Processing Fee:</span><span className="font-bold">0.5%</span></div>
          <div className="flex justify-between mb-2"><span>Processing Time:</span><span className="font-bold">~30 minutes</span></div>
          <div className="flex justify-between"><span>Min. Deposit:</span><span className="font-bold">$25.00</span></div>
        </div>

        <button 
          onClick={() => setIsGenerated(true)}
          className="w-full py-2 bg-linear-to-r from-[#4481eb] to-[#a43fed] text-white font-bold rounded-2xl shadow-md"
        >
          Generate Payment Address
        </button>
      </div>
    </div>
  );
}