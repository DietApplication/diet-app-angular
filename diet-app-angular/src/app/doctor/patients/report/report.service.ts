import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getReport(idPatient: number) {
    return this.http.get<any>('https://dietappeu.azurewebsites.net/api/doctor/patient/measurements/reports/' + idPatient);
  }

}
