// coingecko.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coin } from '../interfaces/coin';
import { Categories } from '../interfaces/categories';
import { Category } from '../interfaces/category';
import { Data } from '../interfaces/data';

@Injectable({
  providedIn: 'root',
})
export class CoingeckoService {
  private baseUrl = 'https://api.coingecko.com/api/v3'; // Base URL for CoinGecko API

  constructor(private readonly http: HttpClient) {}

  /**
   * Method to fetch list of cryptocurrencies with pagination
   * Fetches a list of cryptocurrencies from the CoinGecko API.
   * @param page Page number for pagination.
   * @param perPage Number of items per page.
   * @param vsCurrency The currency to display prices in.
   * @param category Category of coins to filter by.
   * @param order Sorting order for the list.
   * @param sparkline Whether to include sparkline data.
   * @param locale Language locale for response.
   * @returns An Observable array of Coin objects.
   */
  getCryptocurrencies(
    page: number = 1,
    perPage: number = 50,
    vs_currency: string = 'eur',
    category: string = '',
    order: string = 'market_cap_desc',
    sparkline: boolean = false,
    locale: string = 'en'
  ): Observable<Coin[]> {
    // Create HTTP parameters for pagination and other query parameters
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('per_page', perPage.toString());
    params = params.set('vs_currency', vs_currency);
    params = params.set('order', order);
    params = params.set('sparkline', sparkline.toString());
    params = params.set('locale', locale);

    if (category != '') params = params.set('category', category);

    // Making HTTP GET request to fetch cryptocurrencies
    return this.http.get<Coin[]>(`${this.baseUrl}/coins/markets?`, { params });
  }

  /**
   * Method to fetch categories
   * Fetches a list of categories from the CoinGecko API.
   * @returns An Observable array of Category objects.
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/coins/categories`);
  }

  /**
   * Method to fetch categories list
   * Fetches a list of categories from the CoinGecko API.
   * @returns An Observable array of Categories objects.
   */
  getCategoriesList(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.baseUrl}/coins/categories/list`);
  }

  /**
   * Method to fetch trending data
   * Fetches trending coins from the CoinGecko API.
   * @returns An Observable containing trending data.
   */
  getTrending(): Observable<Data> {
    return this.http.get<Data>(`${this.baseUrl}/search/trending`);
  }

  /**
   * Method to search for cryptocurrencies
   * Searches for coins based on the provided query.
   * @param searchQuery The search query.
   * @returns An Observable array of Coin objects matching the search query.
   */
  getSearch(search: string = ''): Observable<Coin[]> {
    return this.http.get<Coin[]>(`${this.baseUrl}/search?query=${search}`);
  }

  /**
   * Method to fetch cryptocurrency details by ID
   * Fetches cryptocurrency details by ID.
   * @param id The ID of the cryptocurrency.
   * @returns An Observable containing details of the cryptocurrency.
   */
  getCryptocurrencyById(id: string): Observable<Coin> {
    return this.http.get<Coin>(`${this.baseUrl}/coins/${id}`);
  }

  // Methods to load local data from JSON files (for fallback or testing purposes)
  loadLocalCoins(category: string = ''): Observable<Coin[]> {
    const url = category
      ? 'assets/data/category_real-world-assets-rw.json'
      : 'assets/data/list.json';
    return this.http.get<Coin[]>(url);
  }

  loadLocalCoin(): Observable<Coin> {
    return this.http.get<Coin>('assets/data/bitcoin.json');
  }

  loadLocalCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('assets/data/categories.json');
  }

  loadLocalCategoriesList(): Observable<Categories[]> {
    return this.http.get<Categories[]>('assets/data/categories_list.json');
  }

  loadLocalTrending(): Observable<Data> {
    return this.http.get<Data>('assets/data/trending.json');
  }

  loadLocalSearch(): Observable<Coin[]> {
    return this.http.get<Coin[]>('assets/data/search_bit.json');
  }
}
