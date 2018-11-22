import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  // readonly questionurl = 'https://chemquiz.herokuapp.com/challenge/getQuestions';
  // readonly challengeurl = 'https://chemquiz.herokuapp.com/challenge/findChallenge';
  // readonly challengeregurl = 'https://chemquiz.herokuapp.com/challenge';
  readonly questionurl = 'http://localhost:8080/challenge/getQuestions';
  readonly challengeurl = 'http://localhost:8080/challenge/findChallenge';
  readonly challengeregurl = 'http://localhost:8080/challenge';

  constructor(private http: HttpClient, private Auth: AuthService) { }


  challengeFind() {
    let headers = new HttpHeaders();
    headers = headers.set('email', this.Auth.getDetails().email);
    return this.http.get(this.challengeurl, {headers: headers});
  }

  challengeRegister(email: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('email', this.Auth.getDetails().email);
    const body = JSON.stringify(
      {
        chal: email
      }
    );
    return this.http.post(this.challengeregurl, body, {headers: headers});
  }

  getQuestionForChallenger(email: string) {
    let headers = new HttpHeaders();
    console.log(this.Auth.getDetails().email);
    console.log(email);
    headers = headers.set('Content-Type', 'application/json').set('email', this.Auth.getDetails().email);
    const body = JSON.stringify(
      {
        challengee: email
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

  sendStats(score) {
    console.log(score);
  }

}
