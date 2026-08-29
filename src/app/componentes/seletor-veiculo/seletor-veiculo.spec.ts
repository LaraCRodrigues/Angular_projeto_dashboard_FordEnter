import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeletorVeiculo } from './seletor-veiculo';

describe('SeletorVeiculo', () => {
  let component: SeletorVeiculo;
  let fixture: ComponentFixture<SeletorVeiculo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeletorVeiculo]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SeletorVeiculo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
