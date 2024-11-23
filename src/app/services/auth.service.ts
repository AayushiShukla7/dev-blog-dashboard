import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  constructor(private auth: Auth, private toastr: ToastrService, private router: Router) { }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
    .then(logRef => {
      this.toastr.success('Logged In Successfully!', 'SUCCESS', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });

      this.loadUser(logRef);

      this.loggedIn.next(true);
      this.isLoggedInGuard = true;

      this.router.navigateByUrl('/dashboard');  // Go to dashboard
    })
    .catch(err => {
      this.toastr.error(err.error, 'ERROR!', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      } );
    });
  }

  loadUser(userCred: any) {
    //console.log(JSON.parse(JSON.stringify(userCred.user)));
    localStorage.setItem('user', JSON.stringify(userCred.user));
  }

  logOut() {
    signOut(this.auth).then(() => {
      this.toastr.success('User Logged Out Successfully!', '', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });

      localStorage.removeItem('user');  // Remove all user login data

      this.loggedIn.next(false);
      this.isLoggedInGuard = false;

      this.router.navigateByUrl('/');  // Go to Login
    })
    .catch(err => {
      this.toastr.error(err.error, 'ERROR!', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      } );
    });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

}
