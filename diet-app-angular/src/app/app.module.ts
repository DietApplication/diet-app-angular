import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { PatientRoleComponent } from './patient-role/patient-role.component';
import { PatientHeaderComponent } from './patient-role/patient-header/patient-header.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
