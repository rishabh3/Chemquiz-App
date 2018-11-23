import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { DashboardService } from '../dashboard.service';
import { ChallengeService } from '../challenge.service';
import { NotificationhandlerService } from '../notificationhandler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private cookieService: CookieService, private Auth: AuthService, private router: Router,
    private notify: NotificationService, private dashboard: DashboardService, private handler: NotificationhandlerService) { }
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
            this.updateNotification();
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
      this.updateNotification();
    }
  }

  updateNotification() {
    // Api Get List of challenges
    console.log('Here');
    this.dashboard.getChallenges(this.Auth.getDetails().token).subscribe(
      (data: any) => {
        for (let i = 0; i < data.challenges.length; i++) {
          console.log(data.challenges[i].challenger);
          const person = data.challenges[i].challenger;
          this.notify.addNotification(person);
          this.handler.setChallengeAccepted(data.challenges[i].questions);

        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
    // Populate Notification
  }

}
