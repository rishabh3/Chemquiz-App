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
  private questionData: any;
  private quizOver: boolean;
  private questionNumber: number;
  private answerMode: boolean;
  private currentQuestion: any;
  private correctAnswer: string;
  private chosenOption: string;
  private correctAns: boolean;
  private displayError: boolean;
  private email: string;

  constructor(private challenge: ChallengeService) { }

  ngOnInit() {
    this.findChallenge();
  }

  startQuiz() {
    this.getQuestionSetForChallenger();
    console.log('Start clicked');
    this.inProgress = true;
    this.score = 0;
    this.quizOver = false;
    this.questionNumber = 0;
    this.answerMode = true;
    this.chosenOption = null;
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

  getQuestionSetForChallenger() {
    /*
      This function gets set of questions for the first guy who takes the challenge quiz.
    */
    console.log(this.email);
    this.challenge.getQuestionForChallenger(this.email).subscribe(
      (data: any) => {
        this.questionData = data.questions;
        console.log(this.questionData);
      },
      (err: any) => {
        console.log(err.error);
      }
    );
  }
}
