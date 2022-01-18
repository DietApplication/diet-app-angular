import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../products/product.model';

@Component({
  selector: 'app-meal-product-details',
  templateUrl: './meal-product-details.component.html',
  styleUrls: ['./meal-product-details.component.css']
})
export class MealProductDetailsComponent implements OnInit {
  idProduct: number;
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
  @Input() product: Product;
  @Output() close = new EventEmitter<void>();
  @Input() id: number;
  constructor() { }

  ngOnInit(): void {
    console.log(this.idProduct);
    this.idProduct = this.product.idProduct;
    this.name = this.product.name;
    this.unit = this.product.unit;
    this.size = this.product.size;
    this.homeMeasure = this.product.homeMeasure;
    this.homeMeasureSize = this.product.homeMeasureSize;
    this.parameters = this.product.parameters;
  }
  onClose() {
    this.close.emit();
  }
}
