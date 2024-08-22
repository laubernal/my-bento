import { Collection } from '@mikro-orm/core';
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
import { FoodEntity } from 'Shared/Infrastructure/Persistance/Model/FoodEntityMikroOrm';
import { MealEntity } from 'Shared/Infrastructure/Persistance/Model/MealEntityMikroOrm';
import { MealFoodEntity } from 'Shared/Infrastructure/Persistance/Model/MealFoodEntityMikroOrm';

export class MealMapper implements IMapper<Meal, MealEntity> {
  public toModel(entity: Meal): MealEntity {
    const model = new MealEntity();

    model.id = entity.id().value;
    model.name = entity.name().value;
    model.type = entity.type().value;

    const foods = entity.foods().map((food: Food) => {
      // const model = new MealFoodEntity();
      const model = new FoodEntity();

      model.id = food.foodId().value;

      // model.id = food.id().value;
      // model.food = foodModel;
      // model.amount = food.quantity().amount().value;
      // model.unit = food.quantity().unit().value;
      // model.created_at = food.createdAt();
      // model.updated_at = food.updatedAt();

      return model;
    });

    // model.foods = new Collection(MealEntity, foods);

    model.created_at = entity.createdAt();
    model.updated_at = entity.updatedAt();

    return model;
  }

  public toDomain(model: MealEntity): Meal {
    const id = new Id(model.id);
    const name = new Name(model.name);
    const type = new MealType(new StringVo(model.type));

    // const foods = model.foods.map((food: FoodEntity) => {
    //   const id = new Id(food.id);
    //   const foodId = new Id(food.food.id);
    //   const quantity = new Quantity(new Amount(food.amount), new Unit(new StringVo(food.unit)));

    //   return new Food(id, foodId, quantity, food.created_at, food.updated_at);
    // });

    return new Meal(
      id,
      name,
      type,
      // foods,
      [],
      model.created_at,
      model.updated_at
    );
  }
}
