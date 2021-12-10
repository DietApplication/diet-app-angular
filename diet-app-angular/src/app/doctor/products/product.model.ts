export class Product {
  idProduct: number;
  name: string;
  unit: string;
  size: number;
  homeMeasure: string;
  homeMeasureSize: string;
  parameters:
    {
      name: string,
      measureUnit: string,
      amount: number
    }[]
  constructor(obj) {
    Object.assign(this, obj);
  }
}