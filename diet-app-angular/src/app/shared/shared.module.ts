import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiseaseAddComponent } from './diseases/disease-add/disease-add.component';
import { DiseaseListComponent } from './diseases/disease-list/disease-list.component';
import { DiseaseItemComponent } from './diseases/disease-list/disease-item/disease-item.component';
import { RecommendationsComponent } from './diseases/disease-list/recommendations/recommendations.component';
import { DiseasesComponent } from './diseases/diseases.component';
import { DiseasesService } from './diseases/diseases.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutosizeModule } from '@techiediaries/ngx-textarea-autosize';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { SupplementItemComponent } from './supplements/supplement-list/supplement-item/supplement-item.component';
import { SupplementsComponent } from './supplements/supplements.component';
import { SupplementListComponent } from './supplements/supplement-list/supplement-list.component';
import { SupplementAddComponent } from './supplements/supplement-add/supplement-add.component';
import { SupplementsService } from './supplements/supplements.service';
import { MealAddComponent } from './meals/meal-add/meal-add.component';
import { RoundNumberPipe, MealDetailsComponent } from './meals/meal-details/meal-details.component';
import { MealItemComponent } from './meals/meal-item/meal-item.component';
import { MealProductDetailsComponent } from './meals/meal-product-details/meal-product-details.component';
import { MealsComponent } from './meals/meals.component';
import { MealsService } from './meals/meals.service';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './products/products.service';
import { DropdownDirective } from './dropdown.directive';


@NgModule({
  declarations: [DiseaseAddComponent, DiseaseListComponent, DiseasesComponent, DiseaseItemComponent, RecommendationsComponent, AlertComponent,
    SupplementItemComponent, SupplementsComponent,
    SupplementAddComponent, SupplementListComponent, RoundNumberPipe, MealsComponent, MealAddComponent, MealProductDetailsComponent, MealItemComponent, MealDetailsComponent, ProductsComponent,
    ProductAddComponent, ProductItemComponent, ProductDetailsComponent, DropdownDirective],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AutosizeModule
  ],
  exports: [DiseaseAddComponent, DiseaseListComponent, DiseasesComponent, DiseaseItemComponent, RecommendationsComponent, CommonModule, AlertComponent,
    SupplementItemComponent, SupplementsComponent,
    SupplementAddComponent, SupplementListComponent, RoundNumberPipe, MealsComponent, MealAddComponent, MealProductDetailsComponent, MealItemComponent, MealDetailsComponent, ProductsComponent,
    ProductAddComponent, ProductItemComponent, ProductDetailsComponent, DropdownDirective],
  providers: [DiseasesService, SupplementsService, MealsService, ProductsService],
  entryComponents: [AlertComponent]
})
export class SharedModule { }
