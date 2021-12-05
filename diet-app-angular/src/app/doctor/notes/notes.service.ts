import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NoteContent } from './note-content.model';
import { Note } from './note.model';
import { Patient } from './patient.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient, private router: Router) { }

  getPatients(page?: number) {
    return this.http.get<Patient[]>('https://dietappeu.azurewebsites.net/api/doctor/patients?page=' + page);
  }
  searchPatients(firstName: string, lastName: string) {
    if (firstName !== null) {
      return this.http.get<Patient[]>('https://dietappeu.azurewebsites.net/api/doctor/patients/search?firstName=' + firstName + '&lastName=' + lastName);
    }
    else {
      return this.http.get<Patient[]>('https://dietappeu.azurewebsites.net/api/doctor/patients/search?lastName=' + lastName);
    }
  }
  postNote(idPatient: number, idDoctor: number, note: string) {
    return this.http.post<Note>('https://dietappeu.azurewebsites.net/api/doctor/notes', {
      idPatient: idPatient,
      idDoctor: idDoctor,
      note: note
    })
  }
  getNotes(idPatient: number) {
    return this.http.get<NoteContent>('https://dietappeu.azurewebsites.net/api/doctor/notes?idPatient=' + idPatient);
  }
}
