export class PatinetChange {
  idPatient: number;
  cpm: number;
  pal: number;
  correctedValue: "string"
  constructor(obj) {
    Object.assign(this, obj);
  }
}