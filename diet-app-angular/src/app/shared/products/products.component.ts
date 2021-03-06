import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  searchProductForm: FormGroup;
  @Input() products: Product[];
  allProducts: any[] = [];
  currentPage: number = 1;
  data;
  error;
  pages: number[] = [];
  productName = new FormControl();
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.onGetProducts(this.currentPage);
    this.onGetAllProducts();
    this.initSearchForm();
  }

  onSearch() {
    let name: string = this.searchProductForm.value.name;
    this.productsService.searchProduct(name).subscribe((res) => {
      this.data = res;
      this.products = this.data;

    },
      (error) => {
        this.error = error.error;
      });
  }
  onGetProducts(page: number) {
    this.currentPage = page;
    this.productsService.getProducts(page).subscribe((response) => {
      this.data = response;

      this.products = this.data.products;

      this.pages.length = Math.ceil(this.data.totalRows / this.data.pageSize);
    })
  }
  private initSearchForm() {
    this.searchProductForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }
  onHandleError() {
    this.error = null;
  }
  onGetAllProducts() {
    this.productsService.getAllProducts().subscribe((res) => {
      this.allProducts = res;

    })
  }

}
