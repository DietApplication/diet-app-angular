import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientRoleComponent } from './patient-role.component';
import { AuthPatientGuard } from '../auth/auth-patient.guard';

import { NotesPatientComponent } from './notes-patient/notes-patient.component';
import { MeasurementsPatientComponent } from './measurements-patient/measurements-patient.component';
import { DiseasesPatientComponent } from './diseases-patient/diseases-patient.component';
const patientRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthPatientGuard],
    component: PatientRoleComponent,
    children: [
      { path: 'notes', component: NotesPatientComponent },
      { path: 'measurements', component: MeasurementsPatientComponent },
      { path: 'diseases', component: DiseasesPatientComponent },
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(patientRoutes)]
  ],
  exports: [RouterModule],
})
export class PatientRoleRoutingModule { }
