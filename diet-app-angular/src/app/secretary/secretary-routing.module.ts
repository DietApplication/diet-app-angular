import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthSecretaryGuard } from '../auth/auth-secretary.guard';
import { SecretaryComponent } from './secretary.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { TempUsersComponent } from './temp-users/temp-users.component';


const secretaryRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthSecretaryGuard],
    component: SecretaryComponent,
    children: [
      { path: 'create-appointment', component: CreateAppointmentComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'assign-survey', component: TempUsersComponent }

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
