import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PendingUser } from './pending-user.model';

@Injectable({
  providedIn: 'root'
})
export class PendingListService {
  pendingUsers: PendingUser[];
  constructor(private http: HttpClient) {
  }

  getPendiingUsers() {
    return this.http.get<PendingUser[]>('https://dietappeu.azurewebsites.net/api/doctor/pending/users');
  }
}
