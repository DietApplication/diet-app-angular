import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../patient.model';
import { PatientsService } from '../../patients.service';
import { Supplement } from '../../../shared/supplements/supplement.model';
import { SupplementsService } from '../../../shared/supplements/supplements.service';
import { DietService } from '../diet.service';
import { SupplementDiet } from './supplement-diet.model';
import { TokenService } from 'src/app/core/services/token.service';
import { InformationService, PreDietInfo } from 'src/app/shared/information.service';

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
  supplements: Supplement[] = [];
  supplementDiet: SupplementDiet[] = [];
  supplement: Supplement[];
  searchUsersForm: FormGroup;
  createDietForm: FormGroup;
  searchSupForm: FormGroup;
  supInstructions: string[] = [];
  instrForm: FormGroup;
  isToAdd: boolean = false;
  isAllowed: boolean = true;
  allPatients: any[] = [];
  info: PreDietInfo;
  @Input() patients: Patient[];
  allSupplements: any[] = [];
  constructor(private infoService: InformationService, private patientsService: PatientsService, private dietService: DietService, private supplService: SupplementsService, private router: Router, private tokenService: TokenService) { }


  ngOnInit(): void {
    this.initSearchForm();
    this.initCreateDietForm();
    this.initSearchSupForm();
    this.initInstrForm();
    this.onGetPatients(this.currentPage);
    this.onGetAllPatients();
    this.onGetAllSupplements();

  }
  setIdUser(i: number) {
    this.clicked = i;
    this.idPatient = this.patients[i].idPatient;
    this.onGetPatientDietIformation(this.idPatient);
  }

  onGetPatients(page?: number) {
    this.currentPage = page;
    this.patientsService.getPatients(page).subscribe((response) => {
      this.data = response;
      this.patients = this.data.patients;
      this.pages.length = Math.ceil(this.data.totalRows / this.data.pageSize);
    })
  }
  private initSearchForm() {
    this.searchUsersForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }
  private initInstrForm() {
    this.instrForm = new FormGroup({
      instr: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(150)])
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
      if (this.supplements.filter((e => e.idSupplement === this.supplement[0].idSupplement)).length === 0) {
        this.supplements.push(this.supplement[0]);
        this.isToAdd = true;
        this.isAllowed = false;
      }

      else {
        this.error = "You have already added such supplement!"

      }
      this.searchSupForm.reset();

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
      desc: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(15000)]),
    },
      { validators: [this.confirmStartDate.bind(this), this.confirmDates.bind(this)] },

    )
  }

  confirmStartDate(formGroup: FormGroup) {
    const { value: date } = formGroup.get('startDate');
    const now = new Date();
    const actual = new Date(date);
    actual.setHours(now.getHours());
    actual.setMinutes(now.getMinutes());
    actual.setSeconds(now.getSeconds() + 1);
    return actual >= now ? null : { startDateInvalid: true };
  }
  private confirmDates(formGroup: FormGroup) {
    const { value: f } = formGroup.get('startDate');
    const { value: t } = formGroup.get('finishDate');
    return f < t ? null : { dateRangeInvalid: true }
  }

  onDelete(index: number) {
    this.supplements.splice(index, 1);
    this.supplementDiet.splice(index, 1);
    this.supInstructions.splice(index, 1);
  }
  onCreateDiet() {

    this.dietService.createDiet(this.idPatient,
      parseInt(this.tokenService.getUserId()),
      this.createDietForm.value.dietName,
      this.createDietForm.value.desc,
      this.createDietForm.value.startDate,
      this.createDietForm.value.finishDate,
      this.createDietForm.value.numberOfMeals,
      this.createDietForm.value.proteins,
      this.supplementDiet
    ).subscribe((res) => {

      alert("Diet was successfully created");
      this.router.navigate(['doctor/diet/' + this.idPatient + '/' + res.idDiet + '/assign-meals'])
    },
      (error) => {
        this.error = error;
      });

  }
  get userSelected() {
    return !!this.idPatient;
  }
  addSupplement(supplement: Supplement) {
    this.supplementDiet.push({ idSupplement: supplement.idSupplement, dietSupplDescription: this.instrForm.value.instr });
    this.supInstructions.push(this.instrForm.value.instr);
    this.instrForm.reset();

    this.isToAdd = false;
    this.isAllowed = true;
  }
  onGetAllPatients() {
    this.patientsService.getAllPatients().subscribe((res) => {
      this.allPatients = res;

    })
  }
  onGetPatientDietIformation(idPatient: number) {
    this.infoService.getPreDietCreationInfo(idPatient).subscribe((res) => {
      this.info = res;

    }, (err) => {
      this.error = err.error;
    })
  }
  onGetAllSupplements() {
    this.supplService.getAllSupplements().subscribe((res) => {
      this.allSupplements = res;

    })
  }
}
