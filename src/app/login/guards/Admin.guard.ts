import { Router, type CanActivateFn } from '@angular/router';
import { SessionService } from '../services/session.service';
import { inject } from '@angular/core';

export const AdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(SessionService);
  const router = inject(Router);

  if (authService.isUserAdmin()) {
    console.log('ES ADMIN');
    return true;
  } else {
    console.log('NO ES ADMIN');
    router.navigate(['/login']);
    return false;
  }
};
