import { Router } from '@angular/router';
import { Venda } from 'src/app/interfaces/venda'
import { Component, OnInit } from '@angular/core';
import { MockService } from 'src/app/mock/mock.service'


@Component({
  selector: 'app-pagina-antecipacao',
  templateUrl: './pagina-antecipacao.component.html',
  styleUrls: ['./pagina-antecipacao.component.css']
})
export class PaginaAntecipacaoComponent implements OnInit {
  listaVendas?: Venda[];
  dropdownProdutosAtivo: boolean = false;
  mostrarProdutos: boolean = false;
  corBotaoAdicionar: string = "var(--botao-verde)"
  corBotaoAdicionarHover: string = "var(--botao-verde-hover)"

  //NOTE - constructor
  constructor(
    private router: Router,
    private mockService: MockService,
  ) {}

  //NOTE - ngOnInit
  ngOnInit(): void {
    this.mockService.getVendas().subscribe((data: Venda[]) => {
      this.listaVendas = data;
    });
  }

  //NOTE - home
  home() {
    this.router.navigate(['/home']);
  }

}
