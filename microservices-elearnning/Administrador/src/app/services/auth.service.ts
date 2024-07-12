import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { Logintoken } from '@interfaces/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenService = inject(TokenService);
  private apiUrl = `${environment.API_URL}api/auth`;


  constructor() {}

  login(username: string, password: string) {
    return this.http
      .post<Logintoken>(`${this.apiUrl}/login`, {
        username,
        password
      })
      .pipe(
        map((resp) => {
          if (resp.success && resp.data) this.tokenService.saveToken(resp.data.token);
          return resp;
        }),
        catchError(this.errorHandler)
      );
  }
  logout() {
    this.tokenService.removeToken();
    this.router.navigateByUrl('/autenticacion/login');
  }
  
  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.error}`;
    } else if (error.error.errors && error.error.errors.length > 0) {
      errorMessage = `Error: ${error.error.errors.at(0).msg}`;
    } else if (error.error.error) {
      errorMessage = `Error: ${error.error.error}`;
    } else {
      errorMessage = `Error code: ${error.status}, message: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
