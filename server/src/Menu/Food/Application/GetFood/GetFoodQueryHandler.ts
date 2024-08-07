import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFoodQuery } from './GetFoodQuery';
import { Inject } from '@nestjs/common';
import { IFoodRepository } from '../../Domain/Repository/IFoodRepository';
import { Food } from '../../Domain/Entity/Food';
import { FoodFilter } from '../../Domain/Filter/FoodFilter';
import { GetFoodResponse } from './GetFoodResponse';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { IFOOD_REPOSITORY, MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';

@QueryHandler(GetFoodQuery)
export class GetFoodQueryHandler implements IQueryHandler<GetFoodQuery> {
  constructor(
    @Inject(IFOOD_REPOSITORY) private readonly repository: IFoodRepository,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  public async execute(query: GetFoodQuery): Promise<GetFoodResponse> {
    const id = new Id(query.id);

    const food = await this.findFood(id, query.traceId);

    return GetFoodResponse.toResponse(food);
  }

  private async findFood(id: Id, traceId: string): Promise<Food> {
    const filter = FoodFilter.create().withId(id);

    this.logger.log('Before querying DB to get food', [traceId]);

    const result = await this.repository.findOne(filter);

    this.logger.log('After querying DB to get food', [traceId]);

    if (typeof result === 'undefined') {
      throw new RecordNotFoundError();
    }

    return result;
  }
}
