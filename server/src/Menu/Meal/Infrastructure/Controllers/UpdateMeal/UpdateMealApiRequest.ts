import { MealFoodType } from 'Menu/Shared/Domain/types';

export interface UpdateMealApiRequest {
  id: string;
  name: string;
  type: string;
  foods: MealFoodType[];
}
