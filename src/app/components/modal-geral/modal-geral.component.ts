import { Component, EventEmitter,  Output, Input } from '@angular/core';

@Component({
  selector: 'app-modal-geral',
  templateUrl: './modal-geral.component.html',
  styleUrls: ['./modal-geral.component.css']
})
export class ModalGeralComponent {
  height: string = '23px'
  corBotaoHover: string = 'var(--botao-verde-hover)'

  @Input() mensagem: any = '';
  @Input() textoBotao: string = 'Confirmar'
  @Input() corBotao: string = 'var(--botao-verde)'


  @Output() fecharModal = new EventEmitter<void>();

  //NOTE - onClick
  onClick() {
    this.fecharModal.emit();
  }
}
