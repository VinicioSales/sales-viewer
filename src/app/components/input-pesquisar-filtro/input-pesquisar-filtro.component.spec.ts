import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { TemaService } from '../../services/tema/tema.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagemService } from 'src/app/services/imagem/imagem.service';


import { InputPesquisarFiltroComponent } from './input-pesquisar-filtro.component';

describe('InputPesquisarFiltroComponent', () => {
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
});
