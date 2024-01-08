import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { TemaService } from '../../services/tema/tema.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagemService } from 'src/app/services/imagem/imagem.service';


import { InputPesquisarFiltroComponent } from './input-pesquisar-filtro.component';

describe('InputPesquisarFiltroComponent', () => {
  let mockElementRef: any;
  let temaServiceMock: any;
  let imagemServiceMock: any;
  let temaEscuroLigado$ = new Subject<boolean>();
  let component: InputPesquisarFiltroComponent;
  let temaEscuroLigadoSubject: BehaviorSubject<boolean>;
  let fixture: ComponentFixture<InputPesquisarFiltroComponent>;

  // SECTION - Configuração do TestBed e instância do componente
  beforeEach(async () => {

    temaEscuroLigadoSubject = new BehaviorSubject<boolean>(false); // Estado inicial falso
    temaServiceMock = {
      temaEscuroLigado$: temaEscuroLigadoSubject.asObservable(),
      toggleTema: jasmine.createSpy(),
      get temaEscuroLigado() { return temaEscuroLigadoSubject.value; },
      getTemaInicial: jasmine.createSpy()
    };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ InputPesquisarFiltroComponent ],
      providers: [
        { provide: TemaService, useValue: temaServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPesquisarFiltroComponent);
    component = fixture.componentInstance;
    spyOn(component, 'atualizarImg').and.callThrough();
    spyOn(temaServiceMock.temaEscuroLigado$, 'subscribe').and.callThrough();
    mockElementRef = { nativeElement: document.createElement('div') };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // SECTION - construtor
  describe('Construtor', () => {

    // NOTE - Deve instanciar o componente
    it('deve instanciar o componente', () => {
      expect(component).toBeTruthy();
    });

    // NOTE - Deve chamar atualizarImg no construtor
    it('deve chamar atualizarImg quando o tema muda', () => {
      temaEscuroLigadoSubject.next(true); // Simular a mudança do tema para verdadeiro
      fixture.detectChanges(); // Disparar a detecção de mudanças
      expect(component.atualizarImg).toHaveBeenCalled();
    });
  });
  //!SECTION

  // SECTION - ngOnInit
  describe('ngOnInit', () => {
    
    // NOTE - deve copiar itens para itensFiltrados
    it('deve copiar itens para itensFiltrados', () => {
      component.itens = ['item1', 'item2'];
      component.ngOnInit();
      expect(component.itensFiltrados).toEqual(['item1', 'item2']);
    });

    // NOTE - deve se inscrever nas mudanças de tema
    it('deve se inscrever nas mudanças de tema', () => {
      component.ngOnInit();
      expect(temaServiceMock.temaEscuroLigado$.subscribe).toHaveBeenCalled();
    });

    // NOTE - deve chamar atualizarImg quando o tema muda
    it('deve chamar atualizarImg quando o tema muda', () => {
      component.ngOnInit();
      expect(component.atualizarImg).toHaveBeenCalled();
    });
  });
  //!SECTION

  // SECTION - onDocumentClick
  describe('onDocumentClick', () => {
    
    // NOTE - Deve fechar o dropdown quando clicado fora do elemento
    it('deve fechar o dropdown quando clicado fora do elemento', () => {
      component.mostrarDropdown = true; // Suponha que o dropdown esteja aberto
      const event = new MouseEvent('click', { bubbles: true }); 
      document.dispatchEvent(event); // Dispara o evento de clique no document
      expect(component.mostrarDropdown).toBeFalse(); // O dropdown deve ser fechado
    });

    // NOTE - Não deve fechar o dropdown quando clicado dentro do elemento
    it('não deve fechar o dropdown quando clicado dentro do elemento', () => {
      component.mostrarDropdown = true; // Suponha que o dropdown esteja aberto
      const event = new MouseEvent('click', { bubbles: true }); 
      mockElementRef.nativeElement.dispatchEvent(event); // Dispara o evento de clique no elemento mock
      expect(component.mostrarDropdown).toBeTrue(); // O dropdown deve permanecer aberto
    });

    // NOTE - Deve chamar handleBorderRadius quando clicado fora do elemento
    it('deve chamar handleBorderRadius quando clicado fora do elemento', () => {
      spyOn(component, 'handleBorderRadius');
      const event = new MouseEvent('click', { bubbles: true }); 
      document.dispatchEvent(event); // Dispara o evento de clique no document
      expect(component.handleBorderRadius).toHaveBeenCalled(); // Verifica se handleBorderRadius foi chamado
    });
  });
  //!SECTION
});
