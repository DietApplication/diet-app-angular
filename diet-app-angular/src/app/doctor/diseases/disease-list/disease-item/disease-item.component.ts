import { Component, Input, OnInit } from '@angular/core';
import { Disease } from '../../disease.model';

@Component({
  selector: '[app-disease-item]',
  templateUrl: './disease-item.component.html',
  styleUrls: ['./disease-item.component.css']
})
export class DiseaseItemComponent implements OnInit {

  description: string;
  name: string;
  recommendation: string;
  @Input() disease: Disease;
  constructor() { }

  ngOnInit(): void {
    this.name = this.disease.name;
    this.description = this.disease.description;
    this.recommendation = this.disease.recomendation;
  }
}
