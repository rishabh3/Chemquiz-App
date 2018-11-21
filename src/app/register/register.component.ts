import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  cookieValue = 'UNKNOWN';
  constructor(private Auth: AuthService, private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit() {
    //remove the cookie before each login
    this.cookieService.delete('Auth');
  }
  LoginError = '';
  submit(name:string, email: string, password: string) {
    let headers = new HttpHeaders();
    console.log('submitted');
    headers = headers.set('Content-Type', 'application/json');
    const url = 'https://chemquiz.herokuapp.com/register';
    const body = JSON.stringify({
      name: name, 
      email: email,
      password: password
    });
    console.log(body);
    this.http.post(url, body, {headers: headers}).subscribe(
      (data: any) => {
          if (data.user.email) {
            //Success
            this.router.navigate(['dashboard']);
            this.Auth.setLoggedIn(true,data.user.email,data.token,data.user.name);
            this.cookieService.set( 'Auth', data.token);
          }
      },
      (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
              console.log('Client-side error occured.');
          } else {
              console.log(err);
              if(err.status == 401){
                this.LoginError = "Invalid credentials";
              }
              else{
                this.LoginError = "Server-side error occured.";
              }
              
          }
      }
  );
  }
}
