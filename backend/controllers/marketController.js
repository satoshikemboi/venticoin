
import axios from "axios";

export const getMarkets = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.binance.com/api/v3/ticker/24hr"
    );

    // Filter only major coins
    const coins = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"];

    const formatted = data
      .filter((item) => coins.includes(item.symbol))
      .map((item) => ({
        symbol: item.symbol.replace("USDT", ""),
        pair: item.symbol,
        price: Number(item.lastPrice),
        change: Number(item.priceChangePercent),
        high: Number(item.highPrice),
        volume: Number(item.volume),
        image: `/coins/${item.symbol.replace("USDT", "").toLowerCase()}.png`
      }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch market data" });
  }
};
