import { Component, OnInit, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NotificationhandlerService } from '../notificationhandler.service';
import { ChallengeComponent } from '../challenge/challenge.component';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [NotificationhandlerService],
  }
)
export class NotificationComponent implements OnInit {

  private email: string;
  private _ref: any;

  constructor(private handler: NotificationhandlerService, private router: Router,private http:HttpClient, private Auth:AuthService) { }

  ngOnInit() {
  }

  setEmail (email: string) {
    this.email = email;
  }

  setComp(ref: any) {
    this._ref = ref;
  }

  remove() {
    let headers = new HttpHeaders();
    console.log('submitted');
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization',this.Auth.getDetails().token);
    // const url = 'https://chemquiz.herokuapp.com/login';
    const url = 'https://chemquiz.herokuapp.com/challenge/deleteChallenge';
    const body = JSON.stringify({chal: this.email});
    this.http.post(url, body, {headers: headers}).subscribe(
      (data: any) => {
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
            console.log('Client-side error occured.');
        } else {
            console.log(err);

        }
      }
    );
    this._ref.destroy();
  }

  setRouter(router) {
    this.router = router;
  }

  setHTTP(http: HttpClient){
    this.http = http;
  }
  
  setAuth(Auth: AuthService){
    this.Auth = Auth;
  }

  accept() {
    console.log('accept the challenge');
    console.log(this);
    this.handler.setChallengeAccepted(true);
    // Route to challenge
    console.log(this.email);
    this.handler.setChallenger(this.email);
    this.remove();
    this.router.navigate(['/challenge']);
    console.log(this.handler.getChallengeAccepted());
  }

}
