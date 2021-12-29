import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiseaseHistoryService {

  constructor(private http: HttpClient) { }
  
  assignDisease(idPatient:number, idDisease:number, dateOfDiagnosis: string){
    return this.http.post('https://dietappeu.azurewebsites.net/api/knowledgebase/patient/disease',{
        idPatient:idPatient,
        idDisease:idDisease,
        dateOfDiagnosis:dateOfDiagnosis
    })
  }
  getDiseases(idPatient:number){
    return this.http.get('https://dietappeu.azurewebsites.net/api/doctor/patient/diseases?idPatient=' + idPatient);
  }
}
