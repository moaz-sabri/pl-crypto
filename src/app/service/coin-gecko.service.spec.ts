// import { TestBed } from '@angular/core/testing';
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { CoingeckoService } from './coingecko.service';

// describe('CoinGeckoService', () => {
//   let service: CoingeckoService;
//   let httpTestingController: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [CoingeckoService],
//     });
//     service = TestBed.inject(CoingeckoService);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     // After each test, assert that there are no outstanding HTTP requests
//     httpTestingController.verify();
//   });

//   it('should be created', () => {
//     // expect(service).toBeTruthy();
//   });

//   it('should fetch the list of coins', () => {
//     const mockCoins = [
//       { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
//       { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
//     ];

//     service.getCategoriesList().subscribe((coins) => {
//     //   expect(coins).toEqual(mockCoins);
//     });

//     const req = httpTestingController.expectOne(
//       'https://api.coingecko.com/api/v3/coins/list'
//     );
//     // expect(req.request.method).toEqual('GET');

//     req.flush(mockCoins);
//   });

//   it('should handle errors when fetching the list of coins', () => {
//     const errorMessage = 'Error fetching coins';

//     service.getCategoriesList().subscribe(
//       () => fail('should have failed with the error message'),
//       (error) => {
//         // expect(error).toEqual(errorMessage);
//       }
//     );

//     const req = httpTestingController.expectOne(
//       'https://api.coingecko.com/api/v3/coins/list'
//     );
//     req.error(
//       new ErrorEvent('network error', {
//         message: errorMessage,
//       })
//     );
//   });
// });
