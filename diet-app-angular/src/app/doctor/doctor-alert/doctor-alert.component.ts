import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-doctor-alert',
  templateUrl: './doctor-alert.component.html',
  styleUrls: ['./doctor-alert.component.css']
})
export class DoctorAlertComponent implements OnInit {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void { }
  onClose() {
    this.close.emit();
  }
}
