import { TestBed } from '@angular/core/testing';

import { ExhibitService } from './exhibit.service';

describe('ExhibitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExhibitService = TestBed.get(ExhibitService);
    expect(service).toBeTruthy();
  });
});
