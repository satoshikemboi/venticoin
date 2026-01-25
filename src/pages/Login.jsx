
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("https://remocoin.onrender.com/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/home");

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Badge */}
      <div className="flex items-center justify-center gap-2 w-fit mx-auto border border-emerald-200 rounded-full py-2 px-4 mb-4 bg-emerald-50 shadow-sm">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span className="text-sm font-semibold text-emerald-600 tracking-wide">
          Secure Authentication
        </span>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="md:text-3xl text-2xl font-bold text-gray-800 tracking-tight">
          Welcome to {' '}
          <span className="text-emerald-500">RemoCoin</span>
        </h1>
        <p className="text-gray-500 md:text-sm tracking-tight text-sm font-medium mt-1">
          Your trusted platform for cryptocurrency trading
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="w-full max-w-lg mb-1 p-1 bg-gray-200/50 rounded-xl flex">
        <div className="flex-1 py-2 text-center text-sm font-bold bg-emerald-400 text-gray-100 rounded-lg shadow-sm">
          Login
        </div>
        <Link
          to="/signup"
          className="flex-1 py-2 text-center text-sm font-bold text-gray-500 hover:text-gray-800 transition-all"
        >
          Sign Up
        </Link>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-700 tracking-tight mb-1">Login to your account</h2>
          <p className="text-gray-400 font-medium text-sm mb-6 tracking-tight">
            Enter your email and password to access your account
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="space-y-1">
              <label className="block font-medium text-gray-600 text-sm ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block font-medium text-gray-600 text-sm ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs py-1">
                <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500" />
                    Remember me
                </label>
                <Link to="/forgot-password" size="sm" className="text-emerald-600 font-semibold hover:underline">
                    Forgot Password?
                </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 font-bold rounded-lg transition-all shadow-md active:scale-[0.98]
                ${loading ? 'bg-emerald-200 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200'}`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Logging in...
                </div>
              ) : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;