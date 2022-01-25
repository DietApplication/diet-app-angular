import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Disease } from '../disease.model';
import { DiseasesService } from '../diseases.service';

@Component({
  selector: 'app-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.css']
})
export class DiseaseListComponent implements OnInit {
  @Input() diseases: Disease[];
  searchDisForm: FormGroup;
  error: string;
  data;
  pages: number[] = [];
  allDiseases: any[] = [];
  currentPage: number = 1;
  constructor(private diseasesService: DiseasesService) { }

  ngOnInit(): void {
    this.initSearchForm();
    this.onGetDiseases(this.currentPage);
    this.onGetAllDiseases();
  }
  onGetDiseases(page?: number) {
    this.currentPage = page;
    this.diseasesService.getDiseases(page).subscribe((res) => {
      this.data = res;
      this.diseases = this.data.diseases;
      console.log(res);
      this.pages.length = Math.ceil(this.data.totalRows / this.data.pageSize);
    })
  }
  onSearch() {
    let name: string = this.searchDisForm.value.name;
    this.diseasesService.searchDiseases(name).subscribe((res) => {
      this.data = res;
      this.diseases = this.data;
      console.log(this.diseases);
    },
      (error) => {
        this.error = error.error;
      });
  }
  private initSearchForm() {
    this.searchDisForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }
  onHandleError() {
    this.error = null;
  }
  onGetAllDiseases() {
    this.diseasesService.getAllDiseases().subscribe((res) => {
      this.allDiseases = res;
      console.log(this.allDiseases);
    })
  }
}
