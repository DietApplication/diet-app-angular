import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorHeaderComponent } from './doctor-header/doctor-header.component';
import { DoctorComponent } from './doctor.component';
import { PendingListComponent } from './pending-list/pending-list.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PendingListItemComponent } from './pending-list/pending-list-item/pending-list-item.component';
import { DropdownDirective } from './dropdown.directive';
import { SupplementsComponent } from './supplements/supplements.component';
import { SupplementAddComponent } from './supplements/supplement-add/supplement-add.component';
import { SupplementListComponent } from './supplements/supplement-list/supplement-list.component';
import { DiseasesComponent } from './diseases/diseases.component';
import { DiseaseListComponent } from './diseases/disease-list/disease-list.component';
import { DiseaseAddComponent } from './diseases/disease-add/disease-add.component';
import { NotesComponent } from './notes/notes.component';
import { PatientsItemComponent } from './patients-item/patients-item.component';
import { NotesItemComponent } from './notes/notes-item/notes-item.component';
import { AutosizeModule } from '@techiediaries/ngx-textarea-autosize';
import { SupplementItemComponent } from './supplements/supplement-list/supplement-item/supplement-item.component';
import { DoctorAlertComponent } from './doctor-alert/doctor-alert.component';
import { DiseaseItemComponent } from './diseases/disease-list/disease-item/disease-item.component';
import { ProductsComponent } from './products/products.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientItemComponent } from './patients/patient-item/patient-item.component';
import { RecommendationsComponent } from './diseases/disease-list/recommendations/recommendations.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { PersonalInfoComponent } from './patients/personal-info/personal-info.component';
import { MeasurementsComponent } from './patients/measurements/measurements.component';
import { MealsComponent } from './meals/meals.component';
import { MealAddComponent } from './meals/meal-add/meal-add.component';
import { MealProductDetailsComponent } from './meals/meal-product-details/meal-product-details.component';
import { MealItemComponent } from './meals/meal-item/meal-item.component';
import { MealDetailsComponent, RoundNumberPipe } from './meals/meal-details/meal-details.component';
import { DietComponent } from './diet/diet.component';
import { DietCreateComponent } from './diet/diet-create/diet-create.component';
import { DiseaseHistoryComponent } from './patients/disease-history/disease-history.component';
import { DietMealsComponent } from './diet/diet-meals/diet-meals.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DietHistoryComponent } from './patients/diet-history/diet-history.component';
import { DietMealsListComponent } from './patients/diet-history/diet-meals-list/diet-meals-list.component';




@NgModule({
  declarations: [RoundNumberPipe,DropdownDirective, DoctorComponent, DoctorHeaderComponent, PendingListComponent, PendingListItemComponent, SupplementsComponent, SupplementAddComponent, SupplementListComponent, DiseasesComponent, DiseaseListComponent, DiseaseAddComponent, NotesComponent, PatientsItemComponent, NotesItemComponent, SupplementItemComponent, DoctorAlertComponent, DiseaseItemComponent, ProductsComponent, ProductAddComponent, ProductItemComponent, PatientsComponent, PatientItemComponent, RecommendationsComponent, ProductDetailsComponent, PersonalInfoComponent, MeasurementsComponent, MealsComponent, MealAddComponent, MealProductDetailsComponent, MealItemComponent, MealDetailsComponent, DietComponent, DietCreateComponent, DiseaseHistoryComponent, DietMealsComponent, LoadingSpinnerComponent, DietHistoryComponent, DietMealsListComponent],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DoctorRoutingModule,
    AutosizeModule

  ],
  exports: [DoctorComponent, DoctorHeaderComponent, PendingListComponent, DropdownDirective]
})
export class DoctorModule { }
