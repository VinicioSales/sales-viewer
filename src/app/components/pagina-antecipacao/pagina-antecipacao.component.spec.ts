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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { VendasService } from 'src/app/services/vendas/vendas.service';
import { BotaoTemaComponent } from '../botao-tema/botao-tema.component';
import { BotaoHomeComponent } from '../botao-home/botao-home.component';
import { PaginaAntecipacaoComponent } from './pagina-antecipacao.component';
import { MensagensService } from 'src/app/services/mensagens/mensagens.service';
import { LogoRocinanteComponent } from '../logo-rocinante/logo-rocinante.component';
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
        codigoProduto: 123
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
        codigoProduto: 123
      }
    ]
  }
];

const vendaMock2: Venda = 
  {
    numeroPedido: 1,
    dataInclusao: '2021-01-01',
    previsaoFaturamento: '2021-02-01',
    valorVenda: 100.00,
    produtos: [
      {
        descricaoProduto: 'Produto 1',
        valorProduto: 50.00,
        codigoProduto: 123
      }
    ]
  }




describe('PaginaAntecipacaoComponent', () => {
  let router: Router;
  let logServiceMock: any;
  let cdr: ChangeDetectorRef;
  let logService: LogService;
  let vendasServiceMock: any;
  let mockService: MockService;
  let mensagensServiceMock: any;
  let mensagensService: MensagensService;
  let component: PaginaAntecipacaoComponent;
  let fixture: ComponentFixture<PaginaAntecipacaoComponent>;
  

  beforeEach(() => {
    logServiceMock = jasmine.createSpyObj('LogService', ['error']);
    vendasServiceMock = jasmine.createSpyObj('VendasService', ['getVendas', 'postVendasParaAdiantamento']);
    vendasServiceMock.getVendas.and.returnValue(of(vendasMock));
    mensagensServiceMock = jasmine.createSpyObj('MensagensService', ['exibirMensagemModal']);

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
        LogoRocinanteComponent,
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
        { provide: MensagensService, useValue: mensagensServiceMock },
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

  //SECTION - handleNumeroPedidoPesquisado
  describe('handleNumeroPedidoPesquisado', () => {
    it('deve atualizar o número do pedido pesquisado', () => {
      const numeroPedidoPesquisado = '12345';
      component.handleNumeroPedidoPesquisado(numeroPedidoPesquisado);
  
      expect(component.numeroPedidoPesquisado).toBe(numeroPedidoPesquisado);
    });
  
    it('deve ativar o botão de limpar filtros', () => {
      spyOn(component, 'ativarBotaoLimparFiltros');
      const numeroPedidoPesquisado = '12345';
      component.handleNumeroPedidoPesquisado(numeroPedidoPesquisado);
  
      expect(component.ativarBotaoLimparFiltros).toHaveBeenCalled();
    });
  
    it('deve chamar o método de filtrar tabela', () => {
      spyOn(component, 'filtrarTabela');
      const numeroPedidoPesquisado = '12345';
      component.handleNumeroPedidoPesquisado(numeroPedidoPesquisado);
  
      expect(component.filtrarTabela).toHaveBeenCalled();
    });
  
    it('deve chamar o método de filtrar checked status', () => {
      spyOn(component, 'filtrarCheckedStatus');
      const numeroPedidoPesquisado = '12345';
      component.handleNumeroPedidoPesquisado(numeroPedidoPesquisado);
  
      expect(component.filtrarCheckedStatus).toHaveBeenCalled();
    });
  })
  //!SECTION

  //SECTION - handdleDataInclusaoPesquisado
  describe('handdleDataInclusaoPesquisado', () => {
    //NOTE - deve formatar a data e executar outras funções quando a data de inclusão pesquisada for válida
    it('deve formatar a data e executar outras funções quando a data de inclusão pesquisada for válida', () => {
      const dataInclusaoPesquisado = '01/01/2024';
      const dataInclusaoPesquisadoFormatada = '2024-01-01';
      
      spyOn(component, 'formatarData').and.returnValue(dataInclusaoPesquisadoFormatada);
      spyOn(component, 'ativarBotaoLimparFiltros');
      spyOn(component, 'filtrarTabela');
      spyOn(component, 'filtrarCheckedStatus');
  
      component.handdleDataInclusaoPesquisado(dataInclusaoPesquisado);
  
      expect(component.formatarData).toHaveBeenCalledWith(dataInclusaoPesquisado);
      expect(component.ativarBotaoLimparFiltros).toHaveBeenCalled();
      expect(component.filtrarTabela).toHaveBeenCalled();
      expect(component.filtrarCheckedStatus).toHaveBeenCalled();
    });
  
    //NOTE - deve definir dataInclusaoPesquisado corretamente quando a data de inclusão pesquisada for válida
    it('deve definir dataInclusaoPesquisado corretamente quando a data de inclusão pesquisada for válida', () => {
      const dataInclusaoPesquisado = '01/01/2024';
      const dataInclusaoPesquisadoFormatada = '2024-01-01';
      
      spyOn(component, 'formatarData').and.returnValue(dataInclusaoPesquisadoFormatada);
  
      component.handdleDataInclusaoPesquisado(dataInclusaoPesquisado);
  
      expect(component.dataInclusaoPesquisado).toBe(dataInclusaoPesquisadoFormatada);
    });
  })
  //!SECTION

  //SECTION - handleValorVendaPesquisado
  describe('handleValorVendaPesquisado', () => {
    //NOTE - deve limpar filtros e definir valorVendaPesquisado ao receber um valor válido
    it('deve limpar filtros e definir valorVendaPesquisado ao receber um valor válido', () => {
      spyOn(component, 'limparFiltros');
      spyOn(component, 'ativarBotaoLimparFiltros');
      const valorVendaPesquisado = 100;
  
      component.handleValorVendaPesquisado(valorVendaPesquisado);
  
      expect(component.limparFiltros).toHaveBeenCalled();
      expect(component.ativarBotaoLimparFiltros).toHaveBeenCalled();
      expect(component.valorVendaPesquisado).toBe(valorVendaPesquisado);
    });
  });
  //!SECTION

  //SECTION - verificarEResetarFiltros
  describe('verificarEResetarFiltros', () => {
    describe('verificarEResetarFiltros', () => {
      //NOTE - deve resetar filtros e retornar true quando nenhum filtro estiver definido
      it('deve resetar filtros e retornar true quando nenhum filtro estiver definido', () => {
        spyOn(component, 'resetarFiltros');
    
        const resultado = component.verificarEResetarFiltros();
    
        expect(component.resetarFiltros).toHaveBeenCalled();
        expect(resultado).toBe(true);
      });
    
      //NOTE - não deve resetar filtros e retornar false quando pelo menos um filtro estiver definido
      it('não deve resetar filtros e retornar false quando pelo menos um filtro estiver definido', () => {
        component.produtoDescricaoPesquisado = 'Produto';
        
        const resultado = component.verificarEResetarFiltros();
    
        expect(resultado).toBe(false);
      });
    });
    
  })
  //!SECTION

  //SECTION - filtrarVendaPorProduto
  describe('filtrarVendaPorProduto', () => {
    beforeEach(async () => {
      fixture = TestBed.createComponent(PaginaAntecipacaoComponent);
      component = fixture.componentInstance;
      component.listaVendas = vendasMock; // Usando vendasMock como dados iniciais
      fixture.detectChanges();
    });
  
    // NOTE: Teste para verificar se o filtro por descrição do produto funciona corretamente
    it('deve filtrar vendas com base na descrição do produto', () => {
      component.produtoDescricaoPesquisado = 'Produto 1';
      component.filtrarVendaPorProduto();
      expect(component.listaVendasFiltrada.length).toBe(1);
      expect(component.listaVendasFiltrada[0].numeroPedido).toEqual(1);
    });
  
    // NOTE: Teste para verificar se o método atualiza listaVendasFiltrada adequadamente
    it('deve atualizar listaVendasFiltrada ao chamar filtrarVendaPorProduto', () => {
      spyOn(component, 'atualizarListasFiltrada');
      component.filtrarVendaPorProduto();
      expect(component.atualizarListasFiltrada).toHaveBeenCalled();
    });
  });
  //!SECTION

  //SECTION - filtrarVendaPorNumeroPedido
  describe('filtrarVendaPorNumeroPedido', () => {
    //NOTE - deve filtrar as vendas pelo número do pedido especificado
    it('deve filtrar as vendas pelo número do pedido especificado', () => {
      component.numeroPedidoPesquisado = '1';
      component.filtrarVendaPorNumeroPedido();
      expect(component.listaVendasFiltrada.every(v => v.numeroPedido === Number(component.numeroPedidoPesquisado))).toBeTrue();
    });
  
    //NOTE - não deve incluir vendas com números de pedido diferentes
    it('não deve incluir vendas com números de pedido diferentes', () => {
      component.numeroPedidoPesquisado = '999';
      component.filtrarVendaPorNumeroPedido();
      expect(component.listaVendasFiltrada.length).toBe(0);
    });
  });
  //!SECTION

  //SECTION - filtrarVendaPorData
  describe('filtrarVendaPorData', () => {

    //NOTE - deve filtrar as vendas pela data de inclusão especificada
    it('deve filtrar as vendas pela data de inclusão especificada', () => {
      component.dataInclusaoPesquisado = '2021-01-01';
      component.filtrarVendaPorData();
      expect(component.listaVendasFiltrada.every(v => v.dataInclusao === component.dataInclusaoPesquisado)).toBeTrue();
    });
  
    //NOTE - não deve incluir vendas com datas de inclusão diferentes
    it('não deve incluir vendas com datas de inclusão diferentes', () => {
      component.dataInclusaoPesquisado = '2021-12-31';
      component.filtrarVendaPorData();
      expect(component.listaVendasFiltrada.length).toBe(0);
    });
  });
  //!SECTION

  //SECTION - filtrarVendaPorValor
  describe('filtrarVendaPorValor', () => {

    //NOTE - deve filtrar as vendas pelo valor da venda especificado
    it('deve filtrar as vendas pelo valor da venda especificado', () => {
      component.valorVendaPesquisado = 100.00;
      component.filtrarVendaPorValor();
      expect(component.listaVendasFiltrada.every(v => v.valorVenda === component.valorVendaPesquisado)).toBeTrue();
    });
  });
  //!SECTION

  //SECTION - filtrarTabela
  describe('filtrarTabela', () => {
    //NOTE - deve chamar o método apropriado de filtragem com base nos campos de filtro preenchidos
    it('deve chamar o método apropriado de filtragem com base nos campos de filtro preenchidos', () => {
      spyOn(component, 'filtrarVendaPorProduto');
      spyOn(component, 'filtrarVendaPorNumeroPedido');
      spyOn(component, 'filtrarVendaPorData');
      spyOn(component, 'filtrarVendaPorValor');
      spyOn(component, 'atualizarListasFiltrada');
  
      component.produtoDescricaoPesquisado = 'Produto 1';
      component.numeroPedidoPesquisado = '1';
      component.dataInclusaoPesquisado = '2021-01-01';
      component.valorVendaPesquisado = 100.00;
  
      component.filtrarTabela();
  
      expect(component.filtrarVendaPorProduto).toHaveBeenCalled();
      expect(component.filtrarVendaPorNumeroPedido).toHaveBeenCalled();
      expect(component.filtrarVendaPorData).toHaveBeenCalled();
      expect(component.filtrarVendaPorValor).toHaveBeenCalled();
      expect(component.atualizarListasFiltrada).toHaveBeenCalled();
    });
  });
  //!SECTION

  //SECTION - limparFiltros
  describe('limparFiltros', () => {

    //NOTE - deve igualar listaVendasFiltrada à listaVendas
    it('deve igualar listaVendasFiltrada à listaVendas', () => {
      component.limparFiltros();
      expect(component.listaVendasFiltrada).toEqual(component.listaVendas);
    });
  
    //NOTE - deve manter a referência original de listaVendas após limpar filtros
    it('deve manter a referência original de listaVendas após limpar filtros', () => {
      component.listaVendasFiltrada = [...vendasMock]; // Modificação inicial
      component.limparFiltros();
      expect(component.listaVendasFiltrada).toEqual(component.listaVendas);
    });
  });
  //!SECTION

  //SECTION - estaSelecionada
  describe('estaSelecionada', () => {

    beforeEach(() => {
      component.checkedStatusFiltrado = { 1: true, 2: false };
    });

    //NOTE - deve retornar verdadeiro se a venda estiver selecionada
    it('deve retornar verdadeiro se a venda estiver selecionada', () => {
      const venda: Venda = 
        {
          numeroPedido: 1,
          dataInclusao: '2021-01-01',
          previsaoFaturamento: '2021-02-01',
          valorVenda: 100.00,
          produtos: [
            {
              descricaoProduto: 'Produto 1',
              valorProduto: 50.00,
              codigoProduto: 123
            }
          ]
        }
      expect(component.estaSelecionada(venda)).toBeTrue();
    });
  
    //NOTE - deve retornar falso se a venda não estiver selecionada
    it('deve retornar falso se a venda não estiver selecionada', () => {
      const venda: Venda = 
        {
          numeroPedido: 2,
          dataInclusao: '2021-01-01',
          previsaoFaturamento: '2021-02-01',
          valorVenda: 100.00,
          produtos: [
            {
              descricaoProduto: 'Produto 1',
              valorProduto: 50.00,
              codigoProduto: 123
            }
          ]
        }
      expect(component.estaSelecionada(venda)).toBeFalse();
    });
  
    it('deve retornar falso se a venda não estiver no objeto checkedStatusFiltrado', () => {
      const venda: Venda = 
        {
          numeroPedido: 3,
          dataInclusao: '2021-01-01',
          previsaoFaturamento: '2021-02-01',
          valorVenda: 100.00,
          produtos: [
            {
              descricaoProduto: 'Produto 1',
              valorProduto: 50.00,
              codigoProduto: 123
            }
          ]
        }
      expect(component.estaSelecionada(venda)).toBeFalse();
    });
  });
  //!SECTION

  //SECTION - estaoTodosSelecionados
  describe('estaoTodosSelecionados', () => {
    beforeEach(() => {
      component.checkedStatusFiltrado = { 1: true, 2: false };
    });
  
    //NOTE - deve retornar verdadeiro se todos os itens estiverem selecionados
    it('deve retornar verdadeiro se todos os itens estiverem selecionados', () => {
      component.checkedStatusFiltrado = { 1: true, 2: true };
      expect(component.estaoTodosSelecionados()).toBeTrue();
    });
  
    //NOTE - deve retornar falso se pelo menos um item não estiver selecionado
    it('deve retornar falso se pelo menos um item não estiver selecionado', () => {
      expect(component.estaoTodosSelecionados()).toBeFalse();
    });
  });
  //!SECTION

  //SECTION - onSelecionarTodasVendas
  describe('onSelecionarTodasVendas', () => {
    beforeEach(() => {
      component.listaVendasFiltrada = vendasMock;
      component.checkedStatusFiltrado = { 1: false, 2: false };
    });
  
    it('deve marcar todos os itens se nenhum estiver selecionado', () => {
      console.log('component.listaVendasFiltrada');
      console.log(component.listaVendasFiltrada);
      component.onSelecionarTodasVendas();
      expect(Object.values(component.checkedStatusFiltrado).every(status => status)).toBeTrue();
      expect(component.listaVendasSelecionadas.length).toBe(vendasMock.length);
    });
  
    it('deve desmarcar todos os itens se todos estiverem selecionados', () => {
      component.checkedStatusFiltrado = { 1: true, 2: true };
      component.onSelecionarTodasVendas();
      expect(Object.values(component.checkedStatusFiltrado).every(status => !status)).toBeTrue();
      expect(component.listaVendasSelecionadas.length).toBe(0);
    });
  });
  //!SECTION

  //SECTION - addListaVendaSelecionada
  describe('addListaVendaSelecionada', () => {
    beforeEach(() => {
      component.listaVendasSelecionadas = [];
    });
    
    //NOTE - deve adicionar uma venda à lista de vendas selecionadas
    it('deve adicionar uma venda à lista de vendas selecionadas', () => {
      const venda = { numeroPedido: 1 };
      component.addListaVendaSelecionada(vendaMock2);
      expect(component.listaVendasSelecionadas).toContain(vendaMock2);
    });
  });
  //!SECTION
  
  //SECTION - removerVenda
  describe('removerVenda', () => {
    beforeEach(() => {
      component.listaVendasSelecionadas = vendasMock;
    });
  
    //NOTE - deve remover uma venda da lista de vendas selecionadas
    it('deve remover uma venda da lista de vendas selecionadas', () => {
      component.removerVenda(vendaMock2);
      expect(component.listaVendasSelecionadas).not.toContain(vendaMock2);
    });
  });
  //!SECTION

  //SECTION - onSelecionarVenda
  describe('onSelecionarVenda', () => {
    beforeEach(() => {
      component.checkedStatusFiltrado = {};
      component.listaVendasSelecionadas = [];
    });
  
    it('deve adicionar a venda à lista de vendas selecionadas se estiver marcada', () => {
      component.checkedStatusFiltrado[1] = true;
      component.onSelecionarVenda(vendaMock2);
      expect(component.listaVendasSelecionadas).toContain(vendaMock2);
    });
  
    it('deve remover a venda da lista de vendas selecionadas se não estiver marcada', () => {
      component.checkedStatusFiltrado[1] = false;
      component.onSelecionarVenda(vendaMock2);
      expect(component.listaVendasSelecionadas).not.toContain(vendaMock2);
    });
  });
  //!SECTION

  //SECTION - onAdiantar
  describe('onAdiantar', () => {
    let component: PaginaAntecipacaoComponent;
    let routerMock: any;
    let cdrMock: any;
    let logServiceMock: any;
    let mockServiceMock: any;
    let vendasServiceMock: any;
    let snakeToCamelServiceMock: any;
    let alterarChavesServiceMock: any;
    let mensagensServiceMock: any;
  
    beforeEach(() => {
      // Criando mocks para todas as dependências
      routerMock = jasmine.createSpyObj('Router', ['navigate']);
      cdrMock = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
      logServiceMock = jasmine.createSpyObj('LogService', ['error']);
      mockServiceMock = jasmine.createSpyObj('MockService', ['someMethod']);
      vendasServiceMock = jasmine.createSpyObj('VendasService', ['getVendas']);
      snakeToCamelServiceMock = jasmine.createSpyObj('SnakeToCamelService', ['transformKeysToCamelCase']);
      alterarChavesServiceMock = jasmine.createSpyObj('AlterarChavesService', ['mapKeys']);
      mensagensServiceMock = jasmine.createSpyObj('MensagensService', ['exibirMensagemModal']);
  
      // Instanciando o componente com todos os mocks
      component = new PaginaAntecipacaoComponent(
        routerMock,
        cdrMock,
        logServiceMock,
        mockServiceMock,
        vendasServiceMock,
        snakeToCamelServiceMock,
        alterarChavesServiceMock,
        mensagensServiceMock
      );
  
      component.listaVendasSelecionadas = [];
    });
  
    it('deve abrir o modal de confirmação se houver vendas selecionadas', () => {
      component.listaVendasSelecionadas = vendasMock;
      component.onAdiantar();
      expect(component.mostrarModalConfirmacao).toBeTrue();
    });
    
    it('deve chamar getQuantidadeVendasSelecionadas', () => {
      spyOn(component, 'getQuantidadeVendasSelecionadas')
      component.listaVendasSelecionadas = vendasMock;
      component.onAdiantar();

      expect(component.getQuantidadeVendasSelecionadas).toHaveBeenCalled();
    });
  });
  
  
  //!SECTION

  //SECTION - fecharModalConfirmacaoAdiantamento
  describe('fecharModalConfirmacaoAdiantamento', () => {
    beforeEach(() => {
      component.mostrarModalConfirmacao = true;
    });
  
    //NOTE - deve fechar o modal de confirmação de adiantamento
    it('deve fechar o modal de confirmação de adiantamento', () => {
      component.onFecharModalConfirmacaoAdiantamento();
      expect(component.mostrarModalConfirmacao).toBeFalse();
    });
  });
  //!SECTION

  //SECTION - onFecharModalConfirmacaoAdiantamento
  describe('onFecharModalConfirmacaoAdiantamento', () => {
    //NOTE - deve definir mostrarModalConfirmacao como false
    it('deve definir mostrarModalConfirmacao como false', () => {
      component.mostrarModalConfirmacao = true;
      component.onFecharModalConfirmacaoAdiantamento();
      expect(component.mostrarModalConfirmacao).toBe(false);
    });
  });
  //!SECTION

  //SECTION - onConfirmarAdiantamento
  describe('onConfirmarAdiantamento', () => {
    it('deve chamar postVendasParaAdiantamento e exibir mensagem em caso de sucesso', () => {
      let responseMock = { message: 'Sucesso' };
      vendasServiceMock.postVendasParaAdiantamento.and.returnValue(of(responseMock));
    
      component.listaVendasSelecionadas = [/* simulação de vendas selecionadas */];
      component.onConfirmarAdiantamento();
    
      expect(vendasServiceMock.postVendasParaAdiantamento).toHaveBeenCalled();
      expect(mensagensServiceMock.exibirMensagemModal).toHaveBeenCalledWith('Sucesso');
      expect(component.mostrarModalConfirmacao).toBe(false);
    });
    
  })

  //SECTION - getQuantidadeVendasSelecionadas
  describe('getQuantidadeVendasSelecionadas', () => {
    //NOTE - deve retornar o número de vendas selecionadas
    it('deve retornar o número de vendas selecionadas', () => {
      component.listaVendasSelecionadas = [/* simulação de vendas selecionadas */];
      expect(component.getQuantidadeVendasSelecionadas()).toBe(component.listaVendasSelecionadas.length);
    });
  });
  //!SECTION
});
