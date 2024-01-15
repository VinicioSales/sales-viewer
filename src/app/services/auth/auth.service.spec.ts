import { TestBed } from '@angular/core/testing';
import { rotaRegistrarUsuarios,urlBackend } from '../static';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //!SECTION - registrarUsuario
  describe('registrarUsuario', () => {
    //NOTE - deve chamar o método registrarUsuario e verificar a resposta
    it('deve chamar o método registrarUsuario e verificar a resposta', () =>{
      // Definindo os dados de teste
      const testData = { nome: 'Teste', email: 'teste@teste.com', senha: '123456' };
      const mockResponse = { success: true };

      service.registrarUsuario(testData.nome, testData.email, testData.senha).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

       // Simulando a resposta do servidor
       const req = httpMock.expectOne(`${urlBackend}/${rotaRegistrarUsuarios}`);
       req.flush(mockResponse);

    });

    //NOTE - deve verificar o método da requisição HTTP
    it('deve verificar o método da requisição HTTP', () =>{
      // Definindo os dados de teste
      const testData = { nome: 'Teste', email: 'teste@teste.com', senha: '123456' };

      // Chamando o método registrarUsuario
      service.registrarUsuario(testData.nome, testData.email, testData.senha).subscribe();

      // Verificando o método da requisição HTTP
      const req = httpMock.expectOne(`${urlBackend}/${rotaRegistrarUsuarios}`);
      expect(req.request.method).toBe('POST');

      // Simulando a resposta do servidor
      req.flush({ success: true });
    });

    //NOTE - deve verificar o corpo da requisição HTTP
    it('deve verificar o corpo da requisição HTTP', () =>{
       // Definindo os dados de teste
       const testData = { username: 'Teste', email: 'teste@teste.com', password: '123456' };

       // Chamando o método registrarUsuario
       service.registrarUsuario(testData.username, testData.email, testData.password).subscribe();

       // Verificando o corpo da requisição HTTP
       const req = httpMock.expectOne(`${urlBackend}/${rotaRegistrarUsuarios}`);
       expect(req.request.body).toEqual(testData);

       // Simulando a resposta do servidor
       req.flush({ success: true });
    })


  });
});
