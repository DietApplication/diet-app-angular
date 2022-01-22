import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment, AppointmentDetails, AppointmentsService } from '../appointments.service';
import { ScrollHelper } from './ScrollHelper';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit, AfterViewChecked {
  error: string;
  private scrollHelper: ScrollHelper = new ScrollHelper();
  errorDate: string;
  dates: string[] = [];
  data;
  chosenDate;
  datesForm: FormGroup;
  appointments: Appointment[] = [];
  details: AppointmentDetails;
  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
    this.initAppts();
    this.initFilterForm();
  }
  onHandleError() {
    this.error = null;
  }
  onGetDates() {
    this.appointmentService.getDates().subscribe(
      (res) => {
        console.log(res);
        this.data = res;
        this.dates = this.data;
      }
    );
  }
  private getApptByDate(date: string) {
    this.appointmentService.getAppointmentsByDate(date).subscribe((res) => {
      this.appointments = res;
      this.chosenDate = this.appointments[0].date.split("T")[0];
      console.log(this.appointments);
    }, (err) => {
      this.errorDate = "No upcoming appointments available. Select the date to see history";
    })
  }
  onGetApptByDate() {
    this.getApptByDate(this.datesForm.value.date);
  }
  private initFilterForm() {
    this.datesForm = new FormGroup({
      date: new FormControl(null, Validators.required),
    }, { validators: this.checkDates.bind(this) })
  }
  checkDates(formGroup: FormGroup) {
    const { value: date } = formGroup.get('date');
    return this.dates.filter(e => e.split("T")[0] === date).length > 0 ? null : { dateDoNotMatch: true };
  }
  onDelete(appt: Appointment) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.cancelAppt(appt.idVisit).subscribe((res) => {
        console.log(res);
        this.onGetDates();
        this.onGetApptByDate();
      }, (err) => {
        this.error = err.error;
      });
    } else {
      console.log('not deleted');
    }
  }
  onGetDetails(appt: Appointment) {
    this.appointmentService.getDetails(appt.idVisit).subscribe((res) => {
      console.log(res);
      this.details = res;
    })

    this.scrollHelper.scrollToFirst("details");

  }
  private initAppts() {
    let today = new Date().toLocaleDateString('en-US', { timeZone: 'CET' });
    let res = today.split("/");
    let request: string = "";
    if (res[0].length === 1) {
      request = res[2] + "-0" + res[0] + "-" + res[1];
    } else {
      request = res[2] + "-" + res[0] + "-" + res[1];

    }
    this.getApptByDate(request);
    this.onGetDates();
  }
  ngAfterViewChecked() {
    this.scrollHelper.doScroll();
  }
}
