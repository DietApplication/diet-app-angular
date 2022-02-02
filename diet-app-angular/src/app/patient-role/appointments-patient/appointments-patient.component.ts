import { Component, OnInit } from '@angular/core';
import { ScrollHelper } from 'src/app/shared/ScrollHelper';
import { AppointmentDetailsPatient, AppointmentPatient, ApptsPatientService } from './appts-patient.service';

@Component({
  selector: 'app-appointments-patient',
  templateUrl: './appointments-patient.component.html',
  styleUrls: ['./appointments-patient.component.css']
})
export class AppointmentsPatientComponent implements OnInit {


  error: string;
  private scrollHelper: ScrollHelper = new ScrollHelper();
  errorDate: string;
  dates: string[] = [];
  data;
  chosenDate;

  appointments: AppointmentPatient[] = [];
  details: AppointmentDetailsPatient;
  constructor(private appointmentService: ApptsPatientService) { }

  ngOnInit(): void {
    this.onGetAppts();

  }
  onHandleError() {
    this.error = null;
  }

  onGetAppts() {
    this.appointmentService.getAppointments().subscribe((res) => {
      this.errorDate = null;
      this.appointments = res;
      this.chosenDate = this.appointments[0].date.split("T")[0];
    }, (err) => {
      this.errorDate = err.error;
    })

  }


  onGetDetails(appt: AppointmentPatient) {
    this.appointmentService.getDetails(appt.idVisit).subscribe((res) => {

      this.details = res;
    })
    this.scrollHelper.scrollToFirst("details");
  }

  ngAfterViewChecked() {
    this.scrollHelper.doScroll();
  }
}
