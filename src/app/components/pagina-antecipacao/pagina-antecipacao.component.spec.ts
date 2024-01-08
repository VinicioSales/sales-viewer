import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MockService } from 'src/app/mock/mock.service';
import { HttpClientModule } from '@angular/common/http';
import { InputComponent } from '../input/input.component';
import { BotaoComponent } from '../botao/botao.component';
import { LogService } from 'src/app/services/log/log.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BotaoTemaComponent } from '../botao-tema/botao-tema.component';
import { BotaoHomeComponent } from '../botao-home/botao-home.component';
import { PaginaAntecipacaoComponent } from './pagina-antecipacao.component';
import { MensagensService } from 'src/app/services/mensagens/mensagens.service';
import { InputPesquisarFiltroComponent } from '../input-pesquisar-filtro/input-pesquisar-filtro.component';


fdescribe('PaginaAntecipacaoComponent', () => {
  let component: PaginaAntecipacaoComponent;
  let router: Router;
  let cdr: ChangeDetectorRef;
  let logService: LogService;
  let mockService: MockService;
  let mensagensService: MensagensService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatCheckboxModule,
      ],
      declarations: [
        BotaoComponent,
        InputComponent,
        BotaoTemaComponent,
        BotaoHomeComponent,
        PaginaAntecipacaoComponent,
        InputPesquisarFiltroComponent,
      ],
      providers: [
        Router,
        LogService,
        MockService,
        MensagensService,
        ChangeDetectorRef,
      ],
    }).compileComponents();

    component = TestBed.createComponent(PaginaAntecipacaoComponent).componentInstance;
    router = TestBed.inject(Router);
    cdr = TestBed.inject(ChangeDetectorRef);
    logService = TestBed.inject(LogService);
    mockService = TestBed.inject(MockService);
    mensagensService = TestBed.inject(MensagensService);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve injetar corretamente o serviço de roteamento', () => {
    expect(router).toBeTruthy();
  });

  it('deve injetar corretamente o ChangeDetectorRef', () => {
    expect(cdr).toBeTruthy();
  });

  it('deve injetar corretamente o LogService', () => {
    expect(logService).toBeTruthy();
  });

  it('deve injetar corretamente o MockService', () => {
    expect(mockService).toBeTruthy();
  });

  it('deve injetar corretamente o MensagensService', () => {
    expect(mensagensService).toBeTruthy();
  });
});
