import { Subscription } from 'rxjs';
import { TemaService } from '../../services/tema/tema.service';
import { ImagemService } from 'src/app/services/imagem/imagem.service';
import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnInit, OnDestroy, SimpleChanges, HostListener, } from '@angular/core';

@Component({
  selector: 'app-input-pesquisar-filtro',
  templateUrl: './input-pesquisar-filtro.component.html',
  styleUrls: ['./input-pesquisar-filtro.component.css']
})
export class InputPesquisarFiltroComponent implements OnInit, OnDestroy{
  private subscription = new Subscription();
  
  // Inputs
  @Input() itens: any[] = [];
  @Input() type: string = 'text';
  @Input() width: string = '100%';
  @Input() height: string = '50px';
  @Input() placeholder: string = 'input';

  // Variáveis
  imgSrc?: string;
  itemSelecionado: string = '';
  _textoPesquisado: string = '';
  borderRadius: string = '10px';
  mostrarDropdown: boolean = false;
  itensFiltrados?: string[];

  // Imagens para os temas claro e escuro
  imgTemaEscuro: string = 'assets/img/lupa-dark-mode.png';
  imgTemaClaro: string = 'assets/img/lupa-light-mode.png';

  //NOTE -  Outputs
  @Output() pesquisar = new EventEmitter<any>();
  @Output() limparInput = new EventEmitter<void>();
  @Output() botaoClicado = new EventEmitter<void>();
  @Output() itemSelecionadoChange = new EventEmitter<string>();

  // Viewchild
  @ViewChild('inputRef') inputRef!: ElementRef;
  @ViewChild('containerRef') containerRef!: ElementRef;
  
  constructor(private temaService: TemaService, private imagemService: ImagemService) {
    this.atualizarImg();
  }

  //NOTE - ngOnInit
  ngOnInit(): void {
    this.itensFiltrados = [...this.itens];
    this.subscription.add(
      this.temaService.temaEscuroLigado$.subscribe(() => {
        this.atualizarImg();
      })
    );
  }

  //NOTE - HostListener para escutar cliques fora do componente
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.containerRef && !this.containerRef.nativeElement.contains(event.target)) {
      this.mostrarDropdown = false;
      this.handleBorderRadius();
    }
  }

  //NOTE - set textoPesquisado
  @Input()
  set textoPesquisado(value: string) {
    this._textoPesquisado = value;
  }

  //NOTE - get textoPesquisado
  get textoPesquisado(): string {
    return this._textoPesquisado;
  }

  //NOTE - ngOnChanges
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itens']) {
      this.atualizarItensFiltrados();
    }
  }

  //NOTE - atualizarItensFiltrados
  atualizarItensFiltrados(): void {
    this.itensFiltrados = [...this.itens];
  }

  //NOTE - ngOnDestroy
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //NOTE - atualizarImg
  atualizarImg() {
    this.imgSrc = this.imagemService.atualizarImg(this.imgTemaClaro, this.imgTemaEscuro);
  }

  //NOTE - handleBorderRadius
  handleBorderRadius() {
    this.borderRadius = this.mostrarDropdown ? '0px' : '10px';
  }

  //NOTE - handleClick
  handleClick(event: Event) {
    if (this.containerRef && !this.containerRef.nativeElement.contains(event.target)) {
      this.mostrarDropdown = false;
      this.handleBorderRadius();
    }
  }

  //NOTE - onClick
  onClick() {
    this.pesquisar.emit(this.textoPesquisado)
  }

  //NOTE - onInputFocus
  onInputFocus(div: HTMLElement) {
    div.classList.add('focused');
  }

  //NOTE - onInputBlur
  onInputBlur(div: HTMLElement) {
    div.classList.remove('focused');
  }

  //NOTE - filtrarItens
  filtrarItens() {
    this.mostrarDropdown = true;
    if (this.textoPesquisado.trim() === '') {
      this.itensFiltrados = [...this.itens];
    } else {
      const textoPesquisadoMinusculo = this.textoPesquisado.toLowerCase();
      this.itensFiltrados = this.itens.filter(item => {
        const itemStr = typeof item === 'number' ? item.toString() : item.toLowerCase();
        return itemStr.includes(textoPesquisadoMinusculo);
      });
    }
  }
  

  //NOTE - selecionarItem
  selecionarItem(item: string) {
    this.itemSelecionado = item;
    this.textoPesquisado = item;
    this.mostrarDropdown = !this.mostrarDropdown;
    this.handleBorderRadius();
    this.itemSelecionadoChange.emit(item);

    this.inputRef.nativeElement.focus();
  }

  //NOTE - onEnter
  onEnter() {
    this.onClick();
    this.mostrarDropdown = false;
    this.handleBorderRadius();
  }

  //NOTE - limparTextoPesquisado
  limparTextoPesquisado() {
    this.textoPesquisado = '';
    this.limparInput.emit();
  }

}
