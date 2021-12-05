export class NoteContent {
  idNote: number;
  noteCreated: Date;
  noteText: string;
  constructor(obj) {
    Object.assign(this, obj);
  }
}