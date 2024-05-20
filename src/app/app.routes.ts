import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CoinListComponent } from './list/list.component';
import { CoinDetailComponent } from './detail/detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    data: { title: 'Home', description: 'Welcome to the homepage' },
  },
  {
    path: '',
    component: CoinListComponent,
    data: { title: 'Coins', description: 'List of all available coins' },
  },
  {
    path: 'coins/:category',
    component: CoinListComponent,
    data: {
      title: 'Coins by Category',
      description: 'List of coins filtered by category',
    },
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    data: { title: 'Categories', description: 'List of all coin categories' },
  },
  {
    path: 'coin/:id',
    component: CoinDetailComponent,
    data: {
      title: 'Coin Detail',
      description: 'Detailed information about the coin',
    },
  },
];
