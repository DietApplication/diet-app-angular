import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../../patient.model';
import { PatientsService } from '../../patients.service';
import { Supplement } from '../../supplements/supplement.model';
import { SupplementsService } from '../../supplements/supplements.service';
import { DietService } from '../diet.service';
import { SupplementDiet } from './supplement-diet.model';

@Component({
  selector: 'app-diet-create',
  templateUrl: './diet-create.component.html',
  styleUrls: ['./diet-create.component.css']
})
export class DietCreateComponent implements OnInit {
  currentPage: number = 1;
  error: string;
  clicked: number;
  idPatient: number;
  pages: number[] = [];
  data;
  dataSup;
  supplements: Supplement[]=[];
  supplementDiet: SupplementDiet[]=[];
  supplement: Supplement[];
  supInstructions: string ="";
  searchUsersForm:FormGroup;
  createDietForm:FormGroup;
  searchSupForm: FormGroup;
  @Input() patients: Patient[];
  constructor(private patientsService: PatientsService, private dietService: DietService, private supplService: SupplementsService) { }

  ngOnInit(): void {
  this.initSearchForm();
  this.initCreateDietForm();
  this.initSearchSupForm();
  this.onGetPatients(this.currentPage);
  }
setIdUser(i: number) {
    this.clicked = i;
    this.idPatient = this.patients[i].idPatient;
    console.log("patientId ", this.idPatient);
    console.log("patient ", this.patients[i]);
  
  }
  
  onGetPatients(page?: number) {
    this.currentPage = page;
    this.patientsService.getPatients(page).subscribe((response) => {
      this.data = response;
      console.log(this.data);
      this.patients = this.data.patients;
      console.log(this.patients);
      this.pages.length = Math.ceil(this.data.totalRows / this.data.pageSize);
    })
  }
   private initSearchForm() {
    this.searchUsersForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }
   onSearch() {
    let name: string = this.searchUsersForm.value.name;
    let result = name.split(" ");
    let lastName;
    let firstName;
    if (result.length == 1) {
      firstName = null;
      lastName = name;
    } else {
      firstName = result[0];
      lastName = result[1];
    }
    this.patientsService.searchPatients(firstName, lastName).subscribe((res) => {
      this.data = res;
      this.patients = this.data;
      console.log(this.patients);
    },
      (error) => {
        this.error = error.error;
      });
  }
    onHandleError() {
    this.error = null;
  }
    onSearchSup() {
    let name: string = this.searchSupForm.value.supName;
    this.supplService.searchSupplements(name).subscribe((res) => {
      this.dataSup = res;
      this.supplement = this.dataSup;
      console.log(this.supplement);
      if(this.supplements.filter((e=>e.idSupplement===this.supplement[0].idSupplement)).length===0){
      this.supplements.push(this.supplement[0]);
      this.supplementDiet.push({idSupplement: this.supplement[0].idSupplement, dietSupplDescription: this.supInstructions});
      }
      else{
        this.error="You have already added such supplement!"
        console.log(this.error);
      }
        this.searchSupForm.reset();
        this.supInstructions = null;
    },
      (error) => {
        this.error = error.error;
      });
  }
    private initSearchSupForm() {
    this.searchSupForm = new FormGroup({
      supName: new FormControl(null)
    })
  }
     private initCreateDietForm() {
    this.createDietForm = new FormGroup({
      dietName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
      startDate: new FormControl(null, [Validators.required]),
      finishDate: new FormControl(null, [Validators.required]),
      numberOfMeals: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(10)]),
      proteins: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(500)]),
      desc: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(15000)]),
    })
  }
   onDelete(supplement: Supplement) {
    this.supplements.splice(this.supplements.indexOf(supplement), 1);
    this.supplementDiet.splice(this.supplements.indexOf(supplement), 1);
    this.supInstructions = null;
    console.log("new sups " + this.supplements);
  }
  onCreateDiet(){
    this.dietService.createDiet(this.idPatient, 
    this.createDietForm.value.dietName,
    this.createDietForm.value.desc, 
    this.createDietForm.value.startDate,
    this.createDietForm.value.finishDate,
    this.createDietForm.value.numberOfMeals,
    this.createDietForm.value.proteins,
    this.supplementDiet
    ).subscribe((res)=>{console.log(res)})
  }
}
