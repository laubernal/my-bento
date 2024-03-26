import { Filter } from 'Shared/Domain/Entities/Filter';
import { Food } from 'src/Menu/Food/Domain/Entity/Food';
import { IFoodRepository } from 'src/Menu/Food/Domain/Repository/IFoodRepository';

export class PgFoodRepository implements IFoodRepository {
  public async findOne(filter: Filter): Promise<Food> {
    throw new Error('Method not implemented.');
  }

  public async find(filter: Filter): Promise<Food[]> {
    throw new Error('Method not implemented.');
  }

  public async save(entity: Food): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async update(entity: Food): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(entity: Food): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
