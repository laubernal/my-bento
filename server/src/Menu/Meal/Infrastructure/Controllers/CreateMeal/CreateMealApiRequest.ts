import { MealFoodType } from 'Menu/Shared/Domain/types';

export interface CreateMealApiRequest {
  id: string;
  name: string;
  type: string;
  foods: MealFoodType[];
}
