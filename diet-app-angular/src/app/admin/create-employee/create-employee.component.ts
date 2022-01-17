import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  showP: boolean = false;
  showCP: boolean = false;
  createEmployeeForm: FormGroup;
  error: string;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.initCreateEmpForm();
  }
  password() {
    this.showP = !this.showP;
  }
  confPassword() {
    this.showCP = !this.showCP;
  }
  confirmPassword(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: conf_password } = formGroup.get('conf_password');
    return password === conf_password ? null : { passwordNotMatch: true };
  }
  confirmDob(formGroup: FormGroup) {
    const { value: dob } = formGroup.get('dob');
    const now = new Date();
    const actual = new Date(dob);
    return actual <= now ? null : { dobInvalid: true };
  }
  checkOffice(formGroup: FormGroup) {
    const { value: office } = formGroup.get('office');
    const { value: role } = formGroup.get('role');
    if (role === 'DOCTOR') {
      return office !== null ? null : { officeEmpty: true };
    }
    return null;
  }
  private initCreateEmpForm() {
    this.createEmployeeForm = new FormGroup({
      role: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      firstName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      conf_password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(12)]),
      pesel: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{11}$')]),
      dob: new FormControl(null, Validators.required),
      office: new FormControl(null, [Validators.minLength(1), Validators.maxLength(30)]),
    }, { validators: [this.confirmPassword.bind(this), this.confirmDob.bind(this)] })

  }
  onCreateEmp() {
    let office = null;
    if (this.createEmployeeForm.value.role === 'DOCTOR') {
      office = this.createEmployeeForm.value.office;
    }
    this.adminService.createEmployee(this.createEmployeeForm.value.firstName,
      this.createEmployeeForm.value.lastName,
      this.createEmployeeForm.value.dob,
      this.createEmployeeForm.value.email,
      this.createEmployeeForm.value.phone,
      this.createEmployeeForm.value.pesel,
      this.createEmployeeForm.value.password,
      office,
      this.createEmployeeForm.value.role).subscribe((res) => {
        console.log(res);
        alert(this.createEmployeeForm.value.role + " was successfully created!");
        this.createEmployeeForm.reset();
      }, (err) => {
        this.error = err.error;
      })
  }
  onHandleError() {
    this.error = null;
  }
}
