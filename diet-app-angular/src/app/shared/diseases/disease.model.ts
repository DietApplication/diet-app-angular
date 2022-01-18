export class Disease {
  idDisease: number;
  name: string;
  description: string;
  recomendation: string;
  constructor(obj) {
    Object.assign(this, obj);
  }
}