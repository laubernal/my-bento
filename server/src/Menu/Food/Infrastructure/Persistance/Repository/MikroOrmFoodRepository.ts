import { Injectable } from '@nestjs/common';
import { Food } from 'src/Menu/Food/Domain/Entity/Food';
import { IFoodRepository } from 'src/Menu/Food/Domain/Repository/IFoodRepository';
import { FoodMapper } from '../Mapper/FoodMapper';
import { EntityManager } from '@mikro-orm/postgresql';
import { FoodEntity } from 'Shared/Infrastructure/Persistance/Model/FoodEntityMikroOrm';
import { MikroOrmFoodFilterAdapter } from '../Filter/MikroOrmFoodFilterAdapter';
import { FoodFilter } from 'Menu/Food/Domain/Filter/FoodFilter';

@Injectable()
export class MikroOrmFoodRepository implements IFoodRepository {
  constructor(private readonly mapper: FoodMapper, private readonly entityManager: EntityManager) {}

  public async findOne(filter: FoodFilter): Promise<Food | undefined> {
    try {
      const adapter = new MikroOrmFoodFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const result = await this.entityManager.findOne(FoodEntity, adapterQuery);

      if (!result) {
        return undefined;
      }

      return this.mapper.toDomain(result);
    } catch (error: any) {
      throw new Error(`Food Repository Error -- ${error}`);
    }
  }

  public async find(filter: FoodFilter): Promise<Food[]> {
    try {
      const adapter = new MikroOrmFoodFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const result = await this.entityManager.findAll(FoodEntity, adapterQuery);

      return result.map((food: FoodEntity) => {
        return this.mapper.toDomain(food);
      });
    } catch (error: any) {
      throw new Error(`Food Repository Error -- ${error}`);
    }
  }

  public async save(entity: Food): Promise<void> {
    try {
      const newEntity = this.mapper.toModel(entity);

      const client = this.entityManager.create(FoodEntity, newEntity);

      await this.entityManager.persistAndFlush(client);
    } catch (error: any) {
      throw new Error(`Food Repository Error -- ${error}`);
    }
  }

  public async update(entity: Food): Promise<void> {
    try {
      const filter = FoodFilter.create().withId(entity.id());

      const adapter = new MikroOrmFoodFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const newClient = this.mapper.toModel(entity);

      this.entityManager.nativeUpdate(FoodEntity, adapterQuery, newClient);
    } catch (error: any) {
      throw new Error(`Food Repository Error -- ${error}`);
    }
  }

  public async delete(entity: Food): Promise<void> {
    try {
      const filter = FoodFilter.create().withId(entity.id());

      const adapter = new MikroOrmFoodFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      await this.entityManager.nativeDelete(FoodEntity, adapterQuery);
    } catch (error: any) {
      throw new Error(`Food Repository Error -- ${error}`);
    }
  }
}
