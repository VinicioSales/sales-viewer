import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoParceiroComponent } from './logo-parceiro.component';

describe('LogoParceiroComponent', () => {
  let component: LogoParceiroComponent;
  let fixture: ComponentFixture<LogoParceiroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoParceiroComponent]
    });
    fixture = TestBed.createComponent(LogoParceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
