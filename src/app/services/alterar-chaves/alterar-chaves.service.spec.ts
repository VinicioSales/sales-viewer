import { TestBed } from '@angular/core/testing';

import { AlterarChavesService } from './alterar-chaves.service';

describe('AlterarChavesService', () => {
  let service: AlterarChavesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlterarChavesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
