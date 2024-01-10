import { Component, EventEmitter,  Output, Input } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacao-adiantamento',
  templateUrl: './modal-confirmacao-adiantamento.component.html',
  styleUrls: ['./modal-confirmacao-adiantamento.component.css']
})
export class ModalConfirmacaoAdiantamentoComponent {
  @Input() quantidadeVendasSelecionadas: number = 0;
  
  @Output() cancelar = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<void>();
  
  height: string = '30px'
  corBotaoConfirmar: string = 'var(--botao-verde)'
  corBotaoHover: string = 'var(--botao-verde-hover)'
  corBotaoCancelar: string = 'var(--botao-vermelho)'
  corBotaoConfirmarHover: string = 'var(--botao-verde-hover)'
  corBotaoCancelarHover: string = 'var(--botao-vermelho-hover)'
  mensagem: string = `${this.quantidadeVendasSelecionadas} vendas selecionadas.`;

  //NOTE - onConfirmar
  onConfirmar() {
    this.confirmar.emit();
  }
  
  //NOTE - onCancelar
  onCancelar() {
    this.cancelar.emit();
  }
}
