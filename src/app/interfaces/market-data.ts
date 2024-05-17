export  interface MarketData {
    // Market capitalization data
    market_cap: { eur: string };
    // Current price data
    current_price: { eur: string };
    // Fully diluted valuation data
    fully_diluted_valuation: { eur: string };
    // Total supply of the coin
    total_supply: number;
    // Maximum supply of the coin
    max_supply: number;
    // Circulating supply of the coin
    circulating_supply: number;
  }