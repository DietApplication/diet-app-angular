import { Component, Input, OnInit } from '@angular/core';
import { Supplement } from '../../supplement.model';

@Component({
  selector: '[app-supplement-item]',
  templateUrl: './supplement-item.component.html',
  styleUrls: ['./supplement-item.component.css']
})
export class SupplementItemComponent implements OnInit {
  description: string;
  name: string;
  @Input() supplement: Supplement;
  constructor() { }

  ngOnInit(): void {
    this.name = this.supplement.supplementName;
    this.description = this.supplement.description;
  }

}
