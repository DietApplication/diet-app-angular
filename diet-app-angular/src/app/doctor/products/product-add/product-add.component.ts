import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { max } from 'rxjs/operators';
import { Parameter, ProductsService } from '../products.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  addProductForm: FormGroup;
  selectParamForm: FormGroup;
  filled: boolean = true;
  parameters: Parameter[];
  openParamsCount: number[] = [];
  addParameterForm: FormGroup;
  addParameterError: string;
  constructor(private productService: ProductsService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initProductForm();
    this.initParamForm();
    this.initSelectParamForm();
    this.onGetParameters();
    this.openParamsCount.length = 1;
  }
  onAddProduct() { }
  onAddParameter() {
    this.productService.addParameter(this.addParameterForm.value.parameterName, this.addParameterForm.value.measureUnit).subscribe((res) => {
      console.log(res);
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
      weight: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(3000)]),
      homeMeasure: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(150)]),
      homeMeasureValue: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(3000)])
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
    })
  }
  private onGetParameters() {
    this.productService.getParameters().subscribe((res) => {
      this.parameters = res;
      console.log(this.parameters);
    })
  }
  onAdd() {
    this.openParamsCount.length = this.openParamsCount.length + 1;
  }
}
