import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { PendingListComponent } from './pending-list/pending-list.component';
import { AuthGuard } from '../auth/auth.guard';
const doctorRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: DoctorComponent,
    children: [
      { path: 'pendingList', component: PendingListComponent }
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
