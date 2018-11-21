import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private Auth: AuthService) { }
  email = '';
  name = '';
  ngOnInit() {
    var details = this.Auth.getDetails();
    this.email = details.email;
    this.name = details.name;
  }

}
