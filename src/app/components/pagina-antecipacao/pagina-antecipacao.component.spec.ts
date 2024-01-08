import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MockService } from 'src/app/mock/mock.service';
import { LogService } from 'src/app/services/log/log.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaginaAntecipacaoComponent } from './pagina-antecipacao.component';
import { MensagensService } from 'src/app/services/mensagens/mensagens.service';

describe('PaginaAntecipacaoComponent', () => {
  let component: PaginaAntecipacaoComponent;
  let fixture: ComponentFixture<PaginaAntecipacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaAntecipacaoComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(PaginaAntecipacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // SECTION - constructor
  describe('PaginaAntecipacaoComponent', () => {
    let component: PaginaAntecipacaoComponent;
    let fixture: ComponentFixture<PaginaAntecipacaoComponent>;
    let routerMock: Router;
    let cdrMock: ChangeDetectorRef;
    let logServiceMock: LogService;
    let mockServiceMock: MockService;
    let mensagensServiceMock: MensagensService;

    beforeEach(async () => {
      routerMock = jasmine.createSpyObj('Router', ['navigate']);
      cdrMock = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
      logServiceMock = jasmine.createSpyObj('LogService', ['log']);
      mockServiceMock = jasmine.createSpyObj('MockService', ['getMockData']);
      mensagensServiceMock = jasmine.createSpyObj('MensagensService', ['showMessage']);
  
      await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], // Adicione esta linha
        declarations: [ PaginaAntecipacaoComponent ],
        providers: [
          { provide: Router, useValue: routerMock },
          { provide: ChangeDetectorRef, useValue: cdrMock },
          { provide: LogService, useValue: logServiceMock },
          { provide: MockService, useValue: mockServiceMock },
          { provide: MensagensService, useValue: mensagensServiceMock },
        ]
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(PaginaAntecipacaoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

  // NOTE - deve instanciar corretamente
    it('deve instanciar corretamente', () => {
      expect(component).toBeTruthy();
    });
  });
  //!SECTION



});
