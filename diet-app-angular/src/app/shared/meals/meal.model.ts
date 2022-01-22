export interface Meal {
  idMeal: number;
  nameOfMeal: string;
  description: string;
  cookingURL: string;
  products: {
    amount: number;
    calculatedSize;
    homeMeasure: string;
    homeMeasureSize: number;
    idMealRecipe: number;
    idProduct: number;
    name: string;
    unit: string;
  }[];
}