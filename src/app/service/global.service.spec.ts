import { TestBed } from '@angular/core/testing';

import { GlobalService } from './global.service';
import { HttpClientModule } from '@angular/common/http';

describe('GlobalService', () => {
  let service: GlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
