import { Component, Input, OnInit } from '@angular/core';
import { AdminService, Employee } from '../../admin.service';

@Component({
  selector: '[app-employee]',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input() index: number;
  @Input() user: Employee;

  firstName: string;
  lastName: string;
  idUser: number;
  dob: string;
  email: string;
  phone: string;
  pesel: string;
  office: string;
  role: string;
  isActive: boolean;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.idUser = this.user.idUser;
    this.dob = this.user.dateOfBirth;
    this.email = this.user.email;
    this.phone = this.user.phoneNumber;
    this.pesel = this.user.pesel;
    this.office = this.user.office;
    this.isActive = this.user.isActive;
    this.role = this.user.role;
  }
  onDeactivate() {
    if (confirm('Are you sure you want to deactivate this user?')) {
      this.adminService.deactivateUser(this.idUser).subscribe((res) => {

        window.location.reload();
      })
    }
  }
  onActivate() {
    if (confirm('Are you sure you want to reactivate this user?')) {
      this.adminService.activateUser(this.idUser).subscribe((res) => {

        window.location.reload();
      })
    }
  }
}
