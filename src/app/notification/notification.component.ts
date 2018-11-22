import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  private email: string;
  private _ref: any;

  constructor(private router: Router) { }

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

  accept() {
    console.log('accept the challenge');
    this.router.navigate(['/challenge']);
  }

}
