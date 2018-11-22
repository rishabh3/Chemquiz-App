import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  JWT = '';
  email = '';
  name = '';
  constructor(private httpService: HttpClient, private cookieService: CookieService, private Auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.Auth.getDetails().name) {
      if (!this.cookieService.get('Auth')) {
        this.router.navigate(['login']);
      } else {
        this.JWT = this.cookieService.get('Auth');
        this.Auth.invokeJWTLogin(this.JWT).subscribe(
          (data: any) => {
            console.log('Auto JWT authenticated');
            this.Auth.setLoggedIn(true, data.email, this.JWT, data.name); // set details locally
            this.email = data.email;
            this.name = data.name;
            // this.cookieService.set( 'Auth', data.token);
          },
          (err: HttpErrorResponse) => {
            // no matter what the error just route back to login
            this.router.navigate(['login']);
          }
        );
      }
    }
    // var details = this.Auth.getDetails();
    // console.log(details);
    // this.name = details.name;
    // this.email = details.email;
  }

}
