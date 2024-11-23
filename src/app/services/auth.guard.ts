import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  if (authService.isLoggedInGuard) {
    console.log('Access Granted');
    return true;
  }
  else {
    console.log('Access Denied');
    toastr.error("Thou shall not pass!", "", { 
      timeOut: 3000,
      positionClass: 'toast-top-right' 
    });
    router.navigateByUrl('/');
    return false;
  }

};
