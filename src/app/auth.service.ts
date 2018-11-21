import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggedInStatus = false;

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  getUserDetails(email: string, password: string) {
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