import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoingeckoService } from '../service/coingecko.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../global/header/header.component';
import { GlobalService } from '../service/global.service';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = []; // Declaring a categories array to hold Category objects

  constructor(
    protected readonly globalService: GlobalService,
    private readonly coingeckoService: CoingeckoService
  ) {}

  ngOnInit(): void {
    this.loadCategories(); // Calling the method to load categories
  }

  /**
   * Loads categories from the CoingeckoService.
   * If the API call fails, it loads data from a local JSON file as a fallback.
   */
  loadCategories(): void {
    // Method to load categories from the CoingeckoService
    this.coingeckoService.getCategories().subscribe(
      (data) => {
        // Handling the success scenario
        this.categories = data.slice(0, 50); // Assigning the first 50 categories to the categories array
      },
      (error) => {
        // Handling errors if the API call fails
        // If an error occurs, load data from a local JSON file as a fallback
        this.coingeckoService.loadLocalCategories().subscribe((data) => {
          this.categories = data.slice(0, 50); // Assigning the first 50 local categories to the categories array
        });
      }
    );
  }
}
