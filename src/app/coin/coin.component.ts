import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CoingeckoService } from '../service/coingecko.service';
import { CommonModule } from '@angular/common';
import { NgChartjsModule } from 'ng-chartjs';
import * as Chart from 'chart.js';
import { Coin } from '../interfaces/coin';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-coin',
  standalone: true,
  imports: [CommonModule, RouterLink, NgChartjsModule],
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
    protected globalService: GlobalService,
    private coingeckoService: CoingeckoService
  ) {}

  cryptocurrency: Coin = {};

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
