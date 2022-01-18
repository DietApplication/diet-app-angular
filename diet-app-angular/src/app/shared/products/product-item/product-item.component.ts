import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;
  isDisplayed: boolean = false;
  name: string;
  unit: string;
  size: number;
  homeMeasure: string;
  homeMeasureSize: string;
  parameters:
    {
      name: string,
      measureUnit: string,
      amount: number
    }[]
  proteins: number = 0;
  calories: number = 0;
  measureProts: string = '';
  measureCals: string = '';
  constructor() { }
  ngOnInit(): void {
    this.name = this.product.name;
    this.unit = this.product.unit;
    this.size = this.product.size;
    this.homeMeasure = this.product.homeMeasure;
    this.homeMeasureSize = this.product.homeMeasureSize;
    this.parameters = this.product.parameters;
    if (this.parameters.filter(e => e.name.toUpperCase() === 'proteins'.toUpperCase()).length > 0) {
      this.proteins = this.parameters[this.parameters.map(e => e.name.toUpperCase()).indexOf('proteins'.toUpperCase())].amount;
      this.measureProts = this.parameters[this.parameters.map(e => e.name.toUpperCase()).indexOf('proteins'.toUpperCase())].measureUnit;
    }
    if (this.parameters.filter(e => e.name.toUpperCase() === 'calories'.toUpperCase()).length > 0) {
      this.calories = this.parameters[this.parameters.map(e => e.name.toUpperCase()).indexOf('Calories'.toUpperCase())].amount;
      this.measureCals = this.parameters[this.parameters.map(e => e.name.toUpperCase()).indexOf('Calories'.toUpperCase())].measureUnit;
    }
  }
  onHandleDetails() {
    this.isDisplayed = false;
  }
  onOpenDetails() {
    this.isDisplayed = true;
    console.log(this.product);
  }

}
