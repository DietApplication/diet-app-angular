
import { ChangeDetectorRef, Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { InformationService, PreDietInfo } from 'src/app/shared/information.service';
import { Meal } from '../../../shared/meals/meal.model';
import { MealsService } from '../../../shared/meals/meals.service';
import { ProductsService } from '../../../shared/products/products.service';
import { CalculatedMeal, DietCreate, DietService, ProductInRecipe } from '../diet.service';

@Component({
  selector: 'app-diet-meals',
  templateUrl: './diet-meals.component.html',
  styleUrls: ['./diet-meals.component.css']
})
export class DietMealsComponent implements OnInit {
  private routeSub: Subscription;
  idDiet: number;
  idPatient: number;
  proteins: number;
  totalMeals: number[] = [];
  days: number;
  daysLeft: number;
  daysFilled: number;
  error: string;
  errorDiet: string;
  step: number = 7;

  daysNumberFilled: number[] = [];
  currentDay: number;
  searchMealForm: FormGroup;
  addDayForm: FormGroup;
  currentMeal: number = 1;
  meal: CalculatedMeal;
  meals: any[] = [];
  mealsInfo: any[] = [];
  products: any[] = [];
  data;
  isAddDay: boolean = false;
  mealAdded: boolean = false;
  isAddMeal: boolean = true;
  dataParams;

  isLoading: boolean = false;
  searchEnabled: boolean = true;
  isFinished: boolean = false;
  allMeals: any[] = [];
  currentPage: number = 1;
  dataMeal;
  searchMealsInfo: FormGroup;
  pages: number[] = [];
  info: PreDietInfo;
  constructor(private infoService: InformationService, private dietService: DietService, private route: ActivatedRoute, private cdref: ChangeDetectorRef, private mealsService: MealsService, private productService: ProductsService) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.idDiet = params['idDiet'];
      this.idPatient = params['idPatient'];
      this.onGetPatientDietIformation(this.idPatient, this.idDiet);
    });
    this.initSearchForm();
    this.initDayForm();
    this.onGetDaysAndMeals();
    this.initSearchMealsForm();
    this.onGetMeals(this.currentPage);
    this.onGetAllMeals();

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
      this.daysNumberFilled = res.daysNumberFilled;
      this.onHandleDays();
      if (this.days === this.daysFilled) {
        this.isFinished = true;
      }

    }, (error) => {
      this.errorDiet = 'Diet not found';
    });
  }
  setDay(day: number) {
    this.currentDay = day;
  }
  setMeal(meal: number) {
    this.currentMeal = meal;
  }
  onHandleError() {
    this.error = null;
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
    let name: string = this.searchMealForm.value.name;
    this.dietService.searchChangedMeals(this.idDiet, name).subscribe((res) => {
      this.meal = res;
      this.products = res.recipes;
      this.mealAdded = true;
      this.searchEnabled = false;

    }, (err) => {
      this.error = err.error;
    })
  }

  onAssignMeals() {
    this.dietService.assignMeals(this.idDiet, this.currentDay, this.meals).subscribe((res) => {
      this.isAddDay = false;

      alert("Meals for day " + this.currentDay + " were assigned");
      this.meals = [];
      this.products = [];
      this.meal = null;
      this.onGetDaysAndMeals();
      this.currentMeal = 1;
    });
  }
  onAddMeal() {
    if (this.currentMeal < this.totalMeals.length) {
      this.currentMeal = this.currentMeal + 1;

    } else {
      this.isAddDay = true;
      this.searchEnabled = false;

    }
    this.meals.push({ idMeal: this.meal.idMeal, time: this.addDayForm.value.time, proportion: this.meal.proportion });
    this.onRemoveMeal();
    this.addDayForm.reset();
    this.searchMealForm.reset();

  }
  onRemoveMeal() {
    this.products = [];
    this.meal = null;
    this.mealAdded = false;
    this.searchEnabled = true;
  }
  private initSearchMealsForm() {
    this.searchMealsInfo = new FormGroup({
      nameMeal: new FormControl(null)
    })
  }
  onGetMeals(page: number) {
    this.currentPage = page;
    this.mealsService.getMeals(page).subscribe((res) => {
      this.dataMeal = res;

      this.mealsInfo = this.dataMeal.meals;
      this.pages.length = Math.floor(this.dataMeal.totalRows / this.dataMeal.pageSize);
    })
  }
  onSearchMealsInfo() {
    let name: string = this.searchMealsInfo.value.nameMeal;
    if (name === null) {
      this.onGetMeals(this.currentPage);
    } else {
      this.mealsService.searchMeals(name).subscribe((res) => {
        this.dataMeal = res;
        this.mealsInfo = this.dataMeal;

        this.searchMealsInfo.reset();
      },
        (error) => {
          this.error = "No such meal";
        });
    }
  }
  onHandleDays() {
    this.currentDay = this.daysNumberFilled.length + 1;
  }
  onGetAllMeals() {
    this.mealsService.getAllMeals().subscribe((res) => {
      this.allMeals = res;
    })
  }
  onGetPatientDietIformation(idPatient: number, idDiet: number) {
    this.infoService.getPreDietCreationInfo(idPatient, idDiet).subscribe((res) => {
      this.info = res;
    }, (err) => {
      this.errorDiet = err.error;
    })
  }
}
@Pipe({ name: 'roundNumberAssignMeals' })
export class RoundNumberAssignMealsPipe implements PipeTransform {
  transform(value: number): number {
    return Math.round(value * 1000) / 1000;
  }
}

