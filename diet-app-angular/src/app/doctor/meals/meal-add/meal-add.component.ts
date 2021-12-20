import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../products/product.model';
import { ProductsService } from '../../products/products.service';
import { MealsService, ProductInMeal } from '../meals.service';

@Component({
  selector: 'app-meal-add',
  templateUrl: './meal-add.component.html',
  styleUrls: ['./meal-add.component.css']
})
export class MealAddComponent implements OnInit {
  error: string;
  data;
  product: Product[];
  products: Product[] = [];
  productsToAdd: ProductInMeal[] = [];
  searchProductForm: FormGroup;
  addMealForm: FormGroup;
  isDisplayed:boolean=false;
  isInvalid:boolean=false;
  productWeight: number;
  constructor(private productService: ProductsService, private mealsService: MealsService) { }

  ngOnInit(): void {
    this.initSearchForm();
    this.initAddMealForm();
  }

  onSearch() {
    let name: string = this.searchProductForm.value.name;
    this.productService.searchProduct(name).subscribe((res) => {
      this.data = res;
      this.product = this.data;
      console.log(this.product);
      if(this.products.filter((e=>e.idProduct===this.product[0].idProduct)).length===0){
      this.products.push(this.product[0]);
      }
      else{
        this.error="You have already added such product!"
        console.log(this.error);
      }
        this.searchProductForm.reset();
    },
      (error) => {
        this.error = error.error;
      });
  }
  private initSearchForm() {
    this.searchProductForm = new FormGroup({
      name: new FormControl(null)
    })
  }
  private initAddMealForm() {
    this.addMealForm = new FormGroup({
      productName: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(2)]),
      desc: new FormControl(null, [Validators.required, Validators.maxLength(15000), Validators.minLength(2)]),
      url: new FormControl(null, [Validators.required, Validators.maxLength(200), Validators.minLength(5)]),

    })
  }
  onDelete(product: Product) {
    this.products.splice(this.products.indexOf(product), 1);
    console.log("new products " + this.products);
  }
  onAddMeal() {
    if(this.products.length===0){
       this.error = 'At least one product is required!';
       return;
    }
    if(this.products.filter((e=>e.size===null)).length>0 ||this.products.filter((e=>e.size<=0)).length>0){
        this.error = 'Amount of the product cannot be empty or less/equal 0';
        return;
    }
    {
    this.products.forEach((pr) => {
        this.productsToAdd.push({ idProduct: this.products[this.products.indexOf(pr)].idProduct, amount: this.products[this.products.indexOf(pr)].size });
        console.log("products to add ", this.productsToAdd);
    });
    
    this.mealsService.addMeal(this.addMealForm.value.productName, this.addMealForm.value.desc, this.addMealForm.value.url, this.productsToAdd).subscribe((res) => {
      console.log(res);
    })
    }
  }
  onHandleError() {
    this.error = null;
  }
    onHandleDetails() {
    this.isDisplayed = false;
  }
  onOpenDetails() {
    this.isDisplayed = true;
    console.log("opened", this.product);
  }
}
