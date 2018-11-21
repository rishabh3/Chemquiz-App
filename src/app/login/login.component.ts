import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cookieValue = 'UNKNOWN';
  LoginError = '';
  name = '';
  constructor(private Auth: AuthService, private router: Router, private cookieService: CookieService) {}
  ngOnInit() {
    //remove the cookie before each login
    this.cookieService.delete('Auth');
  }
  submit(email: string, password: string) {
    this.Auth.invokeLogin(email, password).subscribe(
      (data: any) => {
        this.router.navigate(['dashboard']);
<<<<<<< HEAD
        this.Auth.setLoggedIn(true,data.user.email,data.token,data.user.name);
        this.cookieService.set( 'Auth', data.token);
=======
        this.Auth.setLoggedIn(true, data.user.email, data.token, data.user.name);
>>>>>>> f971790feeeee2eeb9c569029c8da9f18cd4c071
      },
      (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.LoginError = 'Invalid credentials';
        } else {
          this.LoginError = 'Server-side error occured.';
        }
      }
    );
  }

}
