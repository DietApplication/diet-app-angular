export interface Parameter {
  idParameter: number;
  name: string;
  measureUnit: string;
}
export interface ParameterAdd {
  idParameter: number;
  amount: number;
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductAdd } from './product-add.model';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  addProduct(name: string, unit: string, size: number, homeMeasure: string, homeMeasureSize: string, parameters: ParameterAdd[]) {
    return this.http.post<ProductAdd>('https://dietappeu.azurewebsites.net/api/knowledgebase/product', {
      name: name,
      unit: unit,
      size: size,
      homeMeasure: homeMeasure,
      homeMeasureSize: homeMeasureSize,
      parameters: parameters
    })
  }
  addParameter(name: string, measureUnit: string) {
    return this.http.post('https://dietappeu.azurewebsites.net/api/knowledgebase/parameter', {
      name: name,
      measureUnit: measureUnit
    })
  }
  getParameters() {
    return this.http.get<Parameter[]>('https://dietappeu.azurewebsites.net/api/knowledgebase/parameters');
  }

  getProducts(page: number) {
    return this.http.get<Product[]>('https://dietappeu.azurewebsites.net/api/knowledgebase/products?page=' + page);
  }
  searchProduct(param: string) {
    return this.http.get<Product[]>('https://dietappeu.azurewebsites.net/api/knowledgebase/product/search/' + param);
  }
  editProduct(productId: number, name: string, unit: string, size: number, homeMeasure: string, homeMeasureSize: string, parameters: ParameterAdd[]) {
    return this.http.put<ProductAdd>('https://dietappeu.azurewebsites.net/api/knowledgebase/product', {
      productId: productId,
      name: name,
      unit: unit,
      size: size,
      homeMeasure: homeMeasure,
      homeMeasureSize: homeMeasureSize,
      parameters: parameters
    })
  }
  getParametersByProduct(idProduct: number) {
    return this.http.get('https://dietappeu.azurewebsites.net/api/knowledgebase/product/parameters/' + idProduct);
  }
}
