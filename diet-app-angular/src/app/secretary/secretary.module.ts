import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { SecretaryHeaderComponent } from './secretary-header/secretary-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutosizeModule } from '@techiediaries/ngx-textarea-autosize';
import { RouterModule } from '@angular/router';
import { SecretaryRoutingModule } from './secretary-routing.module';
import { AppointmentsComponent } from './appointments/appointments.component';
import { SecretaryComponent } from './secretary.component';
import { TempUsersComponent } from './temp-users/temp-users.component';
import { SecretaryAlertComponent } from './secretary-alert/secretary-alert.component';


@NgModule({
  declarations: [
    CreateAppointmentComponent,
    SecretaryHeaderComponent,
    AppointmentsComponent, SecretaryComponent, TempUsersComponent, SecretaryAlertComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SecretaryRoutingModule,
    AutosizeModule
  ]
})
export class SecretaryModule { }
