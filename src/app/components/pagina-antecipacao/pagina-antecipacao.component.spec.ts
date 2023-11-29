import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaAntecipacaoComponent } from './pagina-antecipacao.component';

describe('PaginaAntecipacaoComponent', () => {
  let component: PaginaAntecipacaoComponent;
  let fixture: ComponentFixture<PaginaAntecipacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaAntecipacaoComponent]
    });
    fixture = TestBed.createComponent(PaginaAntecipacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
