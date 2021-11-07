export interface SurveyLoginResponse {
  email: string;
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyStorageService {
  get hasEmail() {
    return !!this.getEmail();
  }
  storeEmail(response: SurveyLoginResponse) {
    localStorage.setItem('access_email', response.email);
  }
  getEmail() {
    return localStorage.getItem('access_email');
  }
}
