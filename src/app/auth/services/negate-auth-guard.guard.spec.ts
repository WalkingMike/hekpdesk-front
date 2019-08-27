import { TestBed, async, inject } from '@angular/core/testing';

import { NegateAuthGuard } from './negate-auth-guard.guard';

describe('NegateAuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NegateAuthGuard]
    });
  });

  it('should ...', inject([NegateAuthGuard], (guard: NegateAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
