import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeletequestionsService {

  constructor(private http: HttpClient) { }
  static email: string;

  getEmail() {
    return DeletequestionsService.email;
  }

  setEmail(email: string) {
    DeletequestionsService.email = email;
  }

  sendDeleteRequest(token) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
    // const url = 'https://chemquiz.herokuapp.com/login';
    const url = 'https://chemquiz.herokuapp.com/challenge/deleteChallenge';
    const body = JSON.stringify({chal: this.getEmail()});
    console.log(this.getEmail());
    return this.http.post(url, body, {headers: headers});
  }
}
