import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './survey.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SurveyRoutingModule } from './survey-routing.module';
import { AlertComponent } from '../shared/alert/alert.component';
import { RouterModule } from '@angular/router';
import { AlertSurveyComponent } from './alert-survey/alert-survey.component';
@NgModule({
  declarations: [SurveyComponent, AlertSurveyComponent],

  imports: [CommonModule, ReactiveFormsModule, FormsModule, SurveyRoutingModule, RouterModule],

})
export class SurveyModule { }
