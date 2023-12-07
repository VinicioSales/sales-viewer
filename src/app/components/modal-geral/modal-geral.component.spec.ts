import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BotaoTestingModule } from 'src/app/components/botao/botao-testing.module'

import { ModalGeralComponent } from './modal-geral.component';

describe('ModalGeralComponent', () => {
  let component: ModalGeralComponent;
  let fixture: ComponentFixture<ModalGeralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalGeralComponent],
      declarations: [ModalGeralComponent]
    });
    fixture = TestBed.createComponent(ModalGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //SECTION - onClick
  describe('onClick', () => {

    //NOTE - deve emitir o evento fecharModal ao chamar onClick
    it('deve emitir o evento fecharModal ao chamar onClick', () => {
      spyOn(component.fecharModal, 'emit');
      component.onClick();
      expect(component.fecharModal.emit).toHaveBeenCalled();
    })
  //!SECTION
  })
});
