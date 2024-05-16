import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoingeckoService } from '../service/coingecko.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  constructor(
    private router: Router,
    private coingeckoService: CoingeckoService
  ) {}

  categories: any[] = [];
  currencyCode = 'USD'; // Define your currency code here
  currencySymbol = '€';

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.coingeckoService.getCategories().subscribe(
      (data) => {
        setTimeout(() => {
          this.categories = data.slice(0, 50);
        }, 1500);
      },
      (error) => {
        // Handle errors if any
        // If useApi is false, load data from local JSON
        this.coingeckoService.loadLocalCategories().subscribe((data) => {
          this.categories = data;
        });
      }
    );
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
