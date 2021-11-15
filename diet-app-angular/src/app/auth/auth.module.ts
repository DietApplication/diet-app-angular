import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing-module';
import { AuthComponent } from './auth.component';
import { SurveyLoginComponent } from './survey-login/survey-login.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from '../alert/alert.component';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    AuthComponent,
    SurveyLoginComponent,
    LoginComponent,
    AlertComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule
  ],
  exports: [AuthComponent, LoginComponent, SurveyLoginComponent, AlertComponent]
})
export class AuthModule { }
