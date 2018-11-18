import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-periodic-quiz',
  templateUrl: './periodic-quiz.component.html',
  styleUrls: ['./periodic-quiz.component.css']
})
export class PeriodicQuizComponent implements OnInit {

  constructor(private httpService: HttpClient) { }
  periodicData;
  clickedElement = {'name': null};
  display = 'none';

  ngOnInit() {
    this.httpService.get('../../assets/group-wise.json').subscribe(
      data => {
        this.periodicData = data;
        // console.log(this.periodicData[0][0].name);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  showData(data) {
    this.clickedElement = data;
    this.display = 'block';
  }

  hideModal() {
    this.display = 'none';
    this.clickedElement = {'name': null};
  }

}
