export class Measurements {
  bicepscircumference: number;
  calfcircumference: number;
  chestcircumference: number;
  date: string;
  gender: string;
  age: number;
  height: number;
  hipcircumference: number;
  thighcircumference: number;
  waistcircumference: number;
  waistlowercircumference: number;
  weight: number;
  whomeasured: string;
  constructor(obj) {
    Object.assign(this, obj);
  }
}