import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Supplement } from './supplement.model';

@Injectable({
  providedIn: 'root'
})
export class SupplementsService {

  constructor(private http: HttpClient) {

  }
  addSupplement(name: string, desc: string) {
    return this.http.post('https://dietappeu.azurewebsites.net/api/knowledgebase/supplement', {
      name: name,
      description: desc
    }).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }

  getSupplements(page?: number) {
    return this.http.get<Supplement[]>('https://dietappeu.azurewebsites.net/api/knowledgebase/supplements?page=' + page);
  }
  searchSupplements(name: string) {
    return this.http.get<Supplement[]>('https://dietappeu.azurewebsites.net/api/knowledgebase/supplement/search?supplementName=' + name)
      .pipe(catchError(this.handleError));;
  }
}
