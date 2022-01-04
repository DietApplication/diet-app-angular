import { ThrowStmt } from '@angular/compiler';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Meal } from '../../meals/meal.model';
import { MealsService } from '../../meals/meals.service';
import { ProductsService } from '../../products/products.service';
import { DietCreate, DietService, ProductInRecipe } from '../diet.service';

@Component({
  selector: 'app-diet-meals',
  templateUrl: './diet-meals.component.html',
  styleUrls: ['./diet-meals.component.css']
})
export class DietMealsComponent implements OnInit {
  private routeSub: Subscription;
  idDiet: number;
  proteins: number;
  totalMeals: number[] = [];
  days: number;
  daysLeft: number;
  daysFilled: number;
  error: string;
  errorDiet: string;
  step: number = 7;
  daysPerStep: number[] = [];
  currentDay: number = 1;
  searchMealForm: FormGroup;
  addDayForm: FormGroup;
  currentMeal: number = 1;
  meal: Meal;
  meals: any[] = [];
  products: ProductInRecipe[] = [];
  data;
  isAddDay: boolean = false;
  mealAdded: boolean = false;
  isAddMeal: boolean = true;
  dataParams;
  totalProteins: number = 0;
  proteinProporion: number = 0;
  parameters: any[] = [];
  recipeParameters: any[] = [];
  isLoading: boolean = false;
  searchEnabled: boolean = true;
  recipeParamsByProduct: { idProduct: number, parameters: any[] }[] = [];
  constructor(private dietService: DietService, private route: ActivatedRoute, private cdref: ChangeDetectorRef, private mealsService: MealsService, private productService: ProductsService) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.idDiet = params['idDiet'];
    });
    this.initSearchForm();
    this.initDayForm();
    this.onGetDaysAndMeals();
  }

  onGetDaysAndMeals() {
    if (this.idDiet === undefined) {
      return;
    }
    this.dietService.getNumberOfDaysAndMeals(this.idDiet).subscribe((res) => {
      this.days = res.days;
      this.totalMeals.length = res.totalMeals;
      this.proteins = res.proteins;
      this.daysFilled = res.daysFilled;
      this.daysLeft = this.days - this.daysFilled;
      this.fillDaysPerStep(1);
      console.log(res);
    }, (error) => {
      this.errorDiet = 'Diet not found';
    });
  }
  setDay(day: number) {
    this.currentDay = day;
    console.log(this.currentDay);
  }
  setMeal(meal: number) {
    this.currentMeal = meal;
    console.log(this.currentMeal);
  }
  onHandleError() {
    this.error = null;
  }

  goBack() {
    if (this.daysPerStep[0] > this.step) {
      this.fillDaysPerStep(this.daysPerStep[0] - this.step);
      console.log("back " + this.daysPerStep);
    }
  }

  goForward() {
    if (this.daysPerStep[0] <= this.daysLeft - this.step) {
      this.fillDaysPerStep(this.daysPerStep[0] + this.step);
      console.log("forward " + this.daysPerStep);
    }
  }
  private fillDaysPerStep(start: number) {
    this.daysPerStep = [];
    this.daysPerStep.length = this.step;
    if (this.daysLeft - start < this.step) {
      this.daysPerStep.length = this.daysLeft - start;
    }
    for (let i = 0; i < this.step; i++) {
      if (start > this.daysLeft) {
        return;
      }
      this.daysPerStep[i] = start++;
    }
  }
  private initSearchForm() {
    this.searchMealForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }
  private initDayForm() {
    this.addDayForm = new FormGroup({
      time: new FormControl(null, Validators.required)
    })
  }
  onSearch() {
    this.isLoading = true;
    let name: string = this.searchMealForm.value.name;
    this.mealsService.searchMeals(name).subscribe((res) => {
      this.searchEnabled = false;
      this.products = res[0].products;
      this.meal = res[0];
    }, (error) => {
      this.error = error.error;
      this.isLoading = false;
    });
    setTimeout(() => {
      console.log(this.products);
      for (const product of this.products) {
        let proportion = product.amount / product.size;
        console.log("proportion ", proportion)
        this.productService.getParametersByProduct(product.idProduct).subscribe((res) => {
          this.dataParams = res[0];
          this.parameters = this.dataParams.parameters;
          console.log("get parameters", this.parameters);
          console.log("proportion ", proportion)
          this.recipeParameters = this.parameters.map((param) => {
            return { ...param, amount: parseFloat((param.amount * proportion).toFixed(3)) }
          });
          this.recipeParamsByProduct.push({ idProduct: product.idProduct, parameters: this.recipeParameters });
          console.log("recipe params", this.recipeParameters);
          console.log("product params ", this.recipeParamsByProduct);
          this.totalProteins += this.recipeParameters[this.recipeParameters.map(e => e.name.toUpperCase()).indexOf('proteins'.toUpperCase())].amount;
          product.homeMeasureSize = product.homeMeasureSize * proportion;
        });
      }
      setTimeout(() => {
        console.log("total prots: ", this.totalProteins);
        for (const product of this.products) {
          console.log("new params ", this.recipeParameters);
          this.proteinProporion = this.proteins / this.totalProteins;
          console.log("proportion proteins: ", this.proteinProporion);
          console.log(this.proteinProporion);
          product.amount = parseFloat((product.amount * this.proteinProporion).toFixed(3));
          product.homeMeasureSize = parseFloat((product.homeMeasureSize * this.proteinProporion).toFixed(3));
        }
        for (const p of this.recipeParamsByProduct) {
          for (const param of p.parameters) {
            param.amount = parseFloat((param.amount * this.proteinProporion).toFixed(3));
          }
        }
        if (!this.error) {
          this.mealAdded = true;
          this.isLoading = false;
        }
      }, 500)

    }, 500)
  }
  onAssignMeals() {
    this.dietService.assignMeals(this.idDiet, this.currentDay, this.meals).subscribe((res) => {
      this.daysPerStep.splice(this.currentDay, 1);
      this.isAddDay = false;
      console.log("added ", res);
    });
  }
  onAddMeal() {
    if (this.currentMeal < this.totalMeals.length) {
      this.currentMeal = this.currentMeal + 1;
      console.log(this.meal.description);
    } else {
      this.isAddDay = true;
      this.searchEnabled = false;
      console.log("else ", this.isAddDay);
    }
    this.meals.push({ idMeal: this.meal.idMeal, time: this.addDayForm.value.time, proportion: parseFloat(this.proteinProporion.toFixed(2)) });
    this.onRemoveMeal();
    this.addDayForm.reset();
    this.searchMealForm.reset();
    console.log(this.meals);
  }
  onRemoveMeal() {
    this.products = [];
    this.meal = null;
    this.recipeParamsByProduct = [];
    this.recipeParameters = [];
    this.parameters = [];
    this.proteinProporion = null;
    this.totalProteins = null;
    this.mealAdded = false;
    this.searchEnabled = true;
  }
}









