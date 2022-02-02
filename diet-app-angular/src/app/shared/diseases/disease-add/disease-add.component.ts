import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiseasesService } from '../diseases.service';

@Component({
  selector: 'app-disease-add',
  templateUrl: './disease-add.component.html',
  styleUrls: ['./disease-add.component.css']
})
export class DiseaseAddComponent implements OnInit {
  addDiseaseForm: FormGroup;
  constructor(private diseasesService: DiseasesService) { }
  error: string;
  ngOnInit(): void {
    this.initForm();
  }
  onSubmit() {
    this.diseasesService.addDisease(this.addDiseaseForm.value.name, this.addDiseaseForm.value.description, this.addDiseaseForm.value.recommendations).subscribe((response) => {

      alert("Disease " + this.addDiseaseForm.value.name + " successfully added");
      window.location.reload();
    }, (error) => {
      this.error = error.error;
    });
  }
  private initForm() {
    this.addDiseaseForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(15000)]),
      recommendations: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(15000)])
    })
  }

  onHandleError() {
    this.error = null;
  }
}
