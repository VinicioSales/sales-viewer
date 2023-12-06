import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Venda } from 'src/app/interfaces/venda'

@Injectable({
  providedIn: 'root'
})
export class MockService {
  vendas!: Venda[];

  constructor() { }

  //NOTE - getVendas
  getVendas(): Observable<Venda[]> {
    this.vendas = [
      {
        numeroPedido: 123456,
        dataInclusao: "04/12/2023",
        previsaoFaturamento: "04/12/2023",
        valorVenda: 500.00,
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
        valorVenda: 500.00,
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
        valorVenda: 500.00,
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
        valorVenda: 500.00,
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
        valorVenda: 500.00,
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
        valorVenda: 500.00,
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
        valorVenda: 500.00,
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
        valorVenda: 500.00,
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

    return of(this.vendas)
  }
}
