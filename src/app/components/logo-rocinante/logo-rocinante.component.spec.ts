import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoRocinanteComponent } from './logo-rocinante.component';

describe('LogoRocinanteComponent', () => {
  let component: LogoRocinanteComponent;
  let fixture: ComponentFixture<LogoRocinanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoRocinanteComponent]
    });
    fixture = TestBed.createComponent(LogoRocinanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
