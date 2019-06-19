import { TestBed, async, inject } from '@angular/core/testing';

import { UserGuestGuard } from './user-guest.guard';

describe('UserGuestGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGuestGuard],
    });
  });

  it('should ...', inject([UserGuestGuard], (guard: UserGuestGuard) => {
    expect(guard).toBeTruthy();
  }));
});
