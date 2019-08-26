import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    public tokenStorage: TokenStorageService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
