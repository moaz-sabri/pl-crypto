// coingecko.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoingeckoService {

  private baseUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) {}

  // Get list of cryptocurrencies with pagination
  getCryptocurrencies(
    page: number = 1,
    perPage: number = 50,
    vs_currency: string = 'eur',
    category: string = '',
    order: string = 'market_cap_desc',
    sparkline: boolean = false,
    locale: string = 'en'
  ): Observable<any> {
    // Create HTTP parameters for pagination
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('per_page', perPage.toString());
    params = params.append('vs_currency', vs_currency.toString());
    params = params.append('order', order.toString());
    params = params.append('sparkline', sparkline.toString());
    params = params.append('locale', locale.toString());

    if (category != '') params = params.append('category', category.toString());

    return this.http.get<any>(`${this.baseUrl}/coins/markets?`, { params });
  }

  // Get list of Categories with pagination
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/coins/categories`);
  }
  getCategoriesList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/coins/categories/list`);
  }

  getTrending(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search/trending`);
  }

  getSearch(search: string = ''): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search?query=${search}`);
  }

  // Get cryptocurrency details by ID
  getCryptocurrencyById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/coins/${id}`);
  }

  // Get cryptocurrencies with optional filters
  getCryptocurrenciesWithFilters(filters: any): Observable<any> {
    const queryString = new URLSearchParams(filters).toString();
    const url = `${this.baseUrl}/coins/markets?${queryString}`;
    return this.http.get<any>(url);
  }

  // local data
  loadLocalCoins(category: string = ''): Observable<any> {
    if (category === '') {
      return this.http.get<any>('assets/data/list.json');
    } else {
      return this.http.get<any>(
        'assets/data/category_real-world-assets-rw.json'
      );
    }
  }

  loadLocalCoin(): Observable<any> {
    return this.http.get<any>('assets/data/bitcoin.json');
  }

  loadLocalCategories(): Observable<any> {
    return this.http.get<any>('assets/data/categories.json');
  }

  loadLocalCategoriesList(): Observable<any> {
    return this.http.get<any>('assets/data/categories_list.json');
  }

  loadLocalTrending(): Observable<any> {
    return this.http.get<any>('assets/data/trending.json');
  }

  loadLocalSearch(): Observable<any> {
    return this.http.get<any>('assets/data/search_bit.json');
  }
}
