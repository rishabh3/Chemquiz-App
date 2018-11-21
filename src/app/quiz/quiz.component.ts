import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

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

  constructor(private quizservice: QuizService) {}

  ngOnInit() {
  }

  startQuiz() {
    console.log('Start clicked');
    this.inProgress = true;
    this.score = 0;
    this.questionLevel = 3;
    this.quizOver = false;
    this.numCorrect = 0;
    this.numWrong = 0;
    this.questionNumber = 10;
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
