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
        numeroPedido: 1,
        dataInclusao: "06/12/2023",
        previsaoFaturamento: "06/12/2023",
        valorVenda: 111.00,
        produtos: [
          {
            descricaoProduto: "1Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            unidadeMedidaProduto: "UN"
          },
          {
            descricaoProduto: "2Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            unidadeMedidaProduto: "UN"
          },
          {
            descricaoProduto: "3Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            unidadeMedidaProduto: "UN"
          },
        ]
      },
      {
        numeroPedido: 2,
        dataInclusao: "04/12/2023",
        previsaoFaturamento: "04/12/2023",
        valorVenda: 600.00,
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
        numeroPedido: 3,
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
        numeroPedido: 4,
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
        numeroPedido: 5,
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
        numeroPedido: 6,
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
        numeroPedido: 7,
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
        numeroPedido: 8,
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
