import { Injectable } from '@nestjs/common';
import { Food } from 'src/Menu/Food/Domain/Entity/Food';
import { IFoodRepository } from 'src/Menu/Food/Domain/Repository/IFoodRepository';
import { FoodMapper } from '../Mapper/FoodMapper';
import { MikroOrmFoodFilterAdapter } from '../Filter/MikroOrmFoodFilterAdapter';
import { FoodFilter } from 'Menu/Food/Domain/Filter/FoodFilter';
import { PostgreSqlDatabaseService } from 'Shared/Infrastructure/Persistance/PostgreSql/PostgreSqlDatabase';

@Injectable()
export class PostgreSqlFoodRepository implements IFoodRepository {
  constructor(
    private readonly mapper: FoodMapper,
    private readonly databaseService: PostgreSqlDatabaseService
  ) {}

  public async findOne(filter: FoodFilter): Promise<Food | undefined> {
    try {
      const adapter = new MikroOrmFoodFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const query = `SELECT * FROM foods WHERE ${adapterQuery}`;
      console.log('QUERY', query);

      const result = this.databaseService.query(query);

      console.log('RESULT', result);
      throw new Error('Method not implemented');
    } catch (error: any) {
      throw new Error(`Food Repository Error -- ${error}`);
    }
  }

  public async find(filter: FoodFilter): Promise<Food[]> {
    try {
      const adapter = new MikroOrmFoodFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      console.log('QUERY', adapterQuery);
      const query = `SELECT * FROM foods`;
      console.log('QUERY', query);

      const result = await this.databaseService.query(query);

      console.log('RESULT', result);
      throw new Error('Method not implemented');
    } catch (error: any) {
      throw new Error(`Food Repository Error -- ${error}`);
    }
  }

  public async save(entity: Food): Promise<void> {
    try {
      throw new Error('Method not implemented');
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
