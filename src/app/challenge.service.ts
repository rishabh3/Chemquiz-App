import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  readonly questionurl = 'https://chemquiz.herokuapp.com/challenge/getQuestions';
  readonly challengeurl = 'https://chemquiz.herokuapp.com/challenge/findChallenge';
  readonly challengeregurl = 'https://chemquiz.herokuapp.com/challenge';

  private challenge_email: any;

  constructor(private http: HttpClient, private Auth: AuthService) { }

  setChallengeEmail(email: string) {
    this.challenge_email = email;
  }

  challengeFind() {
    let headers = new HttpHeaders();
    headers = headers.set('email', this.Auth.getDetails().email);
    return this.http.get(this.challengeurl, {headers: headers});
  }

  challengeRegister() {
    let headers = new HttpHeaders();
    headers = headers.set('email', this.challenge_email);
    return this.http.get(this.challengeregurl, {headers: headers});
  }

  getQuestionForChallenger() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('email', this.Auth.getDetails().email);
    const body = JSON.stringify(
      {
        email: this.challenge_email
      }
    );
    return this.http.post(this.questionurl, body, {headers: headers});
  }

  getQuestionForChallengee() {
    let headers = new HttpHeaders();
    headers =  headers.set('Content-Type', 'application/json').set('email', this.Auth.getDetails().email);
    const body = JSON.stringify(
      {
        challenger: 'pratik.r.sampat@gmail.com'
      }
    );
    return this.http.post(this.questionurl, body, {headers: headers});
  }

}
