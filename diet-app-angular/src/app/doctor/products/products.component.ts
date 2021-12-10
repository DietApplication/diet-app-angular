import { Component, Input, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() products: Product[];
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.onGetProducts();
  }
  onGetProducts() {
    this.productsService.getProducts().subscribe((res) => {
      this.products = res;
      console.log(this.products);
    })
  }
}
