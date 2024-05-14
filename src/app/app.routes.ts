import { Routes } from '@angular/router';
import { CoinsComponent } from './coins/coins.component';
import { CoinComponent } from './coin/coin.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', title: 'Landingpage' },
  {
    path: '',
    component: CoinsComponent,
    title: 'Coins Component',
  },
  {
    path: 'coin/:id',
    component: CoinComponent,
    title: 'Coins Component',
  },
];
