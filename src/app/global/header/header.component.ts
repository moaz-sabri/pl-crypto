import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoingeckoService } from '../../service/coingecko.service';
import { CommonModule } from '@angular/common';
import { GlobalService } from '../../service/global.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchQuery: string = ''; // Declaring a searchQuery string to hold the search input
  trendCategories: any[] = []; // Declaring an array to hold trending categories
  trendCoins: any[] = []; // Declaring an array to hold trending coins

  constructor(
    protected readonly globalService: GlobalService,
    private readonly coingeckoService: CoingeckoService
  ) {}

  ngOnInit(): void {
    this.loadTrending(); // Calling the method to load trending categories and coins
  }

  /**
   * Loads trending data from the CoingeckoService.
   * If the API call fails, fallbacks to loading data from a local JSON file.
   */
  loadTrending(): void {
    // Method to load trending data from the CoingeckoService
    this.coingeckoService.getTrending().subscribe(
      (data) => {
        // Handling the success scenario
        this.trendCategories = data.categories; // Assigning the trending categories to the trendCategories array
        this.trendCoins = data.coins; // Assigning the trending coins to the trendCoins array
      },
      (error) => {
        // Handling errors if the API call fails
        // If an error occurs, load data from a local JSON file as a fallback
        this.coingeckoService.loadLocalTrending().subscribe((data) => {
          this.trendCategories = data.categories; // Assigning the local trending categories to the trendCategories array
          this.trendCoins = data.coins; // Assigning the local trending coins to the trendCoins array
        });
      }
    );
  }
}
