import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Supplement } from '../supplement.model';
import { SupplementsService } from '../supplements.service';

@Component({
  selector: 'app-supplement-list',
  templateUrl: './supplement-list.component.html',
  styleUrls: ['./supplement-list.component.css']
})
export class SupplementListComponent implements OnInit {
  @Input() supplements: Supplement[];
  searchSupForm: FormGroup;
  data;
  error: string;
  allSupplements: any[] = [];
  currentPage: number = 1;
  pages: number[] = [];
  constructor(private supplService: SupplementsService) { }

  ngOnInit(): void {
    this.onGetSupplements(this.currentPage);
    this.initSearchForm();
    this.onGetAllSupplements();
  }

  onGetSupplements(page?: number) {
    this.currentPage = page;
    this.supplService.getSupplements(page).subscribe((res) => {
      this.data = res;
      this.supplements = this.data.supplements;
      console.log(this.supplements);
      this.pages.length = Math.ceil(this.data.totalRows / this.data.pageSize);
    })
  }
  onSearch() {
    let name: string = this.searchSupForm.value.name;
    this.supplService.searchSupplements(name).subscribe((res) => {
      this.data = res;
      this.supplements = this.data;
      console.log(this.supplements);
    },
      (error) => {
        this.error = error.error;
      });
  }
  onHandleError() {
    this.error = null;
  }
  private initSearchForm() {
    this.searchSupForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }
  onGetAllSupplements() {
    this.supplService.getAllSupplements().subscribe((res) => {
      this.allSupplements = res;
      console.log(this.allSupplements);
    })
  }
}
