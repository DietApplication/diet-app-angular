export interface Meal{
  idMeal: number;
  nameOfMeal: string;
  description: string; 
  cookingURL: string; 
  products: {
    amount: number;
    homeMeasure: string;
    homeMeasureSize: number;
    idMealRecipe: number;
    idProduct: number;
    name: string;
    size: number;
    unit: string;
  }[];
}