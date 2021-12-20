import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParameterResult } from '../product-add/product-add.component';
import { Product } from '../product.model';
import { Parameter, ParameterAdd, ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() product: Product;
  @Input() id: number;
  proteinGrams: number;
  calorieGrams: number;

  selectParamForm: FormGroup;
  filled: boolean = true;
  isToAdd: boolean = false;
  chosenLength; number;
  error: string;
  addedParams: ParameterResult[] = [];
  chosenParameters: ParameterAdd[] = [];
  addParameterForm: FormGroup;
  addParameterError: string;
  parametersWithoutDefs: Parameter[] = [];
  parameters: {
    name: string,
    measureUnit: string,
    amount: number
  }[] = [];
  existingParameters: Parameter[] = [];
  isEdit: boolean = false;
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.parameters = this.product.parameters;
    this.initSelectParamForm();
    this.onGetParameters();
  }
  onClose() {
    this.close.emit();
  }
  private initSelectParamForm() {
    this.selectParamForm = new FormGroup({
      param: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      size: new FormControl(null, [Validators.required, Validators.min(0.01), Validators.max(3000)]),
    }, { validators: [this.checkParams.bind(this), this.checkSameParam.bind(this)] });
  }
  private onGetParameters() {
    this.productService.getParameters().subscribe((res) => {
      this.existingParameters = res;
      console.log('existing params ', this.existingParameters);
      this.parametersWithoutDefs = this.existingParameters.map((x) => x);
      this.parametersWithoutDefs.splice(this.parametersWithoutDefs.map(e => e.idParameter).indexOf(this.parametersWithoutDefs[this.parametersWithoutDefs.map(e => e.name.toUpperCase()).indexOf('calories'.toUpperCase())].idParameter), 1);
      this.parametersWithoutDefs.splice(this.parametersWithoutDefs.map(e => e.idParameter).indexOf(this.parametersWithoutDefs[this.parametersWithoutDefs.map(e => e.name.toUpperCase()).indexOf('proteins'.toUpperCase())].idParameter), 1);
      console.log('no defs params ', this.parametersWithoutDefs);
      this.proteinGrams = this.parameters[this.parameters.map(e => e.name.toUpperCase()).indexOf('proteins'.toUpperCase())].amount;
      this.calorieGrams = this.parameters[this.parameters.map(e => e.name.toUpperCase()).indexOf('calories'.toUpperCase())].amount;
      this.parameters.forEach(param => {
        this.addedParams.push({ name: param.name, size: param.amount, measureUnit: param.measureUnit });
      })
      this.addedParams.splice(this.addedParams.map(e => e.name).indexOf(this.addedParams[this.addedParams.map(e => e.name.toUpperCase()).indexOf('calories'.toUpperCase())].name), 1);
      this.addedParams.splice(this.addedParams.map(e => e.name).indexOf(this.addedParams[this.addedParams.map(e => e.name.toUpperCase()).indexOf('proteins'.toUpperCase())].name), 1);
      if (this.parametersWithoutDefs.length > 0) {
        this.isToAdd = true;
      }
    })
  }
  checkParams(formGroup: FormGroup) {
    const { value: param } = formGroup.get('param');
    return this.existingParameters.filter(e => e.name === param).length > 0 ? null : { paramDoNotMatch: true };
  }
  checkSameParam(formGroup: FormGroup) {
    const { value: param } = formGroup.get('param');
    return this.addedParams.filter(e => e.name === param).length === 0 ? null : { paramAdded: true };
  }
  onDelete(param: ParameterResult) {
    this.addedParams.splice(this.addedParams.indexOf(param), 1);
    console.log("new addedparams " + this.addedParams)
    this.chosenParameters.splice(this.chosenParameters.map(e => e.idParameter).indexOf(this.existingParameters[this.parameters.map(e => e.name).indexOf(param.name)].idParameter), 1);
    console.log("new chosenparams " + this.chosenParameters)
  }
  onAdd() {
    this.isToAdd = true;
    if (this.selectParamForm.value.param !== null && this.selectParamForm.value.size !== null) {
      this.chosenLength = this.addedParams.length;
      console.log(this.chosenLength);
      this.chosenParameters.push({ idParameter: this.existingParameters[this.existingParameters.map(e => e.name).indexOf(this.selectParamForm.value.param)].idParameter, amount: this.selectParamForm.value.size });
      this.addedParams.push({ name: this.selectParamForm.value.param, size: this.selectParamForm.value.size, measureUnit: this.existingParameters[this.existingParameters.map(e => e.name).indexOf(this.selectParamForm.value.param)].measureUnit });

      console.log("addedParams ", this.addedParams);

      console.log("chosenParameters ", this.chosenParameters);
      this.selectParamForm.reset();
    }
  }
  openEdit() {
    this.isEdit = true;
  }
  onEditProduct() {
    if (this.chosenParameters.filter(e => e.idParameter === this.existingParameters.map(e => e.idParameter).indexOf(this.existingParameters[this.existingParameters.map(e => e.name.toUpperCase()).indexOf('calories'.toUpperCase())].idParameter)).length === 0 && this.calorieGrams !== null) {
      this.chosenParameters.push({ idParameter: this.existingParameters[this.existingParameters.map(e => e.name.toUpperCase()).indexOf('calories'.toUpperCase())].idParameter, amount: this.calorieGrams });
    }
    if (this.chosenParameters.filter(e => e.idParameter === this.existingParameters.map(e => e.idParameter).indexOf(this.existingParameters[this.existingParameters.map(e => e.name.toUpperCase()).indexOf('proteins'.toUpperCase())].idParameter)).length === 0 && this.proteinGrams !== null) {
      this.chosenParameters.push({ idParameter: this.existingParameters[this.existingParameters.map(e => e.name.toUpperCase()).indexOf('proteins'.toUpperCase())].idParameter, amount: this.proteinGrams });
    }

    this.addedParams.forEach((el) => {
      if (this.chosenParameters.filter(e => e.idParameter === this.parametersWithoutDefs[this.parametersWithoutDefs.map(e => e.name).indexOf(el.name)].idParameter).length === 0)
        this.chosenParameters.push({ idParameter: this.existingParameters[this.existingParameters.map(e => e.name).indexOf(el.name)].idParameter, amount: el.size })
    });

    this.productService.editProduct(
      this.product.idProduct,
      this.product.name,
      this.product.unit,
      this.product.size,
      this.product.homeMeasure,
      this.product.homeMeasureSize,
      this.chosenParameters)
      .subscribe((res) => {
        console.log(res);
        alert("Product was successfully updated!")
        window.location.reload();
      },
        (error) => {
          this.error = error.error;
          console.log(error);
          if (this.proteinGrams === null || this.calorieGrams === null) {
            this.error = "Default parameters calories and proteins CANNOT be empty!";
          }
        });
    console.log(this.chosenParameters);
  }
  onHandleError() {
    this.error = null;
  }
}
