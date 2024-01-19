import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { Venda } from 'src/app/interfaces/venda'
import { MockService } from 'src/app/mock/mock.service'
import { LogService } from 'src/app/services/log/log.service';
import { VendasService } from 'src/app/services/vendas/vendas.service';
import { MensagensService } from 'src/app/services/mensagens/mensagens.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { SnakeToCamelService } from 'src/app/services/snake-to-camel/snake-to-camel.service';
import { AlterarChavesService } from 'src/app/services/alterar-chaves/alterar-chaves.service';
import { InputPesquisarFiltroComponent } from '../input-pesquisar-filtro/input-pesquisar-filtro.component';


@Component({
  selector: 'app-pagina-antecipacao',
  templateUrl: './pagina-antecipacao.component.html',
  styleUrls: ['./pagina-antecipacao.component.css']
})
export class PaginaAntecipacaoComponent implements OnInit {
  listaVendas: Venda[] = [];
  dropdownAtivoVenda?: number;
  carregando: boolean = false;
  listaValorVenda: number[] = [];
  listaNumeroPedido: number[] = [];
  valorVendaPesquisado: number = 0;
  listaVendasFiltrada: Venda[] = [];
  todoSelecionados: boolean = false;
  numeroPedidoPesquisado: string = '';
  dataInclusaoPesquisado: string = '';
  mostrarDropdownProdutosVenda?: Venda;
  quantidadeVendasFiltradas: number = 0;
  listaVendasSelecionadas: Venda[] = [];
  listaProdutosDescricao: string[] = [];
  dropdownProdutosAtivo: boolean = false;
  listaNumeroPedidoCliente: string[] = [];
  produtoDescricaoPesquisado: string = '';
  quantidadeVendasSelecionadas: number = 0;
  mostrarModalConfirmacao: boolean = false;
  statusBotaoLimparFiltros: boolean = false;
  numeroPedidoClientePesquisado: string = '';
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
    private vendasService: VendasService,
    public mensagensService: MensagensService,
    public alterarChavesService: AlterarChavesService,
    public snakeToCamelService: SnakeToCamelService,
  ) {}

  @ViewChild('inputValor') inputValor!: InputPesquisarFiltroComponent;
  @ViewChild('inputProduto') inputProduto!: InputPesquisarFiltroComponent;
  @ViewChild('inputNumeroPedido') inputNumeroPedido!: InputPesquisarFiltroComponent;

  //NOTE - ngOnInit
  ngOnInit(): void {
    this.carregarVendas();
  }

  //NOTE - carregarVendas
  carregarVendas() {
    this.mostrarCarregando();
    //FIXME - REMOVER MOCK
    this.mockService.getVendas().pipe(
      catchError((error) => {
        console.error(`Erro ao buscar vendas: ${error}`)
        this.logService.error(`PaginaAntecipacaoComponent - ngOnInit: ${error}`)
        this.esconderCarregando();

        return of([]);
      })
    ).subscribe((data: Venda[]) => {
      this.tratarChaves(data);
      this.atualizarCheckedStatus();
      this.quantidadeVendasFiltradas = this.getQuantidadeVendasFiltradas();
      this.listaVendasSelecionadas = [];

      this.esconderCarregando();
    });
  }

  //NOTE - atualizarCheckedStatus
  atualizarCheckedStatus() {
    this.checkedStatus = {};
    this.listaVendasFiltrada.forEach(venda => {
      this.checkedStatus[venda.numeroPedido] = false;
    });
    this.checkedStatusFiltrado = { ...this.checkedStatus };
  }

  //NOTE - tratarChaves
  tratarChaves(data: Venda[]) {
    const chavesParaAlterar = {
      valor: 'valorProduto',
      codigo: 'codigoProduto',
      data_emissao: 'dataInclusao',
      descricao: 'descricaoProduto',
      valor_total_pedido: 'valorVenda',
    }
    data = data.map(venda => this.alterarChavesService.mapKeys(venda, chavesParaAlterar));
    const camelCaseData = data.map(venda => this.snakeToCamelService.transformKeysToCamelCase(venda));
    this.listaVendas = camelCaseData;
    this.listaVendasFiltrada = camelCaseData;
  }

  //NOTE - atualizarListasVenddas
  atualizarListasVenddas() {
    
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
    this.checkedStatusFiltrado = {};
  
    this.listaVendasFiltrada.forEach(venda => {
      const key = venda.numeroPedido;
      if (this.checkedStatus.hasOwnProperty(key)) {
          this.checkedStatusFiltrado[key] = this.checkedStatus[key];
      }
    });
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
    this.dataInclusaoPesquisado = '';
  
    if (this.inputProduto && this.inputNumeroPedido && this.inputValor) {
      this.inputProduto.limparTextoPesquisado();
      this.inputNumeroPedido.limparTextoPesquisado();
      this.inputValor.limparTextoPesquisado();
    }
  
    this.cdr.detectChanges();
    this.limparFiltros();
    this.quantidadeVendasFiltradas = this.getQuantidadeVendasFiltradas();
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
    this.quantidadeVendasFiltradas = this.getQuantidadeVendasFiltradas();
  }

  //NOTE - handleNumeroPedidoPesquisado
  handleNumeroPedidoPesquisado(numeroVendaPesquisado: string) {
    this.numeroPedidoPesquisado = numeroVendaPesquisado;

    this.ativarBotaoLimparFiltros();
    this.filtrarTabela();
    this.filtrarCheckedStatus();
    this.quantidadeVendasFiltradas = this.getQuantidadeVendasFiltradas();
  }
  
  //NOTE - handleDataInclusaoPesquisado
  handdleDataInclusaoPesquisado(dataInclusaoPesquisado: string) {
    if (!dataInclusaoPesquisado || dataInclusaoPesquisado == '') {
      this.limparFiltros();
    this.filtrarCheckedStatus();

      return
    }
    const dataInclusaoPesquisadoFormatado = this.formatarData(dataInclusaoPesquisado);
    this.dataInclusaoPesquisado = dataInclusaoPesquisadoFormatado;

    this.ativarBotaoLimparFiltros();
    this.filtrarTabela();
    this.filtrarCheckedStatus();
    this.quantidadeVendasFiltradas = this.getQuantidadeVendasFiltradas();
  }

  //NOTE - handleValorVendaPesquisado
  handleValorVendaPesquisado(valorVendaPesquisado: number) {
    this.ativarBotaoLimparFiltros();
    this.valorVendaPesquisado = Number(valorVendaPesquisado);
    this.filtrarTabela();
    this.filtrarCheckedStatus();
    this.quantidadeVendasFiltradas = this.getQuantidadeVendasFiltradas();
  }

  //NOTE - handleNumeroPedidoClientePesquisado
  handleNumeroPedidoClientePesquisado(numeroPedidoClientePesquisado: string) {
    if (!numeroPedidoClientePesquisado) {
      return
    }

    this.numeroPedidoClientePesquisado = numeroPedidoClientePesquisado;

    this.ativarBotaoLimparFiltros();
    this.filtrarTabela();
    this.filtrarCheckedStatus();
    this.quantidadeVendasFiltradas = this.getQuantidadeVendasFiltradas();
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
    const produtoDescricaoPesquisado = this.produtoDescricaoPesquisado.toLocaleLowerCase();
    this.listaVendasFiltrada = this.listaVendasFiltrada.filter(
      venda => venda.produtos.some(
        produto => produto.descricaoProduto.toLocaleLowerCase().startsWith(produtoDescricaoPesquisado)
      )
    );
  
    this.atualizarListasFiltrada();
  }
  

  //NOTE - filtrarVendaPorNumeroPedido
  filtrarVendaPorNumeroPedido() {
    const numeroPedidoPesquisado = this.numeroPedidoPesquisado.toString();
    this.listaVendasFiltrada = this.listaVendasFiltrada.filter(
      venda => venda.numeroPedido.toString().startsWith(numeroPedidoPesquisado)
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
    const valorVendaPesquisadoString = this.valorVendaPesquisado.toString();
    this.listaVendasFiltrada = this.listaVendasFiltrada.filter(
      venda => venda.valorVenda.toString().startsWith(valorVendaPesquisadoString)
    );
  }
  
  //NOTE - filtrarTabela
  filtrarTabela() {
    this.mostrarCarregando();

    this.limparFiltros();
    this.quantidadeVendasFiltradas = this.getQuantidadeVendasFiltradas();
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
    this.esconderCarregando();
  }

  //NOTE - limparFiltros
  limparFiltros() {
    this.listaVendasFiltrada = [...this.listaVendas];
  }
  //!SECTION

  //NOTE - estaSelecionada
  estaSelecionada(venda: Venda) {
    return !!this.checkedStatusFiltrado[venda.numeroPedido];
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

    this.quantidadeVendasSelecionadas = this.getQuantidadeVendasSelecionadas();

    this.mostrarModalConfirmacao = true;
  }

  //NOTE - onFecharModalConfirmacaoAdiantamento
  onFecharModalConfirmacaoAdiantamento() {
    this.mostrarModalConfirmacao = false;
  }

  //NOTE - onConfirmarAdiantamento
  onConfirmarAdiantamento() {
    if (this.listaVendasSelecionadas) {
      this.mostrarCarregando();
      const listaNumeroVendas = this.getListaNumeroVendas();
      this.vendasService.postVendasParaAdiantamento(listaNumeroVendas).subscribe({
        next: (response) => {
          this.esconderCarregando();
          this.mensagensService.exibirMensagemModal(response.message);
        },
        error: (erro) => {
          this.esconderCarregando();
          console.error(erro);
          this.mensagensService.exibirMensagemModal(erro.error);
        }
      })

      this.onFecharModalConfirmacaoAdiantamento();
    }
  }

  //NOTE - getQuantidadeVendasSelecionadas
  getQuantidadeVendasSelecionadas() {
    return this.listaVendasSelecionadas.length;
  }

  //NOTE - mostrarCarregando
  mostrarCarregando() {
    this.carregando = true;
  }
  
  //NOTE - esconderCarregando
  esconderCarregando() {
    this.carregando = false;
  }

  //NOTE - getQuantidadeVendasFiltradas
  getQuantidadeVendasFiltradas() {
    return this.listaVendasFiltrada.length;
  }

  //NOTE - getListaNumeroVendas
  getListaNumeroVendas() {
    return this.listaVendasSelecionadas.map(venda => venda.numeroPedido);
  }

  //NOTE - recarregarPagina
  recarregarPagina() {
    location.reload();
  }
}
