import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao',
  templateUrl: './botao.component.html',
  styleUrls: ['./botao.component.css']
})
export class BotaoComponent {
  @Input() width: string = "100%"
  @Input() height: string = "39px"
  @Input() texto: string = "botao"
  @Input() botaoAtivo: boolean = true;
  @Input() backgroundHover: string = '';
  @Input() background: string = "var(--cor-botao)"

  hover: boolean = false;

}
