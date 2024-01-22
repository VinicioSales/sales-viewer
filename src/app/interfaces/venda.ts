import { Produto } from './produto'

export interface Venda {
    numeroPedido: number,
    dataInclusao: string,
    previsaoFaturamento: string,
    valorVenda: number,
    produtos: Produto[],
    numeroPedidoCliente: string,
}
