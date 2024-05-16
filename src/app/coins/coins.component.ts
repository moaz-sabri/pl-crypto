import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CoingeckoService } from '../service/coingecko.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-coins',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './coins.component.html',
  styleUrl: './coins.component.css',
})
export class CoinsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coingeckoService: CoingeckoService
  ) {}

  cryptocurrencies: any[] = [];
  categories: any[] = [];

  currencyCode = 'USD'; // Define your currency code here
  currencySymbol = '€';

  currentPage = 1;
  itemsPerPage = 10;
  category = '';
  vs_currency = 'eur';
  order = 'market_cap_desc';
  sparkline = false;
  locale = 'en';

  ngOnInit(): void {
    this.loadCryptocurrencies();
  }

  loadCryptocurrencies(): void {
    this.route.params.subscribe((params) => {
      const category = params['category']; // Access the 'category' parameter value
      if (category != '') this.category = category;
    });

    this.coingeckoService.getCategoriesList().subscribe(
      (data) => {
        this.categories = data.slice(0, 20);
      },
      (error) => {
        // Handle errors if any
        // If useApi is false, load data from local JSON
        this.coingeckoService.loadLocalCategoriesList().subscribe((data) => {
          this.categories = data;
        });
      }
    );

    this.coingeckoService
      .getCryptocurrencies(
        this.currentPage,
        this.itemsPerPage,
        this.vs_currency,
        this.category,
        this.order,
        this.sparkline,
        this.locale
      )
      .subscribe(
        (data) => {
          this.cryptocurrencies = data;
        },
        (error) => {
          // Handle errors if any
          // If useApi is false, load data from local JSON
          this.coingeckoService.loadLocalCoins().subscribe((data) => {
            this.cryptocurrencies = data;
          });
        }
      );
  }

  nextPage(): void {
    this.currentPage++;
    this.loadCryptocurrencies();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCryptocurrencies();
    }
  }

  goTo(path: string, params: any[] = []) {
    let navigationParams: any[];

    if (params.length > 0) {
      navigationParams = [path, ...params];
    } else {
      navigationParams = [path];
    }

    this.router.navigate(navigationParams);
  }
}
