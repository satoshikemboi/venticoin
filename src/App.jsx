import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages & Components
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import TermsOfService from './pages/TermsOfService';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav'; // Ensure this path is correct
import Markets from './components/Markets';
import Bots from './components/Bots';
import Dashboard from './components/Dashboard';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import DepositCrypto from './components/DepositCrypto';
import Mpesa from './components/Mpesa';
import Card from './components/Card';
import SpotTrading from './components/SpotTrading';
import FuturesModal from './components/FuturesModal';
import Transactions from './components/Transactions';
import Verification from './components/Verification';
import Support from './components/Support';
import Help from './components/Help';
import Profile from './components/Profile';
import PersonalInformation from './components/PersonalInformation';
import ProfileCard from './components/ProfileCard';
import Security from './components/Security';
import Preferences from './components/Preferences';
import History from './components/History';
import DcaConfigure from './components/DcaConfigure';
import GridConfigure from './components/GridConfigure';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 10000,
    },
  },
});

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="grow pb-20 md:pb-0">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* --- Pages WITHOUT Navbar or BottomNav --- */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

        {/* --- Pages WITH Navbar and BottomNav --- */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/markets" element={<Markets />} />
          
          {/* Bots Routing */}
          <Route path="/bots" element={<Navigate to="/bots/dca" replace />} />
          <Route path="/bots/:category" element={<Bots />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/deposit/crypto" element={<DepositCrypto />} />
          <Route path="/mpesa" element={<Mpesa />} />
          <Route path="/card" element={<Card />} />
          <Route path="/spot-trading" element={<SpotTrading />} />
          <Route path="/futures" element={<FuturesModal />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/support" element={<Support />} />
          <Route path="/help" element={<Help/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/personal-information" element={<PersonalInformation />} />
          <Route path="/profilecard" element={<ProfileCard />} />
          <Route path="/security" element={<Security />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/history" element={<History />} />
          <Route path="/bots/dca/configure" element={<DcaConfigure />} />
          <Route path="/bots/grid/configure" element={<GridConfigure />} />
        </Route>

        {/* Fallback for 404 - Optional */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;