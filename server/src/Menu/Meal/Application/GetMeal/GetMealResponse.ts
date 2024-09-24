import { Food } from 'Menu/Meal/Domain/Entity/Food';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';
import { MealFoodType } from 'Menu/Shared/Domain/types';

export class GetMealResponse {
  public static toResponse(meal: Meal): GetMealResponse {
    const foods = meal.foods().map((food: Food) => {
      return {
        id: food.id().value,
        foodId: food.foodId().value,
        amount: food.quantity().amount().value,
        unit: food.quantity().unit().value,
      };
    });

    return new GetMealResponse(meal.id().value, meal.name().value, meal.type().value, foods);
  }

  constructor(
    readonly id: string,
    readonly name: string,
    readonly type: string,
    readonly foods: MealFoodType[]
  ) {}
}
