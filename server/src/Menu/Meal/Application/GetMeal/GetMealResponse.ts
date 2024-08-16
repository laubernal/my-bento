import { Food } from 'Menu/Food/Domain/Entity/Food';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';
import { FoodResponse } from 'Menu/Shared/Domain/types';

export class GetMealResponse {
  public static toResponse(meal: Meal): GetMealResponse {
    const foods = meal.foods().map((food: Food) => {
      return {
        id: food.id().value,
        name: food.name().value,
        category: food.category().value,
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
    readonly foods: FoodResponse[]
  ) {}
}
