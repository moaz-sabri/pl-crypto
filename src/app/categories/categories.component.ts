import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CoingeckoService } from '../service/coingecko.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
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
        this.categories = data.slice(0, 50);
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
}
