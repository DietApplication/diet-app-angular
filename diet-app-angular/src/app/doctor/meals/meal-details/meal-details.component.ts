import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../products/products.service';
import { MealsService } from '../meals.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent implements OnInit {
  private routeSub: Subscription;
  isShowParams: boolean = false;
  error: string;
  state:string ="See parameters";
  data;
  nameOfMeal:string;
  idMeal: number;
  description: string; 
  cookingURL: string; 
  products: {
    amount: number;
    homeMeasure: string;
    homeMeasureSize: number;
    idMealRecipe: number;
    idProduct: number;
    name: string;
    size: number;
    unit: string;
  }[]=[];
  proportion: number;
  parameters:[]=[];
  allParams:[][] = [];
  constructor(private route: ActivatedRoute, private mealService: MealsService, private productService: ProductsService) { }

  ngOnInit(): void {
      this.routeSub = this.route.params.subscribe((params) => {
      this.nameOfMeal = params['nameOfMeal'];
      console.log(this.nameOfMeal);
    });
    this.mealService.searchMeals(this.nameOfMeal).subscribe((res)=>{
      console.log(res[0]);
      this.idMeal = res[0].idMeal;
      this.description = res[0].description;
      this.cookingURL = res[0].cookingURL;
      this.products = res[0].products;
      this.products.forEach((pr)=>{
        this.expandParameters(pr);
      
  })
    },(err)=>{
      this.nameOfMeal = "Not found"
      this.error=err.error;
    });
     console.log(this.allParams);
  }
  onHandleError(){
    this.error=null;
  }
expandParameters(p){
  this.productService.getParametersByProduct(p.idProduct).subscribe((res)=>{
    this.data = res[0];
    this.parameters = this.data.parameters;
    this.allParams.push(this.parameters);
  })
}



}
@Pipe({name:'roundNumber'})
export class RoundNumberPipe implements PipeTransform {
  transform(value: number): number {
    return Math.round(value* 100) / 100;
  }
}
