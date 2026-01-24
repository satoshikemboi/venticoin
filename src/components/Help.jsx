import React from 'react';
import { ArrowRight, HelpCircle, ShieldCheck, CreditCard, RefreshCw, Bot, Globe } from 'lucide-react';

const Help = () => {
  const faqData = [
    {
      question: "How do I reset my password?",
      answer: "On the login page, click on \"Forgot Password\", enter your registered email, and follow the instructions sent to your email to create a new password.",
      icon: <HelpCircle className="w-5 h-5 text-emerald-500" />
    },
    {
      question: "How do I complete the KYC verification?",
      answer: "Go to your Profile > KYC Verification and follow the step-by-step process. You'll need to provide a valid government-issued ID and a selfie to complete the verification.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />
    },
    {
      question: "What are the trading fees on FentiCoin?",
      answer: "RemoCoin charges competitive trading fees starting from 0.1% for spot trading and 0.02% for futures trading. Fee discounts are available based on your trading volume.",
      icon: <CreditCard className="w-5 h-5 text-emerald-500" />
    },
    {
      question: "What is a trading bot and how does it work?",
      answer: "Trading bots are automated programs that execute trades based on predefined strategies. RemoCoin's bots analyze market data and execute trades 24/7.",
      icon: <Bot className="w-5 h-5 text-emerald-500" />
    },
    {
      question: "How long do withdrawals take to process?",
      answer: "Cryptocurrency withdrawals are typically processed within 1-2 hours after approval. Processing times may vary depending on the cryptocurrency network congestion.",
      icon: <RefreshCw className="w-5 h-5 text-emerald-500" />
    },
    {
      question: "Is RemoCoin available in my country?",
      answer: "RemoCoin is available in most countries worldwide. However, due to regulatory restrictions, our services may be limited in certain jurisdictions.",
      icon: <Globe className="w-5 h-5 text-emerald-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a]">Frequently Asked Questions</h1>
            <p className="text-gray-500 mt-1">Quick answers to common questions about RemoCoin</p>
          </div>
          
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm w-fit">
            View All FAQs
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg shrink-0">
                  {faq.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                  {faq.question}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed ml-11">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Support CTA - Extra for UX */}
        <div className="mt-12 text-center bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Still need help?</h2>
          <p className="text-gray-500 mb-6">Our support team is available 24/7 to assist you with any issues.</p>
          <button className="inline-flex items-center px-8 py-3 bg-[#10b981] hover:bg-[#059669] text-white font-bold rounded-xl transition-all">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;