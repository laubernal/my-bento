import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFoodsQuery } from './GetFoodsQuery';
import { Inject, Logger } from '@nestjs/common';
import { IFoodRepository } from '../../Domain/Repository/IFoodRepository';
import { Food } from '../../Domain/Entity/Food';
import { FoodFilter } from '../../Domain/Filter/FoodFilter';
import { GetFoodsResponse } from './GetFoodsResponse';
import { MyBentoLogger } from 'Shared/Infrastructure/Logger/MyBentoLogger';

@QueryHandler(GetFoodsQuery)
export class GetFoodsQueryHandler implements IQueryHandler<GetFoodsQuery> {
  constructor(
    @Inject('IFoodRepository') private readonly repository: IFoodRepository,
    private readonly logger: MyBentoLogger
  ) {}

  public async execute(query: GetFoodsQuery): Promise<GetFoodsResponse[]> {
    this.logger.log('GETTING FOODS', ['20283394-91d0-4346-be1b-11df0f4d3505']);

    const foods = await this.findFoods();
    const response = foods.map((food: Food) => {
      return GetFoodsResponse.toResponse(food);
    });

    return response;
  }

  private async findFoods(): Promise<Food[]> {
    const filter = FoodFilter.create();

    const result = await this.repository.find(filter);

    return result;
  }
}
