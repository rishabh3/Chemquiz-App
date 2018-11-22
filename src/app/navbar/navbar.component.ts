import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() {
    if (NavbarComponent.source == null) {
      this.connect();
    }
  }
  static source = null;
  private data: any;
  private url = 'http://localhost:8080/stream';
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
    });
  }
}
