export interface SurveyLoginModel {
  email: string;
  uniqueKey: string;
}


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SurveyLoginResponse } from './survey-storage.service';
@Injectable({
  providedIn: 'root'
})
export class SurveyLoginService {

  constructor(private http: HttpClient, private router: Router) { }

  accessSurvey(surveyLoginModel: SurveyLoginModel) {
    return this.http.post<SurveyLoginResponse>('http://localhost:7000/survey/access', {
      email: surveyLoginModel.email,
      uniqueKey: surveyLoginModel.uniqueKey
    })
  }
}
