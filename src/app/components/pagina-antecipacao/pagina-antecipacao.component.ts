import { catchError, of } from 'rxjs';
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
  mostrarProdutos: boolean = false;
  listaNumeroPedido: number[] = [];
  listaDataInclusao: string[] = [];
  valorVendaPesquisado: string = '';
  listaVendasFiltrada: Venda[] = [];
  numeroPedidoPesquisado: string = '';
  dataInclusaoPesquisado: string = '';
  listaProdutosDescricao: string[] = [];
  dropdownProdutosAtivo: boolean = false;
  produtoDescricaoPesquisado: string = '';
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
        // this.logService.error(`PaginaAntecipacaoComponent - ngOnInit: ${error}`)
        return of([]);
      })
    ).subscribe((data: Venda[]) => {
      this.listaVendas = data;
      this.listaVendasFiltrada = data;
      this.resetarFiltros();
    });
  }

  //NOTE - atualizarListas
  resetarFiltros() {
    this.listaProdutosDescricao = this.listaVendas.flatMap(venda => venda.produtos.map(produto => produto.descricaoProduto));
    this.listaNumeroPedido = this.listaVendas.flatMap(venda => venda.numeroPedido);
    this.listaDataInclusao = this.listaVendas.flatMap(venda => venda.dataInclusao);
    this.listaValorVenda = this.listaVendas.flatMap(venda => venda.valorVenda);

    this.listaVendasFiltrada = this.listaVendas;
  }

  //NOTE - atualizarListasFiltrada
  atualizarListasFiltrada() {
    this.listaProdutosDescricao = this.listaVendasFiltrada.flatMap(venda => venda.produtos.map(produto => produto.descricaoProduto));
    this.listaNumeroPedido = this.listaVendasFiltrada.flatMap(venda => venda.numeroPedido);
    this.listaDataInclusao = this.listaVendasFiltrada.flatMap(venda => venda.dataInclusao);
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
    
    } else if (this.valorVendaPesquisado || this.valorVendaPesquisado != '') {
      return false
    }

    return true;
  }

  //NOTE - home
  home() {
    this.router.navigate(['/home']);
  }

  //NOTE - handlleProdutoDescricaoPesquisado
  handlleProdutoDescricaoPesquisado(produtoDescricaoPesquisado: string) {
    this.produtoDescricaoPesquisado = produtoDescricaoPesquisado;

    this.filtrarTabela();


  }

  //NOTE - handlleNumeroPedidoPesquisado
  handlleNumeroPedidoPesquisado(numeroVendaPesquisado: string) {
    this.numeroPedidoPesquisado = numeroVendaPesquisado;

    this.filtrarTabela();
  }

  //NOTE - verificarEResetarFiltros
  verificarEResetarFiltros(): boolean {
    if (!this.produtoDescricaoPesquisado && !this.numeroPedidoPesquisado &&
        !this.dataInclusaoPesquisado && !this.valorVendaPesquisado) {
      this.resetarFiltros();
      return true;
    }
  
    return false;
  }
  

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

  //NOTE - filtrarTabela
  filtrarTabela() {
    this.listaVendasFiltrada = [...this.listaVendas];
  
    if (this.produtoDescricaoPesquisado && this.produtoDescricaoPesquisado != '') {
      this.filtrarVendaPorProduto();
    } 
    
    if (this.numeroPedidoPesquisado && this.numeroPedidoPesquisado != '') {
      this.filtrarVendaPorNumeroPedido();
    }
  
    this.atualizarListasFiltrada();
  }
  
}
