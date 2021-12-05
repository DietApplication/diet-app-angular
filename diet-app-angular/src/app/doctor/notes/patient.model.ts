
export class Patient {
  idPatient: number;
  firstName: string;
  lastName: string;
  constructor(obj) {
    Object.assign(this, obj);
  }
}