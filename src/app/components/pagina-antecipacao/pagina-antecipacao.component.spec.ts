import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PaginaAntecipacaoComponent } from './pagina-antecipacao.component';
import { BotaoTemaComponent } from '../botao-tema/botao-tema.component';
import { BotaoHomeComponent } from '../botao-home/botao-home.component';
import { InputPesquisarFiltroComponent } from '../input-pesquisar-filtro/input-pesquisar-filtro.component';
import { InputComponent } from '../input/input.component';
import { BotaoComponent } from '../botao/botao.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { BotaoDropdownComponent } from '../botao-dropdown/botao-dropdown.component';

describe('PaginaAntecipacaoComponent', () => {
  let component: PaginaAntecipacaoComponent;
  let fixture: ComponentFixture<PaginaAntecipacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaAntecipacaoComponent, BotaoTemaComponent,
      BotaoHomeComponent, InputPesquisarFiltroComponent, InputComponent, BotaoComponent, MatCheckbox,BotaoDropdownComponent],
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(PaginaAntecipacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});