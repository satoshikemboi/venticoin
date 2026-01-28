import React, { useState } from 'react';
import { Plus, MessageSquare, Home, Sparkles, Send } from 'lucide-react';

const Support = () => {
  const [message, setMessage] = useState('');

  const topics = [
    'How do I deposit?',
    'Withdrawal help',
    'Trading questions',
    'Account issues',
    'KYC verification'
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-nunito">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
              {/* Placeholder for Support Avatar */}
              <div className="w-full h-full bg-linear-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">RemoCoin Support</h2>
            <p className="text-xs text-emerald-500 font-medium">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          <button className="hover:text-gray-600 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
          <button className="hover:text-gray-600 transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="hover:text-gray-600 transition-colors">
            <Home className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 max-w-2xl mx-auto w-full">
        {/* Central Icon */}
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-emerald-400" />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Welcome to RemoCoin Support</h1>
          <p className="text-gray-500 text-sm">Tap a topic or type your question below</p>
        </div>

        {/* Quick Topic Bubbles */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {topics.map((topic) => (
            <button
              key={topic}
              className="px-5 py-2.5 bg-white border border-gray-100 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-200"
            >
              {topic}
            </button>
          ))}
        </div>
      </main>

      {/* Footer / Input Area */}
      <footer className="p-6 max-w-4xl mx-auto w-full">
        <div className="relative flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full py-4 pl-6 pr-16 bg-gray-50 border border-transparent rounded-full focus:bg-white focus:border-emerald-100 focus:ring-4 focus:ring-emerald-50/50 outline-none transition-all placeholder:text-gray-400 text-gray-700"
          />
          <button 
            className={`absolute right-2 p-3 rounded-full transition-all duration-300 ${
              message.trim() 
              ? 'bg-emerald-400 text-white shadow-lg shadow-emerald-100' 
              : 'bg-emerald-100 text-white cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5 fill-current" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Support;