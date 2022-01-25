import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from 'src/app/doctor/patients.service';
import { AppointmentsService, DoctorSearch, PatientSearch } from '../appointments.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {
  datesForm: FormGroup;
  searchDoctorForm: FormGroup;
  searchPatientForm: FormGroup;
  descForm: FormGroup;
  dataPatient;
  dataDoctor;
  patients: PatientSearch[];
  doctors: DoctorSearch[];
  error;
  clickedP: number;
  clickedD: number;
  patientSelected: boolean = false;
  doctorSelected: boolean = false;
  idPatient: number;
  idDoctor: number;
  allPatients: any[] = [];
  allDoctors: any[] = [];
  constructor(private appointmentService: AppointmentsService, private patientService: PatientsService) { }

  ngOnInit(): void {
    this.initDatesForm();
    this.initDoctorSearchForm();
    this.initPatientSearchForm();
    this.initDescriptionForm();
    this.onGetAllPatients();
    this.onGetAllDoctors();
  }
  onSearchPatients() {
    let name: string = this.searchPatientForm.value.patientName;
    if (name === " ") {
      this.error = 'Invalid name';
    } else {
      let result = name.split(" ");
      let lastName;
      let firstName;
      if (result.length == 1) {
        firstName = null;
        lastName = name;
      } else {
        firstName = result[0];
        lastName = result[1];
      }
      this.appointmentService.searchPatients(firstName, lastName).subscribe((res) => {
        this.dataPatient = res;
        this.patients = this.dataPatient;
        console.log(this.patients);
      },
        (error) => {
          this.error = error.error;
        });
    }
  }
  onSearchDoctors() {
    let name: string = this.searchDoctorForm.value.doctorName;
    if (name === " ") {
      this.error = 'Invalid name';
    } else {
      let result = name.split(" ");
      let lastName;
      let firstName;
      if (result.length == 1) {
        firstName = null;
        lastName = name;
      } else {
        firstName = result[0];
        lastName = result[1];
      }
      this.appointmentService.searchDoctors(firstName, lastName).subscribe((res) => {
        this.dataDoctor = res;
        this.doctors = this.dataDoctor;
        console.log(this.doctors);
      },
        (error) => {
          this.error = error.error;
        });
    }
  }
  private initDoctorSearchForm() {
    this.searchDoctorForm = new FormGroup({
      doctorName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(60)]),
    })
  }
  private initPatientSearchForm() {
    this.searchPatientForm = new FormGroup({
      patientName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(60)]),
    })
  }
  private initDescriptionForm() {
    this.descForm = new FormGroup({
      desc: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(300)]),
    })
  }
  private initDatesForm() {
    this.datesForm = new FormGroup({
      date: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required]),
    }, { validators: [this.confirmDate.bind(this), this.confirmTime.bind(this)] })
  }
  onHandleError() {
    this.error = null;
  }
  setIdPatient(i: number) {
    this.clickedP = i;
    this.idPatient = this.patients[i].idUser;
    this.patientSelected = true;
    console.log("patientId ", this.idPatient);
    console.log("patient ", this.patients[i]);
  }
  setIdDoctor(i: number) {
    this.clickedD = i;
    this.idDoctor = this.doctors[i].idUser;
    console.log("dcotroId ", this.idDoctor);
    this.doctorSelected = true;
    console.log("doctor ", this.doctors[i]);
  }
  onCreateAppointment() {
    let date = this.datesForm.value.date + "T" + this.datesForm.value.time;
    this.appointmentService.createAppointment(this.idDoctor, this.idPatient, date, this.descForm.value.desc).subscribe((res) => {
      console.log("res");
      alert("appointment created!");
      this.descForm.reset();
      this.datesForm.reset();
      this.searchDoctorForm.reset();
      this.searchPatientForm.reset();
      this.clickedD = null;
      this.clickedP = null;
      this.patientSelected = false;
      this.doctorSelected = false;
      this.patients = null;
      this.doctors = null;
    }, (err) => {
      this.error = err;
    })
  }
  confirmDate(formGroup: FormGroup) {
    const { value: date } = formGroup.get('date');
    const now = new Date();
    const actual = new Date(date);
    actual.setHours(now.getHours());
    actual.setMinutes(now.getMinutes());
    actual.setSeconds(now.getSeconds() + 1);
    return actual >= now ? null : { dateInvalid: true };
  }
  confirmTime(formGroup: FormGroup) {
    const { value: time } = formGroup.get('time');
    const { value: date } = formGroup.get('date');
    const now = new Date();
    const actual = new Date(date + "T" + time);
    return actual.getTime() >= now.getTime() ? null : { timeInvalid: true };
  }
  onGetAllPatients() {
    this.patientService.getAllPatients().subscribe((res) => {
      this.allPatients = res;
      console.log(this.allPatients);
    })
  }
  onGetAllDoctors() {
    this.appointmentService.getAllDoctors().subscribe((res) => {
      this.allDoctors = res;
      console.log(this.allDoctors);
    })
  }
}
