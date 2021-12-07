import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../../patient.model';

@Component({
  selector: 'app-patient-item',
  templateUrl: './patient-item.component.html',
  styleUrls: ['./patient-item.component.css']
})
export class PatientItemComponent implements OnInit {

  @Input() index: number;
  @Input() patient: Patient;

  firstName: string;
  lastName: string;
  dateOfBirth: string;
  patientId: number;
  constructor() { }

  ngOnInit(): void {
    this.firstName = this.patient.firstName;
    this.lastName = this.patient.lastName;
    this.patientId = this.patient.idPatient;
    this.dateOfBirth = new Date(this.patient.dateOfBirth).toLocaleDateString().split("T")[0];
  }


}
