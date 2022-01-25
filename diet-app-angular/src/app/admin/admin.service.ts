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
import { stringify } from 'querystring';

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
  searchUsers(firstName: string, lastName: string) {
    let url;
    if (firstName !== null) {
      url = 'https://dietappeu.azurewebsites.net/api/admin/users/search?firstName=' + firstName + '&lastName=' + lastName;
    }
    else {
      url = 'https://dietappeu.azurewebsites.net/api/admin/users/search?lastName=' + lastName;
    }
    return this.http.get<Employee[]>(url);
  }
  deactivateUser(idUser: number) {
    return this.http.put('https://dietappeu.azurewebsites.net/api/admin/users/accounts/deactivate', {
      idUser: idUser
    })
  }
  activateUser(idUser: number) {
    return this.http.put('https://dietappeu.azurewebsites.net/api/admin/users/accounts/activate', {
      idUser: idUser
    })
  }
  getAllUsers() {
    return this.http.get<{ firstName: string, lastName: string }[]>('https://dietappeu.azurewebsites.net/api/autocomplete/users');
  }
}


