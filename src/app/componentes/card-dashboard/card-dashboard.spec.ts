import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardDashboard } from './card-dashboard';

describe('CardDashboard', () => {
  let component: CardDashboard;
  let fixture: ComponentFixture<CardDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDashboard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
