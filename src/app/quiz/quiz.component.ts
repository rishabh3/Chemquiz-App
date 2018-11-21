import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private httpService: HttpClient, private cookieService: CookieService, private Auth: AuthService, private router: Router, private quizservice: QuizService) { }
  JWT = '';
  private score: number;
  private inProgress = false;
  private questionLevel: number;
  private quizOver: boolean;
  private numCorrect: number;
  private numWrong: number;
  private questionNumber: number;
  private answerMode: boolean;
  private options: any;
  private question: string;
  private correctAnswer: string;
  private chosenOption: string;
  private correctAns: boolean;
  private displayError: boolean;

  get getScore() {
    return this.score;
  }

  ngOnInit() {
    if (!this.Auth.getDetails().name) {
      if (!this.cookieService.get('Auth')) {
        this.router.navigate(['login']);
      } else {
        this.JWT = this.cookieService.get('Auth');
        this.Auth.invokeJWTLogin(this.JWT).subscribe(
          (data: any) => {
            console.log('Auto JWT authenticated');
            this.Auth.setLoggedIn(true, data.email, this.JWT, data.name); // set details locally
            // this.cookieService.set( 'Auth', data.token);
          },
          (err: HttpErrorResponse) => {
            // no matter what the error just route back to login
            this.router.navigate(['login']);
          }
        );
      }
    }
  }

  startQuiz() {
    console.log('Start clicked');
    this.inProgress = true;
    this.score = 0;
    this.questionLevel = 3;
    this.quizOver = false;
    this.numCorrect = 0;
    this.numWrong = 0;
    this.questionNumber = 0;
    this.answerMode = true;
    this.chosenOption = null;
    this.nextQuestion();
  }

  resetQuiz() {
    this.inProgress = false;
    this.quizservice.sendStats(this.score);
    this.score = 0;
    this.questionLevel = 3;
    this.numCorrect = 0;
    this.numWrong = 0;
    this.questionNumber = 0;
  }

  onSelectionChange(option) {
    this.chosenOption = option;
  }

  checkAnswer() {
    if (this.chosenOption === null) {
      this.displayError = true;
    } else {
      this.questionNumber++;
      this.displayError = false;
      console.log(this.chosenOption);
      console.log(this.correctAnswer);
      if (this.chosenOption === this.correctAnswer) {
        console.log('correct');
        this.score++;
        this.numCorrect++;
        this.numWrong = 0;
        if (this.numCorrect > 1) {
          if (this.questionLevel < 5) {
            console.log('Change Level');
            this.questionLevel++;
            this.numCorrect = 0;
          }
        }
        this.correctAns = true;
      } else {
        console.log('incorrect');
        this.numWrong++;
        this.numCorrect = 0;
        if (this.numWrong > 1) {
          if (this.questionLevel > 1) {
            this.questionLevel--;
            this.numWrong = 0;
          }
        }
        this.correctAns = false;
      }
      if (this.questionNumber <= 10) {
        this.answerMode = false;
      }
    }
  }

  nextQuestion() {
    // Implement functionality to get the next question using the service and handle the output.
    if (this.questionNumber >= 10) {
      this.quizOver = true;
    } else {
    this.options = [];
    this.quizservice.getNextQuestion(this.questionLevel).subscribe(
      (data: any) => {
        console.log(data);
        this.question = data.questionText;
        console.log(this.question);
        for (let i = 0; i < data.answers.length; i++) {
          this.options.push(data.answers[i].answerText);
          if (data.answers[i].correct) {
            this.correctAnswer = data.answers[i].answerText;
          }
        }
        console.log(this.options);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
    this.answerMode = true;
    this.chosenOption = null;
    }
  }


}
