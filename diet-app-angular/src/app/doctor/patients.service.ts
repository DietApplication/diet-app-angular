import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Patient } from './patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private http: HttpClient) { }
  getPatients(page?: number) {
    return this.http.get<Patient[]>('https://dietappeu.azurewebsites.net/api/doctor/patients?page=' + page);
  }
  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }
  searchPatients(firstName: string, lastName: string) {
    let url;
    if (firstName !== null) {
      url = 'https://dietappeu.azurewebsites.net/api/doctor/patients/search?firstName=' + firstName + '&lastName=' + lastName;
    }
    else {
      url = 'https://dietappeu.azurewebsites.net/api/doctor/patients/search?lastName=' + lastName;
    }
    return this.http.get<Patient[]>(url).pipe(catchError(this.handleError));;;
  }
  getAllPatients() {
    return this.http.get<{ firstName: string, lastName: string }[]>('https://dietappeu.azurewebsites.net/api/autocomplete/patients');
  }
}
