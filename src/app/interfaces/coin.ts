import { MarketData } from './market-data';
import { Tickers } from './tickers';

export interface Coin {
  // Coin ID
  id?: string;
  // Coin name
  name?: string;
  // Coin symbol
  symbol?: string;
  // Current price of the coin
  current_price?: number;
  //
  market_cap?: number;
  // 24-hour price change percentage
  price_change_percentage_24h?: number;
  // Total volume of the coin
  total_volume?: number;
  // Market capitalization rank of the coin
  market_cap_rank?: number;
  // Image URL of the coin
  image?: { small: string };
  // Market data of the coin
  market_data?: MarketData;
  // Developer-related data of the coin
  developer_data?: {
    // Number of forks
    forks: number;
    // Number of stars
    stars: number;
    // Number of subscribers
    subscribers: number;
  };
  // Categories of the coin
  categories?: Array<[]>;
  // Tickers of the coin
  tickers?: Tickers[];
  // Links related to the coin
  links?: { homepage: Array<[]> };
  // Genesis date of the coin
  genesis_date?: Date;
  // Description of the coin
  description?: { en?: string };
}
