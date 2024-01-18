import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoComponent } from '../botao/botao.component';
import { ModalConfirmacaoAdiantamentoComponent } from './modal-confirmacao-adiantamento.component';

describe('ModalConfirmacaoAdiantamentoComponent', () => {
  let component: ModalConfirmacaoAdiantamentoComponent;
  let fixture: ComponentFixture<ModalConfirmacaoAdiantamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BotaoComponent,
        ModalConfirmacaoAdiantamentoComponent,
      ]
    });
    fixture = TestBed.createComponent(ModalConfirmacaoAdiantamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
