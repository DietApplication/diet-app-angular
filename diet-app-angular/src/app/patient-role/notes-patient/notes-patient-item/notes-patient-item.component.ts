import { Component, Input, OnInit } from '@angular/core';
import { NoteContent } from 'src/app/doctor/notes/note-content.model';

@Component({
  selector: 'app-notes-patient-item',
  templateUrl: './notes-patient-item.component.html',
  styleUrls: ['./notes-patient-item.component.css']
})
export class NotesPatientItemComponent implements OnInit {

  @Input() index: number;
  @Input() note: NoteContent;

  idNote: number;
  noteCreated: string;
  noteText: string;
  createdBy: string;
  constructor() { }

  ngOnInit(): void {
    this.idNote = this.note.idNote;
    this.noteCreated = this.note.noteCreated.toString().split("T")[0];
    this.noteText = this.note.noteText;
    this.createdBy = this.note.createdBy;
  }
}
