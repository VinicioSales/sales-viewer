import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { Venda } from 'src/app/interfaces/venda'
import { MockService } from 'src/app/mock/mock.service'
import { LogService } from 'src/app/services/log/log.service';
import { MensagensService } from 'src/app/services/mensagens/mensagens.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { InputPesquisarFiltroComponent } from '../input-pesquisar-filtro/input-pesquisar-filtro.component';


@Component({
  selector: 'app-pagina-antecipacao',
  templateUrl: './pagina-antecipacao.component.html',
  styleUrls: ['./pagina-antecipacao.component.css']
})
export class PaginaAntecipacaoComponent implements OnInit {
  listaVendas: Venda[] = [];
  dropdownAtivoVenda?: number;
  listaValorVenda: number[] = [];
  listaNumeroPedido: number[] = [];
  valorVendaPesquisado: number = 0;
  listaVendasFiltrada: Venda[] = [];
  todoSelecionados: boolean = false;
  numeroPedidoPesquisado: string = '';
  dataInclusaoPesquisado: string = '';
  mostrarDropdownProdutosVenda?: Venda;
  listaVendasSelecionadas: Venda[] = [];
  listaProdutosDescricao: string[] = [];
  abrirModalConfirmacao: boolean = false;
  dropdownProdutosAtivo: boolean = false;
  produtoDescricaoPesquisado: string = '';
  statusBotaoLimparFiltros: boolean = false;
  corBotaoAdicionar: string = "var(--botao-verde)"
  checkedStatus: { [numeroPedido: number]: boolean } = {};
  corBotaoAdicionarHover: string = "var(--botao-verde-hover)"
  checkedStatusFiltrado: { [numeroPedido: number]: boolean } = {};

  //NOTE - constructor
  constructor(
    private router: Router,
    public cdr: ChangeDetectorRef,
    private logService: LogService,
    private mockService: MockService,
    public mensagensService: MensagensService,
  ) {}

  @ViewChild('inputValor') inputValor!: InputPesquisarFiltroComponent;
  @ViewChild('inputProduto') inputProduto!: InputPesquisarFiltroComponent;
  @ViewChild('inputNumeroPedido') inputNumeroPedido!: InputPesquisarFiltroComponent;

  //NOTE - ngOnInit
  ngOnInit(): void {
    //FIXME - TROCAR MOCK
    this.mockService.getVendas().pipe(
      catchError((error) => {
        console.error(`Erro ao buscar vendas: ${error}`)
        this.logService.error(`PaginaAntecipacaoComponent - ngOnInit: ${error}`)
        return of([]);
      })
    ).subscribe((data: Venda[]) => {
      this.listaVendas = data;
      this.listaVendasFiltrada = data;
      this.resetarFiltros();
    });

    this.listaVendasFiltrada.forEach(venda => {
      this.checkedStatus[venda.numeroPedido] = false;
    });
    this.checkedStatusFiltrado = { ...this.checkedStatus };
    // this.checkedStatusFiltrado = this.checkedStatus;
  }

  //NOTE - mostrarDropdownProdutos
  mostrarDropdownProdutos(vendaSelecionada: Venda) {
    const vendaEncontrada = this.listaVendasFiltrada.find(venda => venda.numeroPedido === vendaSelecionada.numeroPedido);

    if (!vendaEncontrada) {
      return;
    }

    if (this.mostrarDropdownProdutosVenda === vendaEncontrada) {
      this.mostrarDropdownProdutosVenda = undefined;
      this.dropdownAtivoVenda = undefined;
    } else {
      this.mostrarDropdownProdutosVenda = vendaEncontrada;
      this.dropdownAtivoVenda = vendaEncontrada.numeroPedido;
    }
  }

  //NOTE - filtrarCheckeckStatus
  filtrarCheckedStatus() {
    for (let venda of this.listaVendasFiltrada) {
        let key = venda.numeroPedido;
        if (this.checkedStatus.hasOwnProperty(key)) {
            this.checkedStatusFiltrado[key] = this.checkedStatus[key];
        }
    }

    for (let key in this.checkedStatusFiltrado) {
      if (!this.listaVendasFiltrada.some(venda => venda.numeroPedido === Number(key))) {
          delete this.checkedStatusFiltrado[key];
      }
    }
  }

  //NOTE - resetarCheckedStatusFiltrado
  resetarCheckedStatusFiltrado() {
    for (let key in this.checkedStatus) {
      if (!this.checkedStatusFiltrado.hasOwnProperty(key)) {
          this.checkedStatusFiltrado[key] = this.checkedStatus[key];
      }
    }
  }

