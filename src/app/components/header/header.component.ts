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
  searchQuery: string = '';
  constructor(
    protected globalService: GlobalService,
    private coingeckoService: CoingeckoService
  ) {}

  trendCategories: any[] = [];
  trendCoins: any[] = [];

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
