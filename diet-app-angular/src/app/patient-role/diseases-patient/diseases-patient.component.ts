import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { DiseaseHistoryComponent } from 'src/app/doctor/patients/disease-history/disease-history.component';
import { DiseaseHistoryService } from 'src/app/doctor/patients/disease-history/disease-history.service';

@Component({
  selector: 'app-diseases-patient',
  templateUrl: './diseases-patient.component.html',
  styleUrls: ['./diseases-patient.component.css']
})
export class DiseasesPatientComponent implements OnInit {
  diseases: any[] = [];
  dataArr;
  constructor(private diseaseHistoryService: DiseaseHistoryService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.onGetDiseases();
  }
  onGetDiseases() {
    this.diseaseHistoryService.getDiseases(parseInt(this.tokenService.getUserId())).subscribe((res) => {
      this.dataArr = res;
      this.diseases = this.dataArr;
      console.log(this.diseases);
    })
  }
}
