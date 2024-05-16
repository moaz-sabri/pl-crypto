import { Routes } from '@angular/router';
import { CoinsComponent } from './coins/coins.component';
import { CoinComponent } from './coin/coin.component';
import { CategoriesComponent } from './categories/categories.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', title: 'Landingpage' },
  {
    path: '',
    component: CoinsComponent,
    title: 'Coins Component',
  },
  {
    path: 'coins/:category',
    component: CoinsComponent,
    title: 'Categories of Coins',
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    title: 'Categories of Coins',
  },
  {
    path: 'coin/:id',
    component: CoinComponent,
    title: 'Coin Component',
  },
];
