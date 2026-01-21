import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Wrong user details");
      return;
    }

    try {
      const res = await fetch("https://remocoin.onrender.com/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log(data);

    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to VentiCoin</h1>
        <p className="text-gray-500 mt-1">
          Your trusted platform for cryptocurrency trading
        </p>
      </div>

      <div className="w-full max-w-lg bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <Link
            to="/"
            className="flex-1 py-4 text-center text-sm font-semibold text-green-600 bg-gray-50 hover:bg-gray-100"
          >
            Login
          </Link>
          <div className="flex-1 py-4 text-center text-sm font-semibold bg-green-500 text-white">
            Sign Up
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
          <p className="text-gray-400 text-sm mb-6 mt-1">
            Enter your details to create a new account
          </p>

          <form className="space-y-4" onSubmit={handleSignup}>
            {/* Full Name */}
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2.5 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Email */}
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2.5 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2.5 border rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
