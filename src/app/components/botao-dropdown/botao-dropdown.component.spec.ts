import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoDropdownComponent } from './botao-dropdown.component';

describe('BotaoDropdownComponent', () => {
  let component: BotaoDropdownComponent;
  let fixture: ComponentFixture<BotaoDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotaoDropdownComponent]
    });
    fixture = TestBed.createComponent(BotaoDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
