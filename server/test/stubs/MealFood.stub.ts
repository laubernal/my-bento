import {Food} from "Menu/Meal/Domain/Entity/Food";
import {Id} from "Shared/Domain/Vo/Id.vo";
import {Quantity} from "Shared/Domain/Vo/Quantity.vo";
import {Amount} from "Shared/Domain/Vo/Amount.vo";
import {Unit} from "Shared/Domain/Vo/Unit.vo";
import {StringVo} from "Shared/Domain/Vo/String.vo";

export const mealFoodStub = (id: string, foodId: string): Food => {
    return new Food(
        new Id(id),
        new Id(foodId),
        new Quantity(
            new Amount(50),
            new Unit(new StringVo('grams'))
        )
    );
}