import { Component, OnInit, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NotificationhandlerService } from '../notificationhandler.service';
import { ChallengeComponent } from '../challenge/challenge.component';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { DeletequestionsService } from '../deletequestions.service';
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

  // tslint:disable-next-line:max-line-length
  constructor(private handler: NotificationhandlerService, private router: Router, private http: HttpClient, private Auth: AuthService, private deleteService: DeletequestionsService) { }

  ngOnInit() {
  }

  setEmail (email: string) {
    this.email = email;
  }

  setComp(ref: any) {
    this._ref = ref;
  }

  remove() {
    this.handler.setChallengeAccepted(true);
    console.log('submitted');
    this.deleteService.setEmail(this.email);
    this.deleteService.sendDeleteRequest(this.Auth.getDetails().token).subscribe(
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

  setDeleteService(deleteService) {
    this.deleteService = deleteService;
  }

  setHTTP(http: HttpClient) {
    this.http = http;
  }

  setAuth(Auth: AuthService) {
    this.Auth = Auth;
  }

  accept() {
    console.log('accept the challenge');
    console.log(this);
    this.handler.setChallengeAccepted(true);
    this.deleteService.setEmail(this.email);
    // Route to challenge
    console.log(this.email);
    this.handler.setChallenger(this.email);
    this._ref.destroy();
    this.router.navigate(['/challenge']);
    console.log(this.handler.getChallengeAccepted());
  }

}
