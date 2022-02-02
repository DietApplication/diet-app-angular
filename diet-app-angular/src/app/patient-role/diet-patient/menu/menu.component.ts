import { AfterViewChecked, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DietService } from 'src/app/doctor/diet/diet.service';
import { DietHistoryService, DietMealsInfo } from 'src/app/doctor/patients/diet-history/diet-history.service';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  routeSub: any;
  idDiet: number;
  proteins: number;
  totalMeals: number[] = [];
  days: number;
  daysLeft: number;
  daysFilled: number;
  error: string;
  errorDiet: string;
  step: number = 7;
  currentDay: number = 1;
  isFinished: boolean = false;
  daysNumberFilled: number[] = [];
  page: number = 1;
  daysToShow: number[] = [];
  daysPerStep: number = 7;
  dietMeals: DietMealsInfo[];
  dayMeals = new Map();
  dayReport = new Map();
  mealFeedback = new Map();
  patientReportDisabled: boolean = false;
  dietFeedbackForm: FormGroup;
  constructor(private route: ActivatedRoute, private dietHistoryService: DietHistoryService, private dietService: DietService, private menuService: MenuService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.idDiet = params['idDiet'];
    });
    this.onGetDaysAndMeals();
    this.onGetMeals();
    this.initFeedbackForm();
  }

  onGetDaysAndMeals() {
    if (this.idDiet === undefined) {
      return;
    }
    this.dietService.getNumberOfDaysAndMeals(this.idDiet).subscribe((res) => {
      this.errorDiet = null;
      this.days = res.days;
      this.totalMeals.length = res.totalMeals;
      this.proteins = res.proteins;
      this.daysFilled = res.daysFilled;
      this.daysLeft = this.days - this.daysFilled;
      this.daysNumberFilled = res.daysNumberFilled;
      this.daysToShow = this.daysNumberFilled.slice(0, this.step);


    }, (error) => {
      this.errorDiet = 'Diet not found';
    });
  }

  setDay(day: number) {
    this.currentDay = day;
    this.mealFeedback.clear();
    this.initPageMealReports()

  }
  onGetMeals() {
    this.dietHistoryService.getMeals(this.idDiet).subscribe((res) => {
      this.dietMeals = res;

      this.dietMeals.map((m) => {
        this.dayMeals.set(m.dayNumber, m.meals);
        this.dayReport.set(m.dayNumber, m.patientReport);

      });

      this.initPageMealReports()

    }, (err) => {
      this.errorDiet = err.error;
    })
  }

  goForward() {
    if (((this.page + 1) * this.step) - this.step > this.daysNumberFilled.length) {
      return;
    }
    this.page += 1;
    this.daysToShow = this.daysNumberFilled.slice((this.page * this.step) - this.step, this.step * this.page);

  }
  goBack() {
    if (this.page === 1) {
      return;
    }
    this.page -= 1;
    this.daysToShow = this.daysNumberFilled.slice((this.page * this.step) - this.step, this.step * this.page);

  }
  initFeedbackForm() {
    this.dietFeedbackForm = new FormGroup({
      patientReport: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(1000)])
    })
  }
  fillMealReport(meal: any, isFollowed: boolean) {
    this.mealFeedback.set(meal.idMealTake, isFollowed);

  }
  onSendFeedback() {
    let idDay = this.dietMeals[this.dietMeals.map(e => e.dayNumber).indexOf(this.currentDay)].idDay;
    let mealsReport = Array.from(this.mealFeedback, ([name, value]) => ({ idMealTake: name, isFollowed: value }));
    this.menuService.sendFeedback(idDay, this.dietFeedbackForm.value.patientReport, mealsReport).subscribe((res) => {

      this.dietFeedbackForm.reset();
      this.onGetMeals();
    }, (err) => {
      this.error = err.error;
    })
  }
  onHandleError() {
    this.error = null;
  }
  initPageMealReports() {

    if (this.dayReport.get(this.currentDay) !== null) {
      this.patientReportDisabled = true;
    }
    else {
      this.patientReportDisabled = false;
    }
    let dayMealsArr = Array.from(this.dayMeals, ([name, value]) => ({ dayNumber: name, meals: value }));
    let tempMeals: any[] = dayMealsArr[dayMealsArr.map(e => e.dayNumber).indexOf(this.currentDay)].meals;
    tempMeals.map((m) => {
      if (!m.isFollowed) {
        m.isFollowed = false;
      }
      this.mealFeedback.set(m.idMealTake, m.isFollowed);
    });
  }
}
@Pipe({ name: 'roundNumberDietMenu' })
export class RoundNumberPipeDietMenu implements PipeTransform {
  transform(value: number): number {
    return Math.round(value * 1000) / 1000;
  }
}

