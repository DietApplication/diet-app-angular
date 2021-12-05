import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Disease } from './disease.model';

@Injectable({
  providedIn: 'root'
})
export class DiseasesService {

  constructor(private http: HttpClient) {
  }
  addDisease(name: string, desc: string, rec: string) {
    return this.http.post('https://dietappeu.azurewebsites.net/api/knowledgebase/disease', {
      name: name,
      description: desc,
      recomendation: rec
    }).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }

  getDiseases(page?: number) {
    return this.http.get<Disease[]>('https://dietappeu.azurewebsites.net/api/knowledgebase/diseases?page=' + page);
  }
}
