import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CoingeckoService } from '../service/coingecko.service';
import { CoinDetailComponent } from './detail.component';
import { GlobalService } from '../service/global.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('CoinDetailComponent', () => {
  let component: CoinDetailComponent;
  let fixture: ComponentFixture<CoinDetailComponent>;
  let coingeckoService: CoingeckoService;
  let globalService: GlobalService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinDetailComponent);
    component = fixture.componentInstance;
    coingeckoService = TestBed.inject(CoingeckoService);
    globalService = TestBed.inject(GlobalService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
