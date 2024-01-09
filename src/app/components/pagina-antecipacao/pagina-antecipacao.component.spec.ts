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
    vendasServiceMock.getVendas.and.returnValue(of(vendasMock));

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
  });
  //!SECTION

  // SECTION: mostrarDropdownProdutos
  describe('mostrarDropdownProdutos', () => {
    
    // Mock de objetos Venda
    const vendaMock1: Venda = {
      numeroPedido: 1,
      dataInclusao: '2021-01-01',
      previsaoFaturamento: '2021-02-01',
      valorVenda: 100.00,
      produtos: [/* ...produtos... */]
    };

    const vendaMock2: Venda = {
      numeroPedido: 2,
      dataInclusao: '2021-03-01',
      previsaoFaturamento: '2021-04-01',
      valorVenda: 200.00,
      produtos: [/* ...produtos... */]
    };

    // NOTE: Quando a venda selecionada não é encontrada
    it('não deve fazer nada se a venda selecionada não for encontrada', () => {
      const vendaSelecionada: Venda = { 
        numeroPedido: 999, 
        dataInclusao: '',
        previsaoFaturamento: '',
        valorVenda: 0,
        produtos: [] 
      };
      component.mostrarDropdownProdutos(vendaSelecionada);
      expect(component.mostrarDropdownProdutosVenda).toBeUndefined();
      expect(component.dropdownAtivoVenda).toBeUndefined();
    });

    // NOTE: Quando a venda selecionada já está ativa
    it('deve desativar o dropdown se a mesma venda já está ativa', () => {
      component.listaVendasFiltrada = [vendaMock1];
      component.mostrarDropdownProdutos(vendaMock1); // Ativa o dropdown
      component.mostrarDropdownProdutos(vendaMock1); // Desativa o dropdown
      expect(component.mostrarDropdownProdutosVenda).toBeUndefined();
      expect(component.dropdownAtivoVenda).toBeUndefined();
    });

    // NOTE: Quando a venda selecionada é diferente da venda ativa
    it('deve ativar o dropdown para a nova venda selecionada', () => {
      component.listaVendasFiltrada = [vendaMock1, vendaMock2];
      component.mostrarDropdownProdutos(vendaMock1); // Ativa o dropdown para venda1
      component.mostrarDropdownProdutos(vendaMock2); // Muda o dropdown para venda2
      expect(component.mostrarDropdownProdutosVenda).toEqual(vendaMock2);
      expect(component.dropdownAtivoVenda).toEqual(vendaMock2.numeroPedido);
    });
  });
  //!SECTION

  // SECTION: filtrarCheckedStatus
  describe('filtrarCheckedStatus', () => {

    beforeEach(() => {
      component.listaVendasFiltrada = vendasMock;
      component.checkedStatus = {
        1: true,
        2: false,
        3: true // chave extra que não existe em listaVendasFiltrada
      };
      component.checkedStatusFiltrado = { ...component.checkedStatus };
    });

    // NOTE: Deve manter status para vendas existentes em listaVendasFiltrada
    it('deve manter status para vendas existentes em listaVendasFiltrada', () => {
      component.filtrarCheckedStatus();
      expect(component.checkedStatusFiltrado[1]).toBeTrue();
      expect(component.checkedStatusFiltrado[2]).toBeFalse();
    });

    // NOTE: Deve remover chaves que não correspondem a vendas em listaVendasFiltrada
    it('deve remover chaves que não correspondem a vendas em listaVendasFiltrada', () => {
      component.filtrarCheckedStatus();
      expect(component.checkedStatusFiltrado[3]).toBeUndefined();
    });

    // NOTE: Deve manter checkedStatusFiltrado vazio se listaVendasFiltrada for vazia
    it('deve manter checkedStatusFiltrado vazio se listaVendasFiltrada for vazia', () => {
      component.listaVendasFiltrada = [];
      component.filtrarCheckedStatus();
      expect(Object.keys(component.checkedStatusFiltrado).length).toBe(0);
    });

  });
  //!SECTION

  // SECTION: resetarCheckedStatusFiltrado
  describe('resetarCheckedStatusFiltrado', () => {
    beforeEach(() => {
      component.checkedStatus = {
        1: true,
        2: false,
        3: true
      };
      component.checkedStatusFiltrado = {};
    });

    // NOTE: Deve adicionar chaves de checkedStatus em checkedStatusFiltrado
    it('deve adicionar chaves de checkedStatus em checkedStatusFiltrado se elas não existirem', () => {
      component.resetarCheckedStatusFiltrado();
      expect(component.checkedStatusFiltrado[1]).toBeTrue();
      expect(component.checkedStatusFiltrado[2]).toBeFalse();
      expect(component.checkedStatusFiltrado[3]).toBeTrue();
    });

    // NOTE: Não deve alterar chaves existentes em checkedStatusFiltrado
    it('não deve alterar chaves existentes em checkedStatusFiltrado', () => {
      component.checkedStatusFiltrado = {
        1: false,
        4: true
      };
      component.resetarCheckedStatusFiltrado();
      expect(component.checkedStatusFiltrado[1]).toBeFalse(); // Não alterado
      expect(component.checkedStatusFiltrado[4]).toBeTrue(); // Não removido, pois a lógica atual não remove chaves extras
    });
  });
  //!SECTION

  // SECTION: resetarFiltros
  describe('resetarFiltros', () => {
    beforeEach(() => {
      component.listaVendas = vendasMock;
    });

    // NOTE: Deve atualizar as listas de descrições, números de pedidos e valores de venda
    it('deve atualizar as listas de descrições, números de pedidos e valores de venda', () => {
      component.resetarFiltros();
      
      expect(component.listaProdutosDescricao).toEqual(vendasMock.flatMap(venda => venda.produtos.map(produto => produto.descricaoProduto)));
      expect(component.listaNumeroPedido).toEqual(vendasMock.flatMap(venda => venda.numeroPedido));
      expect(component.listaValorVenda).toEqual(vendasMock.flatMap(venda => venda.valorVenda));
    });

    // NOTE: Deve sincronizar listaVendasFiltrada com listaVendas
    it('deve sincronizar listaVendasFiltrada com listaVendas', () => {
      component.resetarFiltros();
      expect(component.listaVendasFiltrada).toEqual(component.listaVendas);
    });
  });
  //!SECTION
  
   // SECTION: atualizarListasFiltrada
  describe('atualizarListasFiltrada', () => {

    // NOTE: Deve atualizar listaProdutosDescricao com base em listaVendasFiltrada
    it('deve atualizar listaProdutosDescricao com base em listaVendasFiltrada', () => {
      // Certifique-se de que listaVendasFiltrada está inicializada corretamente
      component.listaVendasFiltrada = vendasMock;
    
      component.atualizarListasFiltrada();
    
      const expectedProdutosDescricao = vendasMock.flatMap(venda => venda.produtos.map(produto => produto.descricaoProduto));
      expect(component.listaProdutosDescricao).toEqual(expectedProdutosDescricao);
    });
    

    // NOTE: Deve atualizar listaNumeroPedido com base em listaVendasFiltrada
    it('deve atualizar listaNumeroPedido com base em listaVendasFiltrada', () => {
      // Certifique-se de que listaVendasFiltrada está inicializada corretamente
      component.listaVendasFiltrada = vendasMock;
    
      component.atualizarListasFiltrada();
    
      const expectedNumerosPedido = vendasMock.map(venda => venda.numeroPedido);
      expect(component.listaNumeroPedido).toEqual(expectedNumerosPedido);
    });
    

    // NOTE: Deve atualizar listaValorVenda com base em listaVendasFiltrada
    it('deve atualizar listaValorVenda com base em listaVendasFiltrada', () => {
      // Inicializando listaVendasFiltrada com os dados de vendasMock
      component.listaVendasFiltrada = vendasMock;
    
      component.atualizarListasFiltrada();
    
      // Usando map ao invés de flatMap, pois valorVenda é um valor numérico
      const expectedValoresVenda = vendasMock.map(venda => venda.valorVenda);
      expect(component.listaValorVenda).toEqual(expectedValoresVenda);
    });
  });
  //!SECTION

  //SECTION - onLimparFiltros
  describe('onLimparFiltros', () => {

    //NOTE - deve resetar as propriedades de pesquisa
    it('deve resetar as propriedades de pesquisa', () => {
      component.produtoDescricaoPesquisado = 'algum valor';
      component.numeroPedidoPesquisado = '123';
      component.valorVendaPesquisado = 10;
    
      component.onLimparFiltros();
    
      expect(component.produtoDescricaoPesquisado).toBe('');
      expect(component.numeroPedidoPesquisado).toBe('');
      expect(component.valorVendaPesquisado).toBe(0);
    });

    //NOTE - Deve chamar os metodos ao chamar o onLimparFiltros
    it('Deve chamar os metodos ao chamar o onLimparFiltros', () => {
      spyOn(component, 'limparFiltros');
      spyOn(component, 'resetarCheckedStatusFiltrado');

      component.onLimparFiltros();

      expect(component.limparFiltros).toHaveBeenCalled();
      expect(component.resetarCheckedStatusFiltrado).toHaveBeenCalled();
    })

    //NOTE - deve deixar statusBotaoLimparFiltros false
    it('deve deixar statusBotaoLimparFiltros false', () => {
      component.statusBotaoLimparFiltros = false;

      component.onLimparFiltros();

      expect(component.statusBotaoLimparFiltros).toBeFalse();
    });
  });
  //!SECTION

  //SECTION - ativarBotaoLimparFiltros
  describe('ativarBotaoLimparFiltros', () => {
    //NOTE - verificar se ativarBotaoLimparFiltros define statusBotaoLimparFiltros como true
    it('deve definir statusBotaoLimparFiltros como true', () => {
      component.ativarBotaoLimparFiltros();

      expect(component.statusBotaoLimparFiltros).toBeTrue();
    });
  })
  //!SECTION

  //SECTION - verificarCamposFiltrosVazios
  describe('verificarCamposFiltrosVazios', () => {

    it('deve retornar true se todos os campos de filtro estiverem vazios', () => {
      component.produtoDescricaoPesquisado = '';
      component.numeroPedidoPesquisado = '';
      component.dataInclusaoPesquisado = '';
      component.valorVendaPesquisado = 0;

      expect(component.verificarCamposFiltrosVazios()).toBeTrue();
    });

    //NOTE - deve retornar false se produtoDescricaoPesquisado não estiver vazio
    it('deve retornar false se produtoDescricaoPesquisado não estiver vazio', () => {
      component.produtoDescricaoPesquisado = 'Algum produto';
      expect(component.verificarCamposFiltrosVazios()).toBeFalse();
    });

    //NOTE - deve retornar false se numeroPedidoPesquisado não estiver vazio
    it('deve retornar false se numeroPedidoPesquisado não estiver vazio', () => {
      component.numeroPedidoPesquisado = '123';
      expect(component.verificarCamposFiltrosVazios()).toBeFalse();
    });

    //NOTE - deve retornar false se dataInclusaoPesquisado não estiver vazia
    it('deve retornar false se dataInclusaoPesquisado não estiver vazia', () => {
      component.dataInclusaoPesquisado = '2021-01-01';
      expect(component.verificarCamposFiltrosVazios()).toBeFalse();
    });

    //NOTE - deve retornar false se valorVendaPesquisado for maior que zero
    it('deve retornar false se valorVendaPesquisado for maior que zero', () => {
      component.valorVendaPesquisado = 100;
      expect(component.verificarCamposFiltrosVazios()).toBeFalse();
    });
  });
  //!SECTION

  //SECTION - formatarData
  describe('formatarData', () => {
    // NOTE: Teste para uma data válida
    it('deve formatar corretamente uma data do formato yyyy-mm-dd para dd/mm/yyyy', () => {
      const dataOriginal = '2021-12-31';
      const dataFormatada = component.formatarData(dataOriginal);
      expect(dataFormatada).toEqual('31/12/2021');
    });

    // NOTE: Teste para outra data válida
    it('deve formatar corretamente outra data do formato yyyy-mm-dd para dd/mm/yyyy', () => {
      const dataOriginal = '2022-01-01';
      const dataFormatada = component.formatarData(dataOriginal);
      expect(dataFormatada).toEqual('01/01/2022');
    });
  });
  //!SECTION

  //SECTION - handleProdutoDescricaoPesquisado
  describe('handleProdutoDescricaoPesquisado', () => {
    // NOTE: Teste para verificar se atualiza a propriedade produtoDescricaoPesquisado
    it('deve atualizar a propriedade produtoDescricaoPesquisado', () => {
      const descricaoTeste = 'Produto Teste';
      component.handleProdutoDescricaoPesquisado(descricaoTeste);
      expect(component.produtoDescricaoPesquisado).toEqual(descricaoTeste);
    });

    // NOTE: Teste para verificar se ativarBotaoLimparFiltros é chamado
    it('deve chamar ativarBotaoLimparFiltros', () => {
      spyOn(component, 'ativarBotaoLimparFiltros');
      component.handleProdutoDescricaoPesquisado('Teste');
      expect(component.ativarBotaoLimparFiltros).toHaveBeenCalled();
    });

    // NOTE: Teste para verificar se filtrarTabela é chamado
    it('deve chamar filtrarTabela', () => {
      spyOn(component, 'filtrarTabela');
      component.handleProdutoDescricaoPesquisado('Teste');
      expect(component.filtrarTabela).toHaveBeenCalled();
    });

    // NOTE: Teste para verificar se filtrarCheckedStatus é chamado
    it('deve chamar filtrarCheckedStatus', () => {
      spyOn(component, 'filtrarCheckedStatus');
      component.handleProdutoDescricaoPesquisado('Teste');
      expect(component.filtrarCheckedStatus).toHaveBeenCalled();
    });
  })
  //!SECTION

  
});
