import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { PendingListComponent } from './pending-list/pending-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { SupplementsComponent } from './supplements/supplements.component';
import { DiseasesComponent } from './diseases/diseases.component';
import { NotesComponent } from './notes/notes.component';
import { ProductsComponent } from './products/products.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { PatientsComponent } from './patients/patients.component';
import { PersonalInfoComponent } from './patients/personal-info/personal-info.component';
import { MeasurementsComponent } from './patients/measurements/measurements.component';
import { MealsComponent } from './meals/meals.component';
import { MealAddComponent } from './meals/meal-add/meal-add.component';
import { MealDetailsComponent } from './meals/meal-details/meal-details.component';
import { DietComponent } from './diet/diet.component';
import { DietCreateComponent } from './diet/diet-create/diet-create.component';
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
      { path: 'meals/:nameOfMeal/details', component: MealDetailsComponent},
      { path: 'add-meals', component: MealAddComponent },
      { path: 'diseases', component: DiseasesComponent },
      { path: 'notes', component: NotesComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'diet/create-diet', component: DietCreateComponent },
      { path: 'patients/:idPatient/personal-info', component: PersonalInfoComponent },
      { path: 'patients/:idPatient/measurements', component: MeasurementsComponent }
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
