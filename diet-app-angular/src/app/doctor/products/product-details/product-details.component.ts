import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() product: Product;
  @Input() id: number;
  constructor() { }

  ngOnInit(): void {
  }
  onClose() {
    this.close.emit();
  }
}
