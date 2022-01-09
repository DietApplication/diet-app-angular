import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-patient-alert',
  templateUrl: './patient-alert.component.html',
  styleUrls: ['./patient-alert.component.css']
})
export class PatientAlertComponent implements OnInit {

  @Input() message: string;
  @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void { }
  onClose() {
    this.close.emit();
  }
}
