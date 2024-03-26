import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFoodsQuery } from './GetFoodsQuery';
import { Inject, Logger } from '@nestjs/common';
import { IFoodRepository } from '../../Domain/Repository/IFoodRepository';
import { Food } from '../../Domain/Entity/Food';
import { FoodFilter } from '../../Domain/Filter/FoodFilter';
import { GetFoodsResponse } from './GetFoodsResponse';

@QueryHandler(GetFoodsQuery)
export class GetFoodsQueryHandler implements IQueryHandler<GetFoodsQuery> {
  constructor(@Inject('IFoodRepository') private readonly repository: IFoodRepository) {}
  private readonly logger = new Logger();

  public async execute(query: GetFoodsQuery): Promise<GetFoodsResponse[]> {
    this.logger.verbose('HERE');
    
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