  //NOTE - atualizarListas
  resetarFiltros() {
    this.listaProdutosDescricao = this.listaVendas.flatMap(venda => venda.produtos.map(produto => produto.descricaoProduto));
    this.listaNumeroPedido = this.listaVendas.flatMap(venda => venda.numeroPedido);
    this.listaValorVenda = this.listaVendas.flatMap(venda => venda.valorVenda);

    this.listaVendasFiltrada = this.listaVendas;
  }

  //NOTE - atualizarListasFiltrada
  atualizarListasFiltrada() {
    this.listaProdutosDescricao = this.listaVendasFiltrada.flatMap(venda => venda.produtos.map(produto => produto.descricaoProduto));
    this.listaNumeroPedido = this.listaVendasFiltrada.flatMap(venda => venda.numeroPedido);
    this.listaValorVenda = this.listaVendasFiltrada.flatMap(venda => venda.valorVenda);

  }

  //NOTE - onLimparFiltros
  onLimparFiltros() {
    this.produtoDescricaoPesquisado = '';
    this.numeroPedidoPesquisado = '';
    this.valorVendaPesquisado = 0;
  
    this.inputProduto.limparTextoPesquisado();
    this.inputNumeroPedido.limparTextoPesquisado();
    this.inputValor.limparTextoPesquisado();
  
    this.cdr.detectChanges();
    this.limparFiltros();
    this.resetarCheckedStatusFiltrado();

    this.statusBotaoLimparFiltros = false;
  }
  
  ativarBotaoLimparFiltros() {
    this.statusBotaoLimparFiltros = true;
  }

  //NOTE - verificarCamposFiltrosVazios
  verificarCamposFiltrosVazios(): boolean {
    if (this.produtoDescricaoPesquisado || this.produtoDescricaoPesquisado != '') {
      return false; 
    
    } else if (this.numeroPedidoPesquisado || this.numeroPedidoPesquisado != '') {
      return false
    
    } else if (this.dataInclusaoPesquisado || this.dataInclusaoPesquisado != '') {
      return false; 
    
    } else if (this.valorVendaPesquisado || this.valorVendaPesquisado > 0) {
      return false
    }

    return true;
  }

  //NOTE - home
  home() {
    this.router.navigate(['/home']);
  }

  //NOTE - formatarData
  formatarData(dataOrigital: string) {
    let partesData = dataOrigital.split('-');
    return partesData[2] + '/' + partesData[1] + '/' + partesData[0];
  }

  //SECTION - HANDLERS

  //NOTE - handleProdutoDescricaoPesquisado
  handleProdutoDescricaoPesquisado(produtoDescricaoPesquisado: string) {
    this.produtoDescricaoPesquisado = produtoDescricaoPesquisado;

    this.ativarBotaoLimparFiltros();
    this.filtrarTabela();
    this.filtrarCheckedStatus();
  }

  //NOTE - handleNumeroPedidoPesquisado
  handleNumeroPedidoPesquisado(numeroVendaPesquisado: string) {
    this.numeroPedidoPesquisado = numeroVendaPesquisado;

    this.ativarBotaoLimparFiltros();
    this.filtrarTabela();
    this.filtrarCheckedStatus();

  }
  
  //NOTE - handleDataInclusaoPesquisado
  handdleDataInclusaoPesquisado(dataInclusaoPesquisado: string) {
    if (!dataInclusaoPesquisado) {
      this.limparFiltros();
      this.filtrarCheckedStatus();

      return
    } 

    const dataInclusaoPesquisadoFormatado = this.formatarData(dataInclusaoPesquisado);
    this.dataInclusaoPesquisado = dataInclusaoPesquisadoFormatado;

    this.ativarBotaoLimparFiltros();
    this.filtrarTabela();
    this.filtrarCheckedStatus();
  }

  //NOTE - handleValorVendaPesquisado
  handleValorVendaPesquisado(valorVendaPesquisado: number) {
    if (!valorVendaPesquisado || valorVendaPesquisado <= 0) {
      this.limparFiltros();
    this.filtrarCheckedStatus();

      return
    }

    this.ativarBotaoLimparFiltros();
    this.valorVendaPesquisado = Number(valorVendaPesquisado);
    this.filtrarTabela();
    this.filtrarCheckedStatus();

  }
  //!SECTION

  //NOTE - verificarEResetarFiltros
  verificarEResetarFiltros(): boolean {
    if (!this.produtoDescricaoPesquisado && !this.numeroPedidoPesquisado &&
        !this.dataInclusaoPesquisado && !this.valorVendaPesquisado) {
      this.resetarFiltros();
      return true;
    }
  
    return false;
  }
  
  //SECTION - FILTROS

