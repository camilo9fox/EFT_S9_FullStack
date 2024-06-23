import { Router, type CanActivateFn } from '@angular/router';
import { SessionService } from '../services/session.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(SessionService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    console.log('LOGEADO');
    return true;
  } else {
    console.log('DESLOGEADO');
    router.navigate(['/login']);
    return false;
  }
};
