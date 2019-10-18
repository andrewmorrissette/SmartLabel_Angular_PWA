import { TestBed } from '@angular/core/testing';

import { LocalAuthenticateService } from './authenticate.service';

describe('AuthenticateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalAuthenticateService = TestBed.get(LocalAuthenticateService);
    expect(service).toBeTruthy();
  });
});
