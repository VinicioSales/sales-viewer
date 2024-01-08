import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Venda } from 'src/app/interfaces/venda';
import { ChangeDetectorRef } from '@angular/core';
import { MockService } from 'src/app/mock/mock.service';
import { HttpClientModule } from '@angular/common/http';
import { InputComponent } from '../input/input.component';
import { BotaoComponent } from '../botao/botao.component';
import { LogService } from 'src/app/services/log/log.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendasService } from 'src/app/services/vendas/vendas.service';
import { BotaoTemaComponent } from '../botao-tema/botao-tema.component';
import { BotaoHomeComponent } from '../botao-home/botao-home.component';
import { PaginaAntecipacaoComponent } from './pagina-antecipacao.component';
import { MensagensService } from 'src/app/services/mensagens/mensagens.service';
import { BotaoDropdownComponent } from '../botao-dropdown/botao-dropdown.component';
import { InputPesquisarFiltroComponent } from '../input-pesquisar-filtro/input-pesquisar-filtro.component';


const vendasMock: Venda[] = [
  {
    numeroPedido: 1,
    dataInclusao: '2021-01-01',
    previsaoFaturamento: '2021-02-01',
    valorVenda: 100.00,
    produtos: [
      {
        descricaoProduto: 'Produto 1',
        valorProduto: 50.00,
        unidadeMedidaProduto: 'un'
      }
    ]
  },
  {
    numeroPedido: 2,
    dataInclusao: '2021-03-01',
    previsaoFaturamento: '2021-04-01',
    valorVenda: 200.00,
    produtos: [
      {
        descricaoProduto: 'Produto 2',
        valorProduto: 100.00,
        unidadeMedidaProduto: 'un'
      }
    ]
  }
];


fdescribe('PaginaAntecipacaoComponent', () => {
  let router: Router;
  let logServiceMock: any;
  let cdr: ChangeDetectorRef;
  let logService: LogService;
  let vendasServiceMock: any;
  let mockService: MockService;
  let mensagensService: MensagensService;
  let component: PaginaAntecipacaoComponent;
  let fixture: ComponentFixture<PaginaAntecipacaoComponent>;
  

  beforeEach(() => {
    logServiceMock = jasmine.createSpyObj('LogService', ['error']);
    vendasServiceMock = jasmine.createSpyObj('VendasService', ['getVendas']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        MatCheckboxModule,
        MatCheckboxModule,
        ReactiveFormsModule,
      ],
      declarations: [
        BotaoComponent,
        InputComponent,
        BotaoTemaComponent,
        BotaoHomeComponent,
        BotaoDropdownComponent,
        PaginaAntecipacaoComponent,
        InputPesquisarFiltroComponent,
      ],
      providers: [
        Router,
        LogService,
        MockService,
        MensagensService,
        ChangeDetectorRef,
        { provide: LogService, useValue: logServiceMock },
        { provide: VendasService, useValue: vendasServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaAntecipacaoComponent);
    component = fixture.componentInstance;

    component = TestBed.createComponent(PaginaAntecipacaoComponent).componentInstance;
    router = TestBed.inject(Router);
    cdr = TestBed.inject(ChangeDetectorRef);
    logService = TestBed.inject(LogService);
    mockService = TestBed.inject(MockService);
    mensagensService = TestBed.inject(MensagensService);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe ('constructor', () => {
    it('deve injetar corretamente o serviço de roteamento', () => {
      expect(router).toBeTruthy();
    });
  
    it('deve injetar corretamente o ChangeDetectorRef', () => {
      expect(cdr).toBeTruthy();
    });
  
    it('deve injetar corretamente o LogService', () => {
      expect(logService).toBeTruthy();
    });
  
    it('deve injetar corretamente o MockService', () => {
      expect(mockService).toBeTruthy();
    });
  
    it('deve injetar corretamente o MensagensService', () => {
      expect(mensagensService).toBeTruthy();
    });
  })
  
  // SECTION - ngOnInit
  describe('ngOnInit', () => {
    
    // NOTE - Deve chamar getVendas do serviço vendasService
    it('deve chamar getVendas do serviço vendasService', () => {
      vendasServiceMock.getVendas.and.returnValue(of([])); // Mock da resposta
      fixture.detectChanges(); // Inicializa ngOnInit
      expect(vendasServiceMock.getVendas).toHaveBeenCalled();
    });

    // NOTE - Deve lidar com erros ao buscar vendas
    it('deve lidar com erros ao buscar vendas', () => {
      const errorResponse = new Error('Erro ao buscar');
      vendasServiceMock.getVendas.and.returnValue(throwError(errorResponse));
      fixture.detectChanges(); // Inicializa ngOnInit
      expect(logServiceMock.error).toHaveBeenCalledWith(`PaginaAntecipacaoComponent - ngOnInit: ${errorResponse}`);
    });

    // NOTE - Deve inicializar listaVendas e listaVendasFiltrada
    it('deve inicializar listaVendas e listaVendasFiltrada', fakeAsync(() => {
      fixture.detectChanges(); // Inicializa ngOnInit
      tick(); // Aguarda a conclusão das operações assíncronas
  
      expect(component.listaVendas).toEqual(vendasMock);
      expect(component.listaVendasFiltrada).toEqual(vendasMock);
  
      // Verifica se checkedStatus e checkedStatusFiltrado foram inicializados corretamente
      vendasMock.forEach(venda => {
        expect(component.checkedStatus[venda.numeroPedido]).toBeFalse();
        expect(component.checkedStatusFiltrado[venda.numeroPedido]).toBeFalse();
      });
    }));

    // NOTE - Deve inicializar checkedStatus e checkedStatusFiltrado
    it('deve inicializar checkedStatus e checkedStatusFiltrado', () => {
      vendasServiceMock.getVendas.and.returnValue(of(vendasMock));
      fixture.detectChanges(); // Inicializa ngOnInit
      expect(component.checkedStatus).toEqual({ 1: false, 2: false });
      expect(component.checkedStatusFiltrado).toEqual({ 1: false, 2: false });
    });
    
  });
  //!SECTION
  
});
