import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { CoingeckoService } from '../service/coingecko.service';
import {
  ActivatedRoute,
  NavigationExtras,
  Router,
  RouterLink,
} from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { GlobalService } from '../service/global.service';
import { Coin } from '../interfaces/coin';

@Component({
  selector: 'app-coins',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class CoinListComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    protected globalService: GlobalService,
    private coingeckoService: CoingeckoService
  ) {}

  
  categoryPerPage = 25;
  categoryInPage = 0;
  categories_view: any[] = [];
  categories: any[] = [];
  
  cryptocurrencies: Coin[] = [];
  currentPage = 1;
  itemsPerPage = 100;
  category = '';
  vs_currency = 'eur';
  order = 'market_cap_desc';
  sparkline = false;
  locale = 'en';

  ngOnInit(): void {
    this.loadCategories();
    this.loadCryptocurrencies();
  }

  loadCategories() {
    this.coingeckoService.getCategoriesList().subscribe(
      (data) => {
        this.loadCategoriesList(data);
      },
      (error) => {
        // Handle errors if any
        // If useApi is false, load data from local JSON
        this.coingeckoService.loadLocalCategoriesList().subscribe((data) => {
          this.loadCategoriesList(data);
        });
      }
    );
  }

  loadCategoriesList(data: any) {
    this.categories = data;
    this.categories_view = data.slice(
      this.categoryInPage,
      this.categoryPerPage
    );
  }

  loadCryptocurrencies(): void {
    let next = this.elementRef.nativeElement.querySelector('#nextButton');
    let previous =
      this.elementRef.nativeElement.querySelector('#previousButton');

    let category = this.category;
    let order = this.order;
    let per_page = this.itemsPerPage;

    this.route.params.subscribe((params) => {
      category = params['category'] || category;
    });

    this.route.queryParams.subscribe((params) => {
      order = params['order'] || order;
      per_page = params['per_page'] || per_page;
    });

    this.coingeckoService
      .getCryptocurrencies(
        this.currentPage,
        per_page,
        this.vs_currency,
        category,
        order,
        this.sparkline,
        this.locale
      )
      .subscribe(
        (data) => {
          data.length < per_page
            ? next.classList.add('disabled')
            : next.classList.remove('disabled');

          this.currentPage <= 1
            ? previous.classList.add('disabled')
            : previous.classList.remove('disabled');

          this.cryptocurrencies = data;
        },
        (error) => {
          // Handle errors if any
          // If useApi is false, load data from local JSON
          this.coingeckoService.loadLocalCoins().subscribe((data) => {
            this.cryptocurrencies = data.slice(0, per_page);
            next.classList.add('disabled');
            previous.classList.add('disabled');
          });
        }
      );
  }

  sortPage(param: string, val: number) {
    let sort = `${param}${val == 0 ? '_asc' : '_desc'}`;

    const navigationExtras: NavigationExtras = {
      queryParams: { order: sort },
    };

    this.router.navigate([], {
      ...navigationExtras,
      queryParamsHandling: 'merge', // Merge with existing query parameters
    });

    this.loadCryptocurrencies();
  }

  countOfItems = [25, 50, 100, 250, 500];
  loadPerPage(val: number) {
    this.itemsPerPage = val;
    const navigationExtras: NavigationExtras = {
      queryParams: { per_page: val },
    };

    this.router.navigate([], {
      ...navigationExtras,
      queryParamsHandling: 'merge', // Merge with existing query parameters
    });

    this.loadCryptocurrencies();
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

  moreCategories(): void {
    this.categoryPerPage += 10;

    if (this.categoryPerPage >= this.categories.length)
      this.elementRef.nativeElement
        .querySelector('#moreButton')
        .classList.add('disabled');

    this.categories_view = this.categories.slice(
      this.categoryInPage,
      this.categoryPerPage
    );
  }
}
