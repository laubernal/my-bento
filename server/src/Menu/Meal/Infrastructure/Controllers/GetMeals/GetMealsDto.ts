import {FullFoodInfo, MealWithFullFoodInfo} from "Menu/Shared/Domain/types";

export class GetMealsDto {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly type: string,
        readonly foods: FullFoodInfo[]
    ) {
    }

    public static toPresenter(meal: MealWithFullFoodInfo): GetMealsDto {
        const foods: FullFoodInfo[] = meal.foods.map((food) => {
            return {
                id: food.id,
                foodId: food.foodId,
                name: food.name,
                category: food.category,
                amount: food.amount,
                unit: food.unit,
            };
        });

        return new GetMealsDto(meal.id, meal.name, meal.type, foods);
    }
}