import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoingeckoService } from '../service/coingecko.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coin.component.html',
  styleUrl: './coin.component.css',
})
export class CoinComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coingeckoService: CoingeckoService
  ) {}

  cryptocurrency = {
    id: null,
    name: null,
    symbol: null,
    market_cap_rank: null,
    image: {
      small: null,
    },
    market_data: {
      market_cap: { eur: null },
      current_price: { eur: null },
      fully_diluted_valuation: { eur: null },
      total_supply: null,
      max_supply: null,
      circulating_supply: null,
    },
    developer_data: {
      forks: null,
      stars: null,
      subscribers: null,
    },
    categories: [],
    tickers: [
      {
        base: '',
        target: null,
        volume: null,
        trust_score: null,
        trade_url: null,
        market: {
          name: null,
          identifier: null,
        },
        bid_ask_spread_percentage: 0,
      },
    ],
    links: {
      homepage: [],
    },
    genesis_date: null,
    description: { en: null },
    price_change_percentage_24h: null,
    total_volume: null,
  };
  currencyCode = 'USD'; // Define your currency code here
  currencySymbol = '€';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']; // Access the 'id' parameter value
      this.coingeckoService.getCryptocurrencyById(id).subscribe(
        (data) => {
          setTimeout(() => {
            this.cryptocurrency = data;
          }, 1500);
        },
        (error) => {
          // Handle errors if any
          // If useApi is false, load data from local JSON
          this.coingeckoService.loadLocalCoin().subscribe((data) => {
            this.cryptocurrency = data;
          });
        }
      );
    });
  }
}
