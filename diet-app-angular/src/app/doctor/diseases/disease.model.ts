export class Disease {
  name: string;
  description: string;
  recomendation: string;
  constructor(obj) {
    Object.assign(this, obj);
  }
}