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
    @Input() itens: string[] = [];
    @Input() valor: string = 'input';
    @Input() placeholder: string = 'input';
    @Input() mostrarSenha: boolean = false;
  
    // Variáveis
    imgSrc?: string;
    itemSelecionado: string = '';
    _textoPesquisado: string = '';
    borderRadius: string = '10px';
    mostrarDropdown: boolean = false;
    itensFiltrados?: string[];
  
    // Imagens para os temas claro e escuro
    private imgTemaClaro: string = 'assets/img/botao-visivel-dark-mode.png';
    private imgTemaEscuro: string = 'assets/img/botao-visivel-light-mode.png';
  
    //NOTE -  Outputs
    @Output() botaoClicado = new EventEmitter<void>();
    @Output() mudarVizualizacaoSenha = new EventEmitter<void>();
  
    // Viewchild
    @ViewChild('containerRef') containerRef!: ElementRef;
    
    constructor(private temaService: TemaService, private imagemService: ImagemService) {
      this.atualizarImg(); // Atualizar a imagem quando o componente é criado
    }
  
    //NOTE - atualizarImg
    atualizarImg() {
      this.imgSrc = this.imagemService.atualizarImg(this.imgTemaClaro, this.imgTemaEscuro);
    }
  
    //NOTE - onClick
    onClickVizualizacao() {
      this.mudarVizualizacaoSenha.emit();
    }
  

}
