import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BotaoDropdownComponent } from './botao-dropdown.component';
import { TemaService } from '../../services/tema/tema.service';
import { ImagemService } from '../../services/imagem/imagem.service';
import { BehaviorSubject } from 'rxjs';

class MockTemaService {
  temaEscuroLigado$ = new BehaviorSubject<boolean>(false); // Simula o BehaviorSubject
}

describe('BotaoDropdownComponent', () => {
  let component: BotaoDropdownComponent;
  let fixture: ComponentFixture<BotaoDropdownComponent>;
  let temaService: MockTemaService; // Usamos a versão mock do serviço
  let imagemService: ImagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotaoDropdownComponent],
      providers: [
        { provide: TemaService, useClass: MockTemaService }, // Fornecemos a versão mock do serviço
        ImagemService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BotaoDropdownComponent);
    component = fixture.componentInstance;
    temaService = TestBed.inject(TemaService) as unknown as MockTemaService; // Convertemos para o tipo mock
    imagemService = TestBed.inject(ImagemService);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve atualizar a imagem com o tema claro', () => {
    // Arrange
    spyOn(imagemService, 'atualizarImg').and.returnValue('imagem_clara.png');

    // Act
    component.atualizarImg();

    // Assert
    expect(component.imgSrc).toBe('imagem_clara.png');
    expect(imagemService.atualizarImg).toHaveBeenCalledWith(
      'assets/img/botao-dropdown-light-mode.png',
      'assets/img/botao-dropdown-dark-mode.png'
    );
  });

  it('deve atualizar a imagem com o tema escuro', () => {
    // Arrange
    spyOn(imagemService, 'atualizarImg').and.returnValue('imagem_escura.png');
    temaService.temaEscuroLigado$.next(true); // Altera o valor do tema escuro

    // Act
    component.atualizarImg();

    // Assert
    expect(component.imgSrc).toBe('imagem_escura.png');
    expect(imagemService.atualizarImg).toHaveBeenCalledWith(
      'assets/img/botao-dropdown-light-mode.png',
      'assets/img/botao-dropdown-dark-mode.png'
    );
  });

  it('deve configurar o dropdownAtivo para true quando o Input for true', () => {
    // Arrange
    component.dropdownAtivo = true;

    // Act
    fixture.detectChanges();

    // Assert
    expect(component.dropdownAtivo).toBe(true);
  });
});
