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
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoinListComponent } from './list/list.component';

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
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
