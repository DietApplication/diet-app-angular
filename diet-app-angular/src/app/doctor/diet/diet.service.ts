export interface DietCreate {
  idPatient: number,
  name: string,
  description: string,
  dateFrom: string,
  dateTo: string,
  dailyMeals: number,
  protein: number,
  supplements:
  {
    idSupplement: number,
    dietSupplDescription: string
  }[]
}
export interface CalculatedMeal {
  idMeal: number;
  proportion: number;
  nameOfMeal: string;
  description: string;
  cookingURL: string;
  recipes:
  {
    idMealRecipe: number;
    idProduct: number;
    name: string;
    unit: string;
    homeMeasure: string;
    homeMeasureSize: number;
    calculatedRecipeAmount: number;
    params:
    {
      calculatedParamSize: number;
      paramName: string;
      paramMeasureUnit: string;
    }[]
  }[]
}
export class ProductInRecipe {

  amount: number;
  calculatedSize;
  homeMeasure: string;
  homeMeasureSize: number;
  idMealRecipe: number;
  idProduct: number;
  name: string;
  unit: string;


  constructor(obj) {
    Object.assign(this, obj);
  }
}
export interface DietInfo {
  proteins: number;
  totalMeals: number;
  days: number;
  daysFilled: number;
  daysNumberFilled: number[];
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DietService {

  constructor(private http: HttpClient) { }
  createDiet(idPatient: number,
    idDoctor: number,
    name: string,
    description: string,
    dateFrom: string,
    dateTo: string,
    dailyMeals: number,
    protein: number,
    supplements:
      {
        idSupplement: number,
        dietSupplDescription: string
      }[]) {
    return this.http.post<{ idDiet: number, name: string }>('https://dietappeu.azurewebsites.net/api/doctor/diet', {
      idPatient: idPatient,
      idDoctor: idDoctor,
      name: name,
      description: description,
      dateFrom: dateFrom,
      dateTo: dateTo,
      dailyMeals: dailyMeals,
      protein: protein,
      supplements: supplements
    }
    );

  }
  getNumberOfDaysAndMeals(idDiet: number) {
    return this.http.get<DietInfo>('https://dietappeu.azurewebsites.net/api/doctor/diet/days/' + idDiet);
  }
  assignMeals(idDiet: number, dayNumber: number, meals: { idMeal: number, time: string, proportion: number }[]) {
    return this.http.post('https://dietappeu.azurewebsites.net/api/doctor/diet/mealtake', {
      idDiet: idDiet,
      dayNumber: dayNumber,
      meals: meals
    })
  }
  searchChangedMeals(idDiet: number, name: string) {
    return this.http.get<CalculatedMeal>('https://dietappeu.azurewebsites.net/api/doctor/diet/meals/calculated?mealName=' + name + '&idDiet=' + idDiet);

  }
}
