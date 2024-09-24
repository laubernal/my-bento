import { Food } from 'Menu/Meal/Domain/Entity/Food';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { Amount } from 'Shared/Domain/Vo/Amount.vo';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { MealType } from 'Shared/Domain/Vo/MealType';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { Quantity } from 'Shared/Domain/Vo/Quantity.vo';
import { StringVo } from 'Shared/Domain/Vo/String.vo';
import { Unit } from 'Shared/Domain/Vo/Unit.vo';
import { MealFoodModel } from 'Shared/Infrastructure/Persistance/PostgreSql/Model/MealFoodModel';
import { MealModel } from 'Shared/Infrastructure/Persistance/PostgreSql/Model/MealModel';

export class PostgreSqlMealMapper implements IMapper<Meal, MealModel> {
  public toModel(entity: Meal): MealModel {
    const foods = entity.foods().map((food: Food) => {
      return {
        id: food.id().value,
        meal_id: entity.id().value,
        food_id: food.foodId().value,
        amount: food.quantity().amount().value,
        unit: food.quantity().unit().value,
        created_at: food.createdAt(),
        updated_at: food.updatedAt(),
      };
    });

    const model = {
      id: entity.id().value,
      name: entity.name().value,
      type: entity.type().value,
      foods,
      created_at: entity.createdAt(),
      updated_at: entity.updatedAt(),
    };

    return model;
  }

  public toDomain(model: MealModel): Meal {
    const id = new Id(model.id);
    const name = new Name(model.name);
    const type = new MealType(new StringVo(model.type));

    const foods = model.foods.map((food: MealFoodModel) => {
      const id = new Id(food.id);
      const foodId = new Id(food.food_id as string);
      const quantity = new Quantity(new Amount(food.amount), new Unit(new StringVo(food.unit)));

      return new Food(id, foodId, quantity, food.created_at, food.updated_at);
    });

    return new Meal(id, name, type, foods, model.created_at, model.updated_at);
  }

  public queryResultToModel(result: { rows: any[]; rowCount: number | null }): {
    [key: string]: MealModel;
  } {
    const mealsMap: { [key: string]: MealModel } = {};
    result.rows.forEach(row => {
      const mealId = row.id;

      if (!mealsMap[mealId]) {
        mealsMap[mealId] = {
          id: row.id,
          name: row.name,
          type: row.type,
          created_at: row.created_at,
          updated_at: row.updated_at,
          foods: [],
        };
      }

      if (row.mealfood_id) {
        mealsMap[mealId].foods.push({
          id: row.mealfood_id,
          meal_id: row.mealfood_meal,
          food_id: row.mealfood_food,
          amount: row.mealfood_amount,
          unit: row.mealfood_unit,
          created_at: row.mealfood_created_at,
          updated_at: row.mealfood_updated_at,
        });
      }
    });

    return mealsMap;
  }
}
