import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaAntecipacaoComponent } from './components/pagina-antecipacao/pagina-antecipacao.component';
import { BotaoTemaComponent } from './components/botao-tema/botao-tema.component';
import { BotaoHomeComponent } from './components/botao-home/botao-home.component';
import { InputDropdownComponent } from './components/input-dropdown/input-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaAntecipacaoComponent,
    BotaoTemaComponent,
    BotaoHomeComponent,
    InputDropdownComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
