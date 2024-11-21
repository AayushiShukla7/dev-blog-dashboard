import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private toastr: ToastrService, private router: Router) { }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
    .then(logRef => {
      this.toastr.success('Logged In Successfully!', 'SUCCESS', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });

      this.router.navigateByUrl('');  // Go to dashboard
    })
    .catch(err => {
      this.toastr.error(err.error, 'ERROR!', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      } );
    });
  }

}
