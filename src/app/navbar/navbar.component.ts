import { Component, OnInit, Inject, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TouchSequence } from 'selenium-webdriver';
import { NotificationService } from '../notification.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('notification', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
  constructor(private Auth: AuthService, private notify: NotificationService) {
    if (NavbarComponent.source == null) {
      this.connect();
    }
  }
  // tslint:disable-next-line:member-ordering
  static source = null;


  private data: any;
  private url = 'https://chemquiz.herokuapp.com/stream';

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    console.log(this.viewContainerRef);
    this.notify.setRootViewContainerRef(this.viewContainerRef);
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
      if (this.data.challengee_email === this.Auth.getDetails().email) {
        console.log('Here');
        this.notify.addNotification(this.data.challenger_email);
        // const drop = document.getElementById('dropdown');
        // console.log(drop);
        // const new_div = document.createElement('div');
        // new_div.setAttribute('class', 'card');
        // new_div.setAttribute('style', 'width: 18rem;');
        // drop.appendChild(new_div);
        // const u_div = document.createElement('div');
        // u_div.setAttribute('class', 'card-body');
        // const text = document.createElement('h5');
        // text.innerHTML = this.data.challenger_email + ' has challenged you';
        // u_div.appendChild(text);
        // new_div.appendChild(u_div);

        // const btn1 = document.createElement('button');
        // btn1.setAttribute('type', 'button');
        // btn1.setAttribute('class', 'btn btn-success');
        // btn1.innerHTML = 'Accept';

        // const btn2 = document.createElement('button');
        // btn2.setAttribute('type', 'button');
        // btn2.setAttribute('class', 'btn btn-danger');
        // btn2.innerHTML = 'Reject';

        // new_div.appendChild(btn1);
        // new_div.appendChild(btn2);
      }
    });
  }
}
