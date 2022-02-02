export interface PatientSearch {
  idUser: number;
  firstName: string;
  lastName: string;
  email: string;
}
export interface DoctorSearch {
  idUser: number;
  firstName: string;
  lastName: string;
  email: string;
}
export interface Appointment {
  idVisit: number;
  doctorFullName: string;
  patientFullName: string;
  timeToDisplay: string;
  date: string;
}
export interface AppointmentDetails {
  doctorFullName: string;
  patientFullName: string;
  patientEmail: string;
  patientDateOfBirth: string;
  appointmentDate: string;
  appointmentTime: string;
  description: string;
}
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  searchPatients(firstName: string, lastName: string) {
    let url;
    if (firstName !== null) {
      url = 'https://dietappeu.azurewebsites.net/api/secretary/patients/search?firstName=' + firstName + '&lastName=' + lastName;
    }
    else {
      url = 'https://dietappeu.azurewebsites.net/api/secretary/patients/search?lastName=' + lastName;
    }
    return this.http.get<PatientSearch[]>(url).pipe(catchError(this.handleError));
  }

  searchDoctors(firstName: string, lastName: string) {
    let url;
    if (firstName !== null) {
      url = 'https://dietappeu.azurewebsites.net/api/secretary/doctors/search?firstName=' + firstName + '&lastName=' + lastName;
    }
    else {
      url = 'https://dietappeu.azurewebsites.net/api/secretary/doctors/search?lastName=' + lastName;
    }
    return this.http.get<DoctorSearch[]>(url).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {

    return throwError(error);
  }
  createAppointment(idDoctor: number, idPatient: number, appointmentDate: string, description) {
    return this.http.post('https://dietappeu.azurewebsites.net/api/secretary/visits', {
      idDoctor: idDoctor,
      idPatient: idPatient,
      appointmentDate: appointmentDate,
      description: description
    })
  }
  getAppointmentsByDate(date: string) {
    return this.http.get<Appointment[]>('https://dietappeu.azurewebsites.net/api/secretary/appointments/dates?request=' + date)
  }
  getDates() {
    return this.http.get<any[]>('https://dietappeu.azurewebsites.net/api/secretary/appointments');
  }
  getDetails(idVisit: number) {
    return this.http.get<AppointmentDetails>('https://dietappeu.azurewebsites.net/api/secretary/appointments/details/' + idVisit);
  }
  cancelAppt(idVisit: number) {
    return this.http.delete('https://dietappeu.azurewebsites.net/api/secretary/appointments?idVisit=' + idVisit);
  }
  getAllDoctors() {
    return this.http.get<{ firstName: string, lastName: string }[]>('https://dietappeu.azurewebsites.net/api/autocomplete/doctors')
  }
}
