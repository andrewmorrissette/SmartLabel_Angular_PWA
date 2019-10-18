import { TestBed } from '@angular/core/testing';

import { LocalWordpressService } from './wordpress.service';

describe('WordpressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalWordpressService = TestBed.get(LocalWordpressService);
    expect(service).toBeTruthy();
  });
});
