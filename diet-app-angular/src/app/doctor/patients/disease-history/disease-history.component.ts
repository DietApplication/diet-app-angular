import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Disease } from '../../../shared/diseases/disease.model';
import { DiseasesService } from '../../../shared/diseases/diseases.service';
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
  clicked: number;
  disease: Disease;
  diseases: any[] = [];
  searchDisForm: FormGroup;
  assignDiseaseForm: FormGroup;
  editDiseaseForm: FormGroup;
  isEditEnabled: boolean = false;
  constructor(private route: ActivatedRoute, private diseaseService: DiseasesService, private diseaseHistoryService: DiseaseHistoryService) { }


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.idPatient = params['idPatient'];
    });
    this.initSearchForm();
    this.initAssignDiseaseForm();
    this.initEditDiseaseForm();
    this.onGetDiseases();
  }

  onAssignDisease() {
    if (this.assignDiseaseForm.value.dateOfCure === null) {
      this.diseaseHistoryService.assignDisease(this.idPatient, this.idDisease, this.assignDiseaseForm.value.date).subscribe((res) => {
        this.afterAssign();
      }, (err) => {
        this.afterAssignError(err);
      });
    }
    else {
      this.diseaseHistoryService.assignDisease(this.idPatient, this.idDisease, this.assignDiseaseForm.value.date, this.assignDiseaseForm.value.dateOfCure).subscribe((res) => {
        this.afterAssign();
      }, (err) => {
        this.afterAssignError(err);
      });
    }
  }
  onGetDiseases() {
    this.diseaseHistoryService.getDiseases(this.idPatient).subscribe((res) => {

      this.dataArr = res;
      this.diseases = this.dataArr;
      console.log(this.diseases);
    })
  }
  private initAssignDiseaseForm() {
    this.assignDiseaseForm = new FormGroup({
      date: new FormControl(null, Validators.required),
      dateOfCure: new FormControl(null)
    }, { validators: [this.confirmDate.bind(this), this.confirmDate2.bind(this), this.confirmDateOfCure.bind(this)] });
  }
  private initEditDiseaseForm() {
    this.editDiseaseForm = new FormGroup({
      date: new FormControl(null),
      dateOfCure: new FormControl(null)
    }, { validators: [this.confirmDate.bind(this), this.confirmDate2.bind(this), this.confirmDateOfCure2.bind(this)] });
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
  confirmDate2(formGroup: FormGroup) {
    const { value: date } = formGroup.get('dateOfCure');
    const now = new Date();
    const actual = new Date(date);
    actual.setHours(now.getHours());
    actual.setMinutes(now.getMinutes());
    actual.setSeconds(now.getSeconds());
    return actual <= now ? null : { date2Invalid: true };
  }

  confirmDateOfCure(formGroup: FormGroup) {
    const { value: dateOfCure } = formGroup.get('dateOfCure');
    const { value: dateOfDiagnosis } = formGroup.get('date');
    return (dateOfDiagnosis < dateOfCure) || !dateOfCure ? null : { cureDateInvalid: true };
  }
  confirmDateOfCure2(formGroup: FormGroup) {
    const { value: dateOfCure } = formGroup.get('dateOfCure');
    const { value: dateOfDiagnosis } = formGroup.get('date');
    return (dateOfDiagnosis < dateOfCure) || !dateOfCure || !dateOfDiagnosis ? null : { cureDate2Invalid: true };
  }

  onSearch() {
    this.isEditEnabled = false;
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
  removeDisease() {
    this.disease = null;
    this.searchDisForm.reset();
    this.isToAdd = false;
  }
  onDeleteDisease(disease: any) {
    if (confirm('Are you sure you want to delete ' + disease.name + ' disease?')) {
      this.diseaseHistoryService.deleteDisease(disease.idPatientDisease).subscribe((res) => {
        console.log(res);
        this.onGetDiseases();
      });

    }
  }
  private afterAssign() {
    alert("Disease was successfully assigned");
    this.assignDiseaseForm.reset();
    this.searchDisForm.reset();
    this.isToAdd = false;
    this.onGetDiseases();
  }
  private afterAssignError(err) {
    this.error = err.error;
    this.searchDisForm.reset();
    this.isToAdd = false;
  }
  toggleEdit(i: number) {
    this.clicked = i;
    this.isEditEnabled = !this.isEditEnabled;
  }
  onEditDisease(i: number) {

    this.diseaseHistoryService.editDisease(this.diseases[i].idPatientDisease, this.editDiseaseForm.value.date, this.editDiseaseForm.value.dateOfCure)
      .subscribe((res) => {
        console.log(res);
        this.onGetDiseases();
      })

  }
}
