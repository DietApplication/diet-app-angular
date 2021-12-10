import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DiseasesService } from '../../diseases.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  @Input() recommendation: string;
  @Input() id: number;
  @Output() close = new EventEmitter<void>();
  constructor(private diseaseService: DiseasesService) { }

  ngOnInit(): void { }
  onClose() {
    this.close.emit();
  }
  onEdit(i: number) {
    this.diseaseService.editDisease(i, null, null, this.recommendation).subscribe((res) => {
      console.log(res);
    })
  }
}
