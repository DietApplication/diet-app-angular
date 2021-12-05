import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Patient } from '../patient.model';

@Component({
  selector: 'app-patients-item',
  templateUrl: './patients-item.component.html',
  styleUrls: ['./patients-item.component.css']
})
export class PatientsItemComponent implements OnInit {

  @Input() index: number;
  @Input() patient: Patient;

  firstName: string;
  lastName: string;
  patientId: number;
  constructor() { }

  ngOnInit(): void {
    this.firstName = this.patient.firstName;
    this.lastName = this.patient.lastName;
    this.patientId = this.patient.idPatient;
  }

}
