import { ThrowStmt } from '@angular/compiler';
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
  isDisplayed: boolean = false;
  @Input() disease: Disease;
  constructor() { }

  ngOnInit(): void {
    this.name = this.disease.name;
    this.description = this.disease.description;
    this.recommendation = this.disease.recomendation;
  }
  onHandleRec() {
    this.isDisplayed = false;
  }
  onOpenRecs() {
    this.isDisplayed = true;
    console.log(this.recommendation);
  }
}
