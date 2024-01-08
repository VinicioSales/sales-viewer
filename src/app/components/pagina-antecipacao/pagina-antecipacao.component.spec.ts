import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectorRef } from '@angular/core';
import { MockService } from 'src/app/mock/mock.service';
import { InputComponent } from '../input/input.component';
import { BotaoComponent } from '../botao/botao.component';
import { LogService } from 'src/app/services/log/log.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BotaoTemaComponent } from '../botao-tema/botao-tema.component';
import { BotaoHomeComponent } from '../botao-home/botao-home.component';
import { PaginaAntecipacaoComponent } from './pagina-antecipacao.component';
import { MensagensService } from 'src/app/services/mensagens/mensagens.service';
import { BotaoDropdownComponent } from '../botao-dropdown/botao-dropdown.component';
import { InputPesquisarFiltroComponent } from '../input-pesquisar-filtro/input-pesquisar-filtro.component';

describe('PaginaAntecipacaoComponent', () => {
  let component: PaginaAntecipacaoComponent;
  let fixture: ComponentFixture<PaginaAntecipacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatCheckboxModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
        InputComponent,
        BotaoComponent,
        BotaoTemaComponent,
        BotaoHomeComponent,
        BotaoDropdownComponent,
        PaginaAntecipacaoComponent,
        InputPesquisarFiltroComponent,
      ],
      providers: [
        LogService,
        MockService,
        MensagensService
        // Se houver outros serviços que precisam de mocks, inclua-os aqui
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaAntecipacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Inicializa o ciclo de detecção de mudanças do componente
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // // SECTION - constructor
  // describe('PaginaAntecipacaoComponent', () => {
  //   let component: PaginaAntecipacaoComponent;
  //   let fixture: ComponentFixture<PaginaAntecipacaoComponent>;
  //   let routerMock: Router;
  //   let cdrMock: ChangeDetectorRef;
  //   let logServiceMock: LogService;
  //   let mockServiceMock: MockService;
  //   let mensagensServiceMock: MensagensService;

  //   beforeEach(async () => {
  //     routerMock = jasmine.createSpyObj('Router', ['navigate']);
  //     cdrMock = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
  //     logServiceMock = jasmine.createSpyObj('LogService', ['log']);
  //     mockServiceMock = jasmine.createSpyObj('MockService', ['getMockData']);
  //     mensagensServiceMock = jasmine.createSpyObj('MensagensService', ['showMessage']);
  
  //     await TestBed.configureTestingModule({
  //       imports: [HttpClientTestingModule], // Adicione esta linha
  //       declarations: [ PaginaAntecipacaoComponent ],
  //       providers: [
  //         { provide: Router, useValue: routerMock },
  //         { provide: ChangeDetectorRef, useValue: cdrMock },
  //         { provide: LogService, useValue: logServiceMock },
  //         { provide: MockService, useValue: mockServiceMock },
  //         { provide: MensagensService, useValue: mensagensServiceMock },
  //       ]
  //     })
  //     .compileComponents();
  //   });

  //   beforeEach(() => {
  //     fixture = TestBed.createComponent(PaginaAntecipacaoComponent);
  //     component = fixture.componentInstance;
  //     fixture.detectChanges();
  //   });

  // // NOTE - deve instanciar corretamente
  //   it('deve instanciar corretamente', () => {
  //     expect(component).toBeTruthy();
  //   });
  // });
  // //!SECTION



});
