import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PendingListService } from '../pending-list.service';
import { PendingUser } from '../pending-user.model';

@Component({
  selector: 'app-pending-list-item',
  templateUrl: './pending-list-item.component.html',
  styleUrls: ['./pending-list-item.component.css']
})
export class PendingListItemComponent implements OnInit {

  @Input() index: number;
  @Input() pendingUser: PendingUser;
  @Output() oldUser = new EventEmitter<PendingUser>();

  firstName: string;
  lastName: string;
  userId: number;
  constructor() { }

  ngOnInit(): void {
    this.firstName = this.pendingUser.firstName;
    this.lastName = this.pendingUser.lastName;
    this.userId = this.pendingUser.idUser;
  }


}
