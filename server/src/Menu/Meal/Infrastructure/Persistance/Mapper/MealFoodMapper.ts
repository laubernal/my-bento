import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Food } from 'Menu/Meal/Domain/Entity/Food';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { Amount } from 'Shared/Domain/Vo/Amount.vo';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Quantity } from 'Shared/Domain/Vo/Quantity.vo';
import { StringVo } from 'Shared/Domain/Vo/String.vo';
import { Unit } from 'Shared/Domain/Vo/Unit.vo';
import { FoodEntity } from 'Shared/Infrastructure/Persistance/Model/FoodEntityMikroOrm';
import { MealFoodEntity } from 'Shared/Infrastructure/Persistance/Model/MealFoodEntityMikroOrm';

@Injectable()
export class MealFoodMapper implements IMapper<Food, MealFoodEntity> {
  // constructor(private readonly entityManager: EntityManager) {}

  public toModel(entity: Food): MealFoodEntity {
    const model = new MealFoodEntity();

    // const foodRef = this.entityManager.getReference(FoodEntity, entity.foodId().value);

    model.id = entity.id().value;
    // model.food = foodRef;
    model.amount = entity.quantity().amount().value;
    model.unit = entity.quantity().unit().value;
    model.created_at = entity.createdAt();
    model.updated_at = entity.updatedAt();
    console.log('FOOD', model);
    return model;
  }

  public toDomain(model: MealFoodEntity): Food {
    const id = new Id(model.id);
    const foodId = new Id(model.food.id);
    const quantity = new Quantity(new Amount(model.amount), new Unit(new StringVo(model.unit)));

    return new Food(id, foodId, quantity, model.created_at, model.updated_at);
  }
}
