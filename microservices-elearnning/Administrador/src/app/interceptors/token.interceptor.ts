import {
  HttpContext,
  HttpContextToken,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '../services/token.service';
import { AuthService } from '@services/auth.service';

const VALIDAR_TOKEN = new HttpContextToken<boolean>(() => false);

export function ValidarToken() {
  return new HttpContext().set(VALIDAR_TOKEN, true);
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();
  if (token) {
    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authRequest);
  } else {
    return next(req);
  }
};

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const authServices = inject(AuthService);
  const error =  next(req).pipe(catchError( (error:HttpErrorResponse)=>{
    if(error.status===401){
      authServices.logout()
    }
    return throwError(()=>error)
  }));
  return error
};

