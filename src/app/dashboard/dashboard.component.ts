import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  email: any;
  name: any;

  constructor(private Auth: AuthService) { }

  ngOnInit() {
    const details = this.Auth.getDetails();
    this.email = details.email;
    this.name = details.name;
  }

}
