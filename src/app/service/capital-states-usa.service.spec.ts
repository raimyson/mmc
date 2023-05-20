import { TestBed } from '@angular/core/testing';

import { CapitalStatesUsaService } from './capital-states-usa.service';

describe('CapitalStatesUsaService', () => {
  let service: CapitalStatesUsaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapitalStatesUsaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
