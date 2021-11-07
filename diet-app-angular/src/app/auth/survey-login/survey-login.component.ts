import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyLoginModel, SurveyLoginService } from './survey-login.service';
import { SurveyStorageService } from './survey-storage.service';

@Component({
  selector: 'app-survey-login',
  templateUrl: './survey-login.component.html',
  styleUrls: ['./survey-login.component.css']
})
export class SurveyLoginComponent implements OnInit {
  surveyLoginForm: FormGroup;

  constructor(
    private surveyLoginService: SurveyLoginService,
    private router: Router,
    private storageService: SurveyStorageService
  ) { }

  error: string = null;
  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.surveyLoginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required,
        Validators.maxLength(255),
      ]),
      uniqueKey: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255),
      ]),
    });
  }

  onHandleError() {
    this.error = null;
  }
  onSubmit() {
    if (!this.surveyLoginForm.valid) {
      return;
    }
    const email = this.surveyLoginForm.value.email;
    const uniqueKey = this.surveyLoginForm.value.uniqueKey;

    let surveyLoginModel: SurveyLoginModel = {
      email: email,
      uniqueKey: uniqueKey
    };
    this.surveyLoginService.accessSurvey(surveyLoginModel).subscribe((response) => {
      this.storageService.storeEmail(response);
      console.log("survey accessed: ", response.email);
      this.router.navigate(['../survey']);
    },
      (error) => {
        this.error = 'the unique key or email are invalid';
        this.surveyLoginForm.get('uniqueKey').reset();
      })
  }

}
