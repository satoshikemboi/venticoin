import React from "react";

function Withdraw() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Withdraw Funds</h2>
            <form className="space-y-4">
            <div>
                <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
                Amount to Withdraw
                </label>
                <input
                type="number"
                id="amount"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter amount in USD"
                />
            </div>
            <div>
                <label htmlFor="withdrawal-method" className="block text-gray-700 font-medium mb-2">
                Withdrawal Method
                </label>
                <select
                id="withdrawal-method"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                <option value="">Select a withdrawal method</option>
                <option value="bank-transfer">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="crypto-wallet">Crypto Wallet</option>
                </select>
            </div>
            <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition-colors"
            >
                Withdraw Now
            </button>
            </form>
        </div>
        </div>
    );
    }
export default Withdraw;