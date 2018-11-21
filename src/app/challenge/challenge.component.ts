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

  constructor(private challenge: ChallengeService) { }

  ngOnInit() {
  }

  startQuiz() {
    this.findChallenge();
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
        console.log(data.user.email);
        this.challenge.setChallengeEmail(data.user.email);
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
    this.challenge.getQuestionForChallenger().subscribe(
      (data: any) => {
        console.log(data);
      },
      (err: any) => {
        console.log(err.error);
      }
    );
  }
}
