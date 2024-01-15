import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/guard.guard';
import {HomeComponent} from 'src/app/components/home/home.component'
import {LoginComponent} from 'src/app/components/login/login.component'
import {RegistroComponent} from 'src/app/components/registro/registro.component'
import {EsqueciSenhaComponent} from 'src/app/components/esqueci-senha/esqueci-senha.component'
import {RedefinirSenhaComponent} from 'src/app/components/redefinir-senha/redefinir-senha.component'
import { PaginaAntecipacaoComponent } from 'src/app/components/pagina-antecipacao/pagina-antecipacao.component'

//FIXME - REMOVER COMENTARIO AUTH
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'esqueci-senha', component: EsqueciSenhaComponent},
  { path: 'redefinir-senha', component: RedefinirSenhaComponent},
  { path: '', component: PaginaAntecipacaoComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'antecipar-venda', component: PaginaAntecipacaoComponent, /*canActivate: [AuthGuard]*/},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
