import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getChallenges(token: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', token);
    const url = 'https://chemquiz.herokuapp.com/challenge/getAllChallenges';
    return this.http.get(url, {headers: headers});
  }
}
