import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  sendFeedback(idDay: number, patientReport: string, meals: { idMealTake: number, isFollowed: boolean }[]) {
    return this.http.put('https://dietappeu.azurewebsites.net/api/patient/Diets/days', {
      idDay: idDay,
      patientReport: patientReport,
      meals: meals
    })
  }
}
