import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  currencyCode = 'EUR'; // Currency code for Euro
  currencySymbol = '€'; // Currency symbol for Euro

  constructor() {}
}
