import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LogService } from './log.service';
import { urlBackend, rotaLog } from '../statics';

describe('LogService', () => {
  let service: LogService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LogService]
    });
    service = TestBed.inject(LogService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should log info level messages', () => {
    const testMessage = 'test info message';
    service.log(testMessage);
  
    const req = httpTestingController.expectOne(`${urlBackend}${rotaLog}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ level: 'info', message: testMessage });
    req.flush({});
  });
  
  it('should log error level messages', () => {
    const testMessage = 'test error message';
    service.error(testMessage);
  
    const req = httpTestingController.expectOne(`${urlBackend}${rotaLog}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ level: 'error', message: testMessage });
    req.flush({});
  });
  
});
