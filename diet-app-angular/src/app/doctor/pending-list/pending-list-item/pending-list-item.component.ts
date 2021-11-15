import { Component, Input, OnInit } from '@angular/core';
import { PendingUser } from '../pending-user.model';

@Component({
  selector: 'app-pending-list-item',
  templateUrl: './pending-list-item.component.html',
  styleUrls: ['./pending-list-item.component.css']
})
export class PendingListItemComponent implements OnInit {

  @Input() index: number;
  @Input() pendingUser: PendingUser;
  firstName: string;
  lastName: string;
  userId: number;
  constructor() { }

  ngOnInit(): void {
    console.log(this.userId);
    this.firstName = this.pendingUser.firstName;
    this.lastName = this.pendingUser.lastName;
    this.userId = this.pendingUser.userId;
  }
}
