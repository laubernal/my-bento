import {Meal} from 'Menu/Menu/Domain/Entity/Meal';
import {MenuMealType} from 'Menu/Shared/Domain/types';
import {Menu} from 'Menu/Menu/Domain/Entity/Menu';

export class GetMenusResponse {
    constructor(
        readonly id: string,
        readonly meals: MenuMealType[]
    ) {
    }
    
    public static toResponse(menu: Menu): GetMenusResponse {
        const meals: MenuMealType[] = menu.meals().map((meal: Meal) => {
            return {
                id: meal.id().value,
                mealId: meal.meal().value,
                date: meal.date()
            };
        });
        
        return new GetMenusResponse(menu.id().value, meals);
    }
}