import { FoodModel } from './FoodModel';

export interface MealModel {
  id: string;
  name: string;
  type: string;
  foods: FoodModel[];
  created_at: Date;
  updated_at: Date;
  [key: string]: string | Date | any[];
}
