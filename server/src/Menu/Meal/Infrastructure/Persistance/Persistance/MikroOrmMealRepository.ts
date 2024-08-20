import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { IMealRepository } from 'Menu/Meal/Domain/Repository/IMealRepository';
import { MealMapper } from '../Mapper/MealMapper';
import { MealFilter } from 'Menu/Meal/Domain/Filter/MealFilter';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';

@Injectable()
export class MikroOrmMealRepository implements IMealRepository {
  constructor(private readonly mapper: MealMapper, private readonly entityManager: EntityManager) {}

  public async findOne(filter: MealFilter): Promise<Meal | undefined> {
    try {
      throw new Error('Method not implemented');
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async find(filter: MealFilter): Promise<Meal[]> {
    try {
      throw new Error('Method not implemented');
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async save(entity: Meal): Promise<void> {
    try {
      throw new Error('Method not implemented');
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async update(entity: Meal): Promise<void> {
    try {
      throw new Error('Method not implemented');
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async delete(entity: Meal): Promise<void> {
    try {
      throw new Error('Method not implemented');
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }
}
