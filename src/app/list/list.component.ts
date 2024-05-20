import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { CoingeckoService } from '../service/coingecko.service';
import {
  ActivatedRoute,
  NavigationExtras,
  Router,
  RouterLink,
} from '@angular/router';
import { HeaderComponent } from '../global/header/header.component';
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
  categories_view: any[] = []; // Declaring an array to hold a view of categories
  categories: any[] = []; // Declaring an array to hold categories
  cryptocurrencies: Coin[] = []; // Declaring an array to hold cryptocurrency data

  countOfItems = [25, 50, 100, 250, 500]; // Available options for items per page

  // Pagination and filtering variables
  categoryPerPage = 25;
  categoryInPage = 0;
  currentPage = 1;
  itemsPerPage = 100;
  category = '';
  vs_currency = 'eur';
  order = 'market_cap_desc';
  sparkline = false;
  locale = 'en';
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly elementRef: ElementRef,
    protected readonly globalService: GlobalService,
    private readonly coingeckoService: CoingeckoService
  ) {}

  ngOnInit(): void {
    this.loadCategories(); // Loading categories
    this.loadCryptocurrencies(); // Loading cryptocurrencies
  }

  /**
   * Loads categories.
   * Retrieves categories data from the Coingecko API. If the API call fails, fallbacks to loading data from a local JSON file.
   * Updates the 'categories' and 'categories_view' arrays with the fetched or locally loaded data.
   */
  loadCategories() {
    this.coingeckoService.getCategoriesList().subscribe(
      (data) => {
        // Handling the success scenario
        this.categories = data; // Assigning the fetched data to the categories array
        this.categories_view = data.slice(0, this.categoryPerPage); // Assigning a view of categories
      },
      (error) => {
        // Handling errors if the API call fails
        // If an error occurs, load data from a local JSON file as a fallback
        this.coingeckoService.loadLocalCategoriesList().subscribe((data) => {
          this.categories = data; // Assigning the local data to the categories array
          this.categories_view = data.slice(0, this.categoryPerPage); // Assigning a view of categories
        });
      }
    );
  }

  /**
   * Fetches data about cryptocurrencies based on specified parameters.
   * If the API call fails, falls back to loading data from a local JSON file.
   * Handles pagination and updates UI accordingly.
   */
  loadCryptocurrencies(): void {
    // Fetching parameters for the API call
    let category = this.category;
    let order = this.order;
    let per_page = this.itemsPerPage;

    // Fetching category and order from route parameters
    this.route.params.subscribe((params) => {
      category = params['category'] || category;
    });

    this.route.queryParams.subscribe((params) => {
      order = params['order'] || order;
      per_page = params['per_page'] || per_page;
    });

    // Making the API call to fetch cryptocurrencies
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
          // Handling the success scenario
          // Updating pagination buttons based on data length
          data.length < per_page
            ? this.elementRef.nativeElement
                .querySelector('#nextButton')
                .classList.add('disabled', 'btn-outline-secondary')
            : this.elementRef.nativeElement
                .querySelector('#nextButton')
                .classList.remove('disabled', 'btn-outline-secondary');
          this.currentPage <= 1
            ? this.elementRef.nativeElement
                .querySelector('#previousButton')
                .classList.add('disabled', 'btn-outline-secondary')
            : this.elementRef.nativeElement
                .querySelector('#previousButton')
                .classList.remove('disabled', 'btn-outline-secondary');
          this.cryptocurrencies = data; // Assigning the fetched data to the cryptocurrencies array

          this.setTheActiveSortButton(order);
        },
        (error) => {
          // Handling errors if the API call fails
          // If an error occurs, load data from a local JSON file as a fallback
          this.coingeckoService.loadLocalCoins().subscribe((data) => {
            this.cryptocurrencies = data.slice(0, per_page); // Assigning the local data to the cryptocurrencies array
            this.elementRef.nativeElement
              .querySelector('#nextButton')
              .classList.add('disabled', 'btn-outline-secondary'); // Disabling pagination buttons
            this.elementRef.nativeElement
              .querySelector('#previousButton')
              .classList.add('disabled', 'btn-outline-secondary');
          });
        }
      );
  }

  /**
   * Sets the active state for the sorting button based on the specified sort parameter.
   * @param sort The sort parameter used to determine which button should be active.
   */
  setTheActiveSortButton(sort: string) {
    // select elements of sort button
    const buttons = document.querySelectorAll('.sort-func');
    const activeButton = document.getElementById(sort) as HTMLElement;
    buttons.forEach((button) => {
      button.classList.remove('active', 'btn-primary');
    });

    activeButton.classList.add('active', 'btn-primary');
  }

  /**
   * Sorts the page based on the specified parameter and value.
   * @param param The parameter to sort by.
   * @param val The value indicating the sort direction (0 for ascending, 1 for descending).
   */
  sortPage(param: string, val: number) {
    // Method to sort the page
    let sort = `${param}${val == 0 ? '_asc' : '_desc'}`;

    const navigationExtras: NavigationExtras = {
      queryParams: { order: sort },
    };

    this.router.navigate([], {
      ...navigationExtras,
      queryParamsHandling: 'merge', // Merge with existing query parameters
    });

    this.loadCryptocurrencies(); // Reloading cryptocurrencies after sorting
  }

  /**
   * Loads a specific number of items per page.
   * @param val The number of items per page to load.
   */
  loadPerPage(val: number) {
    // Method to load a specific number of items per page
    this.itemsPerPage = val; // Updating items per page
    const navigationExtras: NavigationExtras = {
      queryParams: { per_page: val }, // Setting the query parameter for items per page
    };

    this.router.navigate([], {
      ...navigationExtras,
      queryParamsHandling: 'merge', // Merge with existing query parameters
    });

    this.loadCryptocurrencies(); // Reloading cryptocurrencies after updating items per page
  }

  /**
   * Navigates to the next page.
   * Increments the current page number and reloads cryptocurrencies for the next page.
   */
  nextPage(): void {
    // Method to navigate to the next page
    this.currentPage++; // Incrementing the current page number
    this.loadCryptocurrencies(); // Loading cryptocurrencies for the next page
  }

  /**
   * Navigates to the previous page.
   * Decrements the current page number and reloads cryptocurrencies for the previous page.
   */
  previousPage(): void {
    // Method to navigate to the previous page
    if (this.currentPage > 1) {
      // Checking if current page is greater than 1
      this.currentPage--; // Decrementing the current page number
      this.loadCryptocurrencies(); // Loading cryptocurrencies for the previous page
    }
  }

  /**
   * Loads more categories.
   * Increases the number of categories per page by 10 and updates the displayed categories.
   * Disables the 'more' button if all categories are displayed.
   */
  moreCategories(): void {
    // Method to load more categories
    this.categoryPerPage += 10; // Increasing the number of categories per page by 10

    if (this.categoryPerPage >= this.categories.length)
      // Checking if all categories are displayed
      this.elementRef.nativeElement
        .querySelector('#moreButton')
        .classList.add('disabled', 'btn-outline-secondary'); // Disabling the 'more' button if all categories are displayed

    // Slicing the categories array to display additional categories
    this.categories_view = this.categories.slice(
      this.categoryInPage,
      this.categoryPerPage
    );
  }
}
