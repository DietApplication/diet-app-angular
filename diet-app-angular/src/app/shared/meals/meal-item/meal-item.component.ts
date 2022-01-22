import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from '../meal.model';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.css']
})
export class MealItemComponent implements OnInit {
  @Input() meal: Meal;
  @Input() index: number;
  isDisplayed: boolean = false;
  idMeal: number;
  nameOfMeal: string;
  description: string;
  cookingURL: string;
  products: {
    amount: number;
    calculatedSize;
    homeMeasure: string;
    homeMeasureSize: number;
    idMealRecipe: number;
    idProduct: number;
    name: string;
    unit: string;
  }[] = [];
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.idMeal = this.meal.idMeal;
    this.nameOfMeal = this.meal.nameOfMeal;
    this.description = this.meal.description;
    this.cookingURL = this.meal.cookingURL;
    this.products = this.meal.products;
  }


}
