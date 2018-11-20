import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  display = 'none';
  LoginDisplay = 'block';
  name = '';
  constructor(private http: HttpClient) {}
  ngOnInit() {
    console.log('Entered');
  }
  submit(email: string, password: string) {
    let headers = new HttpHeaders();
    console.log('submitted');
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const url = 'https://chemquiz.herokuapp.com/login';
    const body = JSON.stringify({email: email,
                                password: password});
    this.http.post(url, body, {headers: headers}).subscribe(
      (data: any) => {
          console.log(data);
          if (data.user.email) {
            this.display = 'block';
            this.LoginDisplay = 'none';
            this.name = data.user.email;
          }
      },
      (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
              console.log('Client-side error occured.');
          } else {
              console.log('Server-side error occured.');
          }
      }
  );
  }

}
