import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFoodQuery } from './GetFoodQuery';
import { Inject } from '@nestjs/common';
import { IFoodRepository } from '../../Domain/Repository/IFoodRepository';
import { Food } from '../../Domain/Entity/Food';
import { FoodFilter } from '../../Domain/Filter/FoodFilter';
import { GetFoodResponse } from './GetFoodResponse';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import { Id } from 'Shared/Domain/Vo/Id.vo';

@QueryHandler(GetFoodQuery)
export class GetFoodQueryHandler implements IQueryHandler<GetFoodQuery> {
  constructor(@Inject('IFoodRepository') private readonly repository: IFoodRepository) {}

  public async execute(query: GetFoodQuery): Promise<GetFoodResponse> {
    const id = new Id(query.id);

    const food = await this.findFood(id);

    return GetFoodResponse.toResponse(food);
  }

  private async findFood(id: Id): Promise<Food> {
    const filter = FoodFilter.create().withId(id);

    const result = await this.repository.findOne(filter);

    if (typeof result === 'undefined') {
      throw new RecordNotFoundError();
    }

    return result;
  }
}
