export interface LoginModel {
  email: string;
  password: string;
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginResponse } from 'src/app/core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogin: boolean;
  constructor(private http: HttpClient, private router: Router) { }

  login(loginModel: LoginModel) {
    return this.http.post<LoginResponse>('https://dietappeu.azurewebsites.net/api/auth/login', {
      email: loginModel.email,
      password: loginModel.password,
    }).pipe(catchError(this.handleError));;
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  refreshToken(token: string) {
    return this.http.post('https://dietappeu.azurewebsites.net/api/auth/refresh', {
      refreshToken: token
    })
  }
}
