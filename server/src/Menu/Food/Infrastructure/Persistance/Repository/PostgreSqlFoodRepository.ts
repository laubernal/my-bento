import { Injectable } from '@nestjs/common';
import { Food } from 'src/Menu/Food/Domain/Entity/Food';
import { IFoodRepository } from 'src/Menu/Food/Domain/Repository/IFoodRepository';
import { FoodMapper } from '../Mapper/FoodMapper';
import { MikroOrmFoodFilterAdapter } from '../Filter/MikroOrmFoodFilterAdapter';
import { FoodFilter } from 'Menu/Food/Domain/Filter/FoodFilter';
import { PostgreSqlDatabaseService } from 'Shared/Infrastructure/Persistance/PostgreSql/PostgreSqlDatabase';
import { PostgreSqlFoodMapper } from '../Mapper/PostgreSqlFoodMapper';
import { FoodModel } from 'Shared/Infrastructure/Persistance/PostgreSql/Model/FoodModel';
import { PostgreSqlFoodFilterAdapter } from '../Filter/PostgreSqlFoodFilterAdapter';

@Injectable()
export class PostgreSqlFoodRepository implements IFoodRepository {
  constructor(
    private readonly mapper: PostgreSqlFoodMapper,
    private readonly databaseService: PostgreSqlDatabaseService
  ) {}

  public async findOne(filter: FoodFilter): Promise<Food | undefined> {
    try {
      const adapter = new PostgreSqlFoodFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const query = `SELECT * FROM foods ${adapterQuery};`;

      const result = await this.databaseService.query(query);

      if (result.rowCount === 0) {
        return undefined;
      }

      return this.mapper.toDomain(result.rows[0]);
    } catch (error: any) {
      throw new Error(`Food Repository Error -- ${error}`);
    }
  }

  public async find(filter: FoodFilter): Promise<Food[]> {
    try {
      const adapter = new PostgreSqlFoodFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const query = `SELECT * FROM foods ${adapterQuery}`;

      const result = await this.databaseService.query(query);

      return result.rows.map((food: FoodModel) => {
        return this.mapper.toDomain(food);
      });
    } catch (error: any) {
      throw new Error(`Food Repository Error -- ${error}`);
    }
  }

  public async save(entity: Food): Promise<void> {
    try {
      const model = this.mapper.toModel(entity);

      const { columns, values } = this.databaseService.getColumnsAndValuesFromModel(model);

      const query = `INSERT INTO foods(${columns}) VALUES(${values});`;
      console.log('QUERY', query);

      await this.databaseService.query(query);
    } catch (error: any) {
      throw new Error(`Food Repository Error -- ${error}`);
    }
  }

  public async update(entity: Food): Promise<void> {
    try {
      throw new Error('Method not implemented');
    } catch (error: any) {
      throw new Error(`Food Repository Error -- ${error}`);
    }
  }

  public async delete(entity: Food): Promise<void> {
    try {
      throw new Error('Method not implemented');
    } catch (error: any) {
      throw new Error(`Food Repository Error -- ${error}`);
    }
  }
}
