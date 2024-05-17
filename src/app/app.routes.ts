import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CoinListComponent } from './list/list.component';
import { CoinDetailComponent } from './detail/detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', title: 'Landingpage' },
  {
    path: '',
    component: CoinListComponent,
    title: 'Coins Component',
  },
  {
    path: 'coins/:category',
    component: CoinListComponent,
    title: 'Categories of Coins',
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    title: 'Categories of Coins',
  },
  {
    path: 'coin/:id',
    component: CoinDetailComponent,
    title: 'Coin Component',
  },
];
