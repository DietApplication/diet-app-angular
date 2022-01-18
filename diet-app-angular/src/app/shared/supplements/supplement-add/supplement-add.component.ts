import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { SupplementsComponent } from '../supplements.component';
import { SupplementsService } from '../supplements.service';

@Component({
  selector: 'app-supplement-add',
  templateUrl: './supplement-add.component.html',
  styleUrls: ['./supplement-add.component.css']
})
export class SupplementAddComponent implements OnInit {
  addSupplForm: FormGroup;
  error: string;
  constructor(private supplService: SupplementsService) { }

  ngOnInit(): void {
    this.initForm();
  }
  onSubmit() {
    this.supplService.addSupplement(this.addSupplForm.value.name, this.addSupplForm.value.description).subscribe((response) => {
      console.log(response);
      alert("Supplement " + this.addSupplForm.value.name + " successfully added");
      window.location.reload();
    },
      (error) => {
        this.error = error.error;
      });
  }
  private initForm() {
    this.addSupplForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(150)])
    })
  }

  onHandleError() {
    this.error = null;
  }
}
