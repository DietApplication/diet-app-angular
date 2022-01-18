import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempUserService {

  constructor(private http: HttpClient) { }

  createTempUser(fullName: string, email: string) {
    return this.http.post('https://dietappeu.azurewebsites.net/api/secretary/emails', {
      email: email,
      fullName: fullName
    })
  }
}
