import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseInfo, InformationService } from 'src/app/shared/information.service';
import { DietHistory, DietHistoryService } from './diet-history.service';

@Component({
  selector: 'app-diet-history',
  templateUrl: './diet-history.component.html',
  styleUrls: ['./diet-history.component.css']
})
export class DietHistoryComponent implements OnInit {
  routeSub: any;
  idPatient: any;
  diets: DietHistory[];
  error: string;
  errorDiet: string;
  info: BaseInfo;
  constructor(private route: ActivatedRoute, private dietHistoryService: DietHistoryService, private infoService: InformationService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.idPatient = params['idPatient'];
      this.onGetBaseInfo(this.idPatient);
    });
    this.onGetDiets();
  }
  onGetDiets() {
    this.dietHistoryService.getDiets(this.idPatient).subscribe((res) => {
      this.diets = res;

    }, (err) => {
      this.errorDiet = err.error;
    });
  }
  onGetBaseInfo(idPatient: number) {
    this.infoService.getBasenfo(idPatient).subscribe((res) => {
      this.info = res;

    })
  }
}
