import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinDetailComponent } from './detail.component';

describe('CoinDetailComponent', () => {
  let component: CoinDetailComponent;
  let fixture: ComponentFixture<CoinDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
