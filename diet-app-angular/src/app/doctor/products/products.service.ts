export interface Parameter {
  idParameter: number;
  name: string;
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductAdd } from './product-add.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  addProduct(name: string, unit: string, size: number, homeMeasure: string, homeMeasureSize: string, parameters: {
    idParameter: number,
    amount: number
  }[]
  ) {
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

}
