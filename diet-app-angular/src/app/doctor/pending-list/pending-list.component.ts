import { Component, Input, OnInit } from '@angular/core';
import { PendingListService } from './pending-list.service';
import { PendingUser } from './pending-user.model';

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.css']
})
export class PendingListComponent implements OnInit {
  @Input() pendingUsers: PendingUser[];
  index: number;
  constructor(private pendingService: PendingListService) { }

  ngOnInit(): void {
    this.onGetUsers();
  }
  onGetUsers() {
    this.pendingService.getPendiingUsers().subscribe((users) => {
      console.log(users);
      this.pendingUsers = users;
    })
  }
}
