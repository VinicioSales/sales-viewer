import { NgModule } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BotaoComponent } from './components/botao/botao.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BotaoTemaComponent } from './components/botao-tema/botao-tema.component';
import { BotaoHomeComponent } from './components/botao-home/botao-home.component';
import { InputDropdownComponent } from './components/input-dropdown/input-dropdown.component';
import { InputPesquisarComponent } from './components/input-pesquisar/input-pesquisar.component';
import { PaginaAntecipacaoComponent } from './components/pagina-antecipacao/pagina-antecipacao.component';
import { BotaoDropdownComponent } from './components/botao-dropdown/botao-dropdown.component';

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
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
