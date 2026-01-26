import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, Globe, Eye, EyeOff, ShieldCheck } from "lucide-react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isNotBot, setIsNotBot] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isNotBot) {
      alert("Please confirm you are not a bot");
      return;
    }

    if (!agreeTerms) {
      alert("Please agree to the Terms and Conditions");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch("https://remocoin.onrender.com/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          phoneNumber, 
          country 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If the server sends a 400, this will tell you exactly WHY
        alert(data.message || "Signup failed");
        return;
      }

      alert("Account created! Redirecting to login...");
      navigate("/");

    } catch (error) {
      console.error("Signup error:", error);
      alert("Network error. Is the server awake?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Top Security Badge */}
      <div className="flex items-center justify-center gap-2 w-fit mx-auto border border-emerald-200 rounded-full py-2 px-4 mb-4 bg-emerald-50 shadow-sm">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span className="text-sm font-semibold text-emerald-600 tracking-wide">
          Secure Registration
        </span>
      </div>

      <div className="text-center mb-8">
        <h1 className="md:text-3xl text-2xl font-bold text-gray-800 tracking-tight">
          Welcome to <span className="text-emerald-500">RemoCoin</span>
        </h1>
        <p className="text-gray-500 md:text-sm tracking-tight text-sm font-medium mt-1">
          Your trusted platform for cryptocurrency trading
        </p>
      </div>

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Switcher */}
        <div className="flex p-0.5 bg-gray-100 m-4 rounded-xl border border-gray-200">
          <Link to="/" className="flex-1 py-2 text-center text-sm font-bold text-gray-500 hover:text-gray-800 transition-all">
            Login
          </Link>
          <div className="flex-1 py-2 text-center text-sm font-bold bg-emerald-500 text-white rounded-lg shadow-sm">
            Sign Up
          </div>
        </div>

        <div className="px-8 pb-6">
          <h2 className="text-xl font-bold text-gray-700 tracking-tight mb-1">Create an account</h2>
          <p className="text-gray-500 text-sm tracking-tight font-medium mb-6">Enter your details to create a new account</p>

          <form className="space-y-4" onSubmit={handleSignup}>
            {/* Full Name  */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-600 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400 group-focus-within:text-emerald-500" />
                </div>
                <input type="text" placeholder="Your Name" className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>

            {/* Email */}

            <div className="space-y-1">

              <label className="block text-sm font-medium text-gray-600 ml-1">Email</label>

              <div className="relative group">

                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                  <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-emerald-500" />

                </div>

                <input

                  type="email"

                  placeholder="your@email.com"

                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"

                  value={email}

                  onChange={(e) => setEmail(e.target.value)}

                  required

                />

              </div>

            </div>

            {/* Phone & Country Grid... */}
            <div className="grid grid-cols-2 gap-4">
               {/* Phone Input */}
               <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-600 ml-1">Phone</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400 group-focus-within:text-emerald-500" />
                  </div>
                  <input type="tel" placeholder="+254..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
              </div>
              {/* Country Input */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-600 ml-1">Country</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-4 w-4 text-gray-400 group-focus-within:text-emerald-500" />
                  </div>
                  <input type="text" placeholder="Kenya" className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>
              </div>
            </div>

             {/* Password Section */}
<div className="space-y-1">
  <div className="flex justify-between items-center">
    <label className="block text-sm font-medium text-gray-600 ml-1">Password</label>
    {/* Dynamic Strength Label */}
    <span className={`text-[10px] font-bold uppercase ${
      password.length === 0 ? 'text-gray-300' :
      password.length < 6 ? 'text-red-500' :
      password.length < 10 ? 'text-yellow-500' : 'text-emerald-500'
    }`}>
      {password.length === 0 ? '' : password.length < 6 ? 'Weak' : password.length < 10 ? 'Medium' : 'Strong'}
    </span>
  </div>
  
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Lock className={`h-4 w-4 transition-colors ${password.length > 0 ? 'text-emerald-500' : 'text-gray-400'}`} />
    </div>
    <input
      type={showPassword ? "text" : "password"}
      placeholder="••••••••"
      className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
    >
      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  </div>

  {/* Strength Bar Visual */}
  <div className="flex gap-1 mt-2 h-1 px-1">
    <div className={`h-full flex-1 rounded-full transition-all duration-500 ${password.length > 0 ? (password.length < 6 ? 'bg-red-500' : 'bg-emerald-500') : 'bg-gray-200'}`}></div>
    <div className={`h-full flex-1 rounded-full transition-all duration-500 ${password.length >= 6 ? (password.length < 10 ? 'bg-yellow-500' : 'bg-emerald-500') : 'bg-gray-200'}`}></div>
    <div className={`h-full flex-1 rounded-full transition-all duration-500 ${password.length >= 10 ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
  </div>
</div>

{/* Confirm Password Section */}
<div className="space-y-1">
  <label className="block text-sm font-medium text-gray-600 ml-1">Confirm Password</label>
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Lock className={`h-4 w-4 transition-colors ${confirmPassword === password && password !== "" ? 'text-emerald-500' : 'text-gray-400'}`} />
    </div>
    <input
      type={showPassword ? "text" : "password"}
      placeholder="••••••••"
      className={`w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 outline-none transition-all ${
        confirmPassword !== "" && confirmPassword !== password 
          ? 'border-red-300 focus:ring-red-500' 
          : 'border-gray-200 focus:ring-emerald-500'
      }`}
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
    />
  </div>
  {/* Live Error Message */}
  {confirmPassword !== "" && confirmPassword !== password && (
    <p className="text-[11px] text-red-500 ml-1 animate-pulse">Passwords do not match yet</p>
  )}
</div>

            {/* Bot Checkbox Section */}
            <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-3">
              <input
                type="checkbox"
                id="bot-check"
                checked={isNotBot}
                onChange={(e) => setIsNotBot(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="bot-check" className="text-sm font-medium text-gray-600 cursor-pointer">
                I am not a robot
              </label>
              <div className="ml-auto opacity-20">
                <ShieldCheck className={`w-6 h-6 ${isNotBot ? 'text-emerald-500 opacity-100' : 'text-gray-400'}`} />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2 py-1">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4 accent-emerald-500 cursor-pointer"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label htmlFor="terms" className="text-xs text-gray-500 leading-tight cursor-pointer">
                I agree to the <Link to="/terms-of-service" className="text-emerald-600 font-semibold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-emerald-600 font-semibold hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            {/* Submit Button with Loading Spinner */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 font-bold rounded-lg shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2
                ${loading ? 'bg-emerald-300 cursor-not-allowed text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;