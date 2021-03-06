export interface ProductInMeal {
  idProduct: number;
  amount: number;
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from './meal.model';

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
  getMeals(page: number) {
    return this.http.get<Meal[]>('https://dietappeu.azurewebsites.net/api/knowledgebase/meals?page=' + page);
  }
  searchMeals(param: string) {
    return this.http.get<Meal[]>('https://dietappeu.azurewebsites.net/api/knowledgebase/meal/search?mealName=' + param);
    // return this.http.get<Meal[]>('https://dietappeu.azurewebsites.net/api/knowledgebase/meal/search?mealName=' + param).pipe().toPromise().then();
  }
  serachMealAsync(param: string) {
    return this.http.get<Meal[]>('https://dietappeu.azurewebsites.net/api/knowledgebase/meal/search?mealName=' + param).pipe().toPromise();
  }
  getAllMeals() {
    return this.http.get<{ mealName: string }[]>('https://dietappeu.azurewebsites.net/api/autocomplete/meals');
  }
  editMeal(idMeal: number, description: string, cookingURL: string, mealName: string) {
    return this.http.put('https://dietappeu.azurewebsites.net/api/knowledgebase/meals', {
      idMeal: idMeal,
      description: description,
      cookingURL: cookingURL,
      mealName: mealName
    });
  }
}
