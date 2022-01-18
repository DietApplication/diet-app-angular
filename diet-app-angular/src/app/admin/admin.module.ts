import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutosizeModule } from '@techiediaries/ngx-textarea-autosize';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component';

import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AdminComponent, CreateEmployeeComponent, AdminHeaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    AutosizeModule,
    SharedModule
  ]
})
export class AdminModule { }
