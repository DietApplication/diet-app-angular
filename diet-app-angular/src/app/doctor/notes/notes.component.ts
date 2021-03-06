import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { TokenService } from 'src/app/core/services/token.service';
import { NoteContent } from './note-content.model';
import { Note } from './note.model';
import { NotesService } from './notes.service';
import { Patient } from '../patient.model';
import { PatientsService } from '../patients.service';
import { BaseInfo, InformationService } from 'src/app/shared/information.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, AfterViewChecked {
  @ViewChild('notesCont', { static: true }) myScrollContainer: ElementRef;
  error: string;
  clicked: number;
  idPatient: number;
  currentPage: number = 1;
  pages: number[] = [];
  data;
  dataNotes;
  @Input() notes: NoteContent[];
  values = '';
  @Input() patients: Patient[];
  searchUsersForm: FormGroup;
  sendNoteForm: FormGroup;
  allPatients: any[] = [];
  info: BaseInfo;
  constructor(private notesService: NotesService, private tokenService: TokenService, private patientsService: PatientsService, private infoService: InformationService) { }

  ngOnInit(): void {
    this.onGetPatients(this.currentPage);
    this.initSearchForm();
    this.initSendNoteForm();
    this.onGetAllPatients();
  }
  ngAfterViewChecked(): void {
    this.scrollToBottomNotes();
  }
  setIdUser(i: number) {
    this.clicked = i;
    this.idPatient = this.patients[i].idPatient;

    this.onGetNotes();
    this.onGetBaseInfo(this.idPatient);
  }

  onGetPatients(page?: number) {
    this.currentPage = page;
    this.patientsService.getPatients(page).subscribe((response) => {
      this.data = response;

      this.patients = this.data.patients;

      this.pages.length = Math.ceil(this.data.totalRows / this.data.pageSize);


    })
  }
  private initSearchForm() {
    this.searchUsersForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }
  private initSendNoteForm() {
    this.sendNoteForm = new FormGroup({
      note: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(1000)])
    })
  }
  onSearch() {
    let name: string = this.searchUsersForm.value.name;
    let result = name.split(" ");
    let lastName;
    let firstName;
    if (result.length == 1) {
      firstName = null;
      lastName = name;
    } else {
      firstName = result[0];
      lastName = result[1];
    }
    this.patientsService.searchPatients(firstName, lastName).subscribe((res) => {
      this.data = res;
      this.patients = this.data;
    },
      (error) => {
        this.error = error.error;
      });
  }
  onPostNote() {
    let doctorId = parseInt(this.tokenService.getUserId());
    this.notesService.postNote(this.idPatient, doctorId, this.sendNoteForm.value.note).subscribe((res) => {

      this.onGetNotes();
    });
    this.sendNoteForm.reset();
  }
  get userSelected() {
    return !!this.idPatient;
  }
  onGetNotes() {
    this.notesService.getNotes(this.idPatient).subscribe((res) => {

      this.dataNotes = res;
      this.notes = this.dataNotes;
      this.scrollToBottomNotes();
    })
  }

  scrollToBottomNotes(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  onHandleError() {
    this.error = null;
  }
  onGetAllPatients() {
    this.patientsService.getAllPatients().subscribe((res) => {
      this.allPatients = res;

    })
  }
  onGetBaseInfo(idPatient: number) {
    this.infoService.getBasenfo(this.idPatient).subscribe((res) => {
      this.info = res;

    })
  }
}
