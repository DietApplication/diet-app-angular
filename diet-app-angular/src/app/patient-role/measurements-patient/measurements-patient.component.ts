import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { MeasurementService } from 'src/app/doctor/patients/measurements/measurement.service';
import { Measurements } from 'src/app/doctor/patients/measurements/measurements.model';

@Component({
  selector: 'app-measurements-patient',
  templateUrl: './measurements-patient.component.html',
  styleUrls: ['./measurements-patient.component.css']
})
export class MeasurementsPatientComponent implements OnInit {
  idPatient: number;
  dates = [];
  error: string;
  isReset: boolean = false;
  gender: string;
  basicMetabolism: number;
  bodyIndexMass: string;
  waistHipRatio: number;
  idealWeight: number;
  age: number;
  currentDate: string;
  bicepscircumference: number;
  calfcircumference: number;
  chestcircumference: number;
  height: number;
  hipcircumference: number;
  thighcircumference: number;
  waistcircumference: number;
  waistlowercircumference: number;
  weight: number;
  whoMeasured: string;
  private routeSub: Subscription;
  filterMeasurementForm: FormGroup;
  addMeasurementForm: FormGroup;
  constructor(private measurementService: MeasurementService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.idPatient = parseInt(this.tokenService.getUserId());
    this.onGetDates();
    this.initFilterForm();
    this.onGetNewestMeasurement();
    this.initAddForm();
  }

  onGetDates() {
    this.measurementService.getDates(this.idPatient).subscribe(
      (res) => {
        console.log(res);
        res.forEach((key) => {
          key.date = key.date.split("T")[0];
        });
        this.dates = [...new Map(res.map(item =>
          [item['date'], item])).values()];
        console.log(this.dates);
      }
    )

  }
  onGetNewestMeasurement() {
    console.log("on get newest measurements method");
    this.measurementService.getNewestMeasurements(this.idPatient).subscribe(
      (res) => {
        console.log("on get newest measurements " + res);
        this.initMeasurements(res);
        this.setAddFormDefaultValues(res);
      }
    );
  }
  onGetMeasurementByRequest() {
    console.log("on get measurements by request method");
    let reqDate: string = this.filterMeasurementForm.value.date;
    let reqRole: string = this.filterMeasurementForm.value.role;
    this.measurementService.getMeasurementByDateAndRole(this.idPatient, reqDate.toUpperCase(), reqRole.toUpperCase()).subscribe(
      (res) => {
        this.initMeasurements(res);
        this.setAddFormDefaultValues(res);
        console.log("on get measurements by request ", res);
      },
      (error) => {
        this.error = 'Please, choose different role for this date';
      }
    )
  }
  private initFilterForm() {
    this.filterMeasurementForm = new FormGroup({
      date: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
    }, { validators: this.checkDates.bind(this) })
  }
  private initAddForm() {
    console.log(this.weight);
    this.addMeasurementForm = new FormGroup({
      bicepscircumference: new FormControl(this.bicepscircumference, [Validators.required, Validators.min(1), Validators.max(100)]),
      calfcircumference: new FormControl(this.calfcircumference, [Validators.required, Validators.min(1), Validators.max(300)]),
      chestcircumference: new FormControl(this.chestcircumference, [Validators.required, Validators.min(1), Validators.max(300)]),
      height: new FormControl(this.height, [Validators.required, Validators.min(1), Validators.max(300)]),
      hipcircumference: new FormControl(this.hipcircumference, [Validators.required, Validators.min(1), Validators.max(300)]),
      thighcircumference: new FormControl(this.thighcircumference, [Validators.required, Validators.min(1), Validators.max(300)]),
      waistcircumference: new FormControl(this.waistcircumference, [Validators.required, Validators.min(1), Validators.max(300)]),
      waistlowercircumference: new FormControl(this.waistlowercircumference, [Validators.required, Validators.min(1), Validators.max(300)]),
      weight: new FormControl(this.weight, [Validators.required, Validators.min(1), Validators.max(1000)]),
    })
  }

