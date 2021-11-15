import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorHeaderComponent } from './doctor-header/doctor-header.component';
import { DoctorComponent } from './doctor.component';
import { PendingListComponent } from './pending-list/pending-list.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PendingListItemComponent } from './pending-list/pending-list-item/pending-list-item.component';

@NgModule({
  declarations: [DoctorComponent, DoctorHeaderComponent, PendingListComponent, PendingListItemComponent],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DoctorRoutingModule,
  ],
  exports: [DoctorComponent, DoctorHeaderComponent, PendingListComponent]
})
export class DoctorModule { }
