import { AfterViewChecked, Component, OnChanges, OnInit, Pipe, PipeTransform, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  editMealForm: FormGroup;
  error: string;
  state: string = "See parameters";
  data;
  nameOfMeal: string;
  idMeal: number;
  description: string;
  cookingURL: string;
  products: {
    amount: number;
    calculatedSize;
    homeMeasure: string;
    homeMeasureSize: number;
    idMealRecipe: number;
    idProduct: number;
    name: string;
    unit: string;
  }[] = [];
  proportion: number;
  parameters: [] = [];
  allParams: [][] = [];
  invalid: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private mealService: MealsService, private productService: ProductsService) { }


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.nameOfMeal = params['nameOfMeal'];
      console.log(this.nameOfMeal);
    });
    this.initMeal();

  }
  initMeal() {
    this.mealService.searchMeals(this.nameOfMeal).subscribe((res) => {
      console.log(res[0]);
      this.idMeal = res[0].idMeal;
      this.description = res[0].description;
      this.cookingURL = res[0].cookingURL;
      this.products = res[0].products;

    }, (err) => {
      this.nameOfMeal = "Not found"
      this.error = err.error;
    });

  }
  onHandleError() {
    this.error = null;
  }

  expandParameters(p) {
    this.productService.getParametersByProduct(p.idProduct).subscribe((res) => {
      this.data = res[0];
      this.parameters = this.data.parameters;
      this.allParams.push(this.parameters);
      console.log(this.allParams);
    })
  }
  onEdit() {
    this.mealService.editMeal(this.idMeal, this.description, this.cookingURL, this.nameOfMeal).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/doctor/meals/' + this.nameOfMeal + '/details']);
      this.initMeal();
    });


  }
  checkIfValidUrl(newValue) {
    console.log(newValue)
    let regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    let urlRegex = new RegExp(regex);
    console.log(urlRegex.test(newValue));
    if (urlRegex.test(newValue)) {
      this.invalid = false;
    }
    else {
      this.invalid = true;
    }
  }
}
@Pipe({ name: 'roundNumber' })
export class RoundNumberPipe implements PipeTransform {
  transform(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
