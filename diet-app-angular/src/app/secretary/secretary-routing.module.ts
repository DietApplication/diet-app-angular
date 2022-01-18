import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthSecretaryGuard } from '../auth/auth-secretary.guard';
import { SecretaryComponent } from './secretary.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { TempUsersComponent } from './temp-users/temp-users.component';
import { DiseasesComponent } from '../shared/diseases/diseases.component';
import { SupplementsComponent } from '../shared/supplements/supplements.component';
import { MealAddComponent } from '../shared/meals/meal-add/meal-add.component';
import { MealDetailsComponent } from '../shared/meals/meal-details/meal-details.component';
import { MealsComponent } from '../shared/meals/meals.component';
import { ProductAddComponent } from '../shared/products/product-add/product-add.component';
import { ProductsComponent } from '../shared/products/products.component';


const secretaryRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthSecretaryGuard],
    component: SecretaryComponent,
    children: [
      { path: 'create-appointment', component: CreateAppointmentComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'assign-survey', component: TempUsersComponent },
      { path: 'diseases', component: DiseasesComponent },
      { path: 'supplements', component: SupplementsComponent },
      { path: 'meals', component: MealsComponent },
      { path: 'meals/:nameOfMeal/details', component: MealDetailsComponent },
      { path: 'add-meals', component: MealAddComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'add-product', component: ProductAddComponent },
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(secretaryRoutes)]
  ],
  exports: [RouterModule],
})
export class SecretaryRoutingModule { }
