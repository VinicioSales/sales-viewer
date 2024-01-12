import { NgModule } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BotaoComponent } from './components/botao/botao.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BotaoTemaComponent } from './components/botao-tema/botao-tema.component';
import { BotaoHomeComponent } from './components/botao-home/botao-home.component';
import { ModalGeralComponent } from './components/modal-geral/modal-geral.component';
import { BotaoDropdownComponent } from './components/botao-dropdown/botao-dropdown.component';
import { InputDropdownComponent } from './components/input-dropdown/input-dropdown.component';
import { InputPesquisarComponent } from './components/input-pesquisar/input-pesquisar.component';
import { PaginaAntecipacaoComponent } from './components/pagina-antecipacao/pagina-antecipacao.component';
import { InputPesquisarFiltroComponent } from './components/input-pesquisar-filtro/input-pesquisar-filtro.component';
import { ModalConfirmacaoAdiantamentoComponent } from './components/modal-confirmacao-adiantamento/modal-confirmacao-adiantamento.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InputComponent } from './components/input/input.component';
import { LogoParceiroComponent } from './components/logo-parceiro/logo-parceiro.component';
import { HttpClientModule } from '@angular/common/http';
import { RedefinirSenhaComponent } from './components/redefinir-senha/redefinir-senha.component';
import { LoginComponent } from './components/login/login.component'; 
import { CarregamentoComponent } from './components/carregamento/carregamento.component';
import { EsqueciSenhaComponent } from './components/esqueci-senha/esqueci-senha.component';
import { HomeComponent } from './components/home/home.component';
import { BotaoSairComponent } from './components/botao-sair/botao-sair.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BotaoComponent,
    LoginComponent,
    InputComponent,
    RegistroComponent,
    BotaoSairComponent,
    BotaoTemaComponent,
    BotaoHomeComponent,
    ModalGeralComponent,
    LogoParceiroComponent,
    CarregamentoComponent,
    EsqueciSenhaComponent,
    InputDropdownComponent,
    BotaoDropdownComponent,
    RedefinirSenhaComponent,
    InputPesquisarComponent,
    PaginaAntecipacaoComponent,
    InputPesquisarFiltroComponent,
    ModalConfirmacaoAdiantamentoComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
