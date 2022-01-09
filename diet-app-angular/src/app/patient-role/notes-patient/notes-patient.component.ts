import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { NoteContent } from 'src/app/doctor/notes/note-content.model';
import { NotesService } from 'src/app/doctor/notes/notes.service';

@Component({
  selector: 'app-notes-patient',
  templateUrl: './notes-patient.component.html',
  styleUrls: ['./notes-patient.component.css']
})
export class NotesPatientComponent implements OnInit, AfterViewChecked {
  @ViewChild('notesCont', { static: true }) myScrollContainer: ElementRef;
  @Input() notes: NoteContent[];
  dataNotes;
  constructor(private notesService: NotesService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.onGetNotes();
  }
  onGetNotes() {
    this.notesService.getNotes(parseInt(this.tokenService.getUserId())).subscribe((res) => {
      console.log("note ", res);
      this.dataNotes = res;
      this.notes = this.dataNotes;
      console.log(this.notes);
      this.scrollToBottomNotes();
    })
  }
  scrollToBottomNotes(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  ngAfterViewChecked(): void {
    this.scrollToBottomNotes();
  }
}

