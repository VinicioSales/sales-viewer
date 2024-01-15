import { TestBed } from '@angular/core/testing';
import { VendasService } from './vendas.service';
import { Venda } from 'src/app/interfaces/venda';
import { urlBackend, rotaGetVendas, rotaAdiantamento } from 'src/app/services/statics';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('VendasService', () => {
  let service: VendasService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VendasService]
    });
    service = TestBed.inject(VendasService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve vendas', () => {
    service.getVendas().subscribe(vendas => {
      expect(vendas).toBeTruthy();
      // Aqui você pode adicionar mais expectativas relacionadas ao conteúdo de 'vendas'
    });

    const req = httpTestingController.expectOne(`${urlBackend}${rotaGetVendas}`);
    expect(req.request.method).toEqual('GET');
    req.flush([]); // Simula uma resposta vazia para o GET
  });

  it('should post vendas para adiantamento', () => {
    const mockVendas: Venda[] = [];
    service.postVendasParaAdiantamento(mockVendas).subscribe(response => {
      expect(response).toBeTruthy();
      // Aqui você pode adicionar mais expectativas relacionadas à resposta do POST
    });

    const req = httpTestingController.expectOne(`${urlBackend}${rotaAdiantamento}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockVendas);
    req.flush({}); // Simula uma resposta vazia para o POST
  });
});
