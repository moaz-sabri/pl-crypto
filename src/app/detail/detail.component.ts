import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CoingeckoService } from '../service/coingecko.service';
import { CommonModule } from '@angular/common';
import { NgChartjsModule } from 'ng-chartjs';
import { Coin } from '../interfaces/coin';
import { GlobalService } from '../service/global.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-coin',
  standalone: true,
  imports: [CommonModule, RouterLink, NgChartjsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class CoinDetailComponent {
  lineChartData: Chart.ChartDataset[] = []; // Declaring an array to hold chart data
  lineChartLabels: Array<any> = []; // Declaring an array to hold chart labels
  lineChartOptions: any = {
    // Configuring chart options
    responsive: true,
    horizontalLine: [
      {
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
  lineChartLegend = false; // Setting the chart legend to be initially hidden
  cryptocurrency: Coin = {}; // Declaring an object to hold cryptocurrency data

  constructor(
    private readonly route: ActivatedRoute,
    protected readonly globalService: GlobalService,
    private readonly coingeckoService: CoingeckoService
  ) {}

  ngOnInit(): void {
    // Subscribing to route parameters to fetch cryptocurrency data based on the ID parameter
    this.route.params.subscribe((params) => {
      const id = params['id']; // Extracting the ID parameter from the route
      this.fetchCryptocurrency(id); // Fetching cryptocurrency data using the extracted ID
    });
  }

  /**
   * Fetches cryptocurrency data by ID.
   * @param id The ID of the cryptocurrency.
   */
  fetchCryptocurrency(id: string): void {
    // Method to fetch cryptocurrency data by ID
    this.coingeckoService.getCryptocurrencyById(id).subscribe(
      (data) => {
        // Handling the success scenario
        this.cryptocurrency = data; // Assigning the fetched data to the cryptocurrency object
        this.loadChart(data); // Loading the chart with the fetched data
      },
      (error) => {
        // Handling errors if the API call fails
        // If an error occurs, load data from a local JSON file as a fallback
        this.coingeckoService.loadLocalCoin().subscribe((data) => {
          this.cryptocurrency = data; // Assigning the local data to the cryptocurrency object
          this.loadChart(data); // Loading the chart with the local data
        });
      }
    );
  }

  /**
   * Loads chart data based on the fetched cryptocurrency data.
   * @param data The cryptocurrency data fetched from the API.
   */
  loadChart(data: any) {
    // Assigning the price change percentages to the lineChartData array
    this.lineChartData = [
      {
        label: 'Price', // Label for the chart
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
        fill: false, // Not filling the area under the line
        borderColor: 'rgba(75,192,192,1)', // Setting the border color of the line
        borderWidth: 2, // Setting the border width of the line
        pointBackgroundColor: 'rgba(75,192,192,1)', // Setting the background color of the points
        pointRadius: 3, // Setting the radius of the points
        pointHoverRadius: 5, // Setting the radius of the points on hover
      },
    ];
    // Assigning the labels for the chart
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
    this.lineChartLegend = true; // Displaying the chart legend
  }
}
