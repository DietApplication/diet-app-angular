import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from '../auth/auth-admin.guard';
import { AuthPatientGuard } from '../auth/auth-patient.guard';
import { AdminComponent } from './admin.component';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
const adminRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthAdminGuard],
    component: AdminComponent,
    children: [
      { path: 'create-employee', component: CreateEmployeeComponent },
      { path: 'all-employees', component: AllEmployeesComponent },

    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild(adminRoutes)]
  ],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
