export interface AppointmentPatient {
  idVisit: number;
  doctorFullName: string;
  timeToDisplay: string;
  date: string;
}
export interface AppointmentDetailsPatient {
  doctorFullName: string;
  email: string;
  office: string;
  date: string;
  time: string;
  description: string;
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApptsPatientService {

  constructor(private http: HttpClient) { }
  getAppointments() {
    return this.http.get<AppointmentPatient[]>('https://dietappeu.azurewebsites.net/api/patients/Appointments/dates')
  }

  getDetails(idVisit: number) {
    return this.http.get<AppointmentDetailsPatient>('https://dietappeu.azurewebsites.net/api/patients/Appointments/details/' + idVisit);
  }
}
