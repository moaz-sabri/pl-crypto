export interface Category {
  id: string;
  slug: string;
  name: string;
  market_cap: number;
  market_cap_change_24h: number;
  content: string;
  top_3_coins: string[];
  data: any[];
  coins_count: number;
  volume_24h: number;
  updated_at: string;
}
