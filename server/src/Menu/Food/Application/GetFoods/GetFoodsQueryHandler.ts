import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFoodsQuery } from './GetFoodsQuery';
import { Inject } from '@nestjs/common';
import { IFoodRepository } from '../../Domain/Repository/IFoodRepository';
import { Food } from '../../Domain/Entity/Food';
import { FoodFilter } from '../../Domain/Filter/FoodFilter';
import { GetFoodsResponse } from './GetFoodsResponse';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { IFOOD_REPOSITORY, MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';

@QueryHandler(GetFoodsQuery)
export class GetFoodsQueryHandler implements IQueryHandler<GetFoodsQuery> {
  constructor(
    @Inject(IFOOD_REPOSITORY) private readonly repository: IFoodRepository,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger

  ) {}

  public async execute(query: GetFoodsQuery): Promise<GetFoodsResponse[]> {
    const foods = await this.findFoods(query.traceId);

    const response = foods.map((food: Food) => {
      return GetFoodsResponse.toResponse(food);
    });

    return response;
  }

  private async findFoods(traceId: string): Promise<Food[]> {
    const filter = FoodFilter.create();

    this.logger.log('Before querying DB to get foods', [traceId]);

    const result = await this.repository.find(filter);

    this.logger.log('After querying DB to get foods', [traceId]);

    return result;
  }
}
