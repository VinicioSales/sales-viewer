import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-pagina-antecipacao',
  templateUrl: './pagina-antecipacao.component.html',
  styleUrls: ['./pagina-antecipacao.component.css']
})
export class PaginaAntecipacaoComponent {
   //NOTE - constructor
    constructor(
    private router: Router,
  ) {}

  //NOTE - home
  home() {
    this.router.navigate(['/home']);
  }

}
