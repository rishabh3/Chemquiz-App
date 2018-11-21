import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggedInStatus = false;
  private email = '';
  private token = '';
  private name = '';
  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean, email: string, token: string, name: string) {
    this.loggedInStatus = value;
    this.email = email;
    this.token = token;
    this.name = name;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  getDetails() {
    return {
      email : this.email,
      name: this.name
    };
  }

  invokeLogin(email: string, password: string) {
    // Post the details to heroku and return error or user info
    console.log('service kicked in');
    console.log(email, password);

    let headers = new HttpHeaders();
    console.log('submitted');
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const url = 'https://chemquiz.herokuapp.com/login';
    const body = JSON.stringify({email: email,
                                password: password});
    return this.http.post(url, body, {headers: headers});
  }

}
