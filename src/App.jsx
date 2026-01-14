
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Markets from './components/Markets';
import Bots from './components/Bots';
import Dashboard from './components/Dashboard';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';

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
    <Routes>
      {/* --- Pages WITHOUT Navbar --- */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* --- Pages WITH Navbar --- */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/bots" element={<Bots />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
      </Route>
    </Routes>
  );
}

export default App;