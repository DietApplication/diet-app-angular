import { Component, Input, OnInit } from '@angular/core';
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
  @Input() users: Employee[];
  constructor(private adminServuce: AdminService) { }

  ngOnInit(): void {
    this.onGetUsers(this.currentPage);
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
}