  private setAddFormDefaultValues(response: Measurements) {
    this.addMeasurementForm.get('bicepscircumference').setValue(response[0].bicepscircumference);
    this.addMeasurementForm.get('calfcircumference').setValue(response[0].calfcircumference);
    this.addMeasurementForm.get('chestcircumference').setValue(response[0].chestcircumference);
    this.addMeasurementForm.get('height').setValue(response[0].height);
    this.addMeasurementForm.get('hipcircumference').setValue(response[0].hipcircumference);
    this.addMeasurementForm.get('thighcircumference').setValue(response[0].thighcircumference);
    this.addMeasurementForm.get('waistcircumference').setValue(response[0].waistcircumference);
    this.addMeasurementForm.get('waistlowercircumference').setValue(response[0].waistlowercircumference);
    this.addMeasurementForm.get('weight').setValue(response[0].weight);
  }
  private initMeasurements(response: Measurements) {
    this.bicepscircumference = response[0].bicepscircumference;
    this.chestcircumference = response[0].chestcircumference;
    this.calfcircumference = response[0].calfcircumference;
    this.weight = response[0].weight;
    this.height = response[0].height;
    this.hipcircumference = response[0].hipcircumference;
    this.waistcircumference = response[0].waistcircumference;
    this.waistlowercircumference = response[0].waistlowercircumference;
    this.thighcircumference = response[0].thighcircumference;
    let resDate: string = response[0].date;
    this.currentDate = resDate.split("T")[0];
    this.whoMeasured = response[0].whomeasured;
    this.age = response[0].age;
    this.gender = response[0].gender;
  }
  onReset() {
    this.addMeasurementForm.reset();
    this.whoMeasured = null;
    this.currentDate = null;

  }

  onAddMeasurements() {
    this.measurementService.addMeasurements(this.idPatient,
      this.addMeasurementForm.value.height,
      this.addMeasurementForm.value.weight,
      this.addMeasurementForm.value.hipcircumference,
      this.addMeasurementForm.value.waistcircumference,
      this.addMeasurementForm.value.bicepscircumference,
      this.addMeasurementForm.value.chestcircumference,
      this.addMeasurementForm.value.thighcircumference,
      this.addMeasurementForm.value.calfcircumference,
      this.addMeasurementForm.value.waistlowercircumference).subscribe((res) => {
        console.log(res);
        alert("Measurement successfully added!");
        this.onGetNewestMeasurement();
        this.onGetDates();
      }, (error) => {
        this.error = error.error;
      })




  }
  get bmr() {
    let result;
    if (this.mc === null) {
      return null;
    }
    if (this.gender === "Male") {
      result = 66.47 + (13.75 * this.mc) + (5 * this.addMeasurementForm.value.height) - (6.75 * this.age);
    }
    else if (this.gender === "Female") {
      result = 665.09 + (9.56 * this.mc) + (1.85 * this.addMeasurementForm.value.height) - (4.67 * this.age);
    }

    this.basicMetabolism = Math.round(result * 100) / 100;
    return this.basicMetabolism;
  }
  get mc() {
    let result;
    if (this.addMeasurementForm.get('height').value === null) {
      return null;
    }
    if (this.gender == "Female") {
      result = this.addMeasurementForm.value.height - 100 - (this.addMeasurementForm.value.height - 100) * 10 / 100;
    }
    else if (this.gender == "Male") {
      result = this.addMeasurementForm.value.height - 100 - (this.addMeasurementForm.value.height - 100) * 5 / 100;
    }
    this.idealWeight = Math.round(result * 100) / 100;
    return this.idealWeight;
  }
  get whr() {
    if (this.addMeasurementForm.get('hipcircumference').value === null || this.addMeasurementForm.get('waistcircumference').value === null) {
      return null;
    }
    this.waistHipRatio = Math.round((this.addMeasurementForm.value.waistcircumference / this.addMeasurementForm.value.hipcircumference) * 100) / 100;
    return this.waistHipRatio;
  }
  get bmi() {
    if (this.addMeasurementForm.get('height').value === null || this.addMeasurementForm.get('weight').value === null) {
      return null;
    }
    this.bodyIndexMass = (this.addMeasurementForm.value.weight / ((this.addMeasurementForm.value.height * this.addMeasurementForm.value.height) / 10000)).toFixed(2);
    return this.bodyIndexMass;
  }

  set mc(mc: number) {
    this.idealWeight = mc;
  }

  set whr(whr: number) {
    this.waistHipRatio = whr;
  }

  set bmi(bmi: string) {
    this.bodyIndexMass = bmi;
  }

  set bmr(bmr: number) {
    this.basicMetabolism = bmr;
  }
  onHandleError() {
    this.error = null;
  }
  checkDates(formGroup: FormGroup) {
    const { value: date } = formGroup.get('date');
    return this.dates.filter(e => e.date === date).length > 0 ? null : { dateDoNotMatch: true };
  }
}

