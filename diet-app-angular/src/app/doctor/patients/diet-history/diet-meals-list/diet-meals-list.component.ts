import { AfterContentChecked, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DietService } from 'src/app/doctor/diet/diet.service';
import { BaseInfo, InformationService, PreDietInfo } from 'src/app/shared/information.service';
import { DietHistoryService, DietMealsInfo } from '../diet-history.service';

@Component({
  selector: 'app-diet-meals-list',
  templateUrl: './diet-meals-list.component.html',
  styleUrls: ['./diet-meals-list.component.css']
})
export class DietMealsListComponent implements OnInit, AfterContentChecked {
  routeSub: any;
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
  currentDay: number = 1;
  isFinished: boolean = false;
  daysNumberFilled: number[] = [];
  page: number = 1;
  daysToShow: number[] = [];
  daysPerStep: number = 7;
  dietMeals: DietMealsInfo[];
  dayMeals = new Map();
  dayReport = new Map();
  info: BaseInfo;
  errorEmptyDays: string;

  constructor(private route: ActivatedRoute, private dietHistoryService: DietHistoryService, private dietService: DietService, private infoService: InformationService) { }
  ngAfterContentChecked(): void {
    if (this.error) {
      this.dayMeals.clear();
      this.daysToShow = null;
      this.daysFilled = null;
      this.days = null;
    }
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.idDiet = params['idDiet'];
      this.idPatient = params['idPatient'];
      this.onGetBaseInfo(this.idPatient, this.idDiet)
    });
    this.onGetDaysAndMeals();
    this.onGetMeals();


  }

  onGetDaysAndMeals() {
    if (!this.errorDiet) {
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
        this.daysToShow = this.daysNumberFilled.slice(0, this.step);
        if (this.days === this.daysFilled) {
          this.isFinished = true;
        }

      }, (error) => {
        this.errorDiet = error.error;

      });
    }
  }
  setDay(day: number) {
    this.currentDay = day;

  }
  onGetMeals() {
    this.dietHistoryService.getMeals(this.idDiet).subscribe((res) => {
      this.dietMeals = res;

      this.dietMeals.map((m) => {
        this.dayMeals.set(m.dayNumber, m.meals);
        this.dayReport.set(m.dayNumber, m.patientReport);
      });

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
  onGetBaseInfo(idPatient: number, idDiet: number) {
    this.infoService.getBasenfo(idPatient, idDiet).subscribe((res) => {
      this.info = res;

    }, (err) => {
      this.error = err.error;

    })
  }
}
@Pipe({ name: 'roundNumberDietMeals' })
export class RoundNumberPipeDietMeals implements PipeTransform {
  transform(value: number): number {
    return Math.round(value * 1000) / 1000;
  }
}

