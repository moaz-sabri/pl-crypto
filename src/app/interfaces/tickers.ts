
export interface Tickers {
    // Base currency symbol
    base: string;
    // Target currency symbol
    target: string;
    // Trading volume
    volume: number;
    // Trust score
    trust_score: string;
    // URL for trading
    trade_url: string;
    // Market details
    market: {
      // Market name
      name: string;
      // Market identifier
      identifier: string;
    };
    // Bid-ask spread percentage
    bid_ask_spread_percentage: number;
  }