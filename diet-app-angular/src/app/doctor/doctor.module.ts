import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorHeaderComponent } from './doctor-header/doctor-header.component';
import { DoctorComponent } from './doctor.component';
import { PendingListComponent } from './pending-list/pending-list.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PendingListItemComponent } from './pending-list/pending-list-item/pending-list-item.component';
import { DropdownDirective } from '../shared/dropdown.directive';
import { NotesComponent } from './notes/notes.component';
import { PatientsItemComponent } from './patients-item/patients-item.component';
import { NotesItemComponent } from './notes/notes-item/notes-item.component';
import { AutosizeModule } from '@techiediaries/ngx-textarea-autosize';
import { PatientsComponent } from './patients/patients.component';
import { PatientItemComponent } from './patients/patient-item/patient-item.component';
import { PersonalInfoComponent } from './patients/personal-info/personal-info.component';
import { MeasurementsComponent } from './patients/measurements/measurements.component';
import { DietComponent } from './diet/diet.component';
import { DietCreateComponent } from './diet/diet-create/diet-create.component';
import { DiseaseHistoryComponent } from './patients/disease-history/disease-history.component';
import { DietMealsComponent, RoundNumberAssignMealsPipe } from './diet/diet-meals/diet-meals.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DietHistoryComponent } from './patients/diet-history/diet-history.component';
import { DietMealsListComponent, RoundNumberPipeDietMeals } from './patients/diet-history/diet-meals-list/diet-meals-list.component';
import { SharedModule } from '../shared/shared.module';
import { AppointmentsDoctorComponent } from './appointments-doctor/appointments-doctor.component';
import { ReportComponent } from './patients/report/report.component';




@NgModule({
  declarations: [RoundNumberPipeDietMeals, RoundNumberAssignMealsPipe, DoctorComponent,
    DoctorHeaderComponent, PendingListComponent,
    PendingListItemComponent,
    NotesComponent, PatientsItemComponent, NotesItemComponent, PatientsComponent,
    PatientItemComponent, PersonalInfoComponent, MeasurementsComponent, DietComponent, DietCreateComponent, DiseaseHistoryComponent, DietMealsComponent, LoadingSpinnerComponent, DietHistoryComponent, DietMealsListComponent, AppointmentsDoctorComponent, ReportComponent],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DoctorRoutingModule,
    AutosizeModule,
    SharedModule

  ],
  exports: [DoctorComponent, DoctorHeaderComponent, PendingListComponent, RoundNumberPipeDietMeals, RoundNumberAssignMealsPipe]
})
export class DoctorModule { }
