import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meal } from './meal.model';
import { MealsService } from './meals.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
  error: string;
  @Input() meals: Meal[];
  currentPage: number = 1;
  data;
  searchMealForm: FormGroup;
  pages: number[] = [];
  allMeals: any[] = [];
  constructor(private mealsService: MealsService) { }

  ngOnInit(): void {
    this.onGetMeals(this.currentPage);
    this.onGetAllMeals();
    this.initSearchForm();
  }
  onGetMeals(page: number) {
    this.currentPage = page;
    this.mealsService.getMeals(page).subscribe((res) => {
      this.data = res;

      this.meals = this.data.meals;

      this.pages.length = Math.floor(this.data.totalRows / this.data.pageSize);

    })
  }
  onHandleError() {
    this.error = null;
  }
  private initSearchForm() {
    this.searchMealForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }
  onSearch() {
    let name: string = this.searchMealForm.value.name;
    this.mealsService.searchMeals(name).subscribe((res) => {
      this.data = res;
      this.meals = this.data;

    },
      (error) => {
        this.error = error.error;
      });
  }
  onGetAllMeals() {
    this.mealsService.getAllMeals().subscribe((res) => {
      this.allMeals = res;

    })
  }

}
