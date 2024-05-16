import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoingeckoService } from '../service/coingecko.service';
import { CommonModule } from '@angular/common';
import { NgChartjsModule } from 'ng-chartjs';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-coin',
  standalone: true,
  imports: [CommonModule, NgChartjsModule],
  templateUrl: './coin.component.html',
  styleUrl: './coin.component.css',
})
export class CoinComponent {
  lineChartData: Chart.ChartDataset[] = [];
  lineChartLabels: Array<any> = [];
  lineChartOptions: any = {
    responsive: true,
    horizontalLine: [
      {
        // use custom global plugin
        y: 82,
        style: 'rgba(255, 0, 0, .4)',
        text: 'max',
      },
      {
        y: 60,
        style: '#00ffff',
      },
      {
        y: 44,
        text: 'min',
      },
    ],
  };
  lineChartLegend = false;

  constructor(
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
          this.cryptocurrency = data;
          this.loadCart(data);
        },
        (error) => {
          // Handle errors if any
          // If useApi is false, load data from local JSON
          this.coingeckoService.loadLocalCoin().subscribe((data) => {
            this.cryptocurrency = data;
            this.loadCart(data);
          });
        }
      );
    });
  }

  loadCart(data: any) {
    this.lineChartData = [
      {
        label: 'Price',
        data: [
          data.market_data.price_change_percentage_1y_in_currency.eur,
          data.market_data.price_change_percentage_200d_in_currency.eur,
          data.market_data.price_change_percentage_60d_in_currency.eur,
          data.market_data.price_change_percentage_30d_in_currency.eur,
          data.market_data.price_change_percentage_14d_in_currency.eur,
          data.market_data.price_change_percentage_7d_in_currency.eur,
          data.market_data.price_change_percentage_24h_in_currency.eur,
          data.market_data.price_change_percentage_1h_in_currency.eur,
        ],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ];
    this.lineChartLabels = [
      '1y',
      '200d',
      '60d',
      '30d',
      '14d',
      '7d',
      '24h',
      '1h',
    ];
    this.lineChartLegend = true;
  }
}
