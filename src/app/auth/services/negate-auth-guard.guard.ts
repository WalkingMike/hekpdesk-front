import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NegateAuthGuard implements CanActivate {

  constructor(
    public tokenStorage: TokenStorageService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (this.tokenStorage.getToken()) {
      this.router.navigateByUrl('');
      return false;
    }
    return true;
  }
}
