import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  @Input() recommendation: string;
  @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void { }
  onClose() {
    this.close.emit();
  }
}
