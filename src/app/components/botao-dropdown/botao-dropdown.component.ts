import { TemaService } from '../../services/tema/tema.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { ImagemService } from '../../services/imagem/imagem.service';

@Component({
  selector: 'app-botao-dropdown',
  templateUrl: './botao-dropdown.component.html',
  styleUrls: ['./botao-dropdown.component.css']
})
export class BotaoDropdownComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/botao-dropdown-light-mode.png';
  private imgTemaEscuro: string = 'assets/img/botao-dropdown-dark-mode.png';
  
  @Output() botaoClicado = new EventEmitter<void>();
  
  constructor(private temaService: TemaService, private imagemService: ImagemService) {
    this.atualizarImg();

    this.temaService.temaEscuroLigado$.subscribe(() => {
      this.atualizarImg();
    });
  }

  atualizarImg() {
    this.imgSrc = this.imagemService.atualizarImg(this.imgTemaClaro, this.imgTemaEscuro);
  }

  //NOTE - onClick
  onClick() {
    this.botaoClicado.emit();
  }
}
