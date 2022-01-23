import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ScrollHelper } from 'src/app/shared/ScrollHelper';
import { AppointmentDetailsDoctor, AppointmentDoctor, ApptsDoctorService } from './appts-doctor.service';

@Component({
  selector: 'app-appointments-doctor',
  templateUrl: './appointments-doctor.component.html',
  styleUrls: ['./appointments-doctor.component.css']
})
export class AppointmentsDoctorComponent implements OnInit {

  error: string;
  private scrollHelper: ScrollHelper = new ScrollHelper();
  errorDate: string;
  dates: string[] = [];
  data;
  chosenDate;
  datesForm: FormGroup;
  appointments: AppointmentDoctor[] = [];
  details: AppointmentDetailsDoctor;
  constructor(private appointmentService: ApptsDoctorService) { }

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
      this.errorDate = null;
      this.appointments = res;
      this.chosenDate = this.appointments[0].date.split("T")[0];
      console.log(this.appointments);
    }, (err) => {
      this.errorDate = err.error;
    })
    console.log("error " + this.errorDate);
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

  onGetDetails(appt: AppointmentDoctor) {
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
