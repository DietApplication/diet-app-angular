export interface Employee {
  idUser: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  pesel: string;
  office: string;
  role: string;
  isActive: boolean;
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  createEmployee(firstName: string,
    lastName: string,
    dateOfBirth: string,
    email: string,
    phoneNumber: string,
    pesel: string,
    password: string,
    office: string,
    role: string) {
    return this.http.post('https://dietappeu.azurewebsites.net/api/admin/users', {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      email: email,
      phoneNumber: phoneNumber,
      pesel: pesel,
      password: password,
      office: office,
      role: role
    })
  }
  getEmployees(page: number) {
    return this.http.get<Employee[]>('https://dietappeu.azurewebsites.net/api/admin/users?Page=' + page);
  }
}
