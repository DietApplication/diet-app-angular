import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../patient.model';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  searchUsersForm: FormGroup;
  currentPage: number = 1;
  data;
  error: string;
  pages: number[] = [];
  @Input() patients: Patient[];
  allPatients: any[] = [];
  constructor(private patientsService: PatientsService) { }

  ngOnInit(): void {
    this.onGetPatients(this.currentPage);
    this.initSearchForm();
    this.onGetAllPatients();
  }
  onSearch() {
    let name: string = this.searchUsersForm.value.name;
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
    this.patientsService.searchPatients(firstName, lastName).subscribe((res) => {
      this.data = res;
      this.patients = this.data;

    },
      (error) => {
        this.error = error.error;
        this.searchUsersForm.reset();
      });

  }
  onGetPatients(page?: number) {
    this.currentPage = page;
    this.patientsService.getPatients(page).subscribe((response) => {
      this.data = response;

      this.patients = this.data.patients;

      this.pages.length = Math.ceil(this.data.totalRows / this.data.pageSize);
    })
  }
  private initSearchForm() {
    this.searchUsersForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }
  onHandleError() {
    this.error = null;
  }
  onGetAllPatients() {
    this.patientsService.getAllPatients().subscribe((res) => {
      this.allPatients = res;

    })
  }
}
