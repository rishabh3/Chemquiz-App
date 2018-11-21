import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private httpService: HttpClient, private cookieService: CookieService,private Auth: AuthService, private router: Router) { }
  JWT = '';
  ngOnInit() {
    if(!this.Auth.getDetails().name){
      if(!this.cookieService.get('Auth')){
        this.router.navigate(['login']);
      }
      else{
        this.JWT = this.cookieService.get('Auth');
        this.Auth.invokeJWTLogin(this.JWT).subscribe(
          (data: any) => {
            console.log("Auto JWT authenticated");
            this.Auth.setLoggedIn(true,data.email,this.JWT,data.name); // set details locally
            // this.cookieService.set( 'Auth', data.token);
          },
          (err: HttpErrorResponse) => {
            // no matter what the error just route back to login 
            this.router.navigate(['login']);
          }
        );
      }
    }
  }

}
