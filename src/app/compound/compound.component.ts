import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
  styleUrls: ['./compound.component.css']
})
export class CompoundComponent implements OnInit {

  constructor(private httpService: HttpClient) { }
  compoundData;

  ngOnInit() {
    this.httpService.get('../../assets/group-wise.json').subscribe(
      data => {
        this.compoundData = data;
        // console.log(this.periodicData[0][0].name);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

}
