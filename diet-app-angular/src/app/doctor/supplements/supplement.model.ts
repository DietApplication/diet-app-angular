export class Supplement {
  supplementName: string;
  description: string;
  constructor(obj) {
    Object.assign(this, obj);
  }
}