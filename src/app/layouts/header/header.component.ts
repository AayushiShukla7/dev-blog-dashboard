import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  userEmail: string = '';
  isLoggedIn$ !: Observable<boolean>;
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    var userData: any = localStorage.getItem('user');
    this.userEmail = JSON.parse(userData)?.email;

    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  onLogOut() {
    this.authService.logOut();
  }
}
