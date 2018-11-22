import { Component, OnInit, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NotificationhandlerService } from '../notificationhandler.service';
import { ChallengeComponent } from '../challenge/challenge.component';



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

  constructor(private handler: NotificationhandlerService, private router: Router) { }

  ngOnInit() {
  }

  setEmail (email: string) {
    this.email = email;
  }

  setComp(ref: any) {
    this._ref = ref;
  }

  remove() {
    this._ref.destroy();
  }

  setRouter(router) {
    this.router = router;
  }

  accept() {
    console.log('accept the challenge');
    console.log(this);
    this.handler.setChallengeAccepted(true);
    // Route to challenge
    console.log(this.email);
    this.handler.setChallenger(this.email);
    this.router.navigate(['/challenge']);
    console.log(this.handler.getChallengeAccepted());
  }

}
