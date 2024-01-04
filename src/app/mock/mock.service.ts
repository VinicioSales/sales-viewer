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
        numeroPedido: 654321,
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
        numeroPedido: 123446,
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
        numeroPedido: 173456,
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
        numeroPedido: 123956,
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
        numeroPedido: 121456,
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
        numeroPedido: 123446,
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
        numeroPedido: 123056,
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
