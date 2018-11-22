import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
  styleUrls: ['./compound.component.css']
})
export class CompoundComponent implements OnInit {
  JWT = '';
  constructor(private httpService: HttpClient, private cookieService: CookieService, private Auth: AuthService, private router: Router) { }
  compoundData;
  group = [];
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
            // this.cookieService.set( 'Auth', data.token);
          },
          (err: HttpErrorResponse) => {
            // no matter what the error just route back to login
            this.router.navigate(['login']);
          }
        );
      }
    }
    this.httpService.get('../../assets/compound.json').subscribe(
      (data: any) => {
        this.compoundData = data;
        let temparr = [];
        let i = 1;
        const up = 176;
        while (i < up) {
          while (temparr.length !== 6) {
            temparr.push(this.compoundData[i]);
            i += 1;
          }
          this.group.push(temparr);
          temparr = [];
        }
        console.log(this.group);
        // console.log(this.periodicData[0][0].name);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

}
