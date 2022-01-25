import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService, Employee } from '../admin.service';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit {
  error: string;
  currentPage: number = 1;
  data;
  pages: number[] = [];
  searchUsersForm: FormGroup;
  allUsers: any[] = [];
  @Input() users: Employee[];
  constructor(private adminServuce: AdminService) { }

  ngOnInit(): void {
    this.onGetUsers(this.currentPage);
    this.initSearchForm();
    this.onGetAllUsers();
  }
  onHandleError() {
    this.error = null;
  }
  onGetUsers(page?: number) {
    this.currentPage = page;
    this.adminServuce.getEmployees(page).subscribe((response) => {
      this.data = response;
      console.log(this.data);
      this.users = this.data.employees;
      console.log(this.users);
      this.pages.length = Math.ceil(this.data.totalRows / this.data.pageSize);
    })
  }
  onSearch() {
    let name: string = this.searchUsersForm.value.name;
    if (name === ' ') {
      this.error = 'Invalid name';
    }
    if (name === null) {
      this.onGetUsers(this.currentPage);
    }
    else {
      let result = name.split(" ");
      let lastName;
      let firstName;
      if (result.length == 1) {
        firstName = null;
        lastName = name;
      } else {
        firstName = result[0];
        lastName = result[1];
      }
      this.adminServuce.searchUsers(firstName, lastName).subscribe((res) => {
        this.data = res;
        this.users = this.data;
        console.log(this.users);
        this.searchUsersForm.reset();

      },
        (error) => {
          this.error = error.error;
          this.searchUsersForm.reset();
        });

    }
  }
  private initSearchForm() {
    this.searchUsersForm = new FormGroup({
      name: new FormControl(null)
    })
  }
  onGetAllUsers() {
    this.adminServuce.getAllUsers().subscribe((res) => {
      this.allUsers = res;
      console.log(this.allUsers);
    })
  }
}
