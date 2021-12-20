import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DietitianReport } from './dietitian-report.model';
import { PatinetChange } from './patient-change.model';
import { PendingUser } from './pending-user.model';

@Injectable({
  providedIn: 'root'
})
export class PendingListService {
  pendingUsers: PendingUser[];
  constructor(private http: HttpClient) {
  }

  getPendiingUsers() {
    return this.http.get<PendingUser[]>('https://dietappeu.azurewebsites.net/api/doctor/pending/patients');
  }
  getDietitianReport(userId: number) {
    return this.http.get<DietitianReport>('https://dietappeu.azurewebsites.net/api/doctor/pending/patient?idpatient=' + userId);
  }
  deletePatient(userId: number) {
    return this.http.delete<PendingUser>('https://dietappeu.azurewebsites.net/api/doctor/pending?idPatient=' + userId);
  }
  submitPatient(idPatient: number, cpm: number, pal: number, correctedValue: string) {
    return this.http.patch<PatinetChange>('https://dietappeu.azurewebsites.net/api/doctor/pending/patient', {
      idPatient: idPatient,
      cpm: cpm,
      pal: pal,
      correctedValue: correctedValue
    })
  }
}
