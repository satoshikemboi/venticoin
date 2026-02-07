// --- DATA STORE ---
export const BOTS_DATA = {
    dca: {
      title: "Dollar-Cost Averaging",
      description: "Regular purchases of assets regardless of price to minimize volatility.",
      items: [
        { id: 1, title: "Bitcoin Accumulation", schedule: "Weekly.DCA", description: "Dollar-cost averaging into Bitcoin on a weekly basis.", risk: "Low", performance: "+2.4%", status: "Inactive", primaryAction: "Run Bot" },
        { id: 2, title: "ETH DCA Pro", schedule: "Daily.DCA", description: "Dynamic DCA based on RSI and volume indicators.", risk: "Medium", performance: "+3.7%", status: "Inactive", primaryAction: "Run Bot" },
        { id: 3, title: "Multi-Coin DCA", schedule: "Monthly.DCA", description: "DCA into top 5 cryptocurrencies by market cap.", risk: "Medium", performance: "+4.2%", status: "Inactive", primaryAction: "Run Bot" },
        { id: 4, title: "Cycle-Based Accumulation", schedule: "Bi-Weekly.DCA", description: "DCA more during market dips, less during highs.", risk: "Low", performance: "+1.8%", status: "Inactive", primaryAction: "Run Bot" }
      ]
    },
    grid: {
      title: "Grid Trading",
      description: "Place buy and sell orders at predetermined levels.",
      items: [
        { id: 5, title: "BTC Grid Basic", schedule: "Continuous.Grid", description: "Profit from BTC ranging between $90,000-$100,000.", risk: "Medium", performance: "+5.1%", status: "Inactive", primaryAction: "Run Bot" },
        { id: 6, title: "ETH Grid Advanced", schedule: "Continuous.Grid", description: "Dynamic grid with auto-adjusting ranges.", risk: "High", performance: "+7.3%", status: "Inactive", primaryAction: "Run Bot" },
        { id: 7, title: "BNB Range Grid", schedule: "Continuous.Grid", description: "Grid trading optimized for BNB volatility ranges", risk: "Medium", performance: "3.6%", status: "Inactive", primaryAction: "Run bot"},
        { id: 8, title: "Solana Full Range", schedule: "Continuous.Grid", description: "Grid trading covering the full SOL price range", risk: "High", performance: "3.6%", status: "Inactive", primaryAction: "Run bot"},
      ]
    },
    arbitrage: {
      title: "Arbitrage",
      description: "Profit from price differences across various exchanges or trading pairs.",
      items: [
        { id: 9, title: "Exchange Arbitrage", schedule: "Real-time.Arbitrage", description: "Execute trades based on price differences between exchanges", risk: "High", performance: "+1.4%", status: "Inactive", primaryAction: "Run Bot" },
        { id: 10, title: "Triangle Arbitrage", schedule: "Reak-time.Arbitrage", description: "Triangular arbitrage between BTC, ETH and USDT", risk: "High", perfomance:"+0.9%", status: "Inactive", primaryAction: "Run Bot"},
        { id: 11, title: "DEX Arbitrage", schedule: "Reak-time.Arbitrage", description: "Arbitrage between decentralized exchanges", risk: "Extreme", perfomance:"+9.5%", status: "Inactive", primaryAction: "Run Bot"},
        { id: 12, title: "Futures vs Spot", schedule: "Reak-time.Arbitrage", description: "Arbitrage between decentralized exchanges", risk: "Extreme", perfomance:"+2.5%", status: "Inactive", primaryAction: "Run Bot"},
      ]
    },
    scalping: {
      title: "Scalping",
      description: "High-frequency trading aiming for small profits on minor price changes.",
      items: [
        { id: 13, title: "BTC Micro Scalper", schedule: "1m.Scalping", description: "Fast trades on small Bitcoin price movements.", risk: "High", performance: "+5.4%", status: "Inactive", primaryAction: "View Bot" },
        { id: 14, title: "ETH Volume Scalper", schedule: "5m.Scalping", description: "Scalps Etherium based on Volume spikes.", risk: "Extreme", performance: "+8.3%", status: "Inactive", primaryAction: "View Bot" },
        { id: 15, title: "Multi-Indicator Scalper", schedule: "3m.Scalping", description: "Uses MACD, RSI and Bollinger Bands for rapid trades.", risk: "High", performance: "+7.4%", status: "Inctive", primaryAction: "View Bot" },
        { id: 16, title: "Range-Breakout Scalper", schedule: "15m.Scalping", description: "Trades breakouts from consolidation patterns.", risk: "Extreme", performance: "+9.4%", status: "Inactive", primaryAction: "View Bot" }
      ]
    },
    signals: {
      title: "Signal-Based",
      description: "Bots that execute trades based on external technical or social signals.",
      items: [
        { id: 17, title: "RSI-Based Signals", schedule: "4h.Signal", description: "Trades based on RSI crossing overbought/oversold levels", risk: "Medium", performance: "Medium", status: "Inactive", primaryAction: "View Bot" },
        { id: 18, title: "Moving Average Bot", schedule: "1h.Signal", description: "Trades based on MA crossover signals", risk: "High", performance: "+2.8%", status: "Inactive", primaryAction: "View Bot" },
        { id: 19, title: "Pattern Recognition", schedule: "1d.Signal", description: "Identifies and trades chart patterns", risk: "Extreme", performance: "+4.3%", status: "Inactive", primaryAction: "View Bot" },
        { id: 20, title: "News Sentiment Bot", schedule: "6h.Signal", description: "Trades based on crypto news sentiment analysis", risk: "High", performance: "+10.4%", status: "Inactive", primaryAction: "View Bot" },
      ]
    }
  };