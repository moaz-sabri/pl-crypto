import { Category } from "./category";
import { Coin } from "./coin";

export interface Data {
  coins: Coin[];
  categories: Category[];
}