import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private Auth: AuthService) {
    if (NavbarComponent.source == null) {
      this.connect();
    }
  }
  static source = null;
  private data: any;
  private url = 'https://chemquiz.herokuapp.com/stream';  
  ngOnInit() {
  }

  getSource() {
    return NavbarComponent.source;
  }

  setSource(eventSource: EventSource) {
    NavbarComponent.source = eventSource;
  }

  connect(): void {
    this.setSource(new EventSource(this.url));
    const source = this.getSource();
    source.addEventListener('message', (event: any) => {
      this.data = JSON.parse(event.data);
      console.log(this.data);
      console.log(this.data.challengee_email);
      console.log(this.Auth.getDetails().email);
      if(this.data.challengee_email == this.Auth.getDetails().email){

        var drop = document.getElementById('dropdown');
        console.log(drop);
        var new_div = document.createElement('div');
        new_div.setAttribute('class','card');
        new_div.setAttribute('style','width: 18rem;');
        drop.appendChild(new_div);
        var u_div = document.createElement('div');
        u_div.setAttribute('class','card-body');
        var text = document.createElement('h5')
        text.innerHTML = this.data.challenger_email + " has challenged you"
        u_div.appendChild(text);
        new_div.appendChild(u_div);

        var btn1 = document.createElement('button');
        btn1.setAttribute('type','button');
        btn1.setAttribute('class','btn btn-success');
        btn1.innerHTML = "Accept";

        var btn2 = document.createElement('button');
        btn2.setAttribute('type','button');
        btn2.setAttribute('class','btn btn-danger');
        btn2.innerHTML = "Reject";

        new_div.appendChild(btn1);
        new_div.appendChild(btn2);
      }
    });
  }
}
