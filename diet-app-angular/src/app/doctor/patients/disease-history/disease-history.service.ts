import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class DiseaseHistoryService {

  constructor(private http: HttpClient) { }

  assignDisease(idPatient: number, idDisease: number, dateOfDiagnosis: string, dateOfCure?: string) {
    let model = {};
    if (dateOfCure) {
      model = {
        idPatient: idPatient,
        idDisease: idDisease,
        dateOfDiagnosis: dateOfDiagnosis,
        dateOfCure: dateOfCure
      }
    }
    else {
      model = {
        idPatient: idPatient,
        idDisease: idDisease,
        dateOfDiagnosis: dateOfDiagnosis,
      }
    }
    return this.http.post('https://dietappeu.azurewebsites.net/api/knowledgebase/patient/disease', model)
  }
  getDiseases(idPatient: number) {
    return this.http.get('https://dietappeu.azurewebsites.net/api/doctor/patient/diseases/' + idPatient);
  }
  deleteDisease(idDiseasePatient: number) {
    return this.http.delete('https://dietappeu.azurewebsites.net/api/knowledgebase/patient/disease/' + idDiseasePatient);
  }
}
