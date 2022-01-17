import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-alert',
  templateUrl: './admin-alert.component.html',
  styleUrls: ['./admin-alert.component.css']
})
export class AdminAlertComponent implements OnInit {

  @Input() message: string;
  @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void { }
  onClose() {
    this.close.emit();
  }
}
