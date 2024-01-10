import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Venda } from 'src/app/interfaces/venda'
import { HttpClient } from '@angular/common/http';
import { urlBackend, rotaGetVendas, rotaAdiantamento } from 'src/app/services/statics'

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  constructor(
    private http: HttpClient
  ) { }

  //NOTE - getVendas
  getVendas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(`${urlBackend}${rotaGetVendas}`);
  }

  //NOTE - postVendasParaAdiantamento
  postVendasParaAdiantamento(listaVendasSelecionadas: Venda[]) {
    return this.http.post<any>(`${urlBackend}${rotaAdiantamento}`, listaVendasSelecionadas);
  }
}
