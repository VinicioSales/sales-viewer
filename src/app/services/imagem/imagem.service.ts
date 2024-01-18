import { Injectable } from '@angular/core';
import { TemaService } from '../tema/tema.service';

@Injectable({
  providedIn: 'root'
})
export class ImagemService {

  constructor(private temaService: TemaService) { }

  atualizarImg(imgTemaClaro: string, imgTemaEscuro: string): string {
    return this.temaService.temaEscuroLigado ? imgTemaEscuro : imgTemaClaro;
  }

  getExitHover(): string {
    return 'assets/img/exit-hover.png'; // Caminho para a imagem de hover
  }
}
