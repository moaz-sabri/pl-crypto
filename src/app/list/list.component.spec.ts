import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoinListComponent } from './list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoingeckoService } from '../service/coingecko.service';
import { GlobalService } from '../service/global.service';
import { ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('CoinListComponent', () => {
  let component: CoinListComponent;
  let fixture: ComponentFixture<CoinListComponent>;
  let coingeckoService: CoingeckoService;
  let mockElementRef: ElementRef;

  beforeEach(async () => {
    mockElementRef = new ElementRef({
      nativeElement: {
        querySelector: () => ({
          classList: {
            add: jasmine.createSpy('add'),
            remove: jasmine.createSpy('remove'),
          },
        }),
      },
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoingeckoService,
        GlobalService,
        { provide: ElementRef, useValue: mockElementRef },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
          },
        },
        Router,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinListComponent);
    component = fixture.componentInstance;
    coingeckoService = TestBed.inject(CoingeckoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
