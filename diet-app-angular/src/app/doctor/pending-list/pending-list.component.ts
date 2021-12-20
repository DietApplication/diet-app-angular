import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DietitianReport } from './dietitian-report.model';
import { PendingListService } from './pending-list.service';
import { PendingUser } from './pending-user.model';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.css']
})
export class PendingListComponent implements OnInit, AfterContentChecked {
  @ViewChild('contentReport') content: ElementRef;
  clicked: number;
  submitUserForm: FormGroup;
  isActive: boolean = false;
  @Input() pendingUsers: PendingUser[];
  dietitianReport: DietitianReport;
  idPatient: number;
  index: number;
  firstName: string;
  dateOfSurvey: string;
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
  atTime1: string;
  atTime2: string;
  atTime3: string;
  atTime4: string;
  atTime5: string;
  foodToEat1: string;
  foodToEat2: string;
  foodToEat3: string;
  foodToEat4: string;
  foodToEat5: string;
  foodBetweenMeals: string;
  constructor(private pendingService: PendingListService, private cdref: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.onGetUsers();
    this.initForm();
  }

  onGetUsers() {
    this.pendingService.getPendiingUsers().subscribe((users) => {
      console.log(users);
      this.pendingUsers = users;
    })
  }
  setIdUser(i: number) {
    this.clicked = i;
    this.idPatient = this.pendingUsers[i].idUser;
    console.log("patientId ", this.idPatient);
    console.log("patient ", this.pendingUsers[i]);
    this.pendingService.getDietitianReport(this.idPatient)
      .subscribe((response) => {
        console.log(response);
        this.fillReport(response);
      });

  }
  private fillReport(response: DietitianReport) {
    this.dateOfSurvey = new Date(response.dateOfSurvey).toDateString();
    this.firstName = response.firstName;
    this.lastName = response.lastName;
    this.email = response.email;
    this.pesel = response.pesel;
    this.address = response.address;
    this.phoneNumber = response.phoneNumber;
    this.gender = response.gender;
    this.age = response.age;
    this.weight = response.weight;
    this.height = response.height;
    this.idealBodyWeight = response.idealBodyWeight;
    this.modifiedFormula = response.modifiedFormula;
    this.waistCircumference = response.waistCircumference;
    this.hipCircumference = response.hipCircumference;
    this.waistHipRatio = response.waistHipRatio;
    this.consultationGoal = response.consultationGoal;
    this.diabetes = response.diabetes;
    this.hypertension = response.hypertension;
    this.insulinResistance = response.insulinResistance;
    this.intestinalDiseases = response.intestinalDiseases;
    this.hypothyroidism = response.hypothyroidism;
    this.otherDiseases = response.otherDiseases;
    this.medications = response.medications;
    this.dietSupplements = response.dietSupplements;
    this.getUpInterval = response.getUpInterval;
    this.goToSleepInterval = response.goToSleepInterval;
    this.avgSleep = response.avgSleep;
    this.sportsPerDay = response.sportsPerDay;
    this.sportsPerWeek = response.sportsPerWeek;
    this.regularWalk = response.regularWalk;
    this.sportTypes = response.sportTypes;
    this.waterGlasses = response.waterGlasses;
    this.coffeeGlasses = response.coffeeGlasses;
    this.teaGlasses = response.teaGlasses;
    this.juiceGlasses = response.juiceGlasses;
    this.energyDrinkGlasses = response.energyDrinkGlasses;
    this.alcohol = response.alcohol;
    this.cigs = response.cigs;
    this.breakfast = response.breakfast;
    this.secondBreakfast = response.secondBreakfast;
    this.lunch = response.lunch;
    this.afternoonMeal = response.afternoonMeal;
    this.dinner = response.dinner;
    this.favFood = response.favFood;
    this.notFavFood = response.notFavFood;
    this.hypersensProds = response.hypersensProds;
    this.alergieProds = response.alergieProds;
    let newMeals = this.handleNullMeals(response.meals);
    this.atTime1 = newMeals[0].atTime;
    this.atTime2 = newMeals[1].atTime;
    this.atTime3 = newMeals[2].atTime;
    this.atTime4 = newMeals[3].atTime;
    this.atTime5 = newMeals[4].atTime;
    this.foodToEat1 = newMeals[0].foodToEat;
    this.foodToEat2 = newMeals[1].foodToEat;
    this.foodToEat3 = newMeals[2].foodToEat;
    this.foodToEat4 = newMeals[3].foodToEat;
    this.foodToEat5 = newMeals[4].foodToEat;
    this.foodBetweenMeals = response.foodBetweenMeals;

  }
  private handleNullMeals(meals) {
    let newMeals:
      {
        mealNumber: number,
        atTime: string,
        foodToEat: string
      }[] = [];
    for (let i = 0; i < 5; i++) {
      if (meals.length > i) {
        newMeals.push(meals[i]);
      }
      else {
        newMeals.push({ "mealNumber": i, "atTime": "-", "foodToEat": "-" });
      }
    }
    return newMeals;
  }
  private initForm() {
    this.submitUserForm = new FormGroup({
      correctedValue: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(1000)]),
      pal: new FormControl(null, [Validators.required, Validators.min(1.2), Validators.max(2.4)])
    })
  }
  deletePendingUser(pUser: PendingUser) {
    this.pendingUsers.splice(this.pendingUsers.indexOf(pUser), 1);
  }

  onDelete() {
    if (confirm('Are you sure you want to reject this pending user from the list? All survey data will be lost.')) {
      this.pendingService.deletePatient(this.idPatient).subscribe((response) => {
        console.log(response);
      });
      this.onGetUsers();
      console.log('rejected');
    } else {
      console.log('not rejected');
    }
  }
  onSubmit() {
    let pal = this.submitUserForm.value.pal
    console.log("pal ", pal);
    this.pendingService.submitPatient(this.idPatient, this.cpm, pal, this.submitUserForm.value.correctedValue).subscribe((response) => {
      console.log("response ", response);
      this.onGetUsers();
    });

  }
  get bmr() {
    let result;
    if (this.gender === "Male") {
      result = 66.47 + (13.75 * this.submitUserForm.value.correctedValue) + (5 * this.height) - (6.75 * this.age);
    }
    else if (this.gender === "Female") {
      result = 665.09 + (9.56 * this.submitUserForm.value.correctedValue) + (1.85 * this.height) - (4.67 * this.age);
    }

    this.basicMetabolism = Math.round(result * 100) / 100;
    return this.basicMetabolism;
  }
  get cpm() {
    return this.basicMetabolism * this.submitUserForm.value.pal;
  }
  generatePDF() {
    let content = this.content.nativeElement;
    let doc = new jsPDF();
    doc.text("Date of Survey: " + this.dateOfSurvey, 10, 10);
    doc.text("First Name: " + this.firstName, 10, 20);
    doc.text("Last Name: " + this.lastName, 10, 30);
    doc.text("Email: " + this.email, 10, 40);
    doc.text("Pesel: " + this.pesel, 10, 50);
    doc.text("Address: " + this.address, 10, 60);
    doc.text("Phone Number: " + this.phoneNumber, 10, 70);
    doc.text("Gender: " + this.gender, 10, 80);
    doc.text("Age: " + this.age, 10, 90);
    doc.text("Weight: " + this.weight, 10, 100);
    doc.text("Height: " + this.height, 10, 110);
    doc.text("MC: " + this.idealBodyWeight, 10, 120);
    doc.text("MC modified: " + this.modifiedFormula, 10, 130);
    doc.text("BMR: " + this.basicMetabolism, 10, 140);
    doc.text("Waist Circumference: " + this.waistCircumference, 10, 150);
    doc.text("Waist Circumference: " + this.hipCircumference, 10, 160);
    doc.text("WHR: " + this.waistHipRatio, 10, 170);
    doc.text("Corrected Value: " + this.submitUserForm.value.correctedValue, 10, 180);
    doc.text("Consultation Goal: " + this.consultationGoal, 10, 190);
    doc.text("Consultation Goal: " + this.consultationGoal, 10, 200);
    doc.text("Chronic Diseases:", 10, 210);
    doc.text("Diabetes: " + this.diabetes, 10, 220);
    doc.text("Hypertension: " + this.hypertension, 10, 230);
    doc.text("Insulin Resistance: " + this.insulinResistance, 10, 240);
    doc.text("Hypothyroidism: " + this.hypothyroidism, 10, 250);
    doc.text("Intestinal Diseases: " + this.intestinalDiseases, 10, 260);
    doc.text("Other Diseases: " + this.otherDiseases, 10, 270);
    doc.text("Medications: " + this.medications, 10, 280);
    doc.text("Supplements: " + this.dietSupplements, 10, 290);
    doc.addPage();
    doc.text("Get up Interval: " + this.getUpInterval, 10, 10);
    doc.text("Go to Sleep Interval: " + this.goToSleepInterval, 10, 20);
    doc.text("Average Sleep Hours: " + this.avgSleep, 10, 30);
    doc.text("Sport per Day: " + this.sportsPerDay, 10, 40);
    doc.text("Sport per Week: " + this.sportsPerWeek, 10, 50);
    doc.text("Regular Walk: " + this.regularWalk, 10, 60);
    doc.text("Sport Types: " + this.sportTypes, 10, 70);
    doc.text("Water Glasses: " + this.waterGlasses, 10, 80);
    doc.text("Coffee Glasses: " + this.coffeeGlasses, 10, 90);
    doc.text("Tea Glasses: " + this.teaGlasses, 10, 100);
    doc.text("Juice Glasses: " + this.juiceGlasses, 10, 110);
    doc.text("Soda/Energy Drinks Glasses: " + this.energyDrinkGlasses, 10, 120);
    doc.text("Alcohol: " + this.alcohol, 10, 130);
    doc.text("Cigarettes per Day: " + this.cigs, 10, 140);
    doc.text("Meal Takes: ", 10, 150);
    doc.text("Breakfast: " + this.breakfast, 10, 160);
    doc.text("Second Breakfast: " + this.secondBreakfast, 10, 170);
    doc.text("Lunch: " + this.lunch, 10, 180);
    doc.text("Aftrenoon Snack: " + this.afternoonMeal, 10, 190);
    doc.text("Dinner: " + this.dinner, 10, 200);
    doc.text("Favourite Food: " + this.favFood, 10, 210);
    doc.text("Disliked Food: " + this.notFavFood, 10, 220);
    doc.text("Allergies: " + this.alergieProds, 10, 230);
    doc.text("Hypersensetivities: " + this.hypersensProds, 10, 240);
    doc.text("Daily Meals: ", 10, 250);
    doc.text("Meal 1: " + this.atTime1 + ", " + this.foodToEat1, 10, 260);
    doc.text("Meal 2: " + this.atTime2 + ", " + this.foodToEat2, 10, 270);
    doc.text("Meal 3: " + this.atTime3 + ", " + this.foodToEat3, 10, 280);
    doc.text("Meal 4: " + this.atTime4 + ", " + this.foodToEat4, 10, 290);
    doc.addPage();
    doc.text("Meal 5: " + this.atTime5 + ", " + this.foodToEat5, 10, 10);
    doc.text("Food between Meals: " + this.foodBetweenMeals, 10, 20);
    doc.text("PAL: " + this.submitUserForm.value.pal, 10, 30);
    doc.text("CPM: " + this.cpm, 10, 40);
    doc.save('dietitianReport.pdf');
  }
  get userSelected() {
    return !!this.idPatient;
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
