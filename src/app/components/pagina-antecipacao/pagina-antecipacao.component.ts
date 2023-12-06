import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { Venda } from 'src/app/interfaces/venda'
import { Component, OnInit } from '@angular/core';
import { MockService } from 'src/app/mock/mock.service'
import { LogService } from 'src/app/services/log/log.service';


@Component({
  selector: 'app-pagina-antecipacao',
  templateUrl: './pagina-antecipacao.component.html',
  styleUrls: ['./pagina-antecipacao.component.css']
})
export class PaginaAntecipacaoComponent implements OnInit {
  listaVendas?: Venda[];
  listaValorVenda: number[] = [];
  mostrarProdutos: boolean = false;
  listaNumeroPedido: number[] = [];
  listaDataInclusao: string[] = [];
  listaProdutosDescricao: string[] = [];
  dropdownProdutosAtivo: boolean = false;
  corBotaoAdicionar: string = "var(--botao-verde)"
  corBotaoAdicionarHover: string = "var(--botao-verde-hover)"

  //NOTE - constructor
  constructor(
    private router: Router,
    private logService: LogService,
    private mockService: MockService,
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
      this.listaProdutosDescricao = this.listaVendas.flatMap(venda => venda.produtos.map(produto => produto.descricaoProduto))
      this.listaNumeroPedido = this.listaVendas.flatMap(venda => venda.numeroPedido)
      this.listaDataInclusao = this.listaVendas.flatMap(venda => venda.dataInclusao)
      this.listaValorVenda = this.listaVendas.flatMap(venda => venda.valorVenda)
    });
  }

  //NOTE - home
  home() {
    this.router.navigate(['/home']);
  }

}
