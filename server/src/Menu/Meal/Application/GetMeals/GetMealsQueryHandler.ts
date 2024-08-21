import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';
import { MealFilter } from 'Menu/Meal/Domain/Filter/MealFilter';
import { IMealRepository } from 'Menu/Meal/Domain/Repository/IMealRepository';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { IMEAL_REPOSITORY, MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { GetMealsResponse } from './GetMealsResponse';
import { GetMealsQuery } from './GetMealsQuery';

@QueryHandler(GetMealsQuery)
export class GetMealsQueryHandler implements IQueryHandler {
  constructor(
    @Inject(IMEAL_REPOSITORY) private readonly mealRepository: IMealRepository,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  public async execute(query: GetMealsQuery): Promise<any> {
    const meals = await this.findMeals();

    const response = meals.map((meal: Meal) => {
      return GetMealsResponse.toResponse(meal);
    });

    return response;
  }

  private async findMeals(): Promise<Meal[]> {
    const filter = MealFilter.create();

    return await this.mealRepository.find(filter);
  }
}
