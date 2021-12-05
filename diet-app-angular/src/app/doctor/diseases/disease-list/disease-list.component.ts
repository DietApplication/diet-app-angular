import { Component, Input, OnInit } from '@angular/core';
import { Disease } from '../disease.model';
import { DiseasesService } from '../diseases.service';

@Component({
  selector: 'app-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.css']
})
export class DiseaseListComponent implements OnInit {
  @Input() diseases: Disease[];
  data;
  pages: number[] = [];
  currentPage: number = 1;
  constructor(private diseasesService: DiseasesService) { }

  ngOnInit(): void {
    this.onGetDiseases(this.currentPage);
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
}
