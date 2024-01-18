import { Component } from '@angular/core';
import { TemaService } from '../../services/tema/tema.service';
import { ImagemService } from '../../services/imagem/imagem.service';

@Component({
  selector: 'app-logo-parceiro',
  templateUrl: './logo-parceiro.component.html',
  styleUrls: ['./logo-parceiro.component.css']
})
export class LogoParceiroComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/MARCA SEM BG_LOGOTIPO HORIZONTAL COLOR PRETO LIGHT MODE.png';
  private imgTemaEscuro: string = 'assets/img/MARCA SEM BG_LOGOTIPO HORIZONTAL COLOR BRANCO DARK MODE.png';
  
  constructor(private temaService: TemaService, private imagemService: ImagemService) {
    this.atualizarImg();

    // Escute as mudanças do tema
    this.temaService.temaEscuroLigado$.subscribe(() => {
      this.atualizarImg();
    });
  }

  atualizarImg() {
    this.imgSrc = this.imagemService.atualizarImg(this.imgTemaClaro, this.imgTemaEscuro);
  }

}
