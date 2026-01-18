
// services/binanceService.js
import axios from 'axios';

const BASE_URL = 'https://api.binance.com/api/v3';

export const binanceService = {
  async getTickerPrice(symbol) {
    try {
      const response = await axios.get(`${BASE_URL}/ticker/price`, {
        params: { symbol: `${symbol.toUpperCase()}USDT` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching price:', error);
      throw error;
    }
  },

  async get24hrStats(symbol) {
    try {
      const response = await axios.get(`${BASE_URL}/ticker/24hr`, {
        params: { symbol: `${symbol.toUpperCase()}USDT` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching 24hr stats:', error);
      throw error;
    }
  },

  // Update your binanceService.js getKlines function
async getKlines(symbol, interval = '1d', limit = 100) {
  try {
    const response = await axios.get(`${BASE_URL}/klines`, {
      params: {
        symbol: `${symbol.toUpperCase()}USDT`,
        interval,
        limit
      }
    });
    
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response data');
    }
    
    return response.data.map(k => {
      if (!k || k.length < 6) {
        throw new Error('Invalid kline data');
      }
      
      return {
        time: parseInt(k[0]) / 1000, // Ensure it's a number
        open: parseFloat(k[1]),
        high: parseFloat(k[2]),
        low: parseFloat(k[3]),
        close: parseFloat(k[4]),
        volume: parseFloat(k[5])
      };
    });
  } catch (error) {
    console.error('Error fetching klines:', error);
    // Return sample data if API fails
    return this.getSampleData(symbol);
  }
},

getSampleData(symbol) {
  // Return sample data for fallback
  const basePrice = symbol === 'BTC' ? 95000 : 
                    symbol === 'ETH' ? 3200 : 
                    symbol === 'BNB' ? 580 : 
                    symbol === 'SOL' ? 150 : 0.5;
  
  const data = [];
  const now = Date.now() / 1000;
  
  for (let i = 100; i >= 0; i--) {
    const time = now - (i * 86400); // 1 day intervals
    const open = basePrice * (0.9 + Math.random() * 0.2);
    const close = basePrice * (0.9 + Math.random() * 0.2);
    const high = Math.max(open, close) * (1 + Math.random() * 0.05);
    const low = Math.min(open, close) * (0.95 - Math.random() * 0.05);
    
    data.push({
      time,
      open,
      high,
      low,
      close,
      volume: 1000 + Math.random() * 10000
    });
  }
  
  return data;
},
  async getOrderBook(symbol, limit = 20) {
    try {
      const response = await axios.get(`${BASE_URL}/depth`, {
        params: {
          symbol: `${symbol.toUpperCase()}USDT`,
          limit
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching order book:', error);
      throw error;
    }
  }
};