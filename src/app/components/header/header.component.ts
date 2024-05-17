import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CoingeckoService } from '../../service/coingecko.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchQuery: string = '';
  constructor(
    private router: Router,
    private coingeckoService: CoingeckoService
  ) {}

  trendCategories: any[] = [];
  trendCoins: any[] = [];
  currencyCode = 'USD'; // Define your currency code here
  currencySymbol = '€';

  ngOnInit(): void {
    this.loadTrending();
  }

  loadTrending(): void {
    this.coingeckoService.getTrending().subscribe(
      (data) => {
        this.trendCategories = data.categories;
        this.trendCoins = data.coins;
      },
      (error) => {
        // Handle errors if any
        // If useApi is false, load data from local JSON
        this.coingeckoService.loadLocalTrending().subscribe((data) => {
          this.trendCategories = data.categories;
          this.trendCoins = data.coins;
        });
      }
    );
  }
}
