import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Survey } from './survey.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  storeSurvey(
    accessEmail,
    firstName,
    lastName,
    dateOfBirth,
    email,
    phoneNumber,
    pesel,
    password,
    gender,
    city,
    flatNumber,
    street,
    streetNumber,
    height,
    weight,
    hipCircumference,
    waistCircumference,
    education,
    profession,
    mainProblems,
    hypertension,
    insulinResistance,
    diabetes,
    hypothyroidism,
    intestinalDiseases,
    otherDiseases,
    medications,
    supplementsTaken,
    avgSleep,
    usuallyWakeUp,
    usuallyGoToSleep,
    regularWalk,
    exercisingPerDay,
    sportTypes,
    exercisingPerWeek,
    waterGlasses,
    coffeeGlasses,
    teaGlasses,
    juiceGlasses,
    energyDrinkGlasses,
    alcoholInfo,
    cigs,
    breakfast,
    secondBreakfast,
    lunch,
    afternoonMeal,
    dinner,
    favouriteFoodItems,
    notFavouriteFoodItems,
    hypersensitivityProducts,
    alergieProducts,
    foodBetweenMeals,
    meals:
      {
        mealNumber: number,
        atTime: string,
        foodToEat: string,
      }[]


  ) {

    return this.http.post<Survey>('https://dietappeu.azurewebsites.net/api/survey/signup', {
      accessEmail: accessEmail,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      email: email,
      phoneNumber: phoneNumber,
      pesel: pesel,
      password: password,
      gender: gender,
      city: city,
      flatNumber: flatNumber,
      street: street,
      streetNumber: streetNumber,
      height: height,
      weight: weight,
      hipCircumference: hipCircumference,
      waistCircumference: waistCircumference,
      education: education,
      profession: profession,
      mainProblems: mainProblems,
      hypertension: hypertension,
      insulinResistance: insulinResistance,
      diabetes: diabetes,
      hypothyroidism: hypothyroidism,
      intestinalDiseases: intestinalDiseases,
      otherDiseases: otherDiseases,
      medications: medications,
      supplementsTaken: supplementsTaken,
      avgSleep: avgSleep,
      usuallyWakeUp: usuallyWakeUp,
      usuallyGoToSleep: usuallyGoToSleep,
      regularWalk: regularWalk,
      exercisingPerDay: exercisingPerDay,
      sportTypes: sportTypes,
      exercisingPerWeek: exercisingPerWeek,
      waterGlasses: waterGlasses,
      coffeeGlasses: coffeeGlasses,
      teaGlasses: teaGlasses,
      juiceGlasses: juiceGlasses,
      energyDrinkGlasses: energyDrinkGlasses,
      alcoholInfo: alcoholInfo,
      cigs: cigs,
      breakfast: breakfast,
      secondBreakfast: secondBreakfast,
      lunch: lunch,
      afternoonMeal: afternoonMeal,
      dinner: dinner,
      favouriteFoodItems: favouriteFoodItems,
      notFavouriteFoodItems: notFavouriteFoodItems,
      hypersensitivityProducts: hypersensitivityProducts,
      alergieProducts: alergieProducts,
      foodBetweenMeals: foodBetweenMeals,
      meals: meals
    })
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }
}



