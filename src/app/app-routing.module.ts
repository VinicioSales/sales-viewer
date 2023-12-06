import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaAntecipacaoComponent } from 'src/app/components/pagina-antecipacao/pagina-antecipacao.component'
import {RegistroComponent} from 'src/app/components/registro/registro.component'

const routes: Routes = [
  { path: 'antecipacao', component: PaginaAntecipacaoComponent},
  { path: 'registro', component: RegistroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
