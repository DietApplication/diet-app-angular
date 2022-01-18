import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-secretary-alert',
  templateUrl: './secretary-alert.component.html',
  styleUrls: ['./secretary-alert.component.css']
})
export class SecretaryAlertComponent implements OnInit {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void { }
  onClose() {
    this.close.emit();
  }
}
