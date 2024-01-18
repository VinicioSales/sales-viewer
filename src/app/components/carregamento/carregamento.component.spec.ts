import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { CarregamentoComponent } from './carregamento.component';

describe('CarregamentoComponent', () => {
  let component: CarregamentoComponent;
  let fixture: ComponentFixture<CarregamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MatProgressSpinner,
        CarregamentoComponent,
      ]
    });
    fixture = TestBed.createComponent(CarregamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
