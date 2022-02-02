import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { DietHistory, DietHistoryService } from 'src/app/doctor/patients/diet-history/diet-history.service';

@Component({
  selector: 'app-diet-patient',
  templateUrl: './diet-patient.component.html',
  styleUrls: ['./diet-patient.component.css']
})
export class DietPatientComponent implements OnInit {

  routeSub: any;
  idPatient: any;
  diets: DietHistory[];
  error: string;
  errorDiet: string;
  constructor(private tokenService: TokenService, private dietHistoryService: DietHistoryService) { }

  ngOnInit(): void {
    this.idPatient = this.tokenService.getUserId();
    this.onGetDiets();
  }
  onGetDiets() {
    this.dietHistoryService.getDiets(this.idPatient).subscribe((res) => {
      this.diets = res;

    }, (err) => {
      this.errorDiet = err.error;
    });
  }
}
