export interface MeasureDate {
  idMeasurement: number;
  date: string;
  whoMeasured: string;
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Measurements } from './measurements.model';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(private http: HttpClient) { }

  getDates(idPatient: number) {
    return this.http.get<MeasureDate[]>('https://dietappeu.azurewebsites.net/api/doctor/patient/measurements?idPatient=' + idPatient);
  }
  getNewestMeasurements(idPatient: number) {
    return this.http.get<Measurements>('https://dietappeu.azurewebsites.net/api/doctor/patient/measurement?idPatient=' + idPatient);
  }
  getMeasurementByDateAndRole(idPatient: number, requestedDate: string, whoMeasured: string) {
    return this.http.get<Measurements>('https://dietappeu.azurewebsites.net/api/doctor/patient/measurementsbydate?idPatient=' + idPatient + '&requestedDate=' + requestedDate + '&whomeasured=' + whoMeasured)
  }
  addMeasurements(idpatient: number,
    height: number,
    weight: number,
    hipcircumference: number,
    waistcircumference: number,
    bicepscircumference: number,
    chestcircumference: number,
    thighcircumference: number,
    calfcircumference: number,
    waistlowercircumference: number) {
    return this.http.post('https://dietappeu.azurewebsites.net/api/doctor/patient/measurements', {
      idpatient: idpatient,
      height: height,
      weight: weight,
      hipcircumference: hipcircumference,
      waistcircumference: waistcircumference,
      bicepscircumference: bicepscircumference,
      chestcircumference: chestcircumference,
      thighcircumference: thighcircumference,
      calfcircumference: calfcircumference,
      waistlowercircumference: waistlowercircumference

    })

  }

}
