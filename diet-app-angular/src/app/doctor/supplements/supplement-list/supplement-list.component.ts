import { Component, Input, OnInit } from '@angular/core';
import { Supplement } from '../supplement.model';
import { SupplementsService } from '../supplements.service';

@Component({
  selector: 'app-supplement-list',
  templateUrl: './supplement-list.component.html',
  styleUrls: ['./supplement-list.component.css']
})
export class SupplementListComponent implements OnInit {
  @Input() supplements: Supplement[];
  data;
  currentPage: number = 1;
  pages: number[] = [];
  constructor(private supplService: SupplementsService) { }

  ngOnInit(): void {
    this.onGetSupplements(this.currentPage);
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
}
