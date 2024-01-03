import { catchError, of, retry } from 'rxjs';
import { Router } from '@angular/router';
import { Venda } from 'src/app/interfaces/venda'
import { Component, OnInit } from '@angular/core';
import { MockService } from 'src/app/mock/mock.service'
import { LogService } from 'src/app/services/log/log.service';
import { MensagensService } from 'src/app/services/mensagens/mensagens.service';


@Component({
  selector: 'app-pagina-antecipacao',
  templateUrl: './pagina-antecipacao.component.html',
  styleUrls: ['./pagina-antecipacao.component.css']
})
export class PaginaAntecipacaoComponent implements OnInit {
  listaVendas: Venda[] = [];
  listaValorVenda: number[] = [];
  listaNumeroPedido: number[] = [];
  valorVendaPesquisado: number = 0;
  listaVendasFiltrada: Venda[] = [];
  numeroPedidoPesquisado: string = '';
  dataInclusaoPesquisado: string = '';
  mostrarDropdownProdutosVenda?: Venda;
  listaProdutosDescricao: string[] = [];
  dropdownProdutosAtivo: boolean = false;
  produtoDescricaoPesquisado: string = '';
  statusBotaoLimparFiltros: boolean = false;
  corBotaoAdicionar: string = "var(--botao-verde)"
  corBotaoAdicionarHover: string = "var(--botao-verde-hover)"

  //NOTE - constructor
  constructor(
    private router: Router,
    private logService: LogService,
    private mockService: MockService,
    public mensagensService: MensagensService,
  ) {}

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
  }

  //NOTE - mostrarDropdownProdutos
  mostrarDropdownProdutos(vendaSelecionada: Venda) {
    const vendaEncontrada = this.listaVendasFiltrada.find(venda => venda.numeroPedido === vendaSelecionada.numeroPedido)
    
    if (!vendaEncontrada) {
      return;
    }
    
    if (this.mostrarDropdownProdutosVenda && this.mostrarDropdownProdutosVenda === vendaEncontrada) {
      this.mostrarDropdownProdutosVenda = undefined;
    } else {
      this.mostrarDropdownProdutosVenda = vendaEncontrada;
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

    this.filtrarTabela();
  }

  //NOTE - handleNumeroPedidoPesquisado
  handleNumeroPedidoPesquisado(numeroVendaPesquisado: string) {
    this.numeroPedidoPesquisado = numeroVendaPesquisado;

    this.filtrarTabela();
  }
  
  //NOTE - handleDataInclusaoPesquisado
  handdleDataInclusaoPesquisado(dataInclusaoPesquisado: string) {
    if (!dataInclusaoPesquisado) {
      this.limparFiltros();
      return
    } 

    const dataInclusaoPesquisadoFormatado = this.formatarData(dataInclusaoPesquisado);
    this.dataInclusaoPesquisado = dataInclusaoPesquisadoFormatado;

    this.filtrarTabela();
  }

  //NOTE - handleValorVendaPesquisado
  handleValorVendaPesquisado(valorVendaPesquisado: number) {
    if (!valorVendaPesquisado || valorVendaPesquisado <= 0) {
      this.limparFiltros();
      return
    }

    this.valorVendaPesquisado = Number(valorVendaPesquisado);
    this.filtrarTabela();
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
    }

    this.listaVendasFiltrada = this.listaVendasFiltrada.filter(
      venda => venda.valorVenda === this.valorVendaPesquisado
    )
  }

  //NOTE - filtrarTabela
  filtrarTabela() {
    this.limparFiltros();
  
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

  
}
