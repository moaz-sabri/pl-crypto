import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoinsComponent } from './coins/coins.component';
import { CoinComponent } from './coin/coin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CoinsComponent,
    CoinComponent,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'prolion';

  ngOnInit(): void {}

}
