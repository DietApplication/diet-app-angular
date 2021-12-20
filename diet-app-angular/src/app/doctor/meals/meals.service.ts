export interface ProductInMeal {
  idProduct: number;
  amount: number;
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(private http: HttpClient) { }

  addMeal(nameOfMeal: string, description: string, cookingURL: string, recipes: ProductInMeal[]) {
    return this.http.post('https://dietappeu.azurewebsites.net/api/knowledgebase/meal', {
      nameOfMeal: nameOfMeal,
      description: description,
      cookingURL: cookingURL,
      recipes: recipes,
    })
  }
}
