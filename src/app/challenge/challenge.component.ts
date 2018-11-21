import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../challenge.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {

  private score: number;
  private inProgress = false;
  private questionData = null;
  private quizOver: boolean;
  private questionNumber: number;
  private answerMode: boolean;
  private currentQuestion: any;
  private correctAnswer: string;
  private chosenOption: string;
  private correctAns: boolean;
  private displayError: boolean;
  private email: string;
  private question: string;
  private options: any;
  private scope: any;

  constructor(private challenge: ChallengeService) { }

  ngOnInit() {
    this.findChallenge();
  }

  initialize(scope) {
    if (scope.questionData != null) {
      console.log('Started');
      scope.inProgress = true;
      scope.score = 0;
      scope.quizOver = false;
      scope.questionNumber = 0;
      scope.answerMode = true;
      scope.chosenOption = null;
      scope.nextQuestion();
    }
  }

  startQuiz() {
    const scope = this;
    this.getQuestionSetForChallenger(this.initialize, scope);
  }

  onSelectionChange(option) {
    // console.log(option);
    this.chosenOption = option;
  }

  resetQuiz() {
    this.inProgress = false;
    // this.quizservice.sendStats(this.score);
    this.challenge.sendStats(this.score);
    this.score = 0;
    this.questionNumber = 0;
    this.challenge.challengeRegister(this.email).subscribe(
      (data: any) => {
        console.log(data);
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

  checkAnswer() {
    console.log(this.chosenOption);
    if (this.chosenOption === null) {
      this.displayError = true;
    } else {
      this.displayError = false;
      if (this.correctAnswer === this.chosenOption) {
        console.log('correct');
        this.score++;
        this.correctAns = true;
      } else {
        console.log('incorrect');
        this.correctAns = false;
      }
      if (this.questionNumber <= 10) {
        this.answerMode = false;
      }
    }
  }

  nextQuestion() {
    if (this.questionNumber >= 10) {
      this.quizOver = true;
    } else {
      this.question = this.questionData[this.questionNumber].questionText;
      this.options = this.questionData[this.questionNumber].answers;
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].correct === true) {
          this.correctAnswer = this.options[i].answerText;
        }
      }
      this.questionNumber++;
      this.answerMode = true;
      this.chosenOption = null;
    }
  }

  findChallenge() {
    this.challenge.challengeFind().subscribe(
      (data: any) => {
        console.log('Challengee Email:', data.user.email);
        this.email = data.user.email;
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

  getQuestionSetForChallenger(callback, scope) {
    /*
      This function gets set of questions for the first guy who takes the challenge quiz.
    */
    console.log(this.email);
    this.challenge.getQuestionForChallenger(this.email).subscribe(
      (data: any) => {
        this.questionData = data.questions;
        console.log(this.questionData);
        callback(scope);
      },
      (err: any) => {
        console.log(err.error);
      }
    );
  }
}
