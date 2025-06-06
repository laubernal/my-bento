import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';
import { MealFilter } from 'Menu/Meal/Domain/Filter/MealFilter';
import { IMealRepository } from 'Menu/Meal/Domain/Repository/IMealRepository';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { IMEAL_REPOSITORY, MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { GetMealsResponse } from './GetMealsResponse';
import { GetMealsQuery } from './GetMealsQuery';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { MealType } from 'Shared/Domain/Vo/MealType';
import { StringVo } from 'Shared/Domain/Vo/String.vo';
import {NumberVo} from "Shared/Domain/Vo/Number.vo";
import {Pagination} from "Shared/Domain/Entities/Pagination";

@QueryHandler(GetMealsQuery)
export class GetMealsQueryHandler implements IQueryHandler {
  constructor(
    @Inject(IMEAL_REPOSITORY) private readonly mealRepository: IMealRepository,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  public async execute(query: GetMealsQuery): Promise<any> {
    const meals = await this.findMeals(query);

    const response = meals.map((meal: Meal) => {
      return GetMealsResponse.toResponse(meal);
    });

    return response;
  }

  private async findMeals(query: GetMealsQuery): Promise<Meal[]> {
    const filter = MealFilter.create();

    if (Object.entries(query.searchQuery).length) {
      const searchQueryKeys = Object.keys(query.searchQuery);

      if (searchQueryKeys.includes(MealFilter.MEAL_NAME_FILTER)) {
        filter.withName(new Name(query.searchQuery.meal));
      }

      if (searchQueryKeys.includes(MealFilter.MEAL_TYPE_FILTER)) {
        filter.withType(new MealType(new StringVo(query.searchQuery.type)));
      }

      if (searchQueryKeys.includes(Pagination.PAGE_FILTER)) {
        filter.paginate().setPage(new NumberVo(parseInt(query.searchQuery.page)));
      }

      if (searchQueryKeys.includes(Pagination.PER_PAGE_FILTER)) {
        filter.setPerPage(new NumberVo(parseInt(query.searchQuery.perPage)));
      }
    }

    return await this.mealRepository.find(filter);
  }
}
