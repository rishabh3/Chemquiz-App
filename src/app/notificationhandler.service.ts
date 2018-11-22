import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationhandlerService {


  constructor() {
    // this.challenge_accepted = true;
  }

  static challenge_accepted = false;
  static email: string;

  getChallengeAccepted() {
    return NotificationhandlerService.challenge_accepted;
  }

  setChallengeAccepted(val) {
    NotificationhandlerService.challenge_accepted = val;
  }

  getChallenger() {
    return NotificationhandlerService.email;
  }

  setChallenger(email) {
    NotificationhandlerService.email = email;
  }
}
