export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private router: Router) {

  }
  get hasToken() {
    return !!this.getToken();
  }
  storeToken(response: LoginResponse) {
    const decoded: { [key: string]: string } = jwt_decode(response.accessToken);
    console.log(response.accessToken);
    console.log(decoded);
    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('userId', decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
    localStorage.setItem('role', decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  getRole() {
    return localStorage.getItem('role');
  }
  getUserId() {
    return localStorage.getItem('userId');
  }
  getExpDate() {
    return localStorage.getItem('exp');
  }
  saveRefreshToken(response: LoginResponse) {
    console.log(response.refreshToken);
    localStorage.setItem('refresh_token', response.refreshToken);
  }
  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/accessSurvey'])
  }

}

