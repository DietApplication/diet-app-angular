
export class Note {
  idPatient: number;
  idDoctor: number;
  note: string;
  constructor(obj) {
    Object.assign(this, obj);
  }
}