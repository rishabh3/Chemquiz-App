import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private cookieService: CookieService, private Auth: AuthService, private router: Router) { }
  JWT = '';
  name = '';
  ngOnInit() {
    // console.log( this.cookieService.get('Auth')); // dummy way to get cookies
    if (!this.Auth.getDetails().name) {
      if (!this.cookieService.get('Auth')) {
        this.router.navigate(['login']);
      } else {
        this.JWT = this.cookieService.get('Auth');
        this.Auth.invokeJWTLogin(this.JWT).subscribe(
          (data: any) => {
            console.log('Auto JWT authenticated');
            this.Auth.setLoggedIn(true, data.email, this.JWT, data.name); // set details locally
            this.name = data.name;
            // this.cookieService.set( 'Auth', data.token);
          },
          (err: HttpErrorResponse) => {
            // no matter what the error just route back to login
            this.router.navigate(['login']);
          }
        );
      }
    } else {
      this.name = this.Auth.getDetails().name;
    }
  }

}
