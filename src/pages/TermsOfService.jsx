import React from 'react';
import { ArrowLeft, Shield, Scale, AlertTriangle, Lock, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Section = ({ title, children, icon: Icon }) => (
  <div className="mb-8 border-b border-gray-100 pb-8 last:border-0">
    <div className="flex items-center gap-3 mb-4">
      {Icon && <Icon className="text-blue-600 w-6 h-6" />}
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="text-gray-600 space-y-4 leading-relaxed whitespace-pre-line">
      {children}
    </div>
  </div>
);

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-nunito px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-8 text-white relative">
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-8 left-4 p-2 hover:bg-blue-700 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
            <p className="text-blue-100">Last Updated: January 2026</p>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-8 md:p-12">
          
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-amber-600" />
              <p className="text-sm text-amber-800 font-medium">
                Please read these terms carefully. Cryptocurrency trading involves significant financial risk.
              </p>
            </div>
          </div>

          {/* 1. Introduction */}
          <Section title="1. Introduction" icon={Shield}>
            Welcome to FentiCoin. These Terms of Service govern your use of our website and services. By accessing or using our platform, you agree to be bound by these Terms.
            FentiCoin provides cryptocurrency trading services including spot trading, futures trading, and automated trading through bots. These services involve financial risk and require your careful consideration before engaging.
          </Section>

          {/* 2. Definitions */}
          <Section title="2. Definitions" icon={Scale}>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>"Platform"</strong> refers to the FentiCoin website, applications, and services.</li>
              <li><strong>"Cryptocurrency"</strong> refers to digital or virtual currencies, including but not limited to Bitcoin and Ethereum.</li>
              <li><strong>"Bot Trading"</strong> refers to the use of automated trading algorithms provided by our Platform.</li>
              <li><strong>"Liquidation"</strong> refers to the process of closing a trader's position when they cannot meet margin requirements.</li>
            </ul>
          </Section>

          {/* 3 & 4. Eligibility and Registration */}
          <Section title="3 & 4. Eligibility and Account Registration" icon={Lock}>
            You must be at least 18 years old to use our services. You are responsible for maintaining the confidentiality of your Account credentials and all activities that occur under your Account. We reserve the right to request proof of identity (KYC) at any time and may suspend accounts that fail to comply with our AML policies.
          </Section>

          {/* 5. Trading Services */}
          <Section title="5. Trading Services" icon={Cpu}>
            <strong>General Conditions:</strong> We do not provide investment advice. You are solely responsible for your trading decisions.
            <br /><br />
            <strong>Bot Trading:</strong> Bot Trading services are provided on an "as is" basis. We do not guarantee performance or profitability. Technical failures, including system outages or software bugs, may result in significant financial losses. You remain solely responsible for monitoring bot activities at all times.
          </Section>
          

          {/* 10. Risk Disclosure */}
          <Section title="10. Risk Disclosure" icon={AlertTriangle}>
            Cryptocurrency prices can be extremely volatile. Leveraged trading can result in losses that exceed your initial investment. 
            <strong>Automated Bot Risks:</strong> Bots operate without human judgment and cannot adapt to unexpected market anomalies. A single error in bot configuration can result in the rapid loss of your entire account balance.
          </Section>

          {/* 17. Indemnification */}
          <Section title="17. Indemnification">
            You agree to indemnify, defend, and hold harmless FentiCoin and its officers from any claims, losses, or expenses arising from your use of the platform, your breach of these terms, or your trading decisions (including automated bot operations).
          </Section>

          {/* Additional Sections can be mapped here similarly */}
          
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm mb-6">
              By clicking "I Agree" or by using the FentiCoin platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service.
            </p>
            <button 
              onClick={() => navigate('/signup')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
            >
              Back to Sign Up
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;