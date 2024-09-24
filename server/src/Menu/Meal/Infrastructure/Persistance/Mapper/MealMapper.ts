import { Collection } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
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
import { MealFoodMapper } from './MealFoodMapper';

@Injectable()
export class MealMapper implements IMapper<Meal, MealEntity> {
  constructor(
    // private readonly entityManager: EntityManager,
    private readonly mealFoodMapper: MealFoodMapper
  ) {}

  public toModel(entity: Meal): MealEntity {
    const model = new MealEntity();

    model.id = entity.id().value;
    model.name = entity.name().value;
    model.type = entity.type().value;

    // const foods = entity.foods().map((food: Food) => {
    //   const foodRef = this.entityManager.getReference(FoodEntity, food.foodId().value);

    //   return foodRef;
    // });

    // model.foods = foods;

    // const mealFoods = entity.foods().map((food: Food) => {
    //   const foodRef = this.entityManager.getReference(MealFoodEntity, food.id().value);

    //   return foodRef;
    // });

    // model.mealFoods = new Collection(MealFoodEntity, mealFoods);
    // model.mealFoods = [];

    model.created_at = entity.createdAt();
    model.updated_at = entity.updatedAt();

    return model;
  }

  public toDomain(model: MealEntity): Meal {
    const id = new Id(model.id);
    const name = new Name(model.name);
    const type = new MealType(new StringVo(model.type));

    // const foods = model.mealFoods!.map((food: MealFoodEntity) => {
    //   return this.mealFoodMapper.toDomain(food);
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
