import { Component, Input, OnInit } from '@angular/core';
import { NoteContent } from '../note-content.model';

@Component({
  selector: 'app-notes-item',
  templateUrl: './notes-item.component.html',
  styleUrls: ['./notes-item.component.css']
})
export class NotesItemComponent implements OnInit {
  @Input() index: number;
  @Input() note: NoteContent;

  idNote: number;
  noteCreated: string;
  noteText; string;
  constructor() { }

  ngOnInit(): void {
    this.idNote = this.note.idNote;
    this.noteCreated = this.note.noteCreated.toString().split("T")[0];
    this.noteText = this.note.noteText;
  }

}
