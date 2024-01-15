import { TemaService } from '../../services/tema/tema.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-input-senha',
  templateUrl: './input-senha.component.html',
  styleUrls: ['./input-senha.component.css']
})
export class InputSenhaComponent implements OnInit {
  // NOTE - Inputs
  @Input() width: string = '100%';
  @Input() height: string = '50px';
  @Input() placeholder: string = 'senha';
  @Input() mostrarSenha: boolean = false;

  @Output() valorChange = new EventEmitter<any>();
  @Output() botaoClicado = new EventEmitter<void>();
  @Output() mudarVizualizacaoSenha = new EventEmitter<void>();

  // NOTE - Variáveis
  imgSrc?: string;
  valor: string = '';
  borderRadius: string = '10px';
  mostrarDropdown: boolean = false;

  private imgVisivelTemaClaro: string = 'assets/img/botao-visivel-light-mode.png';
  private imgVisivelTemaEscuro: string = 'assets/img/botao-visivel-dark-mode.png';
  private imgInvisivelTemaClaro: string = 'assets/img/botao-invisivel-light-mode.png';
  private imgInvisivelTemaEscuro: string = 'assets/img/botao-invisivel-dark-mode.png';

  //NOTE - constructor
  constructor(
    private temaService: TemaService,
    ) {
    this.toggleImagem();

    this.temaService.temaEscuroLigado$.subscribe(() => {
      this.toggleImagem();
    });
  }

  //NOTE - ngOnInit
  ngOnInit(): void {
    // this.toggleImagem();
  }

  //NOTE - onValorChange
  onValorChange(novoValor: string): void {
    this.valor = novoValor;
    this.valorChange.emit(this.valor);
  }

  //NOTE - toggleImagem
  toggleImagem() {
    if (this.mostrarSenha) {
      this.imgSrc = this.temaService.temaEscuroLigado ? this.imgVisivelTemaEscuro : this.imgVisivelTemaClaro;
    } else {
      this.imgSrc = this.temaService.temaEscuroLigado ? this.imgInvisivelTemaEscuro : this.imgInvisivelTemaClaro;
    }
  }
  
  //NOTE - onClickVizualizacao
  onClickVizualizacao() {
    this.mostrarSenha = !this.mostrarSenha;
    this.toggleImagem();
    this.mudarVizualizacaoSenha.emit();
  }

}
