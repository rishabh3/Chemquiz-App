import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginError = '';
  name = '';
  constructor(private Auth: AuthService, private router: Router) {}
  ngOnInit() {
    // console.log('Entered');
  }
  submit(email: string, password: string) {
    this.Auth.invokeLogin(email, password).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['dashboard']);
        this.Auth.setLoggedIn(true,data.user.email,data.token,data.user.name);
      },
      (err: HttpErrorResponse) => {
        if(err.status == 401){
          this.LoginError = "Invalid credentials";
        }
        else{
          this.LoginError = "Server-side error occured.";
        }
      }
    );
  }

}
