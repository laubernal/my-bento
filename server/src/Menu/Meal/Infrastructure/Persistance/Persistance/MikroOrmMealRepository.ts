import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { IMealRepository } from 'Menu/Meal/Domain/Repository/IMealRepository';
import { MealMapper } from '../Mapper/MealMapper';
import { MealFilter } from 'Menu/Meal/Domain/Filter/MealFilter';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';
import { MikroOrmMealFilterAdapter } from '../File/MikroOrmMealFilterAdapter';
import { MealEntity } from 'Shared/Infrastructure/Persistance/Model/MealEntityMikroOrm';
import { MealFoodEntity } from 'Shared/Infrastructure/Persistance/Model/MealFoodEntityMikroOrm';
import { MealFoodMapper } from '../Mapper/MealFoodMapper';

@Injectable()
export class MikroOrmMealRepository implements IMealRepository {
  constructor(
    private readonly mealMapper: MealMapper,
    private readonly mealFoodMapper: MealFoodMapper,
    private readonly entityManager: EntityManager
  ) {}

  public async findOne(filter: MealFilter): Promise<Meal | undefined> {
    try {
      const adapter = new MikroOrmMealFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const result = await this.entityManager.findOne(MealEntity, adapterQuery, {
        populate: [
          'foods',
          // 'mealFoods'
        ],
      });

      if (!result) {
        return undefined;
      }

      return this.mealMapper.toDomain(result);
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async find(filter: MealFilter): Promise<Meal[]> {
    try {
      const adapter = new MikroOrmMealFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const result = await this.entityManager.findAll(MealEntity, {
        ...adapterQuery,
        populate: ['foods', 'mealFoods'],
      });

      return result.map((meal: MealEntity) => {
        return this.mealMapper.toDomain(meal);
      });
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async save(entity: Meal): Promise<void> {
    try {
      const newEntity = this.mealMapper.toModel(entity);

      const meal = this.entityManager.create(MealEntity, newEntity);

      await this.entityManager.persistAndFlush(meal);

      for (const mealFood of entity.foods()) {
        const mealFoodEntity = this.mealFoodMapper.toModel(mealFood);

        mealFoodEntity.meal = newEntity;

        const food = this.entityManager.create(MealFoodEntity, mealFoodEntity);
        await this.entityManager.persistAndFlush(food);
      }
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async update(entity: Meal): Promise<void> {
    try {
      const filter = MealFilter.create().withId(entity.id());

      const adapter = new MikroOrmMealFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const newMeal = this.mealMapper.toModel(entity);

      const newMealEntity = this.entityManager.create(MealEntity, newMeal);

      await this.entityManager.nativeUpdate(MealEntity, adapterQuery, newMealEntity);

      const currentMealFoods = await this.entityManager.findAll(MealFoodEntity, {
        where: { meal: newMeal.id },
      });

      const newMealFoodIds = entity.foods().map(mealFood => mealFood.id().value);

      const missingMealFoods = currentMealFoods.filter(
        mealFood => !newMealFoodIds.includes(mealFood.id)
      );

      for (const mealFood of missingMealFoods) {
        await this.entityManager.nativeDelete(MealFoodEntity, { id: mealFood.id });
      }

      for (const mealFood of entity.foods()) {
        const mealFoodEntity = this.mealFoodMapper.toModel(mealFood);
        mealFoodEntity.meal = newMealEntity;

        const food = this.entityManager.create(MealFoodEntity, mealFoodEntity);

        await this.entityManager.nativeUpdate(MealFoodEntity, { id: food.id }, food);
      }
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
