import { MealFoodModel } from './MealFoodModel';

export interface MealModel {
  id: string;
  name: string;
  type: string;
  foods: MealFoodModel[];
  created_at: Date;
  updated_at: Date;
  [key: string]: string | Date | any[];
}
