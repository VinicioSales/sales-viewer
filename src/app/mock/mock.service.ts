import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }

  //NOTE - getVendas
  getVendas(): Observable<any> {
    const vendas = [
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
    ]

    return of(vendas)
  }
}
