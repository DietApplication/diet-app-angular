import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Disease } from '../../diseases/disease.model';
import { DiseasesService } from '../../diseases/diseases.service';
import { DiseaseHistoryService } from './disease-history.service';


@Component({
  selector: 'app-disease-history',
  templateUrl: './disease-history.component.html',
  styleUrls: ['./disease-history.component.css']
})
export class DiseaseHistoryComponent implements OnInit {
private routeSub: Subscription;
idPatient: number;
idDisease: number;
error: string;
data;
dataArr;
isToAdd: boolean = false;
disease: Disease;
diseases: [] = [];
searchDisForm: FormGroup;
assignDiseaseForm: FormGroup;
  constructor(private route: ActivatedRoute,private diseaseService:DiseasesService, private diseaseHistoryService: DiseaseHistoryService ) { }


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.idPatient = params['idPatient'];
    });
    this.initSearchForm();
    this.initAssignDiseaseForm();
    this.onGetDiseases();
  }

  onAssignDisease(){
    this.diseaseHistoryService.assignDisease(this.idPatient, this.idDisease, this.assignDiseaseForm.value.date).subscribe((res)=>{
     // console.log(res);
      alert("Disease was successfully assigned");
      this.assignDiseaseForm.reset();
      this.searchDisForm.reset();
      this.isToAdd = false;
      this.onGetDiseases();
    }, (err)=>{
      this.error = err.error;
        this.searchDisForm.reset();
      this.isToAdd=false;
    });

  }
  onGetDiseases(){
    this.diseaseHistoryService.getDiseases(this.idPatient).subscribe((res)=>{

      this.dataArr = res;
      this.diseases = this.dataArr;
      console.log(this.diseases);
    })
  }
  private initAssignDiseaseForm() {
    this.assignDiseaseForm = new FormGroup({
      date: new FormControl(null, Validators.required),
    }, {validators: [this.confirmDate.bind(this)]});
  }
  confirmDate(formGroup: FormGroup) {
    const { value: date } = formGroup.get('date');
    const now = new Date();
    const actual = new Date(date);
     actual.setHours(now.getHours());
    actual.setMinutes(now.getMinutes());
    actual.setSeconds(now.getSeconds());
    return actual <= now ? null : { dateInvalid: true };
  }
    onSearch() {
    let name: string = this.searchDisForm.value.name;
    this.diseaseService.searchDiseases(name).subscribe((res) => {
      this.data = res;
      this.disease = this.data[0];
      this.idDisease = this.disease.idDisease
      console.log(this.disease);
      this.isToAdd = true;
    },
      (error) => {
        this.error = error.error;
      });
  }
  private initSearchForm() {
    this.searchDisForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }
  onHandleError() {
    this.error = null;
  }
  removeDisease(){
    this.disease = null;
    this.searchDisForm.reset();
    this.isToAdd=false;
  }
}
