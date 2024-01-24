import { Component, EventEmitter,  Output, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacao-adiantamento',
  templateUrl: './modal-confirmacao-adiantamento.component.html',
  styleUrls: ['./modal-confirmacao-adiantamento.component.css']
})
export class ModalConfirmacaoAdiantamentoComponent implements OnInit {
  @Input() quantidadeVendasSelecionadas: number = 0;
  
  @Output() cancelar = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<string>();
  
  mensagem: string = '';
  height: string = '30px'
  dataVencimento: string = '';
  corBotaoConfirmar: string = 'var(--botao-verde)'
  corBotaoHover: string = 'var(--botao-verde-hover)'
  corBotaoCancelar: string = 'var(--botao-vermelho)'
  corBotaoConfirmarHover: string = 'var(--botao-verde-hover)'
  corBotaoCancelarHover: string = 'var(--botao-vermelho-hover)'

  //NOTE - ngOnInit
  ngOnInit(): void {
    this.mensagem = `${this.quantidadeVendasSelecionadas} vendas selecionadas.`;
  }

  //NOTE - onConfirmar
  onConfirmar() {
    this.confirmar.emit(this.dataVencimento);
  }
  
  //NOTE - onCancelar
  onCancelar() {
    this.cancelar.emit();
  }
}
