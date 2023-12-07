import { NgModule } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BotaoComponent } from './components/botao/botao.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BotaoTemaComponent } from './components/botao-tema/botao-tema.component';
import { BotaoHomeComponent } from './components/botao-home/botao-home.component';
import { InputDropdownComponent } from './components/input-dropdown/input-dropdown.component';
import { InputPesquisarComponent } from './components/input-pesquisar/input-pesquisar.component';
import { PaginaAntecipacaoComponent } from './components/pagina-antecipacao/pagina-antecipacao.component';
import { BotaoDropdownComponent } from './components/botao-dropdown/botao-dropdown.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InputComponent } from './components/input/input.component';
import { LogoParceiroComponent } from './components/logo-parceiro/logo-parceiro.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalGeralComponent } from './components/modal-geral/modal-geral.component';
import { RedefinirSenhaComponent } from './components/redefinir-senha/redefinir-senha.component';
import { LoginComponent } from './components/login/login.component';
import { CarregamentoComponent } from './components/carregamento/carregamento.component';
import { EsqueciSenhaComponent } from './components/esqueci-senha/esqueci-senha.component';
import { HomeComponent } from './components/home/home.component';
import { BotaoSairComponent } from './components/botao-sair/botao-sair.component';

@NgModule({
  declarations: [
    AppComponent,
    BotaoComponent,
    BotaoTemaComponent,
    BotaoHomeComponent,
    InputDropdownComponent,
    InputPesquisarComponent,
    PaginaAntecipacaoComponent,
    BotaoDropdownComponent,
    RegistroComponent,
    InputComponent,
    LogoParceiroComponent,
    ModalGeralComponent,
    RedefinirSenhaComponent,
    LoginComponent,
    CarregamentoComponent,
    EsqueciSenhaComponent,
    HomeComponent,
    BotaoSairComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
