import { Component } from '@angular/core';
import { TemaService } from '../../services/tema/tema.service';
import { ImagemService } from '../../services/imagem/imagem.service';

@Component({
  selector: 'app-logo-rocinante',
  templateUrl: './logo-rocinante.component.html',
  styleUrls: ['./logo-rocinante.component.css']
})
export class LogoRocinanteComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/logo-rocinante.jpg';
  private imgTemaEscuro: string = 'assets/img/logo-rocinante.jpg';
  
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
