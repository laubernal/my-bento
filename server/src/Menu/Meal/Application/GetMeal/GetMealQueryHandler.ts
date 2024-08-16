import { Inject } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';
import { MealFilter } from 'Menu/Meal/Domain/Filter/MealFilter';
import { IMealRepository } from 'Menu/Meal/Domain/Repository/IMealRepository';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { IMEAL_REPOSITORY, MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { GetMealResponse } from './GetMealResponse';
import { GetMealQuery } from './GetMealQuery';

export class GetMealQueryHandler implements IQueryHandler {
  constructor(
    @Inject(IMEAL_REPOSITORY) private readonly mealRepository: IMealRepository,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  public async execute(query: GetMealQuery): Promise<any> {
    const id = new Id(query.id);

    const meal = await this.findMeal(id);

    return GetMealResponse.toResponse(meal);
  }

  private async findMeal(id: Id): Promise<Meal> {
    const filter = MealFilter.create().withId(id);

    const result = await this.mealRepository.findOne(filter);

    if (typeof result === 'undefined') {
      throw new RecordNotFoundError();
    }

    return result;
  }
}
