import { Subscription } from 'rxjs';
import { TemaService } from '../../services/tema/tema.service';
import { ImagemService } from 'src/app/services/imagem/imagem.service';
import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnInit, OnDestroy, SimpleChanges, } from '@angular/core';



@Component({
  selector: 'app-input-senha',
  templateUrl: './input-senha.component.html',
  styleUrls: ['./input-senha.component.css']
})
export class InputSenhaComponent {
   // NOTE - Inputs
    @Input() width: string = '100%';
    @Input() height: string = '50px';
    @Input() placeholder: string = 'senha';
    @Input() mostrarSenha: boolean = false;

    @Output() botaoClicado = new EventEmitter<void>();
  
    // NOTE - Variáveis
    imgSrc?: string;
    valor: string = '';
    borderRadius: string = '10px';
    mostrarDropdown: boolean = false;
  
    private imgTemaClaro: string = 'assets/img/botao-invisivel-light-mode.png';
    private imgTemaEscuro: string = 'assets/img/botao-invisivel-dark-mode.png';
    
    constructor(private temaService: TemaService, private imagemService: ImagemService) {
      this.atualizarImg();

      this.temaService.temaEscuroLigado$.subscribe(() => {
        this.atualizarImg();
      });
    }

    atualizarImg() {
      this.imgSrc = this.imagemService.atualizarImg(this.imgTemaClaro, this.imgTemaEscuro);
    }

    @Output() mudarVizualizacaoSenha = new EventEmitter<void>();
    @Output() valorChange = new EventEmitter<any>();

    onValorChange(novoValor: string): void {
      this.valor = novoValor;
      this.valorChange.emit(this.valor);
    }
  
    //NOTE - onClick
    onClickVizualizacao() {
      this.mudarVizualizacaoSenha.emit();
    }
  

}
