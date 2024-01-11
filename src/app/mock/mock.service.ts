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
            codigoProduto: 123
          },
          {
            descricaoProduto: "2Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 123
          },
          {
            descricaoProduto: "3Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 123
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
            codigoProduto: 123
          },
          {
            descricaoProduto: "Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 123
          },
          {
            descricaoProduto: "Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 123
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
            codigoProduto: 123
          },
          {
            descricaoProduto: "Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 123
          },
          {
            descricaoProduto: "Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 123
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
            codigoProduto: 123
          },
          {
            descricaoProduto: "Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 123
          },
          {
            descricaoProduto: "Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 123
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
            codigoProduto: 123
          },
          {
            descricaoProduto: "Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 456
          },
          {
            descricaoProduto: "Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 456
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
            codigoProduto: 456
          },
          {
            descricaoProduto: "Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 456
          },
          {
            descricaoProduto: "Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 456
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
            codigoProduto: 789
          },
          {
            descricaoProduto: "Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 789
          },
          {
            descricaoProduto: "Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 789
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
            codigoProduto: 789
          },
          {
            descricaoProduto: "Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 123
          },
          {
            descricaoProduto: "Lorem ipsum dolor sit amet",
            valorProduto: 100.00,
            codigoProduto: 123
          },
        ]
      },
    ]

    return of(this.vendas)
  }
}
