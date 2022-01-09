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
}
