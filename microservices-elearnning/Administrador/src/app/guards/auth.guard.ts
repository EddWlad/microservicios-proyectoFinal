import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (!tokenService.isValidToken()) {
    router.navigateByUrl('/autenticacion/login');
    return false;
  }
  return true;
};
