export interface DietHistory {
  idDiet: number;
  name: string;
  description: string;
  dateFrom: string;
  dateTo: string;
  dailyMeals: number;
  protein: number;
  changesDate: string;
}
export interface DietMealsInfo {
  idDay: number;
  dayNumber: number;
  patientReport: string;
  meals: {
    cooking_URL: string;
    description: string;
    isFollowed: boolean;
    nameOfMeal: string;
    proportion: number;
    recipes: {
      homeMeasure: string;
      homeMeasureSize: number;
      idProduct: number;
      name: string;
      calculatedSize: number;
      unit: string;
      params:
      {
        calculatedParamSize: number;
        paramName: string;
        paramMeasureUnit: string;
      }[]
    }[],
    time: string;
  }[];

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DietHistoryService {

  constructor(private http: HttpClient) { }

  getDiets(idPatient: number) {
    return this.http.get<DietHistory[]>('https://dietappeu.azurewebsites.net/api/doctor/diet/diets/' + idPatient);
  }
  getMeals(idDiet: number) {
    return this.http.get<DietMealsInfo[]>('https://dietappeu.azurewebsites.net/api/doctor/diet/meals/' + idDiet);
  }
}
