import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './survey.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SurveyRoutingModule } from './survey-routing.module';



@NgModule({
  declarations: [SurveyComponent],

  imports: [CommonModule, ReactiveFormsModule, FormsModule, SurveyRoutingModule]

})
export class SurveyModule { }
