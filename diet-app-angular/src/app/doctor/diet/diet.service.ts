export interface DietCreate{
  idPatient: number,
  name: string,
  description: string,
  dateFrom: string,
  dateTo: string,
  dailyMeals: number,
  protein: number,
  supplements: 
    {
      idSupplement:number,
      dietSupplDescription: string
    }[]
  
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DietService {

  constructor(private http: HttpClient) { }
  createDiet(  idPatient: number,
  name: string,
  description: string,
  dateFrom: string,
  dateTo: string,
  dailyMeals: number,
  protein: number,
  supplements: 
    {
      idSupplement:number,
      dietSupplDescription: string
    }[]){
  return this.http.post<DietCreate>('https://dietappeu.azurewebsites.net/api/doctor/diet', {
  idPatient: idPatient,
  name: name,
  description:description,
  dateFrom:dateFrom,
  dateTo:dateTo,
  dailyMeals:dailyMeals,
  protein:protein,
  supplements:supplements
  }
  );
}
}
