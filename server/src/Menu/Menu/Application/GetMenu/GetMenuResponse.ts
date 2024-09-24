import { Meal } from 'Menu/Menu/Domain/Entity/Meal';
import { Menu } from 'Menu/Menu/Domain/Entity/Menu';
import { MenuMealType } from 'Menu/Shared/Domain/types';

export class GetMenuResponse {
  public static toResponse(menu: Menu): GetMenuResponse {
    const meals = menu.meals().map((meal: Meal) => {
      return {
        id: meal.id().value,
        date: meal.date(),
        meal: meal.meal().value,
      };
    });

    return new GetMenuResponse(menu.id().value, meals);
  }

  constructor(readonly id: string, readonly meals: MenuMealType[]) {}
}
