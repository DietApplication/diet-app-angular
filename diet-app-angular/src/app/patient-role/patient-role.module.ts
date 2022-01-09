import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoleRoutingModule } from './patient-role-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutosizeModule } from '@techiediaries/ngx-textarea-autosize';
import { PatientHeaderComponent } from './patient-header/patient-header.component';
import { PatientRoleComponent } from './patient-role.component';
import { NotesPatientComponent } from './notes-patient/notes-patient.component';
import { NotesPatientItemComponent } from './notes-patient/notes-patient-item/notes-patient-item.component';
import { PatientAlertComponent } from './patient-alert/patient-alert.component';
import { MeasurementsPatientComponent } from './measurements-patient/measurements-patient.component';



@NgModule({
  declarations: [PatientHeaderComponent, PatientRoleComponent, NotesPatientComponent, NotesPatientItemComponent, PatientAlertComponent, MeasurementsPatientComponent],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PatientRoleRoutingModule,
    AutosizeModule
  ]
})
export class PatientRoleModule { }
