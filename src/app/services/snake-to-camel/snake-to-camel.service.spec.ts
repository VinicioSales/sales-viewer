import { TestBed } from '@angular/core/testing';

import { SnakeToCamelService } from './snake-to-camel.service';

describe('SnakeToCamelService', () => {
  let service: SnakeToCamelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnakeToCamelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
