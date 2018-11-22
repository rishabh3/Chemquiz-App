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
  readonly questionurl = 'https://chemquiz.herokuapp.com/challenge/getQuestions';
  readonly challengeurl = 'https://chemquiz.herokuapp.com/challenge/findChallenge';
  readonly challengeregurl = 'https://chemquiz.herokuapp.com/challenge';

  constructor(private http: HttpClient, private Auth: AuthService) { }


  challengeFind() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.Auth.getDetails().token);
    return this.http.get(this.challengeurl, {headers: headers});
  }

  challengeRegister(email: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json').set('Authorization', this.Auth.getDetails().token);
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
    headers = headers.set('Content-Type', 'application/json').set('Authorization', this.Auth.getDetails().token);
    const body = JSON.stringify(
      {
        challengee: email
      }
    );
    return this.http.post(this.questionurl, body, {headers: headers});
  }

  getQuestionForChallengee(email: string) {
    let headers = new HttpHeaders();
    headers =  headers.set('Content-Type', 'application/json').set('Authorization', this.Auth.getDetails().token);
    const body = JSON.stringify(
      {
        challenger: email
      }
    );
    return this.http.post(this.questionurl, body, {headers: headers});
  }

  sendStats(score) {
    console.log(score);
  }

}
