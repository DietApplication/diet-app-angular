export class NoteContent {
  idNote: number;
  noteCreated: Date;
  noteText: string;
  createdBy: string;
  constructor(obj) {
    Object.assign(this, obj);
  }
}