export class Survey {
  accessEmail: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phoneNumber: string;
  pesel: string;
  password: string;
  gender: string;
  city: string;
  flatNumber: string;
  street: string;
  streetNumber: string;
  height: number;
  weight: number;
  hipCircumference: number;
  waistCircumference: number;
  education: string;
  profession: string;
  mainProblems: string;
  hypertension: boolean;
  insulinResistance: boolean;
  diabetes: boolean;
  hypothyroidism: boolean;
  intestinalDiseases: boolean;
  otherDiseases?: string;
  medications?: string;
  supplementsTaken?: string;
  avgSleep: string;
  usuallyWakeUp: string;
  usuallyGoToSleep: string;
  regularWalk: boolean;
  exercisingPerDay: number;
  sportTypes?: string;
  exercisingPerWeek: number;
  waterGlasses: number;
  coffeeGlasses: number;
  teaGlasses: number;
  juiceGlasses: number;
  energyDrinkGlasses: number;
  alcoholInfo: string;
  cigs: number;
  breakfast: boolean;
  secondBreakfast: boolean;
  lunch: boolean;
  afternoonMeal: boolean;
  dinner: boolean;
  favouriteFoodItems: string;
  notFavouriteFoodItems: string;
  hypersensitivityProducts: string;
  alergieProducts: string;
  foodBetweenMeals?: string;
  meals:
    {
      mealNumber: number,
      time: string,
      foodToEat: string
    }[]

}