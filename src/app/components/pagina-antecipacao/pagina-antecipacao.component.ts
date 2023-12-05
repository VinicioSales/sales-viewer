import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-pagina-antecipacao',
  templateUrl: './pagina-antecipacao.component.html',
  styleUrls: ['./pagina-antecipacao.component.css']
})
export class PaginaAntecipacaoComponent {
  corBotaoAdicionar: string = "var(--botao-verde)"
  corBotaoAdicionarHover: string = "var(--botao-verde-hover)"
  vendas: any[] = [
    {
      numeroPedido: 123456,
      dataInclusao: "04/12/2023",
      previsaoFaturamento: "04/12/2023",
      valor: 500.00,
      mostrarProdutos: false,
      produtos: [
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
      ]
    },
    {
      numeroPedido: 123456,
      dataInclusao: "04/12/2023",
      previsaoFaturamento: "04/12/2023",
      valor: 500.00,
      mostrarProdutos: true,
      produtos: [
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
      ]
    },
    {
      numeroPedido: 123456,
      dataInclusao: "04/12/2023",
      previsaoFaturamento: "04/12/2023",
      valor: 500.00,
      mostrarProdutos: false,
      produtos: [
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
      ]
    },
    {
      numeroPedido: 123456,
      dataInclusao: "04/12/2023",
      previsaoFaturamento: "04/12/2023",
      valor: 500.00,
      mostrarProdutos: false,
      produtos: [
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
      ]
    },
    {
      numeroPedido: 123456,
      dataInclusao: "04/12/2023",
      previsaoFaturamento: "04/12/2023",
      valor: 500.00,
      mostrarProdutos: false,
      produtos: [
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
      ]
    },
    {
      numeroPedido: 123456,
      dataInclusao: "04/12/2023",
      previsaoFaturamento: "04/12/2023",
      valor: 500.00,
      mostrarProdutos: false,
      produtos: [
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
      ]
    },
    {
      numeroPedido: 123456,
      dataInclusao: "04/12/2023",
      previsaoFaturamento: "04/12/2023",
      valor: 500.00,
      mostrarProdutos: false,
      produtos: [
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
      ]
    },
    {
      numeroPedido: 123456,
      dataInclusao: "04/12/2023",
      previsaoFaturamento: "04/12/2023",
      valor: 500.00,
      mostrarProdutos: false,
      produtos: [
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
        {
          descricaoProduto: "Lorem ipsum dolor sit amet",
          valorProduto: 100.00,
          unidadeMedidaProduto: "UN"
        },
      ]
    },
    
  ];

  //NOTE - constructor
  constructor(
    private router: Router,
  ) {}

  //NOTE - home
  home() {
    this.router.navigate(['/home']);
  }

}
