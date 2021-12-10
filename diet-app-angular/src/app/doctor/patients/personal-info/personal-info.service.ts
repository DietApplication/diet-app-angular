import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonalInfo } from './personal-info.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {

  constructor(private http: HttpClient) { }
  getPersonalInfo(idPatient: number) {
    return this.http.get<PersonalInfo>('https://dietappeu.azurewebsites.net/api/doctor/patient/info?idpatient=' + idPatient);
  }
}
