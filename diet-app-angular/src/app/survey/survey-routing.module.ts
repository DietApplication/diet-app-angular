import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SurveyComponent } from './survey.component';
import { AuthSurveyGuard } from '../auth/auth-survey.guard';
const surveyRoutes: Routes = [
  {
    path: '',
    component: SurveyComponent,
    canActivate: [AuthSurveyGuard],
  },
];


@NgModule({
  imports: [RouterModule.forChild(surveyRoutes)],
  exports: [RouterModule],
})
export class SurveyRoutingModule { }
