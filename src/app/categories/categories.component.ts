import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoingeckoService } from '../service/coingecko.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  constructor(
    protected globalService: GlobalService,
    private coingeckoService: CoingeckoService
  ) {}

  categories: any[] = [];

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
