import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPesquisarFiltroComponent } from './input-pesquisar-filtro.component';

describe('InputPesquisarFiltroComponent', () => {
  let component: InputPesquisarFiltroComponent;
  let fixture: ComponentFixture<InputPesquisarFiltroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputPesquisarFiltroComponent]
    });
    fixture = TestBed.createComponent(InputPesquisarFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
