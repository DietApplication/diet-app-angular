import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SurveyLoginService } from './survey-login/survey-login.service';
import { SurveyLoginComponent } from './survey-login/survey-login.component';
import { LoginComponent } from './login/login.component';
const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'accessSurvey', component: SurveyLoginComponent },
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
