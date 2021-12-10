export class PersonalInfo {
  dateOfSurvey: Date;
  firstName: string;
  lastName: string;
  email: string;
  pesel: string;
  address: string;
  phoneNumber: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  idealBodyWeight: number;
  modifiedFormula: number;
  basicMetabolism: number;
  waistCircumference: number;
  hipCircumference: number;
  waistHipRatio: number;
  consultationGoal: string;
  diabetes: boolean;
  hypertension: boolean;
  insulinResistance: boolean;
  hypothyroidism: boolean;
  intestinalDiseases: boolean;
  otherDiseases: string;
  medications: string;
  dietSupplements: string;
  getUpInterval: string;
  goToSleepInterval: string;
  avgSleep: string;
  sportsPerDay: number;
  sportsPerWeek: number;
  regularWalk: boolean;
  sportTypes: string;
  waterGlasses: number;
  coffeeGlasses: number;
  teaGlasses: number;
  juiceGlasses: number;
  energyDrinkGlasses: number;
  alcohol: string;
  cigs: string;
  breakfast: boolean;
  secondBreakfast: boolean;
  lunch: boolean;
  afternoonMeal: boolean;
  dinner: boolean;
  favFood: string;
  notFavFood: string;
  hypersensProds: string;
  alergieProds: string;
  pal: number;
  cpm: number;
  correctedValue: number;
  meals:
    {
      mealNumber: number,
      atTime: string,
      foodToEat: string
    }[];
  foodBetweenMeals: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}