import {Meal} from 'Menu/Menu/Domain/Entity/Meal';
import {MenuMealType} from 'Menu/Shared/Domain/types';
import {Menu} from 'Menu/Menu/Domain/Entity/Menu';

export class GetMenuResponse {
    constructor(
        readonly id: string,
        readonly meals: MenuMealType[]
    ) {
    }
    
    public static toResponse(menu: Menu): GetMenuResponse {
        const meals: MenuMealType[] = menu.meals().map((meal: Meal) => {
            return {
                id: meal.id().value,
                mealId: meal.meal().value,
                date: meal.date()
            };
        });
        
        return new GetMenuResponse(menu.id().value, meals);
    }
}