import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Disease } from '../../disease.model';
import { DiseasesService } from '../../diseases.service';

@Component({
  selector: '[app-disease-item]',
  templateUrl: './disease-item.component.html',
  styleUrls: ['./disease-item.component.css']
})
export class DiseaseItemComponent implements OnInit {
  idDisease: number;
  description: string;
  name: string;
  recommendation: string;
  isDisplayed: boolean = false;
  @Input() disease: Disease;
  constructor(private diseaseService: DiseasesService) { }

  ngOnInit(): void {
    this.idDisease = this.disease.idDisease;
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
  onEdit() {
    this.diseaseService.editDisease(this.idDisease, this.name, this.description, this.recommendation).subscribe((res) => {
      console.log(res);
    });
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);

  }
}
