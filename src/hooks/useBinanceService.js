
// services/binanceService.js
import axios from 'axios';

const BASE_URL = 'https://api.binance.com/api/v3';

export const binanceService = {
  // Get current price
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

  // Get 24hr ticker stats
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

  // Get klines/candlestick data
  async getKlines(symbol, interval = '1d', limit = 100) {
    try {
      const response = await axios.get(`${BASE_URL}/klines`, {
        params: {
          symbol: `${symbol.toUpperCase()}USDT`,
          interval,
          limit
        }
      });
      return response.data.map(k => ({
        time: k[0] / 1000, // Convert to seconds
        open: parseFloat(k[1]),
        high: parseFloat(k[2]),
        low: parseFloat(k[3]),
        close: parseFloat(k[4]),
        volume: parseFloat(k[5])
      }));
    } catch (error) {
      console.error('Error fetching klines:', error);
      throw error;
    }
  },

  // Get order book
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
  },

  // Get recent trades
  async getRecentTrades(symbol, limit = 20) {
    try {
      const response = await axios.get(`${BASE_URL}/trades`, {
        params: {
          symbol: `${symbol.toUpperCase()}USDT`,
          limit
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching trades:', error);
      throw error;
    }
  }
};