import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaAntecipacaoComponent } from 'src/app/components/pagina-antecipacao/pagina-antecipacao.component'
import {RegistroComponent} from 'src/app/components/registro/registro.component'
import {RedefinirSenhaComponent} from 'src/app/components/redefinir-senha/redefinir-senha.component'
import {LoginComponent} from 'src/app/components/login/login.component'
import {EsqueciSenhaComponent} from 'src/app/components/esqueci-senha/esqueci-senha.component'
import {HomeComponent} from 'src/app/components/home/home.component'

const routes: Routes = [
  { path: 'antecipacao', component: PaginaAntecipacaoComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'redefinir-senha', component: RedefinirSenhaComponent},
  { path: 'login', component: LoginComponent},
  { path: 'esqueci-senha', component: EsqueciSenhaComponent},
  { path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
