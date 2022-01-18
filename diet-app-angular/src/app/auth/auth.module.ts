import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing-module';
import { AuthComponent } from './auth.component';
import { SurveyLoginComponent } from './survey-login/survey-login.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    AuthComponent,
    SurveyLoginComponent,
    LoginComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AuthRoutingModule
  ],
  exports: [AuthComponent, LoginComponent, SurveyLoginComponent]
})
export class AuthModule { }
