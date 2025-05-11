import {Meal} from "Menu/Meal/Domain/Entity/Meal";
import {Id} from "Shared/Domain/Vo/Id.vo";
import {Name} from "Shared/Domain/Vo/Name.vo";
import {MealType} from "Shared/Domain/Vo/MealType";
import {StringVo} from "Shared/Domain/Vo/String.vo";
import {mealFoodStub} from "./MealFood.stub";

export const mealStub = (id: string): Meal => {
    const food = mealFoodStub('dc789b73-6687-4739-92ce-4373c9a0dbf2', '911e4b58-6b38-4c0e-8a07-94f45be23b08');

    return new Meal(
        new Id(id),
        new Name('Bocata'),
        new MealType(new StringVo('breakfast')),
        [food]
    );
}