import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const LOGIN_KEY = 'AuthLogin';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private role: string;
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveLogin(login: string) {
    window.sessionStorage.removeItem(LOGIN_KEY);
    window.sessionStorage.setItem(LOGIN_KEY, login);
  }

  public getLogin(): string {
    return sessionStorage.getItem(LOGIN_KEY);
  }

  public saveAuthority(authority: string) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authority));
  }

  public getAuthority(): string {
    this.role = 'lurker';
    if (sessionStorage.getItem(TOKEN_KEY)) {
      this.role = JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).authority;
    }
    return this.role;
  }
}
