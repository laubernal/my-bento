import { FoodModel } from './FoodModel';
import { MealModel } from './MealModel';

export interface MealFoodModel {
  id: string;
  meal_id: MealModel | string;
  food_id: FoodModel | string;
  amount: number;
  unit: string;
  created_at: Date;
  updated_at: Date;
  [key: string]: string | Date | MealModel | FoodModel | number;
}
