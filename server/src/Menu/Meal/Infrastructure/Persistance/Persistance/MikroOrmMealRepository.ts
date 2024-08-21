import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { IMealRepository } from 'Menu/Meal/Domain/Repository/IMealRepository';
import { MealMapper } from '../Mapper/MealMapper';
import { MealFilter } from 'Menu/Meal/Domain/Filter/MealFilter';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';
import { MikroOrmMealFilterAdapter } from '../File/MikroOrmMealFilterAdapter';
import { MealEntity } from 'Shared/Infrastructure/Persistance/Model/MealEntityMikroOrm';
import { MealFoodEntity } from 'Shared/Infrastructure/Persistance/Model/MealFoodEntityMikroOrm';

@Injectable()
export class MikroOrmMealRepository implements IMealRepository {
  constructor(private readonly mapper: MealMapper, private readonly entityManager: EntityManager) {}

  public async findOne(filter: MealFilter): Promise<Meal | undefined> {
    try {
      const adapter = new MikroOrmMealFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const result = await this.entityManager.findOne(MealEntity, adapterQuery);

      if (!result) {
        return undefined;
      }

      return this.mapper.toDomain(result);
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async find(filter: MealFilter): Promise<Meal[]> {
    try {
      const adapter = new MikroOrmMealFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const result = await this.entityManager.findAll(MealEntity, adapterQuery);

      return result.map((meal: MealEntity) => {
        return this.mapper.toDomain(meal);
      });
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async save(entity: Meal): Promise<void> {
    try {
      const newEntity = this.mapper.toModel(entity);

      for (const mealFood of newEntity.foods) {
        const food = this.entityManager.create(MealFoodEntity, mealFood);

        await this.entityManager.persistAndFlush(food);
      }

      const meal = this.entityManager.create(MealEntity, newEntity);

      await this.entityManager.persistAndFlush(meal);
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async update(entity: Meal): Promise<void> {
    try {
      const filter = MealFilter.create().withId(entity.id());

      const adapter = new MikroOrmMealFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const newMeal = this.mapper.toModel(entity);

      for (const mealFood of newMeal.foods) {
        await this.entityManager.nativeUpdate(MealFoodEntity, { id: mealFood.id }, mealFood);
      }

      this.entityManager.nativeUpdate(MealEntity, adapterQuery, newMeal);
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async delete(entity: Meal): Promise<void> {
    try {
      const filter = MealFilter.create().withId(entity.id());

      const adapter = new MikroOrmMealFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      for (const mealFood of entity.foods()) {
        await this.entityManager.nativeDelete(MealFoodEntity, { id: mealFood.id().value });
      }

      await this.entityManager.nativeDelete(MealEntity, adapterQuery);
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }
}
