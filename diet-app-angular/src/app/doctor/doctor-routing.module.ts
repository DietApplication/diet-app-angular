import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { PendingListComponent } from './pending-list/pending-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { SupplementsComponent } from '../shared/supplements/supplements.component';
import { DiseasesComponent } from '../shared/diseases/diseases.component';
import { NotesComponent } from './notes/notes.component';
import { ProductsComponent } from '../shared/products/products.component';
import { ProductAddComponent } from '../shared/products/product-add/product-add.component';
import { PatientsComponent } from './patients/patients.component';
import { PersonalInfoComponent } from './patients/personal-info/personal-info.component';
import { MeasurementsComponent } from './patients/measurements/measurements.component';
import { MealsComponent } from '../shared/meals/meals.component';
import { MealAddComponent } from '../shared/meals/meal-add/meal-add.component';
import { MealDetailsComponent } from '../shared/meals/meal-details/meal-details.component';
import { DietComponent } from './diet/diet.component';
import { DietCreateComponent } from './diet/diet-create/diet-create.component';
import { DiseaseHistoryComponent } from './patients/disease-history/disease-history.component';
import { DietMealsComponent } from './diet/diet-meals/diet-meals.component';
import { DietHistoryComponent } from './patients/diet-history/diet-history.component';
import { DietMealsListComponent } from './patients/diet-history/diet-meals-list/diet-meals-list.component';
import { AppointmentsDoctorComponent } from './appointments-doctor/appointments-doctor.component';

const doctorRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: DoctorComponent,
    children: [
      { path: 'pendingList', component: PendingListComponent },
      { path: 'supplements', component: SupplementsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'add-product', component: ProductAddComponent },
      { path: 'meals', component: MealsComponent },
      { path: 'meals/:nameOfMeal/details', component: MealDetailsComponent },
      { path: 'add-meals', component: MealAddComponent },
      { path: 'diseases', component: DiseasesComponent },
      { path: 'notes', component: NotesComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'diet/create-diet', component: DietCreateComponent },
      { path: 'diet/:idDiet/assign-meals', component: DietMealsComponent },
      { path: 'diet/:idDiet/meals', component: DietMealsListComponent },
      { path: 'patients/:idPatient/personal-info', component: PersonalInfoComponent },
      { path: 'patients/:idPatient/measurements', component: MeasurementsComponent },
      { path: 'patients/:idPatient/disease-history', component: DiseaseHistoryComponent },
      { path: 'patients/:idPatient/diet-history', component: DietHistoryComponent },
      { path: 'appointments', component: AppointmentsDoctorComponent }
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(doctorRoutes)]
  ],
  exports: [RouterModule],
})
export class DoctorRoutingModule { }
