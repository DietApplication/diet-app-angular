export interface PreDietInfo {
  firstName: string;
  lastName: string;
  age: number;
  email: string,
  pesel: string;
  phoneNumber: string;
  mainProblems: string;
  diabetes: boolean;
  hypertension: boolean;
  insulinResistance: boolean;
  hypothyroidism: boolean;
  intestinalDiseases: boolean;
  otherDiseases: string;
  favFood: string;
  notFavFood: string;
  hypersensProds: string;
  alergieProds: string;
  pal: number;
  currentDiet: string;
  selectedDiet?: string;
}
export interface BaseInfo {
  firstName: string;
  lastName: string;
  age: number;
  pesel: string;
  currentDietName: string;
  selectedDiet?: string;
}
export interface DiseasesIncludedInfo {
  firstName: string;
  lastName: string;
  age: number;
  pesel: number;
  diabetes: boolean;
  hypertension: boolean;
  insulinResistance: boolean;
  hypothyroidism: boolean;
  intestinalDiseases: boolean;
  otherDiseases: string;
  currentDiet: string;
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor(private http: HttpClient) { }


  getPreDietCreationInfo(idPatient: number, idDiet?: number) {
    if (idDiet) {
      return this.http.get<PreDietInfo>('https://dietappeu.azurewebsites.net/api/Informations/full/' + idPatient + '?idDiet=' + idDiet);
    }
    else {
      return this.http.get<PreDietInfo>('https://dietappeu.azurewebsites.net/api/Informations/full/' + idPatient);

    }
  }
  getBasenfo(idPatient: number, idDiet?: number) {
    if (idDiet) {
      return this.http.get<BaseInfo>('https://dietappeu.azurewebsites.net/api/Informations/less/' + idPatient + '?idDiet=' + idDiet);
    }
    else {
      return this.http.get<BaseInfo>('https://dietappeu.azurewebsites.net/api/Informations/less/' + idPatient);
    }
  }
  getDiseaseIncludedInfo(idPatinet: number) {
    return this.http.get<DiseasesIncludedInfo>('https://dietappeu.azurewebsites.net/api/Informations/mid/' + idPatinet)
  }
}
