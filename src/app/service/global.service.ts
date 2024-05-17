import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  currencyCode = 'USD';
  currencySymbol = '€';

  constructor() {}
}
