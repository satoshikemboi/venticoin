import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Markets from './components/Markets';
import Bots from './components/Bots';
import Dashboard from './components/Dashboard';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import DepositCrypto from './components/DepositCrypto';
import Mpesa from './components/Mpesa';
import Card from './components/Card';
import SpotTrading from './components/SpotTrading';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FuturesModal from './components/FuturesModal';
import Transactions from './components/Transactions';
import Verification from './components/Verification';
import Support from './components/Support';
import Help from './components/Help';
import Profile from './components/Profile';

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
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* --- Pages WITHOUT Navbar --- */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* --- Pages WITH Navbar --- */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/markets" element={<Markets />} />
          
          {/* --- UPDATED BOTS ROUTING --- */}
          {/* 1. Redirect /bots to a default category like /bots/dca */}
          <Route path="/bots" element={<Navigate to="/bots/dca" replace />} />
          {/* 2. Dynamic route for categories */}
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
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;