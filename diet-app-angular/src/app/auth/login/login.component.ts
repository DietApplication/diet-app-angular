import { Component, OnInit } from '@angular/core';
import { LoginService, LoginModel } from './login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router,
    private loginService: LoginService, private tokenService: TokenService) { }
  error: string = null;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required,
        Validators.maxLength(255),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255),
      ]),
    });
  }
  onHandleError() {
    this.error = null;
  }
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    let loginModel: LoginModel = {
      email: email,
      password: password,
    };

    this.loginService.login(loginModel).subscribe(
      (response) => {

        this.tokenService.storeToken(response);
        this.tokenService.saveRefreshToken(response);
        if (this.tokenService.getRole() === 'DOCTOR') {
          console.log("doctor");
          this.router.navigate(['/doctor/pendingList'])
        }
        if (this.tokenService.getRole() === 'PATIENT') {
          console.log("patient");
          this.router.navigate(['/patient/notes'])
        }
        if (this.tokenService.getRole() === 'ADMIN') {
          console.log("admin");
          this.router.navigate(['/admin/create-employee'])
        }
      },
      (error) => {
        this.error = error.error;
        console.log(error)
        this.loginForm.get('password').reset();
      }
    );
  }

}

