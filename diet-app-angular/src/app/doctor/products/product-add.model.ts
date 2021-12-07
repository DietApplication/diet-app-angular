export class ProductAdd {
  name: string;
  unit: string;
  size: number;
  homeMeasure: string;
  homeMeasureSize: string;
  parameters:
    {
      idParameter: number,
      amount: number;
    }[]
  constructor(obj) {
    Object.assign(this, obj);
  }
}