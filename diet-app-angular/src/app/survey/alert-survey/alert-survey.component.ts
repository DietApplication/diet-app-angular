import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert-survey',
  templateUrl: './alert-survey.component.html',
  styleUrls: ['./alert-survey.component.css']
})
export class AlertSurveyComponent implements OnInit {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void { }
  onClose() {
    this.close.emit();
  }
}
