
// components/OrderBook.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { binanceService } from '../services/binanceService';

const OrderBook = ({ activeMarket }) => {
  const { data: orderBook, isLoading } = useQuery({
    queryKey: ['orderBook', activeMarket],
    queryFn: () => binanceService.getOrderBook(activeMarket, 20),
    refetchInterval: 1000,
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/3"></div>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-8 bg-slate-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const asks = orderBook.asks.slice(0, 10).map(ask => ({
    price: parseFloat(ask[0]),
    amount: parseFloat(ask[1]),
    total: parseFloat(ask[0]) * parseFloat(ask[1]),
  }));

  const bids = orderBook.bids.slice(0, 10).map(bid => ({
    price: parseFloat(bid[0]),
    amount: parseFloat(bid[1]),
    total: parseFloat(bid[0]) * parseFloat(bid[1]),
  }));

  const spread = asks[0]?.price - bids[0]?.price;
  const spreadPercentage = (spread / bids[0]?.price) * 100;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Order Book</h3>
        <div className="text-sm text-slate-500">
          Spread: ${spread.toFixed(2)} ({spreadPercentage.toFixed(2)}%)
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Asks (Sell Orders) */}
        <div>
          <div className="grid grid-cols-3 gap-2 mb-2 pb-2 border-b border-slate-100">
            <div className="text-xs font-bold text-slate-500 text-right">Price</div>
            <div className="text-xs font-bold text-slate-500 text-right">Amount</div>
            <div className="text-xs font-bold text-slate-500 text-right">Total</div>
          </div>
          <div className="space-y-1">
            {asks.map((ask, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 hover:bg-red-50 p-1 rounded">
                <div className="text-sm font-medium text-red-500 text-right">
                  ${ask.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-slate-600 text-right">{ask.amount.toFixed(4)}</div>
                <div className="text-sm text-slate-600 text-right">${ask.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bids (Buy Orders) */}
        <div>
          <div className="grid grid-cols-3 gap-2 mb-2 pb-2 border-b border-slate-100">
            <div className="text-xs font-bold text-slate-500 text-right">Price</div>
            <div className="text-xs font-bold text-slate-500 text-right">Amount</div>
            <div className="text-xs font-bold text-slate-500 text-right">Total</div>
          </div>
          <div className="space-y-1">
            {bids.map((bid, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 hover:bg-emerald-50 p-1 rounded">
                <div className="text-sm font-medium text-emerald-500 text-right">
                  ${bid.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-slate-600 text-right">{bid.amount.toFixed(4)}</div>
                <div className="text-sm text-slate-600 text-right">${bid.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;