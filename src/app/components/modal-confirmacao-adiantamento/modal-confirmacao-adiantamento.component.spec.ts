import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmacaoAdiantamentoComponent } from './modal-confirmacao-adiantamento.component';

describe('ModalConfirmacaoAdiantamentoComponent', () => {
  let component: ModalConfirmacaoAdiantamentoComponent;
  let fixture: ComponentFixture<ModalConfirmacaoAdiantamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfirmacaoAdiantamentoComponent]
    });
    fixture = TestBed.createComponent(ModalConfirmacaoAdiantamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
