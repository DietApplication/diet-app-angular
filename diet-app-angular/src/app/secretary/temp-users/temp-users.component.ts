import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TempUserService } from './temp-user.service';

@Component({
  selector: 'app-temp-users',
  templateUrl: './temp-users.component.html',
  styleUrls: ['./temp-users.component.css']
})
export class TempUsersComponent implements OnInit {
  error: string;
  assignSurveyForm: FormGroup;
  constructor(private tempUserService: TempUserService) { }

  ngOnInit(): void {
    this.initAssignSurveyForm();
  }
  initAssignSurveyForm() {
    this.assignSurveyForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      confEmail: new FormControl(null, [Validators.required, Validators.email]),
    }, { validators: [this.confirmEmails.bind(this)] });
  }
  confirmEmails(formGroup: FormGroup) {
    const { value: email } = formGroup.get('email');
    const { value: confEmail } = formGroup.get('confEmail');
    return email === confEmail ? null : { emailsNotMatch: true };
  }
  onAssignSurvey() {
    let fullName: string = this.assignSurveyForm.value.firstName + " " + this.assignSurveyForm.value.lastName;
    this.tempUserService.createTempUser(fullName, this.assignSurveyForm.value.email).subscribe((res) => {

      alert("Survey for email: " + this.assignSurveyForm.value.email + " successfully assigned!");
      this.assignSurveyForm.reset();
    }, (err) => {

      this.error = err.error;
    })
  }
  onHandleError() {
    this.error = null;
  }
}
