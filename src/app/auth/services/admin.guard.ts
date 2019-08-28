import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public tokenStorage: TokenStorageService,
    public router: Router
  ) {}

  canActivate() {
    if (this.tokenStorage.getAuthority() === 'admin') {
      return true;
    }
    this.router.navigateByUrl(' ');
    return false;
  }

}
