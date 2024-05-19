import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { CoingeckoService } from '../service/coingecko.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let coingeckoService: CoingeckoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CategoriesComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    coingeckoService = TestBed.inject(CoingeckoService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
