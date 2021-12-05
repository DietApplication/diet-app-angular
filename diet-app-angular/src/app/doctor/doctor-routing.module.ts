import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { PendingListComponent } from './pending-list/pending-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { SupplementsComponent } from './supplements/supplements.component';
import { DiseasesComponent } from './diseases/diseases.component';
import { NotesComponent } from './notes/notes.component';
import { ProductsComponent } from './products/products.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
const doctorRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: DoctorComponent,
    children: [
      { path: 'pendingList', component: PendingListComponent },
      { path: 'supplements', component: SupplementsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'add-product', component: ProductAddComponent },
      { path: 'diseases', component: DiseasesComponent },
      { path: 'notes', component: NotesComponent }
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
