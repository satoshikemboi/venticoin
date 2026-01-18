
// components/OrderForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { binanceService } from '../services/binanceService';

const OrderForm = ({ activeMarket, onPlaceOrder }) => {
  const [side, setSide] = useState('buy');
  const [orderType, setOrderType] = useState('market');
  const [amount, setAmount] = useState('');
  
  const { data: priceData } = useQuery({
    queryKey: ['price', activeMarket],
    queryFn: () => binanceService.getTickerPrice(activeMarket),
    refetchInterval: 1000,
  });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      amount: '',
      limitPrice: '',
    },
  });

  const currentPrice = priceData ? parseFloat(priceData.price) : 0;

  const handlePercentage = (percentage) => {
    const balance = 10000; // Simulated balance
    const maxAmount = balance / currentPrice;
    const calculatedAmount = maxAmount * (percentage / 100);
    setAmount(calculatedAmount.toFixed(4));
    setValue('amount', calculatedAmount.toFixed(4));
  };

  const onSubmit = (data) => {
    const order = {
      side,
      type: orderType,
      market: activeMarket,
      amount: parseFloat(data.amount),
      price: orderType === 'limit' ? parseFloat(data.limitPrice) : currentPrice,
      timestamp: new Date().toISOString(),
    };
    
    onPlaceOrder(order);
    setAmount('');
    setValue('amount', '');
    setValue('limitPrice', '');
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
      <div className="p-6 md:p-8 space-y-6">
        <h3 className="text-lg font-bold text-slate-800">Place Order</h3>
        
        {/* Buy/Sell Toggle */}
        <div className="flex bg-slate-50 rounded-2xl p-1.5">
          <button
            type="button"
            onClick={() => setSide('buy')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${side === 'buy' ? 'bg-[#10B981] text-white shadow-sm' : 'text-slate-400'}`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => setSide('sell')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${side === 'sell' ? 'bg-[#EF4444] text-white shadow-sm' : 'text-slate-400'}`}
          >
            Sell
          </button>
        </div>

        {/* Order Type Toggle */}
        <div className="flex bg-slate-50 rounded-2xl p-1.5">
          <button
            type="button"
            onClick={() => setOrderType('market')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${orderType === 'market' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
          >
            Market
          </button>
          <button
            type="button"
            onClick={() => setOrderType('limit')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${orderType === 'limit' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
          >
            Limit
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Limit Price Input (only for limit orders) */}
          {orderType === 'limit' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Price (USDT)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('limitPrice', {
                    required: orderType === 'limit' ? 'Price is required' : false,
                    min: { value: 0.01, message: 'Price must be greater than 0' },
                  })}
                  placeholder={currentPrice.toFixed(2)}
                  className="w-full bg-slate-50 rounded-2xl py-3 px-5 font-bold text-base border-none focus:ring-2 focus:ring-emerald-100 outline-none"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                  USDT
                </span>
              </div>
              {errors.limitPrice && (
                <p className="text-sm text-red-500">{errors.limitPrice.message}</p>
              )}
            </div>
          )}

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Amount ({activeMarket})
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.0001"
                min="0"
                {...register('amount', {
                  required: 'Amount is required',
                  min: { value: 0.0001, message: 'Amount must be greater than 0' },
                })}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-50 rounded-2xl py-3 px-5 font-bold text-lg border-none focus:ring-2 focus:ring-emerald-100 outline-none"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                {activeMarket}
              </span>
            </div>
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount.message}</p>
            )}
          </div>

          {/* Percentage Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[25, 50, 75, 100].map((percentage) => (
              <button
                key={percentage}
                type="button"
                onClick={() => handlePercentage(percentage)}
                className="py-2.5 bg-slate-50 rounded-xl text-[10px] font-bold text-slate-500 hover:bg-slate-100 transition-colors uppercase"
              >
                {percentage}%
              </button>
            ))}
          </div>

          {/* Balance Info */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium">Available Balance</span>
              <span className="font-bold text-slate-800 tracking-tight">
                $10,000.00 USDT
              </span>
            </div>
            {amount && (
              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <span className="text-slate-400 font-medium">Estimated Cost</span>
                <span className="font-bold text-slate-800 tracking-tight">
                  $
                  {(
                    parseFloat(amount || 0) *
                    (orderType === 'limit' && watch('limitPrice')
                      ? parseFloat(watch('limitPrice'))
                      : currentPrice)
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-transform active:scale-[0.98] shadow-lg ${
              side === 'buy'
                ? 'bg-[#10B981] shadow-emerald-50 hover:bg-emerald-600'
                : 'bg-[#EF4444] shadow-red-50 hover:bg-red-600'
            }`}
          >
            {side === 'buy' ? `Buy ${activeMarket}` : `Sell ${activeMarket}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;