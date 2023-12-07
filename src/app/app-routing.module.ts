import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaAntecipacaoComponent } from 'src/app/components/pagina-antecipacao/pagina-antecipacao.component'

const routes: Routes = [
  { path: '', component: PaginaAntecipacaoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
