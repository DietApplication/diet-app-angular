import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyStorageService } from '../auth/survey-login/survey-storage.service';
import { SurveyService } from './survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  surveyForm: FormGroup;
  error: string = null;
  surveyCompletedOk: string = null;
  isErrorPresent: boolean = true;
  showP: boolean = false;
  showCP: boolean = false;
  constructor(private surveyService: SurveyService, private storageService: SurveyStorageService, private router: Router) { }

  ngOnInit(): void {
    this.initSurveyForm();
  }

  private initSurveyForm() {
    this.surveyForm = new FormGroup({
      education: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      profession: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      goal: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
      hypertension: new FormControl(false),
      insulinResistance: new FormControl(false),
      diabetes: new FormControl(false),
      hypothyroidism: new FormControl(false),
      intestionalDiseases: new FormControl(false),
      otherDiseases: new FormControl(null, [Validators.minLength(2), Validators.maxLength(150)]),
      medications: new FormControl(null, [Validators.minLength(2), Validators.maxLength(150)]),
      supplements: new FormControl(null, [Validators.minLength(2), Validators.maxLength(150)]),
      avgSleep: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(24)]),
      usuallyWakeUp: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
      usuallyGoToSleep: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
      regularWalk: new FormControl(false),
      avgSportTime: new FormControl(null, [Validators.required, Validators.min(0)]),
      sportTypes: new FormControl(null, [Validators.minLength(2), Validators.maxLength(150)]),
      excercisesPerWeek: new FormControl(null, [Validators.required, Validators.min(0)]),
      waterGlasses: new FormControl(null, [Validators.required, Validators.min(0)]),
      coffeeGlasses: new FormControl(null, [Validators.required, Validators.min(0)]),
      teaGlasses: new FormControl(null, [Validators.required, Validators.min(0)]),
      juiceGlasses: new FormControl(null, [Validators.required, Validators.min(0)]),
      energyDrinkGlasses: new FormControl(null, [Validators.required, Validators.min(0)]),
      alcoholInfo: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
      cigsPerDay: new FormControl(null, [Validators.required, Validators.min(0)]),
      breakfast: new FormControl(false),
      secondBreakfast: new FormControl(false),
      lunch: new FormControl(false),
      afternoonSnack: new FormControl(false),
      dinner: new FormControl(false),
      favFoodItems: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      notFavFoodItems: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
      hypersenetivityProducts: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
      allergieProducts: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
      betweenMealsFood: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
      timeOne: new FormControl(),
      foodToEatOne: new FormControl(null, [Validators.minLength(2), Validators.maxLength(150)]),
      timeTwo: new FormControl(),
      foodToEatTwo: new FormControl(null, [Validators.minLength(2), Validators.maxLength(150)]),
      timeThree: new FormControl(),
      foodToEatThree: new FormControl(null, [Validators.minLength(2), Validators.maxLength(150)]),
      timeFour: new FormControl(),
      foodToEatFour: new FormControl(null, [Validators.minLength(2), Validators.maxLength(150)]),
      timeFive: new FormControl(),
      foodToEatFive: new FormControl(null, [Validators.minLength(2), Validators.maxLength(150)]),
      firstName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      conf_password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(12)]),
      pesel: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{11}$')]),
      dob: new FormControl(null, Validators.required),

      gender: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      city: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      street: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      streetNumber: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
      flat: new FormControl(null, [Validators.minLength(1), Validators.maxLength(10)]),

      weight: new FormControl(null, [Validators.required, Validators.min(20), Validators.max(730)]),
      height: new FormControl(null, [Validators.required, Validators.min(30), Validators.max(251)]),
      waistCirc: new FormControl(null, [Validators.required, Validators.min(30), Validators.max(300)]),
      hipCirc: new FormControl(null, [Validators.required, Validators.min(30), Validators.max(300)])
    },
      { validators: [this.confirmPassword.bind(this), this.confirmDob.bind(this)] }
    );

  }
  confirmPassword(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: conf_password } = formGroup.get('conf_password');
    return password === conf_password ? null : { passwordNotMatch: true };
  }
  confirmDob(formGroup: FormGroup) {
    const { value: dob } = formGroup.get('dob');
    const now = new Date();
    const actual = new Date(dob);
    return actual <= now ? null : { dobInvalid: true };
  }
  onSubmit() {
    if (!this.surveyForm.valid) {
      return;
    }
    let meals: { mealNumber: number, atTime: string, foodToEat: string }[] = [
      { mealNumber: 1, atTime: this.surveyForm.value.timeOne, foodToEat: this.surveyForm.value.foodToEatOne },
      { mealNumber: 2, atTime: this.surveyForm.value.timeTwo, foodToEat: this.surveyForm.value.foodToEatTwo },
      { mealNumber: 3, atTime: this.surveyForm.value.timeThree, foodToEat: this.surveyForm.value.foodToEatThree },
      { mealNumber: 4, atTime: this.surveyForm.value.timeFour, foodToEat: this.surveyForm.value.foodToEatFour },
      { mealNumber: 5, atTime: this.surveyForm.value.timeFive, foodToEat: this.surveyForm.value.foodToEatFive }
    ]

    let filtered = meals.filter(function (element) {
      if ((element.atTime === null || element.atTime === "") || (element.foodToEat === null || element.foodToEat === "")) {
        return false;
      }
      return true;
    }
    );


    this.surveyService.storeSurvey(
      this.storageService.getEmail(),
      this.surveyForm.value.firstName,
      this.surveyForm.value.lastName,
      this.surveyForm.value.dob,
      this.surveyForm.value.email,
      this.surveyForm.value.phone,
      this.surveyForm.value.pesel,
      this.surveyForm.value.password,
      this.surveyForm.value.gender,
      this.surveyForm.value.city,
      this.surveyForm.value.flat,
      this.surveyForm.value.street,
      this.surveyForm.value.streetNumber,
      this.surveyForm.value.height,
      this.surveyForm.value.weight,
      this.surveyForm.value.hipCirc,
      this.surveyForm.value.waistCirc,
      this.surveyForm.value.education,
      this.surveyForm.value.profession,
      this.surveyForm.value.goal,
      this.surveyForm.value.hypertension,
      this.surveyForm.value.insulinResistance,
      this.surveyForm.value.diabetes,
      this.surveyForm.value.hypothyroidism,
      this.surveyForm.value.intestionalDiseases,
      this.surveyForm.value.otherDiseases,
      this.surveyForm.value.medications,
      this.surveyForm.value.supplements,
      this.surveyForm.value.avgSleep,
      this.surveyForm.value.usuallyWakeUp,
      this.surveyForm.value.usuallyGoToSleep,
      this.surveyForm.value.regularWalk,
      this.surveyForm.value.avgSportTime,
      this.surveyForm.value.sportTypes,
      this.surveyForm.value.excercisesPerWeek,
      this.surveyForm.value.waterGlasses,
      this.surveyForm.value.coffeeGlasses,
      this.surveyForm.value.teaGlasses,
      this.surveyForm.value.juiceGlasses,
      this.surveyForm.value.energyDrinkGlasses,
      this.surveyForm.value.alcoholInfo,
      this.surveyForm.value.cigsPerDay,
      this.surveyForm.value.breakfast,
      this.surveyForm.value.secondBreakfast,
      this.surveyForm.value.lunch,
      this.surveyForm.value.afternoonSnack,
      this.surveyForm.value.dinner,
      this.surveyForm.value.favFoodItems,
      this.surveyForm.value.notFavFoodItems,
      this.surveyForm.value.hypersenetivityProducts,
      this.surveyForm.value.allergieProducts,
      this.surveyForm.value.betweenMealsFood,
      filtered).subscribe((response) => {
        console.log("post done:", response);
        alert("Survey successfully sent!")
        console.log("success message " + this.surveyCompletedOk);
        this.storageService.removeEmail();
        this.router.navigate(['/auth/login'])
      },
        (error) => {
          this.error = error.error;
          console.log(this.error)
        });
  }
  onHandleError() {
    this.error = null;
  }

  password() {
    this.showP = !this.showP;
  }
  confPassword() {
    this.showCP = !this.showCP;
  }

}