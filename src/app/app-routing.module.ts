// app-routing.module.ts
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoinListComponent } from './list/list.component';
import { CoingeckoService } from './service/coingecko.service';

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    NgbModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    RouterOutlet,
    CoinListComponent,
    CoinListComponent,
  ],
  providers: [CoingeckoService],
})
export class AppRoutingModule {}
