import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CoinListComponent } from './list/list.component';
import { CoinDetailComponent } from './detail/detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', title: 'Home' },
  {
    path: '',
    component: CoinListComponent,
    data: { title: 'Coins' },
  },
  {
    path: 'coins/:category',
    component: CoinListComponent,
    data: { title: 'Coins by Category' },
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    data: { title: 'Categories' },
  },
  {
    path: 'coin/:id',
    component: CoinDetailComponent,
    data: { title: 'Coin Detail' },
  },
];
