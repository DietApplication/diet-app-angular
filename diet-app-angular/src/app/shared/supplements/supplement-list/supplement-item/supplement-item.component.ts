import { Component, Input, OnInit } from '@angular/core';
import { Supplement } from '../../supplement.model';
import { SupplementsService } from '../../supplements.service';

@Component({
  selector: '[app-supplement-item]',
  templateUrl: './supplement-item.component.html',
  styleUrls: ['./supplement-item.component.css']
})
export class SupplementItemComponent implements OnInit {
  description: string;
  name: string;
  idSupplement: number;
  @Input() supplement: Supplement;
  constructor(private supplementService: SupplementsService) { }

  ngOnInit(): void {
    this.idSupplement = this.supplement.idSupplement;
    this.name = this.supplement.supplementName;
    this.description = this.supplement.description;
  }
  onEdit() {
    this.supplementService.editSupplement(this.idSupplement, this.name, this.description)
      .subscribe((res) => {
        console.log("on update ", res);
      });
    setTimeout(() => {
      window.location.reload();
    }, 1000)
  }
}
