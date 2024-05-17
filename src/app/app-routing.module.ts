// app-routing.module.ts
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CoinComponent } from './coin/coin.component';
import { CoinsComponent } from './coins/coins.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    NgbModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    RouterOutlet,
    CoinsComponent,
    CoinComponent,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
