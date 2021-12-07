
export class Patient {
  idPatient: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  constructor(obj) {
    Object.assign(this, obj);
  }
}