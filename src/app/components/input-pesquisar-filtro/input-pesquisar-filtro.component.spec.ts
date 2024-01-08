import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { TemaService } from '../../services/tema/tema.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagemService } from 'src/app/services/imagem/imagem.service';


import { InputPesquisarFiltroComponent } from './input-pesquisar-filtro.component';
import { ElementRef } from '@angular/core';

class MockElementRef extends ElementRef {
  constructor() { super(null); }

  override nativeElement = {
    focus: () => {} // Função focus simulada
  };
}

fdescribe('InputPesquisarFiltroComponent', () => {
  let mockElementRef: any;
  let temaServiceMock: any;
  let imagemServiceMock: any;
  let temaEscuroLigado$ = new Subject<boolean>();
  let component: InputPesquisarFiltroComponent;
  let temaEscuroLigadoSubject: BehaviorSubject<boolean>;
  let fixture: ComponentFixture<InputPesquisarFiltroComponent>;

  // SECTION - Configuração do TestBed e instância do componente
  beforeEach(async () => {
    imagemServiceMock = {
      atualizarImg: jasmine.createSpy().and.returnValue('url_da_imagem')
    };

    temaEscuroLigadoSubject = new BehaviorSubject<boolean>(false);
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
        { provide: TemaService, useValue: temaServiceMock },
        { provide: ImagemService, useValue: imagemServiceMock }
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

  // SECTION - textoPesquisado setter
  describe('textoPesquisado setter', () => {
    
    // NOTE - Deve atribuir o valor fornecido a _textoPesquisado
    it('deve atribuir o valor fornecido a _textoPesquisado', () => {
      const testValue = 'teste';
      component.textoPesquisado = testValue;
      expect(component['_textoPesquisado']).toBe(testValue);
    });
  });
  //!SECTION

  // SECTION - textoPesquisado getter
  describe('textoPesquisado getter', () => {
    
    // NOTE - Deve retornar o valor atual de _textoPesquisado
    it('deve retornar o valor atual de _textoPesquisado', () => {
      const testValue = 'teste';
      component['_textoPesquisado'] = testValue; // Definir o valor de _textoPesquisado diretamente para teste
      expect(component.textoPesquisado).toBe(testValue);
    });
  });
  //!SECTION

  // SECTION - atualizarItensFiltrados
  describe('atualizarItensFiltrados', () => {
    
    // NOTE - Deve atualizar itensFiltrados para ser uma cópia de itens
    it('deve atualizar itensFiltrados para ser uma cópia de itens', () => {
      const testItens = ['item1', 'item2', 'item3'];
      component.itens = testItens;
      component.atualizarItensFiltrados();
      expect(component.itensFiltrados).toEqual(testItens);
      expect(component.itensFiltrados).not.toBe(testItens); // Verifica se é uma cópia, não a mesma referência
    });
  });
  //!SECTION

  // SECTION - atualizarImg
  describe('atualizarImg', () => {
    
    // NOTE - Deve atualizar imgSrc usando ImagemService
    it('deve atualizar imgSrc usando ImagemService', () => {
      component.imgTemaClaro = 'caminho/temaClaro.png';
      component.imgTemaEscuro = 'caminho/temaEscuro.png';
      component.atualizarImg();
      expect(imagemServiceMock.atualizarImg).toHaveBeenCalledWith('caminho/temaClaro.png', 'caminho/temaEscuro.png');
      expect(component.imgSrc).toBe('url_da_imagem');
    });
  });
  //!SECTION

  // SECTION - handleBorderRadius
  describe('handleBorderRadius', () => {
    
    // NOTE - Deve definir borderRadius como '0px' quando mostrarDropdown for true
    it('deve definir borderRadius como "0px" quando mostrarDropdown for true', () => {
      component.mostrarDropdown = true;
      component.handleBorderRadius();
      expect(component.borderRadius).toBe('0px');
    });

    // NOTE - Deve definir borderRadius como '10px' quando mostrarDropdown for false
    it('deve definir borderRadius como "10px" quando mostrarDropdown for false', () => {
      component.mostrarDropdown = false;
      component.handleBorderRadius();
      expect(component.borderRadius).toBe('10px');
    });
  });
  //!SECTION

  // SECTION - handleClick
  describe('handleClick', () => {
    let mockEvent: any;

    beforeEach(() => {
      mockEvent = {
        target: {}
      };
      component.containerRef = {
        nativeElement: {
          contains: (target: any) => target === mockEvent.target
        }
      };
    });
    
    // NOTE - Deve fechar o dropdown e chamar handleBorderRadius quando clicado fora do elemento
    it('deve fechar o dropdown e chamar handleBorderRadius quando clicado fora do elemento', () => {
      component.mostrarDropdown = true;
      spyOn(component, 'handleBorderRadius');

      // Criar um stub para o evento que inclui a propriedade target
      const event = {
        target: document
      } as unknown as MouseEvent;
      
      component.handleClick(event);
      expect(component.mostrarDropdown).toBeFalse();
      expect(component.handleBorderRadius).toHaveBeenCalled();
    });

    // NOTE - Não deve fechar o dropdown ou chamar handleBorderRadius quando clicado dentro do elemento
    it('não deve fechar o dropdown ou chamar handleBorderRadius quando clicado dentro do elemento', () => {
      component.mostrarDropdown = true;
      spyOn(component, 'handleBorderRadius');

      mockEvent.target = component.containerRef.nativeElement; // Simula um clique dentro do elemento
      component.handleClick(mockEvent);
      
      expect(component.mostrarDropdown).toBeTrue();
      expect(component.handleBorderRadius).not.toHaveBeenCalled();
    });
  });
  //!SECTION

  // SECTION - onClick
  describe('onClick', () => {
    // NOTE - Deve emitir o valor do texto pesquisado quando o método onClick for chamado
    it('deve emitir o valor do texto pesquisado quando o método onClick for chamado', () => {
      // Arrange
      const textoPesquisado = 'Texto de teste';
      component.textoPesquisado = textoPesquisado;
      spyOn(component.pesquisar, 'emit'); // Espiona o método emit do evento pesquisar

      component.onClick();

      expect(component.pesquisar.emit).toHaveBeenCalledWith(textoPesquisado);
    });
  });
  //!SECTION

  // SECTION - onInputFocus
  describe('onInputFocus', () => {
    
    // NOTE - Deve adicionar a classe 'focused' ao elemento HTML passado como parâmetro
    it('deve adicionar a classe "focused" ao elemento HTML passado como parâmetro', () => {
      // Arrange
      const divElement = document.createElement('div');
      spyOn(divElement.classList, 'add');

      // Act
      component.onInputFocus(divElement);

      // Assert
      expect(divElement.classList.add).toHaveBeenCalledWith('focused');
    });
  });
  //!SECTION

  // SECTION - onInputBlur
  describe('onInputBlur', () => {
    
    // NOTE - Deve remover a classe 'focused' do elemento HTML passado como parâmetro
    it('deve remover a classe "focused" do elemento HTML passado como parâmetro', () => {
      // Arrange
      const divElement = document.createElement('div');
      divElement.classList.add('focused'); // Adicione a classe 'focused' para testar sua remoção
      spyOn(divElement.classList, 'remove');

      // Act
      component.onInputBlur(divElement);

      // Assert
      expect(divElement.classList.remove).toHaveBeenCalledWith('focused');
    });
  });
  //!SECTION

  // SECTION - filtrarItens
  describe('filtrarItens', () => {
    
    it('deve configurar mostrarDropdown para true', () => {
      // Arrange
      component.mostrarDropdown = false;
      
      // Act
      component.filtrarItens();

      // Assert
      expect(component.mostrarDropdown).toBe(true);
    });

    it('deve configurar itensFiltrados para uma cópia profunda de itens quando textoPesquisado estiver vazio', () => {
      // Arrange
      component.textoPesquisado = '';
      component.itens = [1, 2, 3];

      // Act
      component.filtrarItens();

      // Assert
      expect(component.itensFiltrados).toEqual(component.itens);
    });
  });
  //!SECTION

  // SECTION - selecionarItem
  describe('selecionarItem', () => {
    beforeEach(() => {
      mockElementRef = new MockElementRef() as any; // Atualização aqui para fazer o casting
      component.inputRef = mockElementRef;
    });

    it('deve definir o item selecionado e o texto pesquisado corretamente', () => {
      // Arrange
      const item = 'Item de teste';
      
      // Act
      component.selecionarItem(item);

      // Assert
      expect(component.itemSelecionado).toBe(item);
      expect(component.textoPesquisado).toBe(item);
    });

    it('deve alternar mostrarDropdown', () => {
      // Arrange
      const mostrarDropdownInicial = component.mostrarDropdown;
      
      // Act
      component.selecionarItem('Qualquer item');
      
      // Assert
      expect(component.mostrarDropdown).toBe(!mostrarDropdownInicial);
    });

    it('deve chamar handleBorderRadius', () => {
      // Arrange
      spyOn(component, 'handleBorderRadius');
      
      // Act
      component.selecionarItem('Qualquer item');
      
      // Assert
      expect(component.handleBorderRadius).toHaveBeenCalled();
    });

    it('deve emitir o item selecionado via itemSelecionadoChange', () => {
      // Arrange
      const item = 'Item de teste';
      spyOn(component.itemSelecionadoChange, 'emit');
      
      // Act
      component.selecionarItem(item);
      
      // Assert
      expect(component.itemSelecionadoChange.emit).toHaveBeenCalledWith(item);
    });

    it('deve focar o elemento de input', () => {
      // Arrange
      spyOn(mockElementRef.nativeElement, 'focus');
      
      // Act
      component.selecionarItem('Qualquer item');
      
      // Assert
      expect(mockElementRef.nativeElement.focus).toHaveBeenCalled();
    });
  });
  //!SECTION

  // SECTION - onEnter
  describe('onEnter', () => {
    it('deve chamar o método onClick', () => {
      // Arrange
      spyOn(component, 'onClick');
      
      // Act
      component.onEnter();
      
      // Assert
      expect(component.onClick).toHaveBeenCalled();
    });

    it('deve configurar mostrarDropdown para false', () => {
      // Arrange
      component.mostrarDropdown = true;
      
      // Act
      component.onEnter();
      
      // Assert
      expect(component.mostrarDropdown).toBe(false);
    });

    it('deve chamar o método handleBorderRadius', () => {
      // Arrange
      spyOn(component, 'handleBorderRadius');
      
      // Act
      component.onEnter();
      
      // Assert
      expect(component.handleBorderRadius).toHaveBeenCalled();
    });
  });
  //!SECTION

  // SECTION - limparTextoPesquisado
  describe('limparTextoPesquisado', () => {
    it('deve limpar o texto pesquisado', () => {
      // Arrange
      component.textoPesquisado = 'Texto de teste';
      
      // Act
      component.limparTextoPesquisado();
      
      // Assert
      expect(component.textoPesquisado).toBe('');
    });

    it('deve emitir o evento limparInput', () => {
      // Arrange
      spyOn(component.limparInput, 'emit');
      
      // Act
      component.limparTextoPesquisado();
      
      // Assert
      expect(component.limparInput.emit).toHaveBeenCalled();
    });
  });
  //!SECTION
});
