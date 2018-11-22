import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  // readonly url = 'https://chemquiz.herokuapp.com/quiz/nextQuestion';
  // readonly challengeUrl = 'https://chemquiz.herokuapp.com/quiz/nextQuestion';
  readonly url = 'http://localhost:8080/quiz/nextQuestion';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getNextQuestion(level: number) {
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('email', this.auth.getDetails().email);

    const body = JSON.stringify(
      {
        level: level
      }
    );
    return this.http.post(this.url, body, {headers: headers});
  }

  sendStats(score: number) {
    console.log(score);
    return 'ues';
  }
}
