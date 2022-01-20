import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  error: string;
  dates: any[];
  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
    this.onGetDates();
  }
  onHandleError() {
    this.error = null;
  }
  onGetDates() {
    this.appointmentService.getDates().subscribe(
      (res) => {
        console.log(res);
        this.dates = res;
      }
    );

  }
}
