import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabelaVeiculo } from './tabela-veiculo';

describe('TabelaVeiculo', () => {
  let component: TabelaVeiculo;
  let fixture: ComponentFixture<TabelaVeiculo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaVeiculo]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TabelaVeiculo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
