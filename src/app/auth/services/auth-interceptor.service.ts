import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.tokenStorage.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq).pipe(
      catchError(
        err => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            console.log(err.statusText);
            if (err.status === 401) {
              this.tokenStorage.signOut();
              this.router.navigateByUrl('/login');
              window.location.reload();
            }
            if (err.status === 500) {
              console.log('EntityNotFound/ServerIssue');
            }
          }
          return throwError(err);
        })
    );
  }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
];
