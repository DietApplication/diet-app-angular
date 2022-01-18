export class Supplement {
  idSupplement: number;
  supplementName: string;
  description: string;
  constructor(obj) {
    Object.assign(this, obj);
  }
}