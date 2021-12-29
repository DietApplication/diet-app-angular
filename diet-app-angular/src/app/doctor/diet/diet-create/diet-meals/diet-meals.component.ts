import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DietCreate, DietService } from '../../diet.service';

@Component({
  selector: 'app-diet-meals',
  templateUrl: './diet-meals.component.html',
  styleUrls: ['./diet-meals.component.css']
})
export class DietMealsComponent implements OnInit {
  private routeSub: Subscription;
idDiet: number;
proteins: number;
totalMeals: number;
days:number;
daysLeft:number;
  constructor(private dietService: DietService,private route: ActivatedRoute,private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
    this.idDiet = params['idDiet'];
    });
    this.onGetDaysAndMeals();
  }

onGetDaysAndMeals(){
  this.dietService.getNumberOfDaysAndMeals(this.idDiet).subscribe((res)=>{
    this.days = res.days;
    this.totalMeals = res.totalMeals;
    this.proteins = res.proteins;
  })
}
}
