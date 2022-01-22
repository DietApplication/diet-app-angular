import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route: ActivatedRoute, private dietHistoryService: DietHistoryService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.idPatient = params['idPatient'];
    });
    this.onGetDiets();
  }
  onGetDiets() {
    this.dietHistoryService.getDiets(this.idPatient).subscribe((res) => {
      this.diets = res;
      console.log(res);
    }, (err) => {
      this.errorDiet = err.error;
    });
  }
}
