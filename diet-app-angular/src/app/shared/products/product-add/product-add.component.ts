export interface ParameterResult {
  name: string;
  size: number;
  measureUnit: string;
}

import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Parameter, ParameterAdd, ProductsService } from '../products.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  addProductForm: FormGroup;
  selectParamForm: FormGroup;
  filled: boolean = true;
  isToAdd: boolean = false;
  chosenLength; number;
  error: string;
  parameters: Parameter[] = [];
  addedParams: ParameterResult[] = [];
  chosenParameters: ParameterAdd[] = [];
  addParameterForm: FormGroup;
  addParameterError: string;
  parametersWithoutDefs: Parameter[] = [];
  constructor(private productService: ProductsService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initProductForm();
    this.initParamForm();
    this.initSelectParamForm();
    this.onGetParameters();
  }

  onAddParameter() {
    this.productService.addParameter(this.addParameterForm.value.parameterName, this.addParameterForm.value.measureUnit).subscribe((res) => {

      this.onGetParameters();
      this.addParameterError = null;
    }, (err) => {
      this.addParameterError = err.error;
    });
    this.addParameterForm.reset();
  }
  private initProductForm() {
    this.addProductForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
      weightUnit: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(150)]),
      weight: new FormControl(null, [Validators.required, Validators.min(0.05), Validators.max(3000)]),
      homeMeasure: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(150)]),
      homeMeasureValue: new FormControl(null, [Validators.required, Validators.min(0.05), Validators.max(3000)]),
      proteins: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(3000)]),
      calories: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(3000)]),

    })
  }
  private initParamForm() {
    this.addParameterForm = new FormGroup({
      parameterName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      measureUnit: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    })
  } private initSelectParamForm() {
    this.selectParamForm = new FormGroup({
      param: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      size: new FormControl(null, [Validators.required, Validators.min(0.01), Validators.max(3000)]),
    }, { validators: [this.checkParams.bind(this), this.checkSameParam.bind(this)] });
  }
  private onGetParameters() {
    this.productService.getParameters().subscribe((res) => {
      this.parameters = res;

      //  this.parameters.splice(this.parameters[this.parameters.map(e => e.name.toUpperCase()).indexOf('calories'.toUpperCase())].idParameter, 1);
      // this.parameters.splice(this.parameters[this.parameters.map(e => e.name.toUpperCase()).indexOf('proteins'.toUpperCase())].idParameter, 1);
      this.parametersWithoutDefs = this.parameters.map((x) => x);;
      this.parametersWithoutDefs.splice(this.parametersWithoutDefs.map(e => e.idParameter).indexOf(this.parametersWithoutDefs[this.parametersWithoutDefs.map(e => e.name.toUpperCase()).indexOf('calories'.toUpperCase())].idParameter), 1);
      this.parametersWithoutDefs.splice(this.parametersWithoutDefs.map(e => e.idParameter).indexOf(this.parametersWithoutDefs[this.parametersWithoutDefs.map(e => e.name.toUpperCase()).indexOf('proteins'.toUpperCase())].idParameter), 1);
    })
  }
  onAdd() {
    this.isToAdd = true;
    if (this.selectParamForm.value.param !== null && this.selectParamForm.value.size !== null) {
      this.chosenLength = this.addedParams.length;

      this.chosenParameters.push({ idParameter: this.parameters[this.parameters.map(e => e.name).indexOf(this.selectParamForm.value.param)].idParameter, amount: this.selectParamForm.value.size });
      this.addedParams.push({ name: this.selectParamForm.value.param, size: this.selectParamForm.value.size, measureUnit: this.parameters[this.parameters.map(e => e.name).indexOf(this.selectParamForm.value.param)].measureUnit });

      this.selectParamForm.reset();
    }
  }
  checkParams(formGroup: FormGroup) {
    const { value: param } = formGroup.get('param');
    return this.parameters.filter(e => e.name === param).length > 0 ? null : { paramDoNotMatch: true };
  }
  checkSameParam(formGroup: FormGroup) {
    const { value: param } = formGroup.get('param');
    return this.addedParams.filter(e => e.name === param).length === 0 ? null : { paramAdded: true };
  }
  onDelete(param: ParameterResult) {
    this.addedParams.splice(this.addedParams.indexOf(param), 1);

    this.chosenParameters.splice(this.chosenParameters.map(e => e.idParameter).indexOf(this.parameters[this.parameters.map(e => e.name).indexOf(param.name)].idParameter), 1);

  }
  onAddProduct() {
    this.chosenParameters.push({ idParameter: this.parameters[this.parameters.map(e => e.name.toUpperCase()).indexOf('proteins'.toUpperCase())].idParameter, amount: this.addProductForm.value.proteins });
    this.chosenParameters.push({ idParameter: this.parameters[this.parameters.map(e => e.name.toUpperCase()).indexOf('calories'.toUpperCase())].idParameter, amount: this.addProductForm.value.calories });
    this.productService.addProduct(
      this.addProductForm.value.name,
      this.addProductForm.value.weightUnit,
      this.addProductForm.value.weight,
      this.addProductForm.value.homeMeasure,
      this.addProductForm.value.homeMeasureValue,
      this.chosenParameters)
      .subscribe((res) => {

        alert("Product was successfully added!")
        window.location.reload();
      },
        (error) => {
          this.error = error.error;
        });

  }
  onHandleError() {
    this.error = null;
  }


}