  //NOTE - filtrarVendaPorProduto
  filtrarVendaPorProduto() {
    this.listaVendasFiltrada = this.listaVendasFiltrada.filter(
      venda => venda.produtos.some(
        produto => produto.descricaoProduto.toLocaleLowerCase() === this.produtoDescricaoPesquisado.toLocaleLowerCase()
      )
    );

    this.atualizarListasFiltrada();
  }

  //NOTE - filtrarVendaPorNumeroPedido
  filtrarVendaPorNumeroPedido() {
    const numeroPedidoPesquisado = Number(this.numeroPedidoPesquisado);
    this.listaVendasFiltrada = this.listaVendasFiltrada.filter(
      venda => venda.numeroPedido === numeroPedidoPesquisado
    );
  }

  //NOTE - filtrarVendaPorData
  filtrarVendaPorData() {
    const dataInclusao = this.dataInclusaoPesquisado;
    this.listaVendasFiltrada = this.listaVendasFiltrada.filter(
      venda => venda.dataInclusao === dataInclusao
    );
  }

  //NOTE - filtrarVendaPorValor
  filtrarVendaPorValor() {
    if (!this.valorVendaPesquisado) {
      this.limparFiltros();
    this.resetarCheckedStatusFiltrado();

    }

    this.listaVendasFiltrada = this.listaVendasFiltrada.filter(
      venda => venda.valorVenda === this.valorVendaPesquisado
    )
  }

  //NOTE - filtrarTabela
  filtrarTabela() {
    this.limparFiltros();
    this.resetarCheckedStatusFiltrado();

  
    if (this.produtoDescricaoPesquisado && this.produtoDescricaoPesquisado != '') {
      this.filtrarVendaPorProduto();
    } 
    
    if (this.numeroPedidoPesquisado && this.numeroPedidoPesquisado != '') {
      this.filtrarVendaPorNumeroPedido();
    }
    
    if (this.numeroPedidoPesquisado && this.numeroPedidoPesquisado != '') {
      this.filtrarVendaPorNumeroPedido();
    }

    if (this.dataInclusaoPesquisado && this.dataInclusaoPesquisado != '') {
      this.filtrarVendaPorData();
    }

    if (this.valorVendaPesquisado && this.valorVendaPesquisado > 0) {
      this.filtrarVendaPorValor();
    }
  
    this.atualizarListasFiltrada();
  }

  //NOTE - limparFiltros
  limparFiltros() {
    this.listaVendasFiltrada = [...this.listaVendas];
  }
  //!SECTION

  //NOTE - estaSelecionada
  estaSelecionada(venda: Venda) {
    return this.checkedStatusFiltrado[venda.numeroPedido];
  }

  //NOTE - estaoTodosSelecionados
  estaoTodosSelecionados(): boolean {
    return Object.keys(this.checkedStatusFiltrado).every(key => this.checkedStatusFiltrado[Number(key)]);
  }

  //NOTE - onSelecionarTodasVendas
  onSelecionarTodasVendas() {
    const todosMarcados = this.estaoTodosSelecionados();

    this.todoSelecionados = !todosMarcados;

    Object.keys(this.checkedStatusFiltrado).forEach(key => {
      const numeroPedido = Number(key);
      this.checkedStatusFiltrado[numeroPedido] = !todosMarcados;
    });


    this.listaVendasSelecionadas = todosMarcados ? [] : [...this.listaVendasFiltrada];
  }

  //NOTE - addListaVendaSelecionada
  addListaVendaSelecionada(vendaSelecionada: Venda) {
    this.listaVendasSelecionadas.push(vendaSelecionada);
  }

  //NOTE - removerVenda
  removerVenda(vendaARemover: Venda) {
    this.listaVendasSelecionadas = this.listaVendasSelecionadas.filter(venda => venda.numeroPedido !== vendaARemover.numeroPedido);
  }
  
  //NOTE - onSelecionarVenda
  onSelecionarVenda(vendaSelecionada: Venda) {
    const checkedStatus = this.estaSelecionada(vendaSelecionada);
    this.checkedStatusFiltrado[vendaSelecionada.numeroPedido] = checkedStatus;

    if (checkedStatus) {
      this.addListaVendaSelecionada(vendaSelecionada);
    } else {
      this.removerVenda(vendaSelecionada);
    }

  }

  //NOTE - onAdiantar
  onAdiantar() {
    if (!this.listaVendasSelecionadas.length) {
      this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_ITENS_NAO_SELECIONADOS);
      return
    }

    this.abrirModalConfirmacao = true;
  }

  //NOTE - fecharModalConfirmacaoAdiantamento
  fecharModalConfirmacaoAdiantamento() {
    this.abrirModalConfirmacao = false;
  }

}
