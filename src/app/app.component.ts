import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoinsComponent } from './coins/coins.component';
import { CoinComponent } from './coin/coin.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoinsComponent, CoinComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'prolion';
}
