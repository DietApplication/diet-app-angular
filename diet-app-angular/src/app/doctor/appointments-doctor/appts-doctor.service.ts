export interface AppointmentDoctor {
  idVisit: number;
  patientFullName: string;
  timeToDisplay: string;
  date: string;
}
export interface AppointmentDetailsDoctor {
  patientFullName: string;
  email: string;
  dateOfBirth: string;
  date: string;
  time: string;
  description: string;
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApptsDoctorService {

  constructor(private http: HttpClient) { }
  getAppointmentsByDate(date: string) {
    return this.http.get<AppointmentDoctor[]>('https://dietappeu.azurewebsites.net/api/doctors/Appointments/dates?request=' + date)
  }
  getDates() {
    return this.http.get<any[]>('https://dietappeu.azurewebsites.net/api/doctors/Appointments');
  }
  getDetails(idVisit: number) {
    return this.http.get<AppointmentDetailsDoctor>('https://dietappeu.azurewebsites.net/api/doctors/Appointments/details/' + idVisit);
  }
}
