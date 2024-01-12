import { LogService } from './log.service';
import { TestBed } from '@angular/core/testing';
import { urlBackend, rotaLog } from '../statics';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LogService', () => {
  let service: LogService;
  let httpTestingController: HttpTestingController;

  // SECTION - Configuração do TestBed
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LogService]
    });

    service = TestBed.inject(LogService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // SECTION - Testes para o método log
  describe('log', () => {
    // NOTE - deve enviar uma mensagem de log com nível 'info'
    it('deve enviar uma mensagem de log com nível info', () => {
      const testMessage = 'Test log message';
      service.log(testMessage);

      const req = httpTestingController.expectOne(`${urlBackend}${rotaLog}`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ level: 'info', message: testMessage });
      req.flush({});
    });
  });

  // SECTION - Testes para o método error
  describe('error', () => {
    // NOTE - deve enviar uma mensagem de erro com nível 'error'
    it('deve enviar uma mensagem de erro com nível error', () => {
      const testMessage = 'Test error message';
      service.error(testMessage);

      const req = httpTestingController.expectOne(`${urlBackend}${rotaLog}`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ level: 'error', message: testMessage });
      req.flush({});
    });
  });

  // Verificar se não há requisições pendentes após cada teste
  afterEach(() => {
    httpTestingController.verify();
  });
});
//!SECTION
