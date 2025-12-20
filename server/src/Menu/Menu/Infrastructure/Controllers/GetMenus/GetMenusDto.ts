import {FullMenuMealInfo, MenuWithFullMealInfo} from 'Menu/Shared/Domain/types';

export class GetMenusDto {
    constructor(
        readonly id: string,
        readonly meals: FullMenuMealInfo[]
    ) {
    }
    
    public static toPresenter(menu: MenuWithFullMealInfo): GetMenusDto {
        const meals: FullMenuMealInfo[] = menu.meals.map((meal) => {
            return {
                id: meal.id,
                name: meal.name,
                type: meal.type,
                date: meal.date,
            };
        });
        
        return new GetMenusDto(menu.id, meals);
    }
}